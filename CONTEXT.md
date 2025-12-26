# Shyft Project Context

> Last updated: December 27, 2024

## Overview

**Shyft** is a Field Service Management SaaS platform built with React + TypeScript + Vite + Tailwind CSS. The platform uses **subdomain-based architecture** to separate the marketing site from the authenticated app.

| Domain | Purpose |
|--------|---------|
| `shyft.io` (or `localhost:5173`) | Marketing site (public) |
| `app.shyft.io` (or `app.localhost:5173`) | Authenticated app (protected) |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS |
| Routing | React Router DOM v6 |
| State | React Context (AuthContext, AppContext) |
| Icons | Font Awesome |
| Auth | Supabase (or demo mode) |
| Payments | Stripe |

---

## Project Structure

```
/home/adrian/shyft/
├── App.tsx                   # Root - subdomain router
├── MarketingApp.tsx          # Public site routes
├── AuthenticatedApp.tsx      # Protected app routes
│
├── pages/                    # Marketing pages
│   ├── Home.tsx
│   ├── Product.tsx
│   ├── Pricing.tsx
│   ├── Login.tsx, Signup.tsx
│   └── ...
│
├── pages/app/                # Authenticated app pages
│   ├── Dashboard.tsx         # Main dashboard
│   ├── Jobs.tsx              # Job management
│   ├── Team.tsx              # Team members
│   ├── Schedule.tsx          # Calendar view
│   ├── Invoices.tsx          # Billing
│   ├── Analytics.tsx         # Reports
│   ├── Settings.tsx          # Account settings
│   └── Help.tsx              # In-app support
│
├── components/               # Marketing components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
│
├── components/app/           # App components
│   └── AppLayout.tsx         # Sidebar + user menu
│
├── src/
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── AppContext.tsx
│   ├── hooks/
│   │   └── useSubdomain.ts   # Subdomain detection
│   └── api/
│       └── client.ts         # API client
│
└── api/                      # Backend (Hono + Cloudflare Workers)
    └── src/
        └── routes/
```

---

## Architecture

### Subdomain Routing

```
App.tsx
  └── useSubdomain() → 'app' | 'www'
        ├── 'www' → MarketingApp (Navbar + Footer)
        └── 'app' → AuthenticatedApp (AppLayout + Sidebar)
```

### Key Files

| File | Description |
|------|-------------|
| `useSubdomain.ts` | Detects subdomain, provides `getAppUrl()` / `getMarketingUrl()` |
| `MarketingApp.tsx` | Routes for public pages |
| `AuthenticatedApp.tsx` | Protected routes with auth check |
| `AppLayout.tsx` | Collapsible sidebar, user menu, logout |

---

## Authentication Flow

1. User visits `shyft.io/login`
2. Login success → `VerifySuccess.tsx` redirects to `app.shyft.io`
3. `AuthenticatedApp` checks `isAuthenticated` via `useAuth()`
4. If not authenticated → redirect back to `shyft.io/login`
5. Logout → redirect to `shyft.io`

---

## Design System

### Colors
- Background: `bg-black`, `bg-zinc-900/50`, `bg-zinc-950`
- Borders: `border-white/5`, `border-white/10`
- Text: `text-white`, `text-zinc-400`, `text-zinc-500`
- Accents: `blue-500`, `emerald-500`, `purple-500`

### Status Colors
```ts
'In Progress': 'bg-blue-500/20 text-blue-400'
'Scheduled': 'bg-yellow-500/20 text-yellow-400'
'Completed': 'bg-emerald-500/20 text-emerald-400'
```

---

## Routes

### Marketing (`shyft.io`)
| Path | Component |
|------|-----------|
| `/` | Home |
| `/product` | Product |
| `/pricing` | Pricing |
| `/login` | Login |
| `/signup` | Signup |

### App (`app.shyft.io`)
| Path | Component |
|------|-----------|
| `/` | Dashboard |
| `/jobs` | Jobs |
| `/team` | Team |
| `/schedule` | Schedule |
| `/invoices` | Invoices |
| `/analytics` | Analytics |
| `/settings` | Settings |
| `/help` | Help |

---

## Commands

```bash
npm run dev           # Start dev server (localhost:5173)
npm run build         # Production build
npm run preview       # Preview build

# API
cd api && npm run dev # Start API server (localhost:8787)
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_USE_REAL_API` | `true` for real backend, `false` for demo |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |

---

## Current Status

| Area | Status |
|------|--------|
| Marketing Site | ✅ Complete |
| Subdomain Routing | ✅ Complete |
| App Dashboard | ✅ Complete |
| App Pages (Jobs, Team, etc.) | ✅ Complete (mock data) |
| Auth Flow | ✅ Complete |
| API Backend | ⚡ Partial (Hono/Workers) |
| Stripe Integration | ⚡ Partial |
