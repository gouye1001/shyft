import { Hono } from 'hono';
import type { Env } from '../types/env';
import { createSupabaseClient } from '../lib/supabase';
import type { Tables, InsertDto, UpdateDto } from '../types/database';

const jobs = new Hono<{ Bindings: Env }>();

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

// Get all jobs for the user's company
jobs.get('/', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const supabase = createSupabaseClient(c.env);

    // Get user's profile to find their company
    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (!profile) {
        return c.json({ error: 'Profile not found' }, 404);
    }

    // Get jobs for the company
    const { data: jobsList, error } = await supabase
        .from('jobs')
        .select('*, technicians(*, profiles(*))')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ jobs: jobsList });
});

// Get a single job
jobs.get('/:id', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const jobId = c.req.param('id');
    const supabase = createSupabaseClient(c.env);

    const { data: job, error } = await supabase
        .from('jobs')
        .select('*, technicians(*, profiles(*))')
        .eq('id', jobId)
        .single();

    if (error) {
        return c.json({ error: error.message }, 404);
    }

    return c.json({ job });
});

// Create a new job
jobs.post('/', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const body = await c.req.json();
    const supabase = createSupabaseClient(c.env);

    // Get user's company
    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (!profile) {
        return c.json({ error: 'Profile not found' }, 404);
    }

    const jobData: InsertDto<'jobs'> = {
        company_id: profile.company_id,
        customer_name: body.customer_name,
        customer_address: body.customer_address,
        customer_phone: body.customer_phone || null,
        description: body.description,
        status: 'pending',
        priority: body.priority || 'medium',
        scheduled_at: body.scheduled_at || null,
        amount: body.amount || null,
        assigned_to: null,
    };

    const { data: job, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ job }, 201);
});

// Update a job
jobs.patch('/:id', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const jobId = c.req.param('id');
    const body = await c.req.json();
    const supabase = createSupabaseClient(c.env);

    const updateData: UpdateDto<'jobs'> = {};
    if (body.status) updateData.status = body.status;
    if (body.priority) updateData.priority = body.priority;
    if (body.description) updateData.description = body.description;
    if (body.scheduled_at) updateData.scheduled_at = body.scheduled_at;
    if (body.assigned_to !== undefined) updateData.assigned_to = body.assigned_to;
    if (body.amount !== undefined) updateData.amount = body.amount;

    const { data: job, error } = await supabase
        .from('jobs')
        .update(updateData)
        .eq('id', jobId)
        .select()
        .single();

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ job });
});

// Dispatch a technician to a job
jobs.post('/:id/dispatch', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const jobId = c.req.param('id');
    const { technician_id } = await c.req.json();
    const supabase = createSupabaseClient(c.env);

    // Update job with assignment
    const { data: job, error: jobError } = await supabase
        .from('jobs')
        .update({
            assigned_to: technician_id,
            status: 'assigned',
        })
        .eq('id', jobId)
        .select()
        .single();

    if (jobError) {
        return c.json({ error: jobError.message }, 500);
    }

    // Update technician status
    await supabase
        .from('technicians')
        .update({ status: 'busy' })
        .eq('id', technician_id);

    return c.json({ job, message: 'Technician dispatched' });
});

// Complete a job
jobs.post('/:id/complete', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const jobId = c.req.param('id');
    const { amount } = await c.req.json();
    const supabase = createSupabaseClient(c.env);

    const { data: job, error } = await supabase
        .from('jobs')
        .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            amount: amount || null,
        })
        .eq('id', jobId)
        .select('*, assigned_to')
        .single();

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    // Free up the technician
    if (job.assigned_to) {
        await supabase
            .from('technicians')
            .update({ status: 'available' })
            .eq('id', job.assigned_to);
    }

    return c.json({ job, message: 'Job completed' });
});

export default jobs;
