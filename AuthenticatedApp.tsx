import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// App Layout Components
import AppLayout from './components/app/AppLayout';

// App Pages
import AppDashboard from './pages/app/Dashboard';
import AppJobs from './pages/app/Jobs';
import AppTeam from './pages/app/Team';
import AppSchedule from './pages/app/Schedule';
import AppInvoices from './pages/app/Invoices';
import AppAnalytics from './pages/app/Analytics';
import AppSettings from './pages/app/Settings';
import AppHelp from './pages/app/Help';

// Auth
import { useAuth } from './src/context/AuthContext';
import { getMarketingUrl } from './src/hooks/useSubdomain';

/**
 * AuthenticatedApp - Protected app (app.shyft.io)
 * Contains: Dashboard, Jobs, Team, Schedule, Settings, Help
 * 
 * If user is not authenticated, redirects to marketing site login
 */
const AuthenticatedApp: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [isCapturingTokens, setIsCapturingTokens] = useState(() => {
        // Check if we have tokens in URL that need to be captured
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.has('access_token') && urlParams.has('refresh_token');
    });

    // Wait for token capture to complete
    useEffect(() => {
        if (isCapturingTokens && !isLoading) {
            // AuthContext has finished processing, tokens should be captured now
            setIsCapturingTokens(false);
        }
    }, [isLoading, isCapturingTokens]);

    // Show loading state while checking auth or capturing tokens from URL
    if (isLoading || isCapturingTokens) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex items-center gap-3 text-zinc-400">
                    <i className="fa-solid fa-spinner fa-spin text-xl" />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    // Redirect to marketing site login if not authenticated
    if (!isAuthenticated) {
        const loginUrl = `${getMarketingUrl()}/login`;
        window.location.href = loginUrl;
        return null;
    }

    return (
        <Routes>
            {/* All routes wrapped in AppLayout */}
            <Route element={<AppLayout />}>
                <Route index element={<AppDashboard />} />
                <Route path="jobs" element={<AppJobs />} />
                <Route path="team" element={<AppTeam />} />
                <Route path="schedule" element={<AppSchedule />} />
                <Route path="invoices" element={<AppInvoices />} />
                <Route path="analytics" element={<AppAnalytics />} />
                <Route path="settings" element={<AppSettings />} />
                <Route path="help" element={<AppHelp />} />
            </Route>

            {/* Catch-all redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AuthenticatedApp;

