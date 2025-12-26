import { Hono } from 'hono';
import type { Env } from '../types/env';
import { createStripeClient } from '../lib/stripe';
import { createSupabaseAdmin } from '../lib/supabase';
import Stripe from 'stripe';

const webhooks = new Hono<{ Bindings: Env }>();

// Stripe webhook handler
webhooks.post('/stripe', async (c) => {
    const stripe = createStripeClient(c.env);
    const supabase = createSupabaseAdmin(c.env);

    // Get raw body and signature
    const payload = await c.req.text();
    const signature = c.req.header('stripe-signature');

    if (!signature) {
        return c.json({ error: 'Missing signature' }, 400);
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            signature,
            c.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return c.json({ error: 'Invalid signature' }, 400);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const companyId = session.metadata?.company_id;

            if (companyId && session.subscription) {
                // Get subscription details to determine tier
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                const priceId = subscription.items.data[0]?.price.id;
                let tier: 'starter' | 'professional' | 'enterprise' = 'starter';

                // Determine tier from price ID
                if (priceId === c.env.STRIPE_PRICE_PROFESSIONAL) {
                    tier = 'professional';
                } else if (priceId === c.env.STRIPE_PRICE_ENTERPRISE) {
                    tier = 'enterprise';
                }

                // Update company subscription tier
                await supabase
                    .from('companies')
                    .update({
                        subscription_tier: tier,
                        stripe_customer_id: session.customer as string,
                    })
                    .eq('id', companyId);

                console.log(`Company ${companyId} upgraded to ${tier}`);
            }
            break;
        }

        case 'customer.subscription.updated': {
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;

            // Find company by customer ID
            const { data: company } = await supabase
                .from('companies')
                .select('id')
                .eq('stripe_customer_id', customerId)
                .single();

            if (company) {
                const priceId = subscription.items.data[0]?.price.id;
                let tier: 'starter' | 'professional' | 'enterprise' = 'starter';

                if (priceId === c.env.STRIPE_PRICE_PROFESSIONAL) {
                    tier = 'professional';
                } else if (priceId === c.env.STRIPE_PRICE_ENTERPRISE) {
                    tier = 'enterprise';
                }

                // Handle cancellation
                if (subscription.status === 'canceled' || subscription.cancel_at_period_end) {
                    // Keep tier until period end, but mark as canceling
                    console.log(`Company ${company.id} subscription canceling`);
                } else {
                    await supabase
                        .from('companies')
                        .update({ subscription_tier: tier })
                        .eq('id', company.id);

                    console.log(`Company ${company.id} subscription updated to ${tier}`);
                }
            }
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;

            // Find company and downgrade to free
            const { data: company } = await supabase
                .from('companies')
                .select('id')
                .eq('stripe_customer_id', customerId)
                .single();

            if (company) {
                await supabase
                    .from('companies')
                    .update({ subscription_tier: 'starter' }) // Or 'free' if you have that tier
                    .eq('id', company.id);

                console.log(`Company ${company.id} subscription canceled, downgraded`);
            }
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object as Stripe.Invoice;
            const customerId = invoice.customer as string;

            // Find company
            const { data: company } = await supabase
                .from('companies')
                .select('id')
                .eq('stripe_customer_id', customerId)
                .single();

            if (company) {
                // You could send an email notification here
                // Or create a notification in the system
                console.log(`Payment failed for company ${company.id}`);
            }
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });
});

export default webhooks;
