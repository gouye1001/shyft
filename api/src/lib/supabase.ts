import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import type { Env } from '../types/env';

// Create Supabase client for server-side operations
export function createSupabaseClient(env: Env): SupabaseClient<Database> {
    return createClient<Database>(
        env.SUPABASE_URL,
        env.SUPABASE_ANON_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}

// Create admin client with service role key (for server-side operations)
export function createSupabaseAdmin(env: Env): SupabaseClient<Database> {
    return createClient<Database>(
        env.SUPABASE_URL,
        env.SUPABASE_SERVICE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}
