import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Enterprise from './pages/Enterprise';
import Help from './pages/Help';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Context & Utils
import { ToastContainer, useToast } from './components/Toast';
import { AppProvider } from './src/context/AppContext';
import { AuthProvider } from './src/context/AuthContext';

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
// Layout Component
// ============================================

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar, hideFooter }) => {
  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

// ============================================
// App Routes Component
// ============================================

const AppRoutes: React.FC = () => {
  const toast = useToast();

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public Pages with full layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/product" element={<Layout><Product /></Layout>} />
        <Route path="/features" element={<Layout><Features /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact onShowToast={toast.addToast} /></Layout>} />
        <Route path="/enterprise" element={<Layout><Enterprise onShowToast={toast.addToast} /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />

        {/* Auth Pages - no footer */}
        <Route path="/login" element={<Layout hideFooter><Login onShowToast={toast.addToast} /></Layout>} />
        <Route path="/signup" element={<Layout hideFooter><Signup onShowToast={toast.addToast} /></Layout>} />
        <Route path="/forgot-password" element={<Layout hideFooter><ForgotPassword onShowToast={toast.addToast} /></Layout>} />

        {/* Protected Pages - no navbar/footer */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout hideNavbar hideFooter>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </>
  );
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

            {/* Routes */}
            <AppRoutes />
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}