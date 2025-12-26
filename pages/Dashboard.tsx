import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import ScrollReveal from '../components/ScrollReveal';
import GradientText, { AnimatedCounter } from '../components/GradientText';

interface DashboardProps {
    onNavigate: (page: Page) => void;
}

// Simulated data
const mockJobs = [
    { id: 1, customer: 'Acme Corp', address: '1240 Market St', tech: 'Mike S.', status: 'in-progress', time: '10:30 AM', priority: 'high' },
    { id: 2, customer: 'TechStart Inc', address: '789 Innovation Way', tech: 'Sarah K.', status: 'scheduled', time: '1:00 PM', priority: 'medium' },
    { id: 3, customer: 'Global Systems', address: '456 Enterprise Blvd', tech: 'John D.', status: 'completed', time: '9:00 AM', priority: 'low' },
    { id: 4, customer: 'Local Business', address: '123 Main St', tech: 'Emily R.', status: 'scheduled', time: '3:30 PM', priority: 'medium' },
];

const mockTeam = [
    { id: 1, name: 'Mike S.', role: 'Senior Tech', status: 'on-job', avatar: 'MS', color: 'blue' },
    { id: 2, name: 'Sarah K.', role: 'Technician', status: 'available', avatar: 'SK', color: 'emerald' },
    { id: 3, name: 'John D.', role: 'Lead Tech', status: 'break', avatar: 'JD', color: 'purple' },
    { id: 4, name: 'Emily R.', role: 'Technician', status: 'driving', avatar: 'ER', color: 'cyan' },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarTab, setSidebarTab] = useState<'jobs' | 'team'>('jobs');

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const statusColors: Record<string, string> = {
        'in-progress': 'bg-blue-500',
        'scheduled': 'bg-amber-500',
        'completed': 'bg-emerald-500',
        'on-job': 'bg-blue-500',
        'available': 'bg-emerald-500',
        'break': 'bg-zinc-500',
        'driving': 'bg-purple-500',
    };

    const priorityColors: Record<string, string> = {
        high: 'text-red-400',
        medium: 'text-amber-400',
        low: 'text-zinc-400',
    };

    return (
        <div className="min-h-screen pt-20 aurora-bg">
            {/* Demo Banner */}
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border-y border-white/10 py-3 px-6 text-center">
                <span className="text-sm text-zinc-300">
                    <i className="fa-solid fa-sparkles text-amber-400 mr-2" />
                    This is an interactive demo of the Shyft platform
                    <button
                        onClick={() => onNavigate('signup')}
                        className="ml-4 text-white underline underline-offset-4 hover:text-blue-400 transition-colors"
                    >
                        Start your free trial →
                    </button>
                </span>
            </div>

            <div className="flex h-[calc(100vh-120px)]">
                {/* Sidebar */}
                <aside className="w-72 border-r border-white/10 bg-zinc-950/50 flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold">S</span>
                            </div>
                            <div>
                                <div className="text-white font-semibold">Acme Services</div>
                                <div className="text-xs text-zinc-500">Pro Plan</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1">
                        {[
                            { icon: 'fa-gauge-high', label: 'Dashboard', active: true },
                            { icon: 'fa-calendar-days', label: 'Schedule', active: false },
                            { icon: 'fa-users', label: 'Team', active: false },
                            { icon: 'fa-briefcase', label: 'Jobs', active: false },
                            { icon: 'fa-file-invoice-dollar', label: 'Invoices', active: false },
                            { icon: 'fa-chart-line', label: 'Analytics', active: false },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${item.active
                                        ? 'bg-white/10 text-white'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                <i className={`fa-solid ${item.icon} w-5 text-center`} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Quick Stats */}
                    <div className="mt-auto p-4 border-t border-white/10">
                        <div className="bg-zinc-900/50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Today's Revenue</span>
                                <span className="text-emerald-400 font-medium">+$2,340</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Completed Jobs</span>
                                <span className="text-white font-medium">8/12</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 18 ? 'afternoon' : 'evening'}, Alex
                            </h1>
                            <p className="text-zinc-400">
                                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                <span className="text-zinc-600 ml-3">
                                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 rounded-xl bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all">
                                <i className="fa-solid fa-bell" />
                            </button>
                            <button className="p-3 rounded-xl bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all">
                                <i className="fa-solid fa-gear" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Revenue Today', value: 2340, prefix: '$', color: 'emerald', icon: 'fa-dollar-sign', change: '+12%' },
                            { label: 'Active Jobs', value: 4, color: 'blue', icon: 'fa-briefcase', change: '' },
                            { label: 'Team On Field', value: 3, color: 'purple', icon: 'fa-users', suffix: '/4' },
                            { label: 'Avg Response', value: 24, suffix: 'min', color: 'cyan', icon: 'fa-clock', change: '-8%' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group relative p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                            >
                                {/* Hover glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-${stat.color}-500/10 to-transparent`} />

                                <div className="relative z-10">
                                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center mb-4`}>
                                        <i className={`fa-solid ${stat.icon} text-${stat.color}-400`} />
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">
                                        <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">{stat.label}</span>
                                        {stat.change && (
                                            <span className={`text-xs ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {stat.change}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Map View - Takes 2 columns */}
                        <div className="col-span-2 rounded-2xl bg-zinc-900/30 border border-white/10 overflow-hidden h-96">
                            <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
                                <span className="text-sm font-medium text-white">Live Map</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                        All
                                    </button>
                                    <button className="px-3 py-1 text-xs rounded-full text-zinc-400 hover:text-white transition-colors">
                                        Active
                                    </button>
                                </div>
                            </div>
                            <div className="relative h-[calc(100%-48px)] bg-zinc-950">
                                {/* Stylized map background */}
                                <div className="absolute inset-0 opacity-30">
                                    <svg className="w-full h-full" viewBox="0 0 400 300">
                                        {/* Grid lines */}
                                        {[...Array(8)].map((_, i) => (
                                            <line key={`h-${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#333" strokeWidth="0.5" />
                                        ))}
                                        {[...Array(10)].map((_, i) => (
                                            <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#333" strokeWidth="0.5" />
                                        ))}
                                        {/* Roads */}
                                        <path d="M 50 150 Q 150 100 250 150 T 380 120" fill="none" stroke="#444" strokeWidth="3" />
                                        <path d="M 200 0 Q 180 150 200 300" fill="none" stroke="#444" strokeWidth="3" />
                                    </svg>
                                </div>

                                {/* Markers */}
                                <div className="absolute top-20 left-32 flex items-center gap-2 animate-pulse">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                                    <div className="bg-zinc-900/90 backdrop-blur px-2 py-1 rounded text-xs text-white">Mike S.</div>
                                </div>
                                <div className="absolute top-40 right-24">
                                    <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                </div>
                                <div className="absolute bottom-24 left-48">
                                    <div className="w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                                </div>

                                {/* Route line */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path d="M 140 90 Q 200 200 300 180" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 4" />
                                </svg>
                            </div>
                        </div>

                        {/* Jobs/Team Toggle */}
                        <div className="rounded-2xl bg-zinc-900/30 border border-white/10 overflow-hidden h-96">
                            <div className="h-12 border-b border-white/10 flex items-center gap-2 px-4">
                                <button
                                    onClick={() => setSidebarTab('jobs')}
                                    className={`px-4 py-1.5 text-xs rounded-full transition-all ${sidebarTab === 'jobs'
                                            ? 'bg-white text-black'
                                            : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    Jobs
                                </button>
                                <button
                                    onClick={() => setSidebarTab('team')}
                                    className={`px-4 py-1.5 text-xs rounded-full transition-all ${sidebarTab === 'team'
                                            ? 'bg-white text-black'
                                            : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    Team
                                </button>
                            </div>
                            <div className="p-4 space-y-3 overflow-auto h-[calc(100%-48px)]">
                                {sidebarTab === 'jobs' ? (
                                    mockJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                                            className={`
                        p-4 rounded-xl border cursor-pointer transition-all duration-200
                        ${selectedJob === job.id
                                                    ? 'bg-white/10 border-white/20'
                                                    : 'bg-zinc-900/50 border-white/5 hover:border-white/10'
                                                }
                      `}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-white font-medium text-sm">{job.customer}</span>
                                                <div className={`w-2 h-2 rounded-full ${statusColors[job.status]}`} />
                                            </div>
                                            <div className="text-xs text-zinc-500 mb-2">{job.address}</div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-zinc-400">{job.tech}</span>
                                                <span className={priorityColors[job.priority]}>{job.time}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    mockTeam.map((member) => (
                                        <div
                                            key={member.id}
                                            className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl bg-${member.color}-500/20 flex items-center justify-center text-${member.color}-400 font-medium text-sm`}>
                                                    {member.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-white text-sm font-medium">{member.name}</div>
                                                    <div className="text-xs text-zinc-500">{member.role}</div>
                                                </div>
                                                <div className={`w-2 h-2 rounded-full ${statusColors[member.status]}`} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
