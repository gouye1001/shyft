import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'dispatcher' | 'technician';
    adminOnly?: boolean;
}

/**
 * ProtectedRoute - Role-based access control wrapper
 * 
 * Usage:
 * - <ProtectedRoute>{children}</ProtectedRoute> - Requires authentication
 * - <ProtectedRoute adminOnly>{children}</ProtectedRoute> - Requires admin role
 * - <ProtectedRoute requiredRole="dispatcher">{children}</ProtectedRoute> - Requires specific role
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
    adminOnly = false,
}) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading state
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

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Get user role with fallback
    const userRole = user?.role || 'technician';

    // Check admin-only routes
    if (adminOnly && userRole !== 'admin' && userRole !== 'owner') {
        console.warn(`[ProtectedRoute] User ${user?.email} (${userRole}) tried to access admin-only route: ${location.pathname}`);
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                        <i className="fa-solid fa-shield-halved text-3xl text-red-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-zinc-400 mb-6">
                        You don't have permission to access this page. Admin privileges are required.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Check required role
    if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
        console.warn(`[ProtectedRoute] User ${user?.email} (${userRole}) tried to access route requiring ${requiredRole}: ${location.pathname}`);
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                        <i className="fa-solid fa-lock text-3xl text-yellow-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Restricted Access</h1>
                    <p className="text-zinc-400 mb-6">
                        This page requires {requiredRole} privileges. Your current role is {userRole}.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
