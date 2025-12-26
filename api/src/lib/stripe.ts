import Stripe from 'stripe';
import type { Env } from '../types/env';

// Create Stripe client
export function createStripeClient(env: Env): Stripe {
    return new Stripe(env.STRIPE_SECRET_KEY, {
        typescript: true,
    });
}

// Verify webhook signature
export async function verifyWebhookSignature(
    payload: string,
    signature: string,
    webhookSecret: string,
    stripe: Stripe
): Promise<Stripe.Event> {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
