// Stripe-related types

export interface StripePrices {
    starter: string;
    professional: string;
    enterprise: string;
}

export interface CreateCheckoutRequest {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}

export interface SubscriptionStatus {
    active: boolean;
    tier: 'starter' | 'professional' | 'enterprise' | 'free';
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
}

export interface WebhookEvent {
    type: string;
    data: {
        object: any;
    };
}

// Pricing tiers matching the Pricing page
export const PRICING_TIERS = {
    starter: {
        name: 'Starter',
        price: 49,
        jobs: 100,
        users: 3,
        features: ['Basic scheduling', 'Mobile app', 'Email support'],
    },
    professional: {
        name: 'Professional',
        price: 99,
        jobs: 500,
        users: 10,
        features: ['Advanced dispatch', 'Analytics', 'Priority support', 'API access'],
    },
    enterprise: {
        name: 'Enterprise',
        price: null, // Custom pricing
        jobs: 'unlimited',
        users: 'unlimited',
        features: ['Custom integrations', 'Dedicated support', 'SLA', 'On-premise option'],
    },
} as const;
