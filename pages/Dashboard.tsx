import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatedCounter } from '../components/GradientText';
import { mockJobs, mockTeam, mockStats } from '../src/utils/mockData';
import { useAuth } from '../src/context/AuthContext';

const Dashboard: React.FC = () => {
    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarTab, setSidebarTab] = useState<'jobs' | 'team'>('jobs');
    const [showSettings, setShowSettings] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const { user, logout, updateUser } = useAuth();

    // Settings state
    const [settingsName, setSettingsName] = useState(user?.name || '');
    const [settingsEmail, setSettingsEmail] = useState(user?.email || '');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSaveSettings = () => {
        updateUser({ name: settingsName, email: settingsEmail });
        setShowSettings(false);
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

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
        <div
            className="min-h-screen pt-20 bg-black relative overflow-hidden flex flex-col"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Demo Banner */}
            <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 border-y border-white/5 py-2 px-6 text-center backdrop-blur-md relative z-20">
                <span className="text-xs md:text-sm text-zinc-300 flex items-center justify-center gap-2">
                    <i className="fa-solid fa-sparkles text-amber-400" />
                    Logged in as {user?.name || 'User'}
                    <span className="mx-2 w-px h-4 bg-white/10" />
                    <button
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-300 font-medium transition-colors"
                    >
                        <i className="fa-solid fa-right-from-bracket mr-1" />
                        Logout
                    </button>
                </span>
            </div>

            <div className="flex flex-1 overflow-hidden relative z-10">
                {/* Sidebar */}
                <aside className="w-72 border-r border-white/10 bg-zinc-900/30 backdrop-blur-xl flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <span className="text-white font-bold text-lg">{user?.name?.charAt(0) || 'U'}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-white font-semibold tracking-tight truncate">{user?.name || 'User'}</div>
                                <div className="text-xs text-zinc-500 font-medium truncate">{user?.email || 'Pro Plan'}</div>
                            </div>
                            <button
                                onClick={() => setShowSettings(true)}
                                className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <i className="fa-solid fa-gear" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
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
                                  transition-all duration-200 group
                                  ${item.active
                                        ? 'bg-white/10 text-white shadow-lg shadow-white/5 border border-white/5'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <i className={`fa-solid ${item.icon} w-5 text-center transition-transform group-hover:scale-110 ${item.active ? 'text-blue-400' : ''}`} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Quick Stats */}
                    <div className="p-4 border-t border-white/5 bg-zinc-900/20">
                        <div className="bg-black/40 rounded-xl p-4 space-y-3 border border-white/5">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-zinc-500">Today's Revenue</span>
                                <span className="text-emerald-400">+${mockStats.todayRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-zinc-500">Completed Jobs</span>
                                <span className="text-white">{mockStats.jobsCompletedToday}/{mockStats.jobsScheduledToday}</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${(mockStats.jobsCompletedToday / mockStats.jobsScheduledToday) * 100}%` }} />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-8 relative">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0] || 'there'}
                            </h1>
                            <p className="text-zinc-400 flex items-center gap-2">
                                <i className="fa-regular fa-calendar text-zinc-500" />
                                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                <span className="text-zinc-500 font-mono">
                                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 rounded-xl bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                                <i className="fa-solid fa-magnifying-glass" />
                            </button>
                            <button className="p-3 rounded-xl bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all relative">
                                <i className="fa-solid fa-bell" />
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-black" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Revenue Today', value: mockStats.todayRevenue, prefix: '$', color: 'emerald', icon: 'fa-dollar-sign', change: '+12%' },
                            { label: 'Active Jobs', value: mockStats.activeJobs, color: 'blue', icon: 'fa-briefcase', change: '' },
                            { label: 'Team On Field', value: mockStats.teamOnField, color: 'purple', icon: 'fa-users', suffix: `/${mockStats.totalTeam}` },
                            { label: 'Avg Response', value: mockStats.avgResponseTime, suffix: 'min', color: 'cyan', icon: 'fa-clock', change: '-8%' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="card-spotlight rounded-2xl p-6 bg-zinc-900/20 border border-white/10 hover:border-white/20 transition-all group"
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                                            <i className={`fa-solid ${stat.icon} text-${stat.color}-400`} />
                                        </div>
                                        {stat.change && (
                                            <span className={`text-xs font-medium px-2 py-1 rounded-lg bg-${stat.change.startsWith('+') ? 'emerald' : 'red'}-500/10 text-${stat.change.startsWith('+') ? 'emerald' : 'red'}-400 border border-${stat.change.startsWith('+') ? 'emerald' : 'red'}-500/20`}>
                                                {stat.change}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1 tracking-tight">
                                        <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                    </div>
                                    <span className="text-sm text-zinc-500 font-medium">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                        {/* Map View - Takes 2 columns */}
                        <div className="lg:col-span-2 card-spotlight rounded-3xl bg-zinc-900/20 border border-white/10 overflow-hidden flex flex-col">
                            <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-map-location-dot text-blue-400" />
                                    <span className="text-sm font-semibold text-white">Live Operations Map</span>
                                </div>
                                <div className="flex gap-1 p-1 rounded-lg bg-black/40 border border-white/5">
                                    <button className="px-3 py-1 text-xs font-medium rounded-md bg-white/10 text-white shadow-sm">
                                        All
                                    </button>
                                    <button className="px-3 py-1 text-xs font-medium rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                                        Active
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 relative bg-zinc-950/50">
                                {/* Stylized map background */}
                                <div className="absolute inset-0 opacity-20">
                                    <svg className="w-full h-full" width="100%" height="100%">
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                </div>

                                {/* Map Content Simulation */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Pulse Rings for active areas */}
                                    <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse" />
                                    <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-700" />
                                </div>

                                {/* Dynamic Markers */}
                                {[
                                    { top: '30%', left: '40%', color: 'blue', label: 'Mike S.', status: 'On Job' },
                                    { top: '60%', left: '70%', color: 'purple', label: 'Sarah J.', status: 'Driving' },
                                    { top: '45%', left: '25%', color: 'emerald', label: 'Team A', status: 'Available' }
                                ].map((marker, i) => (
                                    <div
                                        key={i}
                                        className="absolute group"
                                        style={{ top: marker.top, left: marker.left }}
                                    >
                                        <div className="relative">
                                            <div className={`w-4 h-4 rounded-full bg-${marker.color}-500 shadow-[0_0_20px_rgba(var(--${marker.color}-500-rgb),0.5)] animate-pulse`} />
                                            <div className={`absolute inset-0 w-4 h-4 rounded-full bg-${marker.color}-500/30 animate-ping`} />
                                            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-200 pointer-events-auto">
                                                <div className="text-white font-medium">{marker.label}</div>
                                                <div className={`text-[10px] text-${marker.color}-400`}>{marker.status}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jobs/Team Toggle Panel */}
                        <div className="card-spotlight rounded-3xl bg-zinc-900/20 border border-white/10 overflow-hidden flex flex-col">
                            <div className="h-14 border-b border-white/10 flex items-center gap-1 px-4 bg-white/5 backdrop-blur-sm">
                                <button
                                    onClick={() => setSidebarTab('jobs')}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${sidebarTab === 'jobs'
                                        ? 'bg-white text-black shadow-lg shadow-white/10'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Active Jobs
                                </button>
                                <button
                                    onClick={() => setSidebarTab('team')}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${sidebarTab === 'team'
                                        ? 'bg-white text-black shadow-lg shadow-white/10'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Team Status
                                </button>
                            </div>
                            <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                                {sidebarTab === 'jobs' ? (
                                    mockJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                                            className={`
                                              p-4 rounded-xl border cursor-pointer transition-all duration-200 group
                                              ${selectedJob === job.id
                                                    ? 'bg-white/10 border-white/20 shadow-lg'
                                                    : 'bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60'
                                                }
                                            `}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">{job.customer}</span>
                                                <div className={`w-2 h-2 rounded-full ${statusColors[job.status]} shadow-[0_0_8px_currentColor]`} />
                                            </div>
                                            <div className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                                                <i className="fa-solid fa-location-dot text-[10px]" />
                                                {job.address}
                                            </div>
                                            <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2 mt-2">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] text-zinc-400">
                                                        {job.tech.charAt(0)}
                                                    </div>
                                                    <span className="text-zinc-400">{job.tech}</span>
                                                </div>
                                                <span className={`${priorityColors[job.priority]} font-medium px-1.5 py-0.5 rounded bg-white/5`}>{job.time}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    mockTeam.map((member) => (
                                        <div
                                            key={member.id}
                                            className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all flex items-center gap-3 group"
                                        >
                                            <div className={`w-10 h-10 rounded-xl bg-${member.color}-500/10 border border-${member.color}-500/20 flex items-center justify-center text-${member.color}-400 font-medium text-sm shadow-inner group-hover:scale-105 transition-transform`}>
                                                {member.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-white text-sm font-medium truncate">{member.name}</div>
                                                <div className="text-xs text-zinc-500 truncate">{member.role}</div>
                                            </div>
                                            <div className={`px-2 py-1 rounded-md bg-${statusColors[member.status].split('-')[1]}-500/10 text-${statusColors[member.status].split('-')[1]}-400 text-[10px] font-medium border border-${statusColors[member.status].split('-')[1]}-500/20`}>
                                                {member.status}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowSettings(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <h2 className="text-lg font-semibold text-white">Account Settings</h2>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <i className="fa-solid fa-xmark" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={settingsName}
                                    onChange={(e) => setSettingsName(e.target.value)}
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={settingsEmail}
                                    onChange={(e) => setSettingsEmail(e.target.value)}
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-zinc-900/50">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveSettings}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
