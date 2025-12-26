import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { Env } from './types/env';

import auth from './routes/auth';
import jobs from './routes/jobs';
import dashboard from './routes/dashboard';
import technicians from './routes/technicians';
import billing from './routes/billing';
import webhooks from './routes/webhooks';

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', logger());
app.use('*', cors({
    origin: (origin) => {
        // Allow localhost for development
        if (origin?.includes('localhost')) return origin;
        // Allow Cloudflare Pages domains
        if (origin?.includes('.pages.dev')) return origin;
        // Allow custom domains (update these for your production domain)
        if (origin?.includes('shyft.io')) return origin;
        // Allow any origin in development
        return origin || '*';
    },
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 86400,
    credentials: true,
}));

// Health check
app.get('/', (c) => {
    return c.json({
        name: 'Shyft API',
        version: '1.0.0',
        status: 'healthy',
        timestamp: new Date().toISOString(),
    });
});

// Mount routes
app.route('/auth', auth);
app.route('/jobs', jobs);
app.route('/dashboard', dashboard);
app.route('/technicians', technicians);
app.route('/billing', billing);
app.route('/webhooks', webhooks);

// 404 handler
app.notFound((c) => {
    return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
    console.error(`Error: ${err.message}`);
    return c.json({ error: 'Internal server error' }, 500);
});

export default app;
