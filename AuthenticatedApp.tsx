import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// App Layout Components
import AppLayout from './components/app/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// App Pages
import AppDashboard from './pages/app/Dashboard';
import AppJobs from './pages/app/Jobs';
import AppCustomers from './pages/app/Customers';
import AppTeam from './pages/app/Team';
import AppSchedule from './pages/app/Schedule';
import AppInvoices from './pages/app/Invoices';
import AppAnalytics from './pages/app/Analytics';
import AppNotifications from './pages/app/Notifications';
import AppSettings from './pages/app/Settings';
import AppHelp from './pages/app/Help';

// Admin Pages
import AdminUsers from './pages/app/admin/Users';
import AdminCompany from './pages/app/admin/Company';
import AdminBilling from './pages/app/admin/Billing';
import AdminAuditLog from './pages/app/admin/AuditLog';

// Auth
import { useAuth } from './src/context/AuthContext';

/**
 * AuthenticatedApp - Protected app routes
 * NO subdomain redirects - uses React Router Navigate for SPA navigation
 * 
 * If user is not authenticated, App.tsx handles the redirect
 */
const AuthenticatedApp: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

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

    // Redirect to login if not authenticated (SPA navigation)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Routes>
            {/* All routes wrapped in AppLayout */}
            <Route element={<AppLayout />}>
                {/* Main Pages - Available to all authenticated users */}
                <Route path="dashboard" element={<AppDashboard />} />
                <Route path="jobs" element={<AppJobs />} />
                <Route path="customers" element={<AppCustomers />} />
                <Route path="team" element={<AppTeam />} />
                <Route path="schedule" element={<AppSchedule />} />
                <Route path="invoices" element={<AppInvoices />} />
                <Route path="analytics" element={<AppAnalytics />} />

                {/* Utility Pages */}
                <Route path="notifications" element={<AppNotifications />} />
                <Route path="settings" element={<AppSettings />} />
                <Route path="help" element={<AppHelp />} />

                {/* Admin Pages - Protected by role check */}
                <Route
                    path="admin/users"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminUsers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin/company"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminCompany />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin/billing"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminBilling />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin/audit"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminAuditLog />
                        </ProtectedRoute>
                    }
                />

                {/* Index redirect to dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Catch-all redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};

export default AuthenticatedApp;
