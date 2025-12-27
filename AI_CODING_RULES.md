# Shyft AI Coding Rules

> System prompt for AI code generation. Follow these rules strictly.

## 1. Tech Stack

| Layer | Tech | Notes |
|-------|------|-------|
| Framework | React 19 | Functional components only |
| Build | Vite 6 | ES Modules |
| Language | TypeScript 5.8+ | Strict mode enabled |
| Styling | Tailwind 3.4 | No arbitrary values |
| Routing | React Router 7 | Use `<Link>` not `<a>` |
| Icons | FontAwesome 6 | `<i className="fa-solid fa-user" />` |
| Backend | Hono 4.6 | Cloudflare Workers |
| Database | Supabase | PostgreSQL + Auth |
| Payments | Stripe | Checkout + Webhooks |

## 2. Project Structure

```
/home/adrian/shyft/
├── src/
│   ├── App.tsx           # Root + routing
│   ├── components/       # ✅ ALL components here
│   │   └── app/ui/       # ⭐ Reusable UI kit
│   ├── pages/            # ✅ ALL pages here
│   │   ├── Home/         # Page folders with index.tsx
│   │   └── app/          # Auth'd app pages
│   ├── context/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── services/         # API clients
│   ├── types/            # Centralized types
│   └── utils/            # Helper functions
└── api/src/              # Backend (Hono)
    └── routes/           # API handlers
```

## 3. Component Rules

### Use UI kit (`src/components/app/ui/`)
- `AppButton` | `AppCard` | `AppInput` | `AppSelect`
- `AppModal` | `AppTable` | `AppBadge` | `AppSkeleton`

### Props = `interface`, NOT `type`
```tsx
interface CardProps { title: string; }
```

### One component per file

### Large pages → Split into folder
```
src/pages/Home/
├── index.tsx      # Main composition
├── HomeHero.tsx
├── HomeFeatures.tsx
└── HomeCTA.tsx
```

## 4. Design System

### Colors - USE SEMANTIC TOKENS
```tsx
// ✅ CORRECT
className="bg-brand-surface text-brand-text-primary"

// ❌ WRONG
className="bg-zinc-900 text-white"
```

| Token | Usage |
|-------|-------|
| `brand-bg` | Page bg |
| `brand-surface` | Card bg |
| `brand-accent` | Primary actions |
| `brand-text-primary` | Main text |
| `brand-text-secondary` | Secondary |
| `brand-success/warning/danger` | Status |

### Spacing - Multiples of 4
### Border Radius - `rounded-xl` for buttons/cards
### Transitions - `transition-all duration-200`

## 5. Data Fetching

> ⚠️ NEVER use raw `fetch` in `useEffect`

```tsx
// ✅ Use hooks from src/hooks/
import { useDashboardStats } from '../hooks/useMockData';
const { data, isLoading, error } = useDashboardStats();
```

## 6. Imports

```tsx
// From src/App.tsx
import { AppButton } from './components/app/ui';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';

// From src/pages/app/*.tsx
import { AppButton } from '../../components/app/ui';
import { useAuth } from '../../context/AuthContext';
```

## 7. AI Protocol

Before generating code:
1. ✅ Check `src/components/app/ui/` for existing components
2. ✅ Use semantic colors (`brand-*`)
3. ✅ Use `interface` for props
4. ✅ No inline styles
5. ✅ No arbitrary Tailwind (`w-[347px]`)
6. ✅ Use data hooks, not raw fetch

---
*v1.1 | 2025-12-27 | Post-restructure*
