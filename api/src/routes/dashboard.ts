import { Hono } from 'hono';
import type { Env } from '../types/env';
import { createSupabaseClient } from '../lib/supabase';

const dashboard = new Hono<{ Bindings: Env }>();

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

// Get dashboard analytics
dashboard.get('/stats', async (c) => {
    const user = await getUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

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

    const companyId = profile.company_id;

    // Get job stats
    const { data: jobs } = await supabase
        .from('jobs')
        .select('status, amount, created_at')
        .eq('company_id', companyId);

    // Get technician count
    const { count: technicianCount } = await supabase
        .from('technicians')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);

    // Calculate stats
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const completedJobs = jobs?.filter(j => j.status === 'completed') || [];
    const monthlyJobs = completedJobs.filter(j => new Date(j.created_at) >= thisMonth);
    const totalRevenue = completedJobs.reduce((sum, j) => sum + (j.amount || 0), 0);
    const monthlyRevenue = monthlyJobs.reduce((sum, j) => sum + (j.amount || 0), 0);

    const pendingJobs = jobs?.filter(j => j.status === 'pending').length || 0;
    const inProgressJobs = jobs?.filter(j => ['assigned', 'in_progress'].includes(j.status)).length || 0;

    return c.json({
        stats: {
            totalRevenue,
            monthlyRevenue,
            completedJobs: completedJobs.length,
            monthlyJobs: monthlyJobs.length,
            pendingJobs,
            inProgressJobs,
            teamSize: technicianCount || 0,
            avgResponseTime: '24min', // Would calculate from actual data
        },
        recentActivity: {
            today: jobs?.filter(j => {
                const d = new Date(j.created_at);
                return d.toDateString() === now.toDateString();
            }).length || 0,
        },
    });
});

// Get active technicians with locations
dashboard.get('/team', async (c) => {
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

    const { data: technicians, error } = await supabase
        .from('technicians')
        .select('*, profiles(*)')
        .eq('company_id', profile.company_id);

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ technicians });
});

// Get chart data for revenue over time
dashboard.get('/charts/revenue', async (c) => {
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

    // Get completed jobs from the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data: jobs } = await supabase
        .from('jobs')
        .select('amount, completed_at')
        .eq('company_id', profile.company_id)
        .eq('status', 'completed')
        .gte('completed_at', sixMonthsAgo.toISOString());

    // Group by month
    const revenueByMonth: Record<string, number> = {};
    jobs?.forEach(job => {
        if (job.completed_at && job.amount) {
            const month = new Date(job.completed_at).toLocaleString('default', { month: 'short' });
            revenueByMonth[month] = (revenueByMonth[month] || 0) + job.amount;
        }
    });

    return c.json({
        labels: Object.keys(revenueByMonth),
        data: Object.values(revenueByMonth),
    });
});

export default dashboard;
