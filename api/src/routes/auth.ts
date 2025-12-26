import { Hono } from 'hono';
import type { Env } from '../types/env';
import { createSupabaseClient } from '../lib/supabase';

const auth = new Hono<{ Bindings: Env }>();

// Sign up with email and password
auth.post('/signup', async (c) => {
    const { email, password, fullName, companyName } = await c.req.json();

    if (!email || !password || !fullName || !companyName) {
        return c.json({ error: 'Missing required fields' }, 400);
    }

    const supabase = createSupabaseClient(c.env);

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                company_name: companyName,
            },
        },
    });

    if (authError) {
        return c.json({ error: authError.message }, 400);
    }

    return c.json({
        user: authData.user,
        session: authData.session,
        message: 'Account created successfully',
    });
});

// Sign in with email and password
auth.post('/login', async (c) => {
    const { email, password } = await c.req.json();

    if (!email || !password) {
        return c.json({ error: 'Email and password required' }, 400);
    }

    const supabase = createSupabaseClient(c.env);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return c.json({ error: error.message }, 401);
    }

    return c.json({
        user: data.user,
        session: data.session,
    });
});

// Sign out
auth.post('/logout', async (c) => {
    const supabase = createSupabaseClient(c.env);
    await supabase.auth.signOut();
    return c.json({ message: 'Logged out successfully' });
});

// Get current user
auth.get('/me', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createSupabaseClient(c.env);

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return c.json({ error: 'Invalid token' }, 401);
    }

    // Get profile data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*, companies(*)')
        .eq('user_id', user.id)
        .single();

    return c.json({
        user,
        profile,
    });
});

// Forgot password
auth.post('/forgot-password', async (c) => {
    const { email } = await c.req.json();

    if (!email) {
        return c.json({ error: 'Email required' }, 400);
    }

    const supabase = createSupabaseClient(c.env);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${c.req.header('Origin')}/reset-password`,
    });

    if (error) {
        return c.json({ error: error.message }, 400);
    }

    return c.json({ message: 'Password reset email sent' });
});

// Refresh token
auth.post('/refresh', async (c) => {
    const { refresh_token } = await c.req.json();

    if (!refresh_token) {
        return c.json({ error: 'Refresh token required' }, 400);
    }

    const supabase = createSupabaseClient(c.env);

    const { data, error } = await supabase.auth.refreshSession({
        refresh_token,
    });

    if (error) {
        return c.json({ error: error.message }, 401);
    }

    return c.json({
        session: data.session,
    });
});

export default auth;
