# Shyft API

Backend API for Shyft Field Service Management, built with Hono on Cloudflare Workers + Supabase.

## Setup

### 1. Install dependencies

```bash
cd api
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Run the SQL migration in `supabase/migrations/001_initial_schema.sql` via the SQL Editor
3. Copy your project credentials

### 3. Configure environment variables

Create a `.dev.vars` file (for local development):

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

For production, add these in the Cloudflare dashboard under Workers > Settings > Variables.

### 4. Run locally

```bash
npm run dev
```

The API will be available at `http://localhost:8787`.

### 5. Deploy to Cloudflare

```bash
npm run deploy
```

## API Endpoints

### Auth
- `POST /auth/signup` - Create account
- `POST /auth/login` - Sign in
- `POST /auth/logout` - Sign out
- `GET /auth/me` - Get current user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/refresh` - Refresh access token

### Jobs
- `GET /jobs` - List all jobs
- `GET /jobs/:id` - Get a job
- `POST /jobs` - Create a job
- `PATCH /jobs/:id` - Update a job
- `POST /jobs/:id/dispatch` - Assign technician
- `POST /jobs/:id/complete` - Mark complete

### Dashboard
- `GET /dashboard/stats` - Analytics overview
- `GET /dashboard/team` - Team with locations
- `GET /dashboard/charts/revenue` - Revenue chart data

### Technicians
- `GET /technicians` - List all
- `GET /technicians/available` - List available
- `PATCH /technicians/:id/status` - Update status
- `PATCH /technicians/:id/location` - Update location

### Billing (Stripe)
- `GET /billing/prices` - Get pricing tiers
- `GET /billing/subscription` - Current subscription status
- `POST /billing/checkout` - Create Stripe checkout session
- `POST /billing/portal` - Create customer portal session

### Webhooks
- `POST /webhooks/stripe` - Stripe webhook handler

## Stripe Setup

1. Create a [Stripe](https://stripe.com) account
2. Create products/prices in Stripe Dashboard for Starter and Professional plans
3. Add to `.dev.vars`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_PRICE_STARTER=price_...
   STRIPE_PRICE_PROFESSIONAL=price_...
   ```
4. For local webhook testing: `stripe listen --forward-to localhost:8787/webhooks/stripe`
