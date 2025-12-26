import React, { useState } from 'react';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppSelect } from '../../../components/app/ui';

interface AuditEvent {
    id: number;
    action: string;
    description: string;
    user: string;
    timestamp: string;
    type: 'user' | 'job' | 'billing' | 'settings' | 'login';
    ipAddress?: string;
}

const mockAuditEvents: AuditEvent[] = [
    { id: 1, action: 'User Invited', description: 'Invited casey@company.com as Technician', user: 'Taylor Wilson', timestamp: '5 min ago', type: 'user' },
    { id: 2, action: 'Job Created', description: 'Created job "HVAC Repair" for John Smith', user: 'Jordan Davis', timestamp: '15 min ago', type: 'job' },
    { id: 3, action: 'Login', description: 'Logged in from San Francisco, CA', user: 'Mike Thompson', timestamp: '1 hour ago', type: 'login', ipAddress: '192.168.1.100' },
    { id: 4, action: 'Settings Changed', description: 'Updated company timezone to Pacific Time', user: 'Taylor Wilson', timestamp: '2 hours ago', type: 'settings' },
    { id: 5, action: 'Payment Received', description: 'Invoice INV-2024-001 paid ($450)', user: 'System', timestamp: '3 hours ago', type: 'billing' },
    { id: 6, action: 'Job Completed', description: 'Completed job "Plumbing Install" for Sarah Johnson', user: 'Alex Rodriguez', timestamp: '4 hours ago', type: 'job' },
    { id: 7, action: 'Role Changed', description: 'Changed Jordan Davis role to Dispatcher', user: 'Taylor Wilson', timestamp: 'Yesterday', type: 'user' },
    { id: 8, action: 'Login', description: 'Logged in from Oakland, CA', user: 'Sam Kim', timestamp: 'Yesterday', type: 'login', ipAddress: '192.168.1.101' },
];

const AdminAuditLog: React.FC = () => {
    const [filterType, setFilterType] = useState<string>('all');
    const [filterUser, setFilterUser] = useState<string>('all');

    const filteredEvents = mockAuditEvents.filter(event => {
        const matchesType = filterType === 'all' || event.type === filterType;
        const matchesUser = filterUser === 'all' || event.user === filterUser;
        return matchesType && matchesUser;
    });

    const typeIcons: Record<string, { icon: string; color: string }> = {
        user: { icon: 'fa-user', color: 'purple' },
        job: { icon: 'fa-briefcase', color: 'blue' },
        billing: { icon: 'fa-dollar-sign', color: 'emerald' },
        settings: { icon: 'fa-gear', color: 'zinc' },
        login: { icon: 'fa-right-to-bracket', color: 'cyan' },
    };

    const uniqueUsers = [...new Set(mockAuditEvents.map(e => e.user))];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Audit Log</h1>
                    <p className="text-zinc-400">Track all activity and changes in your organization</p>
                </div>
                <AppButton variant="secondary" icon="fa-download">
                    Export Log
                </AppButton>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-1 p-1 rounded-xl bg-zinc-900/50 border border-white/[0.06]">
                    {[
                        { key: 'all', label: 'All' },
                        { key: 'user', label: 'Users' },
                        { key: 'job', label: 'Jobs' },
                        { key: 'billing', label: 'Billing' },
                        { key: 'login', label: 'Logins' },
                    ].map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilterType(f.key)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === f.key ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-white text-sm focus:outline-none focus:border-white/20"
                >
                    <option value="all">All Users</option>
                    {uniqueUsers.map((user) => (
                        <option key={user} value={user}>{user}</option>
                    ))}
                </select>
            </div>

            {/* Audit Timeline */}
            <AppCard>
                <div className="divide-y divide-white/[0.04]">
                    {filteredEvents.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
                                <i className="fa-solid fa-clock-rotate-left text-2xl text-zinc-500" />
                            </div>
                            <p className="text-zinc-400">No events match your filters</p>
                        </div>
                    ) : (
                        filteredEvents.map((event, index) => (
                            <div key={event.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-${typeIcons[event.type].color}-500/10 border border-${typeIcons[event.type].color}-500/20 flex items-center justify-center shrink-0`}>
                                        <i className={`fa-solid ${typeIcons[event.type].icon} text-${typeIcons[event.type].color}-400`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white font-medium">{event.action}</span>
                                            <AppBadge variant="neutral" size="sm">{event.type}</AppBadge>
                                        </div>
                                        <p className="text-sm text-zinc-400 mb-2">{event.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                                            <span className="flex items-center gap-1.5">
                                                <i className="fa-solid fa-user" />
                                                {event.user}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <i className="fa-solid fa-clock" />
                                                {event.timestamp}
                                            </span>
                                            {event.ipAddress && (
                                                <span className="flex items-center gap-1.5">
                                                    <i className="fa-solid fa-globe" />
                                                    {event.ipAddress}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </AppCard>

            {/* Load More */}
            <div className="text-center">
                <AppButton variant="secondary">
                    Load More Events
                </AppButton>
            </div>
        </div>
    );
};

export default AdminAuditLog;
