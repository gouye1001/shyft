import { Hono } from 'hono';
import type { Env } from '../types/env';
import { createSupabaseClient, createSupabaseAdmin } from '../lib/supabase';
import { createStripeClient } from '../lib/stripe';
import { PRICING_TIERS } from '../types/stripe';

const billing = new Hono<{ Bindings: Env }>();

// Get user from token
async function getUser(c: any) {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.replace('Bearer ', '');
    const supabase = createSupabaseClient(c.env);
    const { data: { user } } = await supabase.auth.getUser(token);
    return user;
}

// Get pricing tiers
billing.get('/prices', async (c) => {
    return c.json({
        prices: PRICING_TIERS,
        // These would come from Stripe in production
        priceIds: {
            starter: c.env.STRIPE_PRICE_STARTER || 'price_starter',
            professional: c.env.STRIPE_PRICE_PROFESSIONAL || 'price_professional',
        },
    });
});

// Get current subscription status
billing.get('/subscription', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const supabaseAdmin = createSupabaseAdmin(c.env);
    const stripe = createStripeClient(c.env);

    // Query profile WITHOUT join (to avoid RLS recursion)
    const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    console.log('DEBUG sub: profile =', JSON.stringify(profile), 'error =', profileError?.code);

    if (profileError || !profile) {
        // No profile - return free tier
        return c.json({
            subscription: {
                active: false,
                tier: 'free',
                currentPeriodEnd: null,
                cancelAtPeriodEnd: false,
            },
        });
    }

    // Now query company separately
    const { data: company, error: companyError } = await supabaseAdmin
        .from('companies')
        .select('subscription_tier, stripe_customer_id')
        .eq('id', (profile as any).company_id)
        .single();

    console.log('DEBUG sub: company =', JSON.stringify(company), 'error =', companyError?.code);

    if (companyError || !company) {
        return c.json({
            subscription: {
                active: false,
                tier: 'free',
                currentPeriodEnd: null,
                cancelAtPeriodEnd: false,
            },
        });
    }

    const companyData = company as any;

    // If no Stripe customer, return current tier from DB
    if (!companyData.stripe_customer_id) {
        return c.json({
            subscription: {
                active: false,
                tier: companyData.subscription_tier || 'free',
                currentPeriodEnd: null,
                cancelAtPeriodEnd: false,
            },
        });
    }

    // Get subscription from Stripe
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: companyData.stripe_customer_id,
            status: 'active',
            limit: 1,
        });

        if (subscriptions.data.length === 0) {
            return c.json({
                subscription: {
                    active: false,
                    tier: companyData.subscription_tier || 'free',
                    currentPeriodEnd: null,
                    cancelAtPeriodEnd: false,
                },
            });
        }

        const sub = subscriptions.data[0];

        return c.json({
            subscription: {
                active: true,
                tier: companyData.subscription_tier,
                currentPeriodEnd: new Date((sub as any).current_period_end * 1000).toISOString(),
                cancelAtPeriodEnd: sub.cancel_at_period_end,
            },
        });
    } catch (error) {
        return c.json({ error: 'Failed to fetch subscription' }, 500);
    }
});

// Create checkout session
billing.post('/checkout', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const { priceId, successUrl, cancelUrl } = await c.req.json();

    if (!priceId || !successUrl || !cancelUrl) {
        return c.json({ error: 'Missing required fields' }, 400);
    }

    const supabaseAdmin = createSupabaseAdmin(c.env);
    const stripe = createStripeClient(c.env);

    // Query profile WITHOUT join (to avoid RLS recursion)
    let { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    console.log('DEBUG checkout: profile =', JSON.stringify(profile), 'error =', profileError?.code);

    let companyId: string;
    let stripeCustomerId: string | null = null;

    if (!profile && profileError?.code === 'PGRST116') {
        // No profile - create company and profile
        console.log('DEBUG: Creating company and profile...');

        const { data: newCompany, error: companyError } = await supabaseAdmin
            .from('companies')
            .insert([{ name: user.email || 'My Company' }])
            .select()
            .single();

        if (companyError || !newCompany) {
            console.log('DEBUG: Failed to create company:', companyError);
            return c.json({ error: 'Failed to create company' }, 500);
        }

        companyId = (newCompany as any).id;

        const { error: createProfileError } = await (supabaseAdmin
            .from('profiles') as any)
            .insert([{
                user_id: user.id,
                company_id: companyId,
                full_name: user.email || 'User',
                role: 'admin'
            }]);

        if (createProfileError) {
            console.log('DEBUG: Failed to create profile:', createProfileError);
            return c.json({ error: 'Failed to create profile' }, 500);
        }
    } else if (profile) {
        companyId = (profile as any).company_id;

        // Query company separately
        const { data: company } = await supabaseAdmin
            .from('companies')
            .select('stripe_customer_id')
            .eq('id', companyId)
            .single();

        stripeCustomerId = (company as any)?.stripe_customer_id || null;
    } else {
        console.log('DEBUG: Profile query error:', profileError);
        return c.json({ error: 'Failed to get profile' }, 500);
    }

    // Create Stripe customer if doesn't exist
    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
                company_id: companyId,
                user_id: user.id,
            },
        });
        stripeCustomerId = customer.id;

        // Save customer ID
        await (supabaseAdmin
            .from('companies') as any)
            .update({ stripe_customer_id: stripeCustomerId })
            .eq('id', companyId);
    }

    // Create checkout session
    try {
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: { company_id: companyId },
        });

        console.log('DEBUG: Checkout session created:', session.url);
        return c.json({ url: session.url });
    } catch (error: any) {
        console.log('DEBUG: Stripe error:', error.message);
        return c.json({ error: error.message }, 500);
    }
});

// Create customer portal session
billing.post('/portal', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const { returnUrl } = await c.req.json();

    if (!returnUrl) {
        return c.json({ error: 'Return URL required' }, 400);
    }

    const supabaseAdmin = createSupabaseAdmin(c.env);
    const stripe = createStripeClient(c.env);

    // Query profile WITHOUT join
    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (!profile) {
        return c.json({ error: 'Profile not found' }, 404);
    }

    // Query company separately
    const { data: company } = await supabaseAdmin
        .from('companies')
        .select('stripe_customer_id')
        .eq('id', (profile as any).company_id)
        .single();

    if (!(company as any)?.stripe_customer_id) {
        return c.json({ error: 'No billing account found' }, 400);
    }

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: (company as any).stripe_customer_id,
            return_url: returnUrl,
        });

        return c.json({ url: session.url });
    } catch (error: any) {
        return c.json({ error: error.message }, 500);
    }
});

export default billing;
