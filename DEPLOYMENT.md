# Deployment Guide

This document explains how to deploy Shyft to production using Cloudflare.

## Architecture Overview

```
┌─────────────────────────┐     ┌──────────────────────┐
│   Cloudflare Pages      │────▶│  Cloudflare Workers  │
│   (React Frontend)      │     │  (Hono API)          │
│   shyft.pages.dev       │     │  api.shyft.dev       │
└─────────────────────────┘     └──────────┬───────────┘
                                           │
                                           ▼
                                ┌──────────────────────┐
                                │      Supabase        │
                                │  (PostgreSQL + Auth) │
                                └──────────────────────┘
```

## Prerequisites

1. **GitHub Repository** - Push your code to GitHub
2. **Cloudflare Account** - Free tier works
3. **Supabase Project** - Create at supabase.com
4. **Stripe Account** - For payments

## Step 1: Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:
   - `api/supabase/migrations/001_initial_schema.sql`
3. Get your credentials from Settings > API:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY` (anon/public)
   - `SUPABASE_SERVICE_KEY` (service_role)

## Step 2: Stripe Setup

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Create Products:
   - **Starter** - $49/month recurring
   - **Professional** - $99/month recurring
3. Copy the Price IDs (start with `price_`)
4. Get your API keys from Developers > API keys
5. Create a webhook endpoint for `https://your-api.workers.dev/webhooks/stripe`

## Step 3: Cloudflare Setup

### Create API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Create token with permissions:
   - **Account** - Cloudflare Pages: Edit
   - **Account** - Cloudflare Workers: Edit
   - **Zone** - Zone: Read (if using custom domain)

### Deploy via Dashboard (Manual)

**Frontend (Cloudflare Pages):**
1. Go to Workers & Pages > Create > Pages
2. Connect to GitHub repository
3. Configure build:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: `/` (root)
4. Add environment variables:
   - `VITE_API_URL` = your Worker URL
   - `VITE_USE_REAL_API` = `true`

**API (Cloudflare Workers):**
1. Navigate to `api/` directory locally
2. Run: `npx wrangler login`
3. Run: `npx wrangler deploy`
4. Add secrets:
   ```bash
   npx wrangler secret put SUPABASE_URL
   npx wrangler secret put SUPABASE_ANON_KEY
   npx wrangler secret put SUPABASE_SERVICE_KEY
   npx wrangler secret put STRIPE_SECRET_KEY
   npx wrangler secret put STRIPE_WEBHOOK_SECRET
   npx wrangler secret put STRIPE_PRICE_STARTER
   npx wrangler secret put STRIPE_PRICE_PROFESSIONAL
   ```

### Deploy via GitHub Actions (Automatic)

1. Add secrets to GitHub repository (Settings > Secrets):
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_STARTER`
   - `STRIPE_PRICE_PROFESSIONAL`

2. Add variables (Settings > Variables):
   - `VITE_API_URL` = `https://shyft-api.your-subdomain.workers.dev`

3. Push to `main` branch - deployments will trigger automatically

## Step 4: Custom Domain (Optional)

### Frontend
1. In Cloudflare Pages, go to Custom domains
2. Add your domain (e.g., `app.shyft.io`)
3. Configure DNS as instructed

### API
1. In Cloudflare Dashboard, go to Workers & Pages
2. Select your worker > Settings > Triggers
3. Add custom route (e.g., `api.shyft.io/*`)

## Environment Variables Reference

### Frontend (.env.local / Cloudflare Pages)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.shyft.io` |
| `VITE_USE_REAL_API` | Enable real API | `true` |

### API (Cloudflare Workers Secrets)
| Secret | Description |
|--------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_STARTER` | Starter plan Price ID |
| `STRIPE_PRICE_PROFESSIONAL` | Pro plan Price ID |

## Monitoring

After deployment:
1. Check Cloudflare dashboard for errors
2. Monitor Stripe webhook events
3. Check Supabase logs for database issues

## Troubleshooting

**CORS errors?**
- Update `api/src/index.ts` to add your production domain to allowed origins

**Auth not working?**
- Check Supabase Auth settings > URL Configuration
- Add your production URL to allowed redirect URLs

**Webhooks failing?**
- Verify webhook secret matches
- Check Stripe dashboard for webhook logs
