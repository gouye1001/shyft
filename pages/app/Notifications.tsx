import React, { useState } from 'react';
import { AppCard, AppButton, AppBadge } from '../../components/app/ui';
import mockDb, { Notification } from '../../src/services/mockDb';
import { useNotifications } from '../../src/hooks/useMockData';

/**
 * AppNotifications - Notification center with instant reactivity
 * Features: Mark as read, delete, filter by type
 */
const AppNotifications: React.FC = () => {
    // Use subscription hook for instant updates
    const notifications = useNotifications();

    const [filter, setFilter] = useState<'all' | 'unread' | 'job' | 'payment' | 'team'>('all');

    // Filter notifications
    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notif.read;
        return notif.type === filter;
    });

    const typeBadgeVariant = (type: string) => {
        switch (type) {
            case 'payment': return 'success';
            case 'job': return 'info';
            case 'team': return 'purple';
            default: return 'neutral';
        }
    };

    const typeIcon = (type: string) => {
        switch (type) {
            case 'payment': return 'fa-dollar-sign';
            case 'job': return 'fa-briefcase';
            case 'team': return 'fa-users';
            default: return 'fa-bell';
        }
    };

    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
        if (diffMins < 10080) return `${Math.floor(diffMins / 1440)}d ago`;
        return date.toLocaleDateString();
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id: string) => {
        mockDb.markNotificationRead(id);
    };

    const handleMarkAllAsRead = () => {
        mockDb.markAllNotificationsRead();
    };

    const handleDelete = (id: string) => {
        mockDb.deleteNotification(id);
    };

    const filterCounts = {
        all: notifications.length,
        unread: notifications.filter(n => !n.read).length,
        job: notifications.filter(n => n.type === 'job').length,
        payment: notifications.filter(n => n.type === 'payment').length,
        team: notifications.filter(n => n.type === 'team').length,
    };

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Notifications</h1>
                    <p className="text-zinc-400">
                        {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
                    </p>
                </div>
                <div className="flex gap-3">
                    {unreadCount > 0 && (
                        <AppButton variant="secondary" icon="fa-check-double" onClick={handleMarkAllAsRead}>
                            Mark all read
                        </AppButton>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-1 p-1 rounded-xl bg-zinc-900/50 border border-white/[0.06] w-fit flex-wrap">
                {[
                    { key: 'all', label: 'All', icon: 'fa-inbox' },
                    { key: 'unread', label: 'Unread', icon: 'fa-circle-dot' },
                    { key: 'job', label: 'Jobs', icon: 'fa-briefcase' },
                    { key: 'payment', label: 'Payments', icon: 'fa-dollar-sign' },
                    { key: 'team', label: 'Team', icon: 'fa-users' },
                ].map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key as typeof filter)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === f.key ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        <i className={`fa-solid ${f.icon} text-xs`} />
                        {f.label}
                        <span className={`text-xs px-1.5 py-0.5 rounded-md ${filter === f.key ? 'bg-white/10' : 'bg-zinc-800'}`}>
                            {filterCounts[f.key as keyof typeof filterCounts]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <AppCard>
                <div className="divide-y divide-white/[0.04]">
                    {filteredNotifications.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-800/50 border border-white/[0.06] flex items-center justify-center mb-4">
                                <i className="fa-solid fa-bell-slash text-2xl text-zinc-500" />
                            </div>
                            <h3 className="text-white font-medium mb-1">No notifications</h3>
                            <p className="text-zinc-500 text-sm">
                                {filter === 'unread' ? 'All caught up! No unread notifications.' : 'No notifications to display.'}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-5 hover:bg-white/[0.02] transition-colors flex items-start gap-4 ${!notif.read ? 'bg-white/[0.01]' : ''}`}
                            >
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.type === 'payment' ? 'bg-emerald-500/10 text-emerald-400' :
                                        notif.type === 'job' ? 'bg-blue-500/10 text-blue-400' :
                                            notif.type === 'team' ? 'bg-purple-500/10 text-purple-400' :
                                                'bg-zinc-500/10 text-zinc-400'
                                    }`}>
                                    <i className={`fa-solid ${typeIcon(notif.type)}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className={`font-medium ${notif.read ? 'text-zinc-400' : 'text-white'}`}>
                                                {notif.title}
                                            </h4>
                                            {!notif.read && (
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            )}
                                        </div>
                                        <span className="text-xs text-zinc-500 shrink-0">
                                            {formatRelativeTime(notif.createdAt)}
                                        </span>
                                    </div>
                                    <p className={`text-sm ${notif.read ? 'text-zinc-500' : 'text-zinc-300'}`}>
                                        {notif.message}
                                    </p>
                                    <div className="flex items-center gap-3 mt-3">
                                        <AppBadge variant={typeBadgeVariant(notif.type)} size="sm">
                                            {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                                        </AppBadge>
                                        {!notif.read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notif.id)}
                                                className="text-xs text-zinc-500 hover:text-white transition-colors"
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(notif.id)}
                                            className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </AppCard>
        </div>
    );
};

export default AppNotifications;
