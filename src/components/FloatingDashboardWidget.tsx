import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * FloatingDashboardWidget - Shows a floating "Back to Dashboard" button
 * for authenticated users on marketing pages
 */
const FloatingDashboardWidget: React.FC = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
            <Link
                to="/dashboard"
                className="group flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50 hover:bg-zinc-800 transition-all"
            >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {(user?.name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                </div>

                {/* Text */}
                <div className="text-left">
                    <div className="text-xs text-zinc-400">Logged in as</div>
                    <div className="text-sm text-white font-medium truncate max-w-[120px]">
                        {user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}
                    </div>
                </div>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors ml-1">
                    <i className="fa-solid fa-arrow-right text-white text-xs" />
                </div>
            </Link>
        </div>
    );
};

export default FloatingDashboardWidget;
