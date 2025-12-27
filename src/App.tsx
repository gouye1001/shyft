import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/app/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';

// Public Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Enterprise from './pages/Enterprise';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

// App Pages
import AppDashboard from './pages/app/Dashboard';
import AppJobs from './pages/app/Jobs';
import AppSchedule from './pages/app/Schedule';
import AppCustomers from './pages/app/Customers';
import AppInvoices from './pages/app/Invoices';
import AppTeam from './pages/app/Team';
import AppSettings from './pages/app/Settings';
import AppNotifications from './pages/app/Notifications';
import AppAnalytics from './pages/app/Analytics';

// ============================================
// Scroll To Top Component
// ============================================

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// ============================================
// Layout Wrappers
// ============================================

// Marketing Layout (Navbar + Content + Footer)
const MarketingLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

// ============================================
// Main Routes
// ============================================

const AppRoutes: React.FC = () => {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* ----------------------------------------------------------------- */}
                {/* PUBLIC ROUTES (Accessible to Everyone)                            */}
                {/* ----------------------------------------------------------------- */}
                <Route element={<MarketingLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/enterprise" element={<Enterprise />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/help" element={<Help />} />

                    {/* Auth Pages (Only if NOT authenticated, otherwise redirect) */}
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
                    <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />
                </Route>

                {/* ----------------------------------------------------------------- */}
                {/* PROTECTED APP ROUTES (Requires Auth)                              */}
                {/* ----------------------------------------------------------------- */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }>
                    <Route path="dashboard/*" element={<AppDashboard />} />
                    <Route path="jobs/*" element={<AppJobs />} />
                    <Route path="schedule/*" element={<AppSchedule />} />
                    <Route path="customers/*" element={<AppCustomers />} />
                    <Route path="invoices/*" element={<AppInvoices />} />
                    <Route path="team/*" element={<AppTeam />} />
                    <Route path="settings/*" element={<AppSettings />} />
                    <Route path="notifications/*" element={<AppNotifications />} />
                    <Route path="analytics/*" element={<AppAnalytics />} />
                </Route>

                {/* ----------------------------------------------------------------- */}
                {/* FALLBACK (404)                                                    */}
                {/* ----------------------------------------------------------------- */}
                <Route path="*" element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <NotFound />
                } />
            </Routes>
        </>
    );
};

// ============================================
// Root App Component
// ============================================

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
};

export default App;
