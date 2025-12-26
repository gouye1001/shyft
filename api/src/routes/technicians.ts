import { Hono } from 'hono';
import type { Env } from '../types/env';
import { createSupabaseClient } from '../lib/supabase';

const technicians = new Hono<{ Bindings: Env }>();

// Middleware to get user from token
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

// Get all technicians for the company
technicians.get('/', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const supabase = createSupabaseClient(c.env);

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (!profile) {
        return c.json({ error: 'Profile not found' }, 404);
    }

    const { data: techList, error } = await supabase
        .from('technicians')
        .select('*, profiles(*)')
        .eq('company_id', profile.company_id);

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ technicians: techList });
});

// Get available technicians
technicians.get('/available', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const supabase = createSupabaseClient(c.env);

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (!profile) {
        return c.json({ error: 'Profile not found' }, 404);
    }

    const { data: techList, error } = await supabase
        .from('technicians')
        .select('*, profiles(*)')
        .eq('company_id', profile.company_id)
        .eq('status', 'available');

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ technicians: techList });
});

// Update technician status
technicians.patch('/:id/status', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const techId = c.req.param('id');
    const { status } = await c.req.json();
    const supabase = createSupabaseClient(c.env);

    const { data: tech, error } = await supabase
        .from('technicians')
        .update({ status })
        .eq('id', techId)
        .select()
        .single();

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ technician: tech });
});

// Update technician location
technicians.patch('/:id/location', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const techId = c.req.param('id');
    const { lat, lng } = await c.req.json();
    const supabase = createSupabaseClient(c.env);

    const { data: tech, error } = await supabase
        .from('technicians')
        .update({ current_location: { lat, lng } })
        .eq('id', techId)
        .select()
        .single();

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ technician: tech });
});

export default technicians;
