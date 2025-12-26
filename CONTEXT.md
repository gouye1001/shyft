# Shyft Project Context

> Last updated: December 26, 2024

## Overview

**Shyft** is a Field Service Management SaaS platform built with React + TypeScript + Vite + Tailwind CSS. The application provides scheduling, dispatch, payments, and customer communication tools for field service teams.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| State | React Context (AuthContext, AppContext) |
| Icons | Font Awesome |

---

## Project Structure

```
/home/adrian/shyft/
├── pages/                    # Page components
│   ├── Home.tsx              # Homepage (Linear-style with feature previews)
│   ├── Product.tsx           # Product showcase page
│   ├── Features.tsx          # Features listing
│   ├── Pricing.tsx           # Pricing plans
│   ├── About.tsx             # Company info
│   ├── Contact.tsx           # Contact form
│   ├── Enterprise.tsx        # Enterprise page
│   ├── Help.tsx              # Help center
│   ├── Login.tsx             # Login form
│   ├── Signup.tsx            # Signup form
│   ├── ForgotPassword.tsx    # Password reset
│   ├── Dashboard.tsx         # Protected dashboard
│   ├── Terms.tsx             # Terms of service
│   └── Privacy.tsx           # Privacy policy
├── components/               # Reusable components
│   ├── Navbar.tsx            # Navigation bar
│   ├── Footer.tsx            # Footer
│   ├── ScrollReveal.tsx      # Scroll animation wrapper
│   ├── MagneticButton.tsx    # Interactive button
│   ├── HeroSection.tsx       # Hero component
│   ├── CTASection.tsx        # CTA component
│   └── ...
├── src/
│   ├── context/
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── AppContext.tsx    # Application state
│   └── utils/
│       └── mockData.ts       # Mock data for simulation
├── App.tsx                   # Main app with routing
├── index.css                 # Global styles
└── package.json
```

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg-black` | `#000000` | Primary background |
| `bg-white/[0.02]` | `rgba(255,255,255,0.02)` | Card backgrounds |
| `border-white/5` | `rgba(255,255,255,0.05)` | Subtle borders |
| `border-white/10` | `rgba(255,255,255,0.10)` | Hover borders |
| `text-white` | `#ffffff` | Primary text |
| `text-zinc-400` | `#a1a1aa` | Secondary text |
| `text-zinc-500` | `#71717a` | Muted text |
| `text-zinc-600` | `#52525b` | Subtle text |
| `blue-500` | `#3b82f6` | Primary accent |
| `emerald-500` | `#10b981` | Success accent |
| `amber-500` | `#f59e0b` | Warning accent |
| `purple-500` | `#8b5cf6` | Analytics accent |

### Typography

- Headlines: `font-bold tracking-tight`
- Body: `text-zinc-400 leading-relaxed`
- Labels: `text-xs uppercase tracking-wider text-zinc-600`

### Components

- Cards: `rounded-xl bg-white/[0.02] border border-white/5`
- Buttons: `rounded-full bg-white text-black font-semibold`
- Inputs: `rounded-lg bg-white/5 border border-white/10`

---

## Authentication

### AuthContext

```typescript
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}
```

- **Storage**: `localStorage` for session persistence
- **Protected Routes**: `ProtectedRoute` component wraps Dashboard
- **Mock Users**: Demo credentials available for testing

---

## Routing

| Path | Component | Auth |
|------|-----------|------|
| `/` | Home | Public |
| `/product` | Product | Public |
| `/features` | Features | Public |
| `/pricing` | Pricing | Public |
| `/about` | About | Public |
| `/contact` | Contact | Public |
| `/enterprise` | Enterprise | Public |
| `/help` | Help | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/forgot-password` | ForgotPassword | Public |
| `/dashboard` | Dashboard | **Protected** |
| `/terms` | Terms | Public |
| `/privacy` | Privacy | Public |

---

## Key Features Implemented

### Homepage (Linear-style)
- Hero with dashboard screenshot mockup
- Feature sections with UI previews:
  - Smart Dispatch → Schedule timeline UI
  - Mobile App → iPhone mockup with job card
  - Analytics → Revenue dashboard with chart
- Real Unsplash placeholder images
- Mapbox dark map placeholder
- 3 testimonials with real avatars
- Selective hover animations

### Dashboard
- User greeting with live clock
- Stats cards (revenue, jobs, team, response time)
- Live operations map
- Active jobs list
- Settings modal
- Mouse-move effects

### Authentication
- Login with email/password
- Signup with validation
- Password reset flow
- Social login buttons (UI only)

---

## External Resources

### Placeholder Images
- **Avatars**: `https://images.unsplash.com/photo-{id}?w=100&h=100&fit=crop&crop=face`
- **Maps**: Mapbox dark style static API

### CDN Resources
- Font Awesome icons (via CDN)
- Google Fonts (Inter, if used)

---

## Build Info

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Build output
dist/
├── index.html       # 12.96 kB
└── assets/
    └── index.js     # ~406 kB (113 kB gzipped)
```

---

## Current Status

| Area | Status |
|------|--------|
| Homepage | ✅ Complete (Linear-style) |
| Product Page | ✅ Complete |
| Authentication | ✅ Complete (mock) |
| Dashboard | ✅ Complete (mock data) |
| Other Pages | ⚡ Functional, could use polish |
| Backend | ❌ Not implemented (all mock) |
| Payments | ❌ UI only |
| Notifications | ❌ UI only |

---

## Notes

- All data is client-side mock data
- `setTimeout` simulates network delays
- No actual backend integration
- Authentication persists via localStorage
