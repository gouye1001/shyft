import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

// Apps
import MarketingApp from './MarketingApp';
import AuthenticatedApp from './AuthenticatedApp';

// Context & Utils
import { ToastContainer, useToast } from './components/Toast';
import { AppProvider } from './src/context/AppContext';
import { AuthProvider } from './src/context/AuthContext';
import useSubdomain from './src/hooks/useSubdomain';

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
// App Router - Switches between Marketing and App
// ============================================

const AppRouter: React.FC = () => {
  const subdomain = useSubdomain();

  // Render appropriate app based on subdomain
  if (subdomain === 'app') {
    return <AuthenticatedApp />;
  }

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