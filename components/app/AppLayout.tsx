import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext';
import { getMarketingUrl } from '../../src/hooks/useSubdomain';

const navItems = [
    { path: '/', label: 'Dashboard', icon: 'fa-gauge-high' },
    { path: '/jobs', label: 'Jobs', icon: 'fa-briefcase' },
    { path: '/team', label: 'Team', icon: 'fa-users' },
    { path: '/schedule', label: 'Schedule', icon: 'fa-calendar-days' },
    { path: '/invoices', label: 'Invoices', icon: 'fa-file-invoice-dollar' },
    { path: '/analytics', label: 'Analytics', icon: 'fa-chart-line' },
];

const bottomNavItems = [
    { path: '/settings', label: 'Settings', icon: 'fa-gear' },
    { path: '/help', label: 'Help', icon: 'fa-circle-question' },
];

/**
 * AppLayout - Main layout for authenticated app (app.shyft.io)
 * Features sidebar navigation, user menu, and content area
 */
const AppLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        // Redirect to marketing site after logout
        window.location.href = getMarketingUrl();
    };

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-zinc-950 border-r border-white/5 flex flex-col transition-all duration-300`}>
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <i className="fa-solid fa-bolt text-white text-sm" />
                        </div>
                        {!sidebarCollapsed && (
                            <span className="font-bold text-white text-lg">Shyft</span>
                        )}
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 py-4 px-2 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                                ${isActive
                                    ? 'bg-white/10 text-white font-medium'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            <i className={`fa-solid ${item.icon} w-5 text-center`} />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Navigation */}
                <div className="py-4 px-2 border-t border-white/5 space-y-1">
                    {bottomNavItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                                ${isActive
                                    ? 'bg-white/10 text-white font-medium'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            <i className={`fa-solid ${item.icon} w-5 text-center`} />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </div>

                {/* User Section */}
                <div className="p-3 border-t border-white/5">
                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                {(user?.name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                            </div>
                            {!sidebarCollapsed && (
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="text-sm text-white font-medium truncate">
                                        {user?.name || 'User'}
                                    </div>
                                    <div className="text-xs text-zinc-500 truncate">
                                        {user?.email}
                                    </div>
                                </div>
                            )}
                            {!sidebarCollapsed && (
                                <i className={`fa-solid fa-chevron-up text-zinc-500 text-xs transition-transform ${userMenuOpen ? '' : 'rotate-180'}`} />
                            )}
                        </button>

                        {/* User Dropdown */}
                        {userMenuOpen && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden">
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
                                >
                                    <i className="fa-solid fa-gear w-4" />
                                    Account Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors border-t border-white/5"
                                >
                                    <i className="fa-solid fa-right-from-bracket w-4" />
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="absolute top-4 -right-3 w-6 h-6 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                    <i className={`fa-solid ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-xs`} />
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
