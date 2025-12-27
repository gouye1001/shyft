import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge } from '../../components/app/ui';
import mockDb from '../../services/mockDb';
import { useDashboardStats, useRecentJobs, useNotifications, useCustomers } from '../../hooks/useMockData';

/**
 * AppDashboard - Main dashboard with INSTANT REACTIVITY via useMockData hooks
 * Data updates immediately when changes are made anywhere in the app
 */
const AppDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    // All data uses subscription-based hooks for instant updates
    const stats = useDashboardStats();
    const recentJobs = useRecentJobs(5);
    const notifications = useNotifications();
    const customers = useCustomers();

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const greeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const statusBadgeVariant = (status: string) => {
        switch (status) {
            case 'in-progress': return 'info';
            case 'scheduled': return 'warning';
            case 'completed': return 'success';
            default: return 'neutral';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
        return `${Math.floor(diffMins / 1440)}d ago`;
    };

    // Dynamic contextual suggestions based on actual data
    const todayJobsCount = stats.todayJobs || 0;
    const availableTeam = stats.totalTechnicians - stats.onFieldTeam;

    const contextualActions = [
        todayJobsCount > 0 && {
            label: `${todayJobsCount} jobs today`,
            icon: 'fa-calendar-check',
            color: 'blue',
            description: 'View today\'s schedule',
            path: '/schedule',
            priority: 1,
        },
        availableTeam > 0 && {
            label: `${availableTeam} techs available`,
            icon: 'fa-user-check',
            color: 'emerald',
            description: 'Assign to new jobs',
            path: '/team',
            priority: 3,
        },
        {
            label: 'Create job',
            icon: 'fa-plus',
            color: 'purple',
            description: 'Start new service job',
            path: '/jobs',
            priority: 4,
        },
    ].filter(Boolean) as Array<{ label: string; icon: string; color: string; description: string; path: string; priority: number }>;

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {greeting()}, {user?.name?.split(' ')[0] || 'there'}
                    </h1>
                    <p className="text-zinc-400">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="flex gap-3">
                    <AppButton variant="secondary" icon="fa-bell" onClick={() => navigate('/notifications')}>
                        <span className="relative">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-3 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </span>
                    </AppButton>
                    <AppButton variant="primary" icon="fa-plus" onClick={() => navigate('/jobs')}>
                        New Job
                    </AppButton>
                </div>
            </div>

            {/* Stats Grid - INSTANT UPDATES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AppCard padding="md" className="hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <i className="fa-solid fa-dollar-sign text-emerald-400" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-lg text-emerald-400 bg-emerald-500/10">
                            Live
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                        {formatCurrency(stats.totalRevenue)}
                    </div>
                    <div className="text-sm text-zinc-500">Total Revenue</div>
                </AppCard>

                <AppCard padding="md" className="hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <i className="fa-solid fa-briefcase text-blue-400" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-lg text-blue-400 bg-blue-500/10">
                            {stats.todayJobs} today
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                        {stats.activeJobs}
                    </div>
                    <div className="text-sm text-zinc-500">Active Jobs</div>
                </AppCard>

                <AppCard padding="md" className="hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <i className="fa-solid fa-users text-purple-400" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                        {stats.onFieldTeam}/{stats.totalTechnicians}
                    </div>
                    <div className="text-sm text-zinc-500">Team On Field</div>
                </AppCard>

                <AppCard padding="md" className="hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <i className="fa-solid fa-chart-simple text-cyan-400" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                        {formatCurrency(stats.avgJobValue)}
                    </div>
                    <div className="text-sm text-zinc-500">Avg Job Value</div>
                </AppCard>
            </div>

            {/* Quick Actions */}
            <AppCard>
                <AppCardHeader>
                    <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
                </AppCardHeader>
                <AppCardContent className="p-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {contextualActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => navigate(action.path)}
                                className={`p-4 rounded-xl bg-${action.color}-500/5 border border-${action.color}-500/10 hover:bg-${action.color}-500/10 hover:border-${action.color}-500/20 transition-all text-left group`}
                            >
                                <div className={`w-10 h-10 rounded-xl bg-${action.color}-500/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                                    <i className={`fa-solid ${action.icon} text-${action.color}-400`} />
                                </div>
                                <div className="text-sm font-medium text-white mb-0.5">{action.label}</div>
                                <div className="text-xs text-zinc-500">{action.description}</div>
                            </button>
                        ))}
                    </div>
                </AppCardContent>
            </AppCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Jobs - INSTANT UPDATES */}
                <AppCard className="lg:col-span-2">
                    <AppCardHeader
                        action={
                            <AppButton variant="ghost" size="sm" icon="fa-arrow-right" iconPosition="right" onClick={() => navigate('/jobs')}>
                                View all
                            </AppButton>
                        }
                    >
                        <i className="fa-solid fa-briefcase text-zinc-400" />
                        <h2 className="text-lg font-semibold text-white">Recent Jobs</h2>
                    </AppCardHeader>
                    <div className="divide-y divide-white/[0.04]">
                        {recentJobs.length === 0 ? (
                            <div className="px-6 py-8 text-center text-zinc-500">
                                <i className="fa-solid fa-briefcase text-2xl mb-2" />
                                <p>No jobs yet. Create your first job!</p>
                            </div>
                        ) : (
                            recentJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="px-6 py-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                                    onClick={() => navigate('/jobs')}
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800/50 border border-white/[0.06] flex items-center justify-center shrink-0">
                                            <i className="fa-solid fa-briefcase text-zinc-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-white font-medium truncate">{job.title}</div>
                                            <div className="text-sm text-zinc-500 truncate">{job.customerName} • {job.assigneeName}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <AppBadge variant={statusBadgeVariant(job.status)} size="sm">
                                            {job.status.replace('-', ' ')}
                                        </AppBadge>
                                        <span className="text-emerald-400 font-medium text-sm">
                                            ${job.amount}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </AppCard>

                {/* Notifications - INSTANT UPDATES */}
                <AppCard>
                    <AppCardHeader
                        action={
                            <button
                                className="text-xs text-zinc-500 hover:text-white transition-colors"
                                onClick={() => mockDb.markAllNotificationsRead()}
                            >
                                Mark all read
                            </button>
                        }
                    >
                        <i className="fa-solid fa-bell text-zinc-400" />
                        <h2 className="text-lg font-semibold text-white">Notifications</h2>
                    </AppCardHeader>
                    <div className="divide-y divide-white/[0.04]">
                        {notifications.slice(0, 5).length === 0 ? (
                            <div className="px-6 py-8 text-center text-zinc-500">
                                <i className="fa-solid fa-bell text-2xl mb-2" />
                                <p>No notifications</p>
                            </div>
                        ) : (
                            notifications.slice(0, 5).map((notif) => (
                                <div key={notif.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notif.type === 'payment' ? 'bg-emerald-500/10 text-emerald-400' :
                                            notif.type === 'job' ? 'bg-blue-500/10 text-blue-400' :
                                                notif.type === 'team' ? 'bg-purple-500/10 text-purple-400' :
                                                    'bg-zinc-500/10 text-zinc-400'
                                            }`}>
                                            <i className={`fa-solid ${notif.type === 'payment' ? 'fa-dollar-sign' :
                                                notif.type === 'job' ? 'fa-briefcase' :
                                                    notif.type === 'team' ? 'fa-users' :
                                                        'fa-bell'
                                                } text-sm`} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm ${notif.read ? 'text-zinc-400' : 'text-zinc-300'}`}>
                                                    {notif.message}
                                                </span>
                                                {!notif.read && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                                )}
                                            </div>
                                            <div className="text-xs text-zinc-500 mt-1">
                                                {formatRelativeTime(notif.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </AppCard>
            </div>

            {/* Business Summary Card */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-chart-line text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Business Summary</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">
                                {stats.totalJobs}
                            </div>
                            <div className="text-sm text-zinc-500">Total Jobs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-400 mb-1">
                                {stats.completedJobs}
                            </div>
                            <div className="text-sm text-zinc-500">Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">
                                {formatCurrency(stats.paidRevenue)}
                            </div>
                            <div className="text-sm text-zinc-500">Paid</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-1">
                                {formatCurrency(stats.pendingRevenue)}
                            </div>
                            <div className="text-sm text-zinc-500">Pending</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">
                                {customers.length}
                            </div>
                            <div className="text-sm text-zinc-500">Customers</div>
                        </div>
                    </div>
                </AppCardContent>
            </AppCard>
        </div>
    );
};

export default AppDashboard;
