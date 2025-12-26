import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/context/AuthContext';

/**
 * AppDashboard - Main dashboard for authenticated users
 * Shows overview, stats, recent jobs, and quick actions
 */
const AppDashboard: React.FC = () => {
    const { user } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());

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

    const stats = [
        { label: 'Revenue Today', value: '$2,340', change: '+12%', icon: 'fa-dollar-sign', color: 'emerald' },
        { label: 'Active Jobs', value: '4', icon: 'fa-briefcase', color: 'blue' },
        { label: 'Team On Field', value: '3/4', icon: 'fa-users', color: 'purple' },
        { label: 'Avg Response', value: '24min', change: '-8%', icon: 'fa-clock', color: 'cyan' },
    ];

    const recentJobs = [
        { id: 1, title: 'HVAC Repair', customer: 'John Smith', status: 'In Progress', time: '2:30 PM' },
        { id: 2, title: 'Plumbing Install', customer: 'Sarah Johnson', status: 'Scheduled', time: '4:00 PM' },
        { id: 3, title: 'Electrical Check', customer: 'Mike Williams', status: 'Completed', time: '11:00 AM' },
    ];

    const statusColors: Record<string, string> = {
        'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'Scheduled': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Completed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {greeting()}, {user?.name?.split(' ')[0] || 'there'}
                </h1>
                <p className="text-zinc-400">
                    {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                                <i className={`fa-solid ${stat.icon} text-${stat.color}-400`} />
                            </div>
                            {stat.change && (
                                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {stat.change}
                                </span>
                            )}
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-zinc-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'New Job', icon: 'fa-plus', color: 'blue' },
                    { label: 'Add Team Member', icon: 'fa-user-plus', color: 'purple' },
                    { label: 'Create Invoice', icon: 'fa-file-invoice', color: 'emerald' },
                    { label: 'View Reports', icon: 'fa-chart-bar', color: 'cyan' },
                ].map((action, i) => (
                    <button
                        key={i}
                        className={`p-4 rounded-xl bg-${action.color}-500/10 border border-${action.color}-500/20 hover:bg-${action.color}-500/20 transition-all text-center group`}
                    >
                        <i className={`fa-solid ${action.icon} text-${action.color}-400 text-lg mb-2 group-hover:scale-110 transition-transform block`} />
                        <span className="text-sm text-white font-medium">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Recent Jobs */}
            <div className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Recent Jobs</h2>
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        View all <i className="fa-solid fa-arrow-right ml-1 text-xs" />
                    </button>
                </div>
                <div className="divide-y divide-white/5">
                    {recentJobs.map((job) => (
                        <div key={job.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <i className="fa-solid fa-briefcase text-zinc-400" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">{job.title}</div>
                                    <div className="text-sm text-zinc-500">{job.customer}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                                    {job.status}
                                </span>
                                <span className="text-sm text-zinc-500">{job.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppDashboard;
