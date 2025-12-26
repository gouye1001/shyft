// Cloudflare Workers environment bindings
export interface Env {
    ENVIRONMENT: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_KEY: string;
    // Stripe
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    STRIPE_PRICE_STARTER: string;
    STRIPE_PRICE_PROFESSIONAL: string;
    STRIPE_PRICE_ENTERPRISE?: string;
}

// Re-export database types (will be generated from Supabase)
export * from './database';
