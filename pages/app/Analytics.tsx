import React, { useState } from 'react';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppSelect } from '../../components/app/ui';

const AppAnalytics: React.FC = () => {
    const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

    const stats = [
        { label: 'Total Revenue', value: '$24,580', change: '+18%', positive: true, icon: 'fa-dollar-sign', color: 'emerald' },
        { label: 'Jobs Completed', value: '127', change: '+12%', positive: true, icon: 'fa-check-circle', color: 'blue' },
        { label: 'Avg Job Value', value: '$193', change: '+5%', positive: true, icon: 'fa-chart-simple', color: 'purple' },
        { label: 'Customer Rating', value: '4.8', change: '+0.2', positive: true, icon: 'fa-star', color: 'yellow' },
    ];

    const topServices = [
        { name: 'HVAC Repair', jobs: 45, revenue: 8500, growth: 15 },
        { name: 'Plumbing', jobs: 38, revenue: 6200, growth: 8 },
        { name: 'Electrical', jobs: 24, revenue: 4800, growth: 22 },
        { name: 'AC Maintenance', jobs: 20, revenue: 3600, growth: -5 },
    ];

    const topTechnicians = [
        { name: 'Mike Thompson', jobs: 42, revenue: 9200, rating: 4.9 },
        { name: 'Alex Rodriguez', jobs: 38, revenue: 7800, rating: 4.7 },
        { name: 'Sam Kim', jobs: 47, revenue: 7580, rating: 4.8 },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Analytics</h1>
                    <p className="text-zinc-400">Track your business performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex p-1 rounded-xl bg-zinc-900/50 border border-white/[0.06]">
                        {[
                            { key: '7d', label: '7 Days' },
                            { key: '30d', label: '30 Days' },
                            { key: '90d', label: '90 Days' },
                            { key: '1y', label: '1 Year' },
                        ].map((p) => (
                            <button
                                key={p.key}
                                onClick={() => setPeriod(p.key as typeof period)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${period === p.key ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                    <AppButton variant="secondary" icon="fa-download">
                        Export
                    </AppButton>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <AppCard key={i} padding="md">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                                <i className={`fa-solid ${stat.icon} text-${stat.color}-400`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-lg ${stat.positive ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-zinc-500">{stat.label}</div>
                    </AppCard>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <AppCard>
                    <AppCardHeader
                        action={
                            <AppButton variant="ghost" size="sm" icon="fa-expand">
                                Expand
                            </AppButton>
                        }
                    >
                        <i className="fa-solid fa-chart-line text-zinc-400" />
                        <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
                    </AppCardHeader>
                    <AppCardContent>
                        <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                            <div className="text-center">
                                <i className="fa-solid fa-chart-area text-4xl text-zinc-600 mb-3" />
                                <p className="text-zinc-500">Revenue chart visualization</p>
                                <p className="text-xs text-zinc-600 mt-1">Coming with chart library integration</p>
                            </div>
                        </div>
                    </AppCardContent>
                </AppCard>

                {/* Jobs Chart */}
                <AppCard>
                    <AppCardHeader
                        action={
                            <AppButton variant="ghost" size="sm" icon="fa-expand">
                                Expand
                            </AppButton>
                        }
                    >
                        <i className="fa-solid fa-briefcase text-zinc-400" />
                        <h3 className="text-lg font-semibold text-white">Jobs Overview</h3>
                    </AppCardHeader>
                    <AppCardContent>
                        <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                            <div className="text-center">
                                <i className="fa-solid fa-chart-pie text-4xl text-zinc-600 mb-3" />
                                <p className="text-zinc-500">Jobs breakdown by status</p>
                                <p className="text-xs text-zinc-600 mt-1">Coming with chart library integration</p>
                            </div>
                        </div>
                    </AppCardContent>
                </AppCard>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Services */}
                <AppCard>
                    <AppCardHeader>
                        <i className="fa-solid fa-wrench text-zinc-400" />
                        <h3 className="text-lg font-semibold text-white">Top Services</h3>
                    </AppCardHeader>
                    <div className="divide-y divide-white/[0.04]">
                        {topServices.map((service, i) => (
                            <div key={service.name} className="px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm text-zinc-400 font-medium">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{service.name}</div>
                                        <div className="text-sm text-zinc-500">{service.jobs} jobs</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-medium">${service.revenue.toLocaleString()}</div>
                                    <div className={`text-sm ${service.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {service.growth >= 0 ? '+' : ''}{service.growth}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AppCard>

                {/* Top Technicians */}
                <AppCard>
                    <AppCardHeader>
                        <i className="fa-solid fa-users text-zinc-400" />
                        <h3 className="text-lg font-semibold text-white">Top Technicians</h3>
                    </AppCardHeader>
                    <div className="divide-y divide-white/[0.04]">
                        {topTechnicians.map((tech, i) => (
                            <div key={tech.name} className="px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm text-white font-bold">
                                        {tech.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{tech.name}</div>
                                        <div className="text-sm text-zinc-500">{tech.jobs} jobs completed</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-medium">${tech.revenue.toLocaleString()}</div>
                                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                                        <i className="fa-solid fa-star text-xs" />
                                        {tech.rating}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AppCard>
            </div>
        </div>
    );
};

export default AppAnalytics;
