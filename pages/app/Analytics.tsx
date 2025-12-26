import React from 'react';

const AppAnalytics: React.FC = () => {
    const metrics = [
        { label: 'Total Revenue', value: '$24,560', change: '+18%', trend: 'up' },
        { label: 'Jobs Completed', value: '156', change: '+12%', trend: 'up' },
        { label: 'Avg Job Value', value: '$157', change: '+5%', trend: 'up' },
        { label: 'Customer Rating', value: '4.8', change: '-0.1', trend: 'down' },
    ];

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                    <p className="text-zinc-400">Business insights and performance metrics</p>
                </div>
                <div className="flex gap-2 p-1 rounded-xl bg-zinc-900/50 border border-white/5">
                    {['7 Days', '30 Days', '90 Days', 'Year'].map((period, i) => (
                        <button
                            key={period}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${i === 1 ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {metrics.map((metric, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5">
                        <div className="text-sm text-zinc-500 mb-2">{metric.label}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-white">{metric.value}</div>
                            <div className={`text-sm font-medium ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                <i className={`fa-solid fa-arrow-${metric.trend} mr-1`} />
                                {metric.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-4">Revenue Over Time</h3>
                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {[65, 45, 80, 55, 70, 90, 75, 85, 60, 95, 70, 88].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-blue-500/30 rounded-t-lg transition-all hover:bg-blue-500/50"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-xs text-zinc-500">{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-4">Jobs by Type</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'HVAC', value: 45, color: 'blue' },
                            { label: 'Plumbing', value: 28, color: 'cyan' },
                            { label: 'Electrical', value: 18, color: 'purple' },
                            { label: 'Other', value: 9, color: 'zinc' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-zinc-300">{item.label}</span>
                                    <span className="text-zinc-500">{item.value}%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-${item.color}-500 rounded-full`}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppAnalytics;
