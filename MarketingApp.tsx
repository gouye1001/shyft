import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Enterprise from './pages/Enterprise';
import Help from './pages/Help';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import VerifySuccess from './pages/VerifySuccess';
import Solutions from './pages/Solutions';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useToast } from './components/Toast';

// Auth
import { useAuth } from './src/context/AuthContext';

// Layout for marketing pages
const MarketingLayout: React.FC<{ children: React.ReactNode; hideNavbar?: boolean; hideFooter?: boolean }> = ({
    children,
    hideNavbar,
    hideFooter
}) => (
    <>
        {!hideNavbar && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!hideFooter && <Footer />}
    </>
);

/**
 * GuestOnlyRoute - Redirects authenticated users to /dashboard
 * Uses React Router Navigate instead of window.location
 */
const GuestOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading while checking auth
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

    // Redirect authenticated users to dashboard (SPA navigation, no reload)
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

/**
 * MarketingApp - Public marketing site
 * Contains: Home, Product, Pricing, About, Contact, Login, Signup
 * 
 * NO subdomain redirects - pure SPA mode
 */
const MarketingApp: React.FC = () => {
    const toast = useToast();

    return (
        <Routes>
            {/* Public Pages - Anyone can access */}
            <Route path="/" element={<MarketingLayout><Home /></MarketingLayout>} />
            <Route path="/product" element={<MarketingLayout><Product /></MarketingLayout>} />
            <Route path="/features" element={<MarketingLayout><Features /></MarketingLayout>} />
            <Route path="/pricing" element={<MarketingLayout><Pricing /></MarketingLayout>} />
            <Route path="/about" element={<MarketingLayout><About /></MarketingLayout>} />
            <Route path="/solutions" element={<MarketingLayout><Solutions /></MarketingLayout>} />
            <Route path="/contact" element={<MarketingLayout><Contact onShowToast={toast.addToast} /></MarketingLayout>} />
            <Route path="/enterprise" element={<MarketingLayout><Enterprise onShowToast={toast.addToast} /></MarketingLayout>} />
            <Route path="/help" element={<MarketingLayout><Help /></MarketingLayout>} />
            <Route path="/terms" element={<MarketingLayout><Terms /></MarketingLayout>} />
            <Route path="/privacy" element={<MarketingLayout><Privacy /></MarketingLayout>} />

            {/* Auth Pages - Redirect to dashboard if already authenticated */}
            <Route path="/login" element={
                <GuestOnlyRoute>
                    <MarketingLayout hideFooter><Login onShowToast={toast.addToast} /></MarketingLayout>
                </GuestOnlyRoute>
            } />
            <Route path="/signup" element={
                <GuestOnlyRoute>
                    <MarketingLayout hideFooter><Signup onShowToast={toast.addToast} /></MarketingLayout>
                </GuestOnlyRoute>
            } />
            <Route path="/forgot-password" element={
                <GuestOnlyRoute>
                    <MarketingLayout hideFooter><ForgotPassword onShowToast={toast.addToast} /></MarketingLayout>
                </GuestOnlyRoute>
            } />

            {/* Verify Success */}
            <Route path="/verify-success" element={<MarketingLayout hideNavbar hideFooter><VerifySuccess /></MarketingLayout>} />

            {/* 404 */}
            <Route path="*" element={<MarketingLayout><NotFound /></MarketingLayout>} />
        </Routes>
    );
};

export default MarketingApp;
