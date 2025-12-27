import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMarketingUrl } from '../../hooks/useSubdomain';

// Grouped navigation structure for better UX
const navGroups = {
    core: [
        { path: '/', label: 'Dashboard', icon: 'fa-gauge-high' },
    ],
    operations: [
        { path: '/jobs', label: 'Jobs', icon: 'fa-briefcase' },
        { path: '/schedule', label: 'Schedule', icon: 'fa-calendar-days' },
        { path: '/customers', label: 'Customers', icon: 'fa-users-rectangle' },
        { path: '/team', label: 'Team', icon: 'fa-users' },
    ],
    finance: [
        { path: '/invoices', label: 'Invoices', icon: 'fa-file-invoice-dollar' },
        { path: '/analytics', label: 'Analytics', icon: 'fa-chart-line' },
    ],
    admin: [
        { path: '/admin/users', label: 'Users', icon: 'fa-user-gear' },
        { path: '/admin/company', label: 'Company', icon: 'fa-building' },
        { path: '/admin/billing', label: 'Billing', icon: 'fa-credit-card' },
        { path: '/admin/audit', label: 'Audit Log', icon: 'fa-clock-rotate-left' },
    ],
};

const bottomNavItems = [
    { path: '/notifications', label: 'Notifications', icon: 'fa-bell' },
    { path: '/settings', label: 'Settings', icon: 'fa-gear' },
    { path: '/help', label: 'Help', icon: 'fa-circle-question' },
];

/**
 * AppLayout - Main layout for authenticated app (app.shyft.io)
 * Features sidebar navigation with admin section, user menu, and content area
 */
const AppLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        window.location.href = getMarketingUrl();
    };

    // Check if user is admin (for showing admin section)
    const isAdmin = user?.role === 'admin' || user?.role === 'owner' || true; // Default to true for demo

    const NavItem: React.FC<{ item: { path: string; label: string; icon: string }; end?: boolean }> = ({ item, end }) => (
        <NavLink
            to={item.path}
            end={end}
            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm
                ${isActive
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }
            `}
        >
            <i className={`fa-solid ${item.icon} w-5 text-center`} />
            {!sidebarCollapsed && <span>{item.label}</span>}
        </NavLink>
    );

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className={`${sidebarCollapsed ? 'w-[72px]' : 'w-64'} bg-zinc-950 border-r border-white/[0.06] flex flex-col transition-all duration-300 relative shrink-0`}>
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-bolt text-white text-sm" />
                        </div>
                        {!sidebarCollapsed && (
                            <span className="font-bold text-white text-lg tracking-tight">Shyft</span>
                        )}
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {/* Core - Dashboard */}
                    {navGroups.core.map((item) => (
                        <NavItem key={item.path} item={item} end={item.path === '/'} />
                    ))}

                    {/* Operations Section */}
                    <div className={`pt-4 pb-2 ${sidebarCollapsed ? 'px-0' : 'px-3'}`}>
                        {sidebarCollapsed ? (
                            <div className="w-full h-px bg-white/[0.06]" />
                        ) : (
                            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Operations</span>
                        )}
                    </div>
                    {navGroups.operations.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}

                    {/* Finance Section */}
                    <div className={`pt-4 pb-2 ${sidebarCollapsed ? 'px-0' : 'px-3'}`}>
                        {sidebarCollapsed ? (
                            <div className="w-full h-px bg-white/[0.06]" />
                        ) : (
                            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Finance</span>
                        )}
                    </div>
                    {navGroups.finance.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}

                    {/* Admin Section */}
                    {isAdmin && (
                        <>
                            <div className={`pt-4 pb-2 ${sidebarCollapsed ? 'px-0' : 'px-3'}`}>
                                {sidebarCollapsed ? (
                                    <div className="w-full h-px bg-white/[0.06]" />
                                ) : (
                                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Admin</span>
                                )}
                            </div>
                            {navGroups.admin.map((item) => (
                                <NavItem key={item.path} item={item} />
                            ))}
                        </>
                    )}
                </nav>

                {/* Bottom Navigation */}
                <div className="py-3 px-3 border-t border-white/[0.06] space-y-1">
                    {bottomNavItems.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}
                </div>

                {/* User Section */}
                <div className="p-3 border-t border-white/[0.06]">
                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                {(user?.name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                            </div>
                            {!sidebarCollapsed && (
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="text-sm text-white font-medium truncate">
                                        {user?.name || 'User'}
                                    </div>
                                    <div className="text-xs text-zinc-500 truncate">
                                        {user?.subscriptionTier || 'Free Plan'}
                                    </div>
                                </div>
                            )}
                            {!sidebarCollapsed && (
                                <i className={`fa-solid fa-chevron-up text-zinc-500 text-xs transition-transform ${userMenuOpen ? '' : 'rotate-180'}`} />
                            )}
                        </button>

                        {/* User Dropdown */}
                        {userMenuOpen && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                                <div className="px-4 py-3 border-b border-white/[0.06]">
                                    <div className="text-sm text-white font-medium">{user?.name}</div>
                                    <div className="text-xs text-zinc-500">{user?.email}</div>
                                </div>
                                <button
                                    onClick={() => { navigate('/settings'); setUserMenuOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
                                >
                                    <i className="fa-solid fa-gear w-4" />
                                    Account Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors border-t border-white/[0.06]"
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
                    className="absolute top-5 -right-3 w-6 h-6 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors z-10"
                >
                    <i className={`fa-solid ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-[10px]`} />
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-black">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
