import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

// Apps
import MarketingApp from './MarketingApp';
import AuthenticatedApp from './AuthenticatedApp';

// Context & Utils
import { ToastContainer, useToast } from './components/Toast';
import { AppProvider } from './src/context/AppContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// ============================================
// Scroll to Top Component
// ============================================

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

// ============================================
// App Router - Switches between Marketing and App based on AUTH STATE
// NO subdomain logic - pure SPA mode
// ============================================

const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { pathname } = useLocation();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <i className="fa-solid fa-spinner fa-spin text-xl" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // If authenticated AND on a marketing route, render authenticated app
  // This allows authenticated users to still see marketing pages if they want
  const marketingOnlyRoutes = ['/', '/product', '/features', '/pricing', '/about', '/contact', '/enterprise', '/help', '/terms', '/privacy', '/solutions'];
  const authRoutes = ['/login', '/signup', '/forgot-password'];

  // If authenticated and trying to access auth routes, redirect to dashboard
  if (isAuthenticated && authRoutes.includes(pathname)) {
    // Use AuthenticatedApp which will show the dashboard
    return <AuthenticatedApp />;
  }

  // If authenticated and on an app route (dashboard, jobs, etc.), show authenticated app
  const appRoutes = ['/dashboard', '/jobs', '/customers', '/team', '/schedule', '/invoices', '/analytics', '/settings', '/help', '/notifications', '/admin'];
  const isAppRoute = appRoutes.some(route => pathname.startsWith(route));

  if (isAuthenticated && isAppRoute) {
    return <AuthenticatedApp />;
  }

  // If authenticated but on a general route, let them access marketing pages
  // but they can navigate to dashboard
  if (isAuthenticated) {
    // On marketing pages, still show MarketingApp but Navbar will show Dashboard link
    if (marketingOnlyRoutes.includes(pathname)) {
      return <MarketingApp />;
    }
    // Default to authenticated app for any other route
    return <AuthenticatedApp />;
  }

  // Not authenticated - show marketing site
  return <MarketingApp />;
};

// ============================================
// Main App Component
// ============================================

export default function App() {
  const toast = useToast();

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="font-sans text-zinc-300 bg-black overflow-x-hidden min-h-screen flex flex-col noise-overlay">
            {/* Toast Notifications */}
            <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

            {/* Scroll to top on route change */}
            <ScrollToTop />

            {/* Main Router */}
            <AppRouter />
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}