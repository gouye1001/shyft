import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useAuth } from '../src/context/AuthContext';
import FloatingDashboardWidget from '../components/FloatingDashboardWidget';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleGetStarted = () => {
        navigate(isAuthenticated ? '/dashboard' : '/signup');
    };

    return (
        <div className="bg-black">
            {/* ══════════════════════════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] h-[900px] bg-gradient-radial from-indigo-950/40 via-black to-black" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-5xl mx-auto mb-20">
                        <ScrollReveal>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 hover:bg-white/[0.08] transition-colors cursor-pointer">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm text-zinc-300">Introducing AI-powered smart dispatch</span>
                                <i className="fa-solid fa-arrow-right text-xs text-zinc-500" />
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold tracking-[-0.02em] leading-[0.95] mb-8">
                                <span className="bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent">
                                    Streamline field operations.
                                </span>
                                <br />
                                <span className="text-zinc-600">From dispatch to payment.</span>
                            </h1>

                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                                Shyft is purpose-built for field service teams that want to move fast.
                                Scheduling, dispatch, payments, and reporting—all in one place.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleGetStarted}
                                    className="group h-14 px-8 rounded-full bg-white text-black font-semibold text-base hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-white/10 flex items-center justify-center gap-2"
                                >
                                    {isAuthenticated ? 'Go to Dashboard' : 'Start building for free'}
                                    <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-0.5 transition-transform" />
                                </button>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="h-14 px-8 rounded-full border border-white/10 text-white font-medium text-base hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                                >
                                    <i className="fa-solid fa-play text-xs" />
                                    Watch demo
                                </button>
                            </div>

                            <p className="text-sm text-zinc-600 mt-6">
                                Free for teams up to 3 • No credit card required
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Product Screenshot */}
                    <ScrollReveal delay="100">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent rounded-3xl blur-3xl opacity-50" />

                            <div className="relative bg-[#0C0C0C] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                                {/* Browser Chrome */}
                                <div className="h-11 bg-[#181818] border-b border-white/5 flex items-center px-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0C0C0C] rounded-lg">
                                            <i className="fa-solid fa-lock text-[10px] text-zinc-600" />
                                            <span className="text-xs text-zinc-500">app.shyft.io</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard */}
                                <div className="flex min-h-[520px]">
                                    {/* Sidebar */}
                                    <div className="w-56 bg-[#0A0A0A] border-r border-white/5 p-4 hidden lg:block">
                                        <div className="flex items-center gap-3 mb-8 p-2">
                                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">S</div>
                                            <div>
                                                <div className="text-sm font-semibold text-white">Shyft</div>
                                                <div className="text-[10px] text-zinc-600">Pro Plan</div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            {[
                                                { icon: 'fa-grid-2', label: 'Dashboard', active: true },
                                                { icon: 'fa-calendar', label: 'Schedule', badge: '4' },
                                                { icon: 'fa-users', label: 'Team' },
                                                { icon: 'fa-briefcase', label: 'Jobs' },
                                                { icon: 'fa-file-invoice', label: 'Invoices' },
                                                { icon: 'fa-chart-line', label: 'Analytics' },
                                            ].map((item) => (
                                                <div key={item.label} className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${item.active ? 'bg-white/5 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/[0.02]'} transition-colors cursor-pointer`}>
                                                    <div className="flex items-center gap-3">
                                                        <i className={`fa-solid ${item.icon} text-xs w-4`} />
                                                        {item.label}
                                                    </div>
                                                    {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">{item.badge}</span>}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-white/5">
                                            <button className="w-full h-9 rounded-lg bg-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors">
                                                <i className="fa-solid fa-plus text-xs" /> New Job
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main */}
                                    <div className="flex-1 bg-[#060606] p-6">
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Overview</p>
                                                <h2 className="text-xl font-semibold text-white">Good morning, Sarah</h2>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/[0.08] transition-colors cursor-pointer">
                                                    <i className="fa-solid fa-bell text-sm" />
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] text-white flex items-center justify-center font-bold">3</div>
                                                </div>
                                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Sarah" className="w-9 h-9 rounded-full object-cover" />
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-4 gap-4 mb-6">
                                            {[
                                                { label: 'Revenue', value: '$4,847', change: '+18.5%', icon: 'fa-arrow-trend-up', positive: true },
                                                { label: 'Completed', value: '14', sub: '/18 jobs', icon: 'fa-check-circle' },
                                                { label: 'Active', value: '6', sub: 'techs', icon: 'fa-hard-hat' },
                                                { label: 'Response', value: '12m', change: '-24%', icon: 'fa-clock', positive: true },
                                            ].map((stat, i) => (
                                                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</span>
                                                        <i className={`fa-solid ${stat.icon} text-xs text-zinc-600`} />
                                                    </div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                                                        {stat.sub && <span className="text-xs text-zinc-600">{stat.sub}</span>}
                                                    </div>
                                                    {stat.change && <div className={`text-xs mt-1 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>{stat.change}</div>}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Map + Jobs */}
                                        <div className="grid grid-cols-5 gap-4">
                                            <div className="col-span-3 h-48 rounded-xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden">
                                                {/* Map background */}
                                                <img
                                                    src="https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-122.4194,37.7749,11,0/600x300?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                                                    alt="Map"
                                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                                {/* Fallback grid */}
                                                <div className="absolute inset-0" style={{
                                                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px'
                                                }} />
                                                {/* Pins */}
                                                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" />
                                                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse" />
                                                <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse" />
                                                {/* Label */}
                                                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                    <span className="text-[11px] text-zinc-300">3 Active</span>
                                                </div>
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">Active Jobs</div>
                                                {[
                                                    { title: 'HVAC Repair', loc: '123 Main St', tech: 'Mike Rodriguez', status: 'In Progress', color: 'blue', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
                                                    { title: 'AC Install', loc: '456 Oak Ave', tech: 'Sarah Kim', status: 'En Route', color: 'amber', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
                                                    { title: 'Furnace Check', loc: '789 Pine Rd', tech: 'John Davis', status: 'Done', color: 'emerald', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
                                                ].map((job, i) => (
                                                    <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] cursor-pointer transition-all hover:-translate-y-0.5">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <span className="text-sm font-medium text-white">{job.title}</span>
                                                            <span className={`text-[9px] px-2 py-0.5 rounded-full bg-${job.color}-500/10 text-${job.color}-400 border border-${job.color}-500/20`}>{job.status}</span>
                                                        </div>
                                                        <div className="text-[11px] text-zinc-600">{job.loc}</div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <img src={job.avatar} alt={job.tech} className="w-5 h-5 rounded-full object-cover" />
                                                            <span className="text-[11px] text-zinc-500">{job.tech}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                LOGOS
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs text-zinc-600 uppercase tracking-[0.2em] mb-10">
                        Trusted by 15,000+ field service teams
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
                        {['ServiceTitan', 'Jobber', 'FieldEdge', 'Housecall Pro', 'ServiceMax'].map((company) => (
                            <div key={company} className="text-lg font-semibold text-zinc-700 hover:text-zinc-500 transition-colors cursor-default">{company}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                FEATURE 1: SMART DISPATCH (with visual)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <div>
                                <p className="text-sm text-blue-400 uppercase tracking-wider font-semibold mb-4">Smart Dispatch</p>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                                    AI-powered dispatch that saves hours daily
                                </h2>
                                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                                    Stop manually assigning jobs. Our AI considers skills, location,
                                    workload, and traffic to build the optimal schedule—automatically.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: 'fa-brain', text: 'Intelligent skill-based matching' },
                                        { icon: 'fa-route', text: 'Real-time route optimization' },
                                        { icon: 'fa-clock', text: 'Automatic schedule rebalancing' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                                <i className={`fa-solid ${item.icon} text-blue-400 text-sm`} />
                                            </div>
                                            <span className="text-zinc-300">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/product" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 transition-colors">
                                    Learn about dispatch <i className="fa-solid fa-arrow-right text-sm" />
                                </Link>
                            </div>
                        </ScrollReveal>

                        {/* Visual Preview */}
                        <ScrollReveal delay="100">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-3xl" />
                                <div className="relative p-6 rounded-2xl bg-[#0C0C0C] border border-white/10 overflow-hidden">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-sm font-medium text-white">Today's Schedule</div>
                                            <div className="text-xs text-zinc-600">Thursday, December 26</div>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                            <i className="fa-solid fa-wand-magic-sparkles text-emerald-400 text-xs" />
                                            <span className="text-xs text-emerald-400 font-medium">AI Optimized</span>
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className="space-y-3">
                                        {[
                                            { time: '9:00 AM', job: 'AC Repair', address: '123 Main Street', tech: 'Mike R.', duration: '2h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', color: 'blue' },
                                            { time: '11:30 AM', job: 'Furnace Install', address: '456 Oak Avenue', tech: 'Sarah K.', duration: '3h', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', color: 'purple' },
                                            { time: '2:00 PM', job: 'HVAC Maintenance', address: '789 Pine Road', tech: 'John D.', duration: '1.5h', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', color: 'emerald' },
                                            { time: '4:30 PM', job: 'Duct Cleaning', address: '321 Elm Street', tech: 'Mike R.', duration: '2h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', color: 'amber' },
                                        ].map((slot, i) => (
                                            <div key={i} className="group flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer">
                                                <div className="text-sm text-zinc-500 w-16 pt-0.5 flex-shrink-0">{slot.time}</div>
                                                <div className={`w-1 rounded-full bg-${slot.color}-500 group-hover:w-1.5 transition-all`} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium text-white">{slot.job}</span>
                                                        <span className="text-xs text-zinc-600">{slot.duration}</span>
                                                    </div>
                                                    <div className="text-xs text-zinc-500 truncate">{slot.address}</div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <img src={slot.avatar} alt={slot.tech} className="w-5 h-5 rounded-full object-cover" />
                                                        <span className="text-xs text-zinc-400">{slot.tech}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats footer */}
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                                        <span className="text-zinc-500">8 jobs scheduled</span>
                                        <span className="text-emerald-400 font-medium">42 min saved today</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                FEATURE 2: MOBILE APP (with phone mockup)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-32 bg-[#060606]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Phone mockup */}
                        <ScrollReveal className="order-2 lg:order-1">
                            <div className="flex justify-center">
                                <div className="relative">
                                    {/* Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-blue-500/20 blur-[60px] scale-105" />

                                    {/* iPhone */}
                                    <div className="relative w-[300px] bg-[#1C1C1E] rounded-[50px] p-[12px] shadow-2xl">
                                        {/* Screen */}
                                        <div className="relative bg-black rounded-[40px] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                                            {/* Dynamic Island */}
                                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[34px] bg-black rounded-[18px] z-20 flex items-center justify-center gap-4">
                                                <div className="w-3 h-3 rounded-full bg-[#1a1a1a]" />
                                                <div className="w-3 h-3 rounded-full bg-[#1a1a1a]" />
                                            </div>

                                            {/* Content */}
                                            <div className="relative h-full bg-[#0C0C0C] pt-14 pb-8 px-5">
                                                {/* Status bar */}
                                                <div className="absolute top-4 left-7 right-7 flex justify-between items-center text-white text-sm font-semibold">
                                                    <span>9:41</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <i className="fa-solid fa-signal text-xs" />
                                                        <i className="fa-solid fa-wifi text-xs" />
                                                        <i className="fa-solid fa-battery-full text-xs" />
                                                    </div>
                                                </div>

                                                {/* Header */}
                                                <div className="flex items-center justify-between mb-6 mt-2">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">S</div>
                                                    <div className="text-center">
                                                        <div className="text-[11px] text-zinc-500">Thursday</div>
                                                        <div className="text-[15px] font-semibold text-white">Dec 26</div>
                                                    </div>
                                                    <div className="relative w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center">
                                                        <i className="fa-solid fa-bell text-white text-sm" />
                                                        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-bold">2</div>
                                                    </div>
                                                </div>

                                                {/* Job Card */}
                                                <div className="p-5 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 mb-5">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                                        <span className="text-[12px] text-blue-400 font-semibold uppercase tracking-wider">Current Job</span>
                                                    </div>
                                                    <div className="text-xl font-bold text-white mb-1">HVAC Repair</div>
                                                    <div className="text-sm text-zinc-400 mb-4">123 Main Street, Apt 4B</div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Customer" className="w-9 h-9 rounded-full object-cover" />
                                                            <div>
                                                                <div className="text-sm text-white font-medium">John Smith</div>
                                                                <div className="text-[11px] text-zinc-500">Customer</div>
                                                            </div>
                                                        </div>
                                                        <button className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                            <i className="fa-solid fa-phone text-emerald-400 text-sm" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Start Button */}
                                                <button className="w-full h-14 rounded-2xl bg-emerald-500 text-white font-bold text-base flex items-center justify-center gap-2 mb-4 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors">
                                                    <i className="fa-solid fa-play text-sm" />
                                                    Start Job
                                                </button>

                                                {/* Quick actions */}
                                                <div className="grid grid-cols-3 gap-3 mb-5">
                                                    {[
                                                        { icon: 'fa-camera', label: 'Photos' },
                                                        { icon: 'fa-file-lines', label: 'Forms' },
                                                        { icon: 'fa-route', label: 'Navigate' },
                                                    ].map((action) => (
                                                        <button key={action.label} className="py-4 rounded-2xl bg-[#1C1C1E] flex flex-col items-center gap-2 hover:bg-[#2C2C2E] transition-colors">
                                                            <i className={`fa-solid ${action.icon} text-lg text-zinc-400`} />
                                                            <span className="text-[11px] text-zinc-500">{action.label}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Offline */}
                                                <div className="flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                                                    <i className="fa-solid fa-wifi text-emerald-400 text-sm" />
                                                    <span className="text-sm text-emerald-400 font-semibold">Works offline</span>
                                                </div>
                                            </div>

                                            {/* Home bar */}
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/80 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Content */}
                        <ScrollReveal delay="100" className="order-1 lg:order-2">
                            <div>
                                <p className="text-sm text-emerald-400 uppercase tracking-wider font-semibold mb-4">Mobile Experience</p>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                                    Built for the field, not the office
                                </h2>
                                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                                    Your technicians deserve better tools. Shyft's mobile app is fast,
                                    intuitive, and works everywhere—even without internet.
                                </p>
                                <div className="space-y-5">
                                    {[
                                        { icon: 'fa-wifi', iconColor: 'emerald', title: 'Works offline', desc: 'Full functionality in basements, rural areas, anywhere.' },
                                        { icon: 'fa-bolt', iconColor: 'amber', title: 'One-tap updates', desc: 'Update job status with a single tap. No forms to fill.' },
                                        { icon: 'fa-camera', iconColor: 'blue', title: 'Photo capture', desc: 'Before/after photos with GPS and timestamps.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className={`w-12 h-12 rounded-xl bg-${item.iconColor}-500/10 border border-${item.iconColor}-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                <i className={`fa-solid ${item.icon} text-${item.iconColor}-400`} />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                                                <p className="text-sm text-zinc-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <i className="fa-brands fa-apple text-2xl text-white" />
                                        <span className="text-xs text-zinc-600">iOS</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fa-brands fa-android text-2xl text-[#3DDC84]" />
                                        <span className="text-xs text-zinc-600">Android</span>
                                    </div>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <i className="fa-solid fa-star text-amber-400" />
                                        <span className="text-sm text-white font-semibold">4.9</span>
                                        <span className="text-xs text-zinc-600">(2.8k reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                FEATURE 3: ANALYTICS (with visual)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Visual */}
                        <ScrollReveal>
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500/10 rounded-3xl blur-3xl" />
                                <div className="relative p-6 rounded-2xl bg-[#0C0C0C] border border-white/10 overflow-hidden">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-sm font-medium text-white">Revenue Analytics</div>
                                            <div className="text-xs text-zinc-600">Last 30 days</div>
                                        </div>
                                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                                            <option>This month</option>
                                        </select>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {[
                                            { label: 'Total Revenue', value: '$47,280', change: '+23%' },
                                            { label: 'Jobs Done', value: '342', change: '+18%' },
                                            { label: 'Avg Job Value', value: '$138', change: '+8%' },
                                        ].map((stat, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">{stat.label}</div>
                                                <div className="text-xl font-bold text-white">{stat.value}</div>
                                                <div className="text-xs text-emerald-400 mt-1">{stat.change}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart */}
                                    <div className="h-48 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden p-4">
                                        <div className="text-xs text-zinc-600 mb-4">Revenue Trend</div>
                                        <svg className="w-full h-32" viewBox="0 0 400 100" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M0 80 Q50 70 100 60 T200 45 T300 35 T400 20 L400 100 L0 100 Z" fill="url(#chartFill)" />
                                            <path d="M0 80 Q50 70 100 60 T200 45 T300 35 T400 20" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                                            <circle cx="400" cy="20" r="4" fill="#8b5cf6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Content */}
                        <ScrollReveal delay="100">
                            <div>
                                <p className="text-sm text-purple-400 uppercase tracking-wider font-semibold mb-4">Real-time Analytics</p>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                                    Data that drives better decisions
                                </h2>
                                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                                    Track revenue, team performance, and customer satisfaction in real-time.
                                    Identify trends and optimize your operations.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: 'fa-chart-line', text: 'Real-time revenue dashboards' },
                                        { icon: 'fa-users', text: 'Team performance metrics' },
                                        { icon: 'fa-file-export', text: 'Custom report builder' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                                <i className={`fa-solid ${item.icon} text-purple-400 text-sm`} />
                                            </div>
                                            <span className="text-zinc-300">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                FEATURES GRID (smaller features)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#060606]">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                                And so much more
                            </h2>
                            <p className="text-zinc-500 max-w-2xl mx-auto">
                                Everything you need to run efficient field operations.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: 'fa-credit-card', title: 'Payments', desc: 'Accept cards on-site' },
                            { icon: 'fa-comments', title: 'SMS Updates', desc: 'Automatic ETA texts' },
                            { icon: 'fa-plug', title: 'Integrations', desc: 'QuickBooks, Stripe, 50+' },
                            { icon: 'fa-shield-halved', title: 'Security', desc: 'SOC 2 compliant' },
                            { icon: 'fa-file-invoice', title: 'Invoicing', desc: 'Send in one click' },
                            { icon: 'fa-headset', title: 'Support', desc: '24/7 live chat' },
                            { icon: 'fa-users', title: 'Team Mgmt', desc: 'Unlimited users' },
                            { icon: 'fa-globe', title: 'Multi-location', desc: 'Scale across regions' },
                        ].map((feature, i) => (
                            <ScrollReveal key={i}>
                                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <i className={`fa-solid ${feature.icon} text-white`} />
                                    </div>
                                    <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                                    <p className="text-xs text-zinc-500">{feature.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                TESTIMONIALS
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <p className="text-sm text-amber-400 uppercase tracking-wider font-semibold mb-4">Customer Stories</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Loved by teams everywhere
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { quote: "Shyft replaced three different tools for us. The dispatch alone saves our coordinator 2 hours every day.", name: "Michael Torres", role: "Owner", company: "Torres HVAC", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
                            { quote: "Our technicians actually use the app now. Before Shyft, we had 50% adoption. Now it's 100%.", name: "Jennifer Martinez", role: "Operations Director", company: "Bay Area Services", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
                            { quote: "The route optimization paid for itself in the first week. We're saving $3K/month on fuel.", name: "David Chen", role: "Fleet Manager", company: "Premier Plumbing", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
                        ].map((t, i) => (
                            <ScrollReveal key={i}>
                                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 h-full flex flex-col hover:border-white/10 transition-colors">
                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map(s => <i key={s} className="fa-solid fa-star text-amber-400 text-sm" />)}
                                    </div>
                                    <blockquote className="text-lg text-white leading-relaxed mb-8 flex-1">"{t.quote}"</blockquote>
                                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <div className="text-white font-semibold">{t.name}</div>
                                            <div className="text-sm text-zinc-500">{t.role}, {t.company}</div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                CTA
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                            Ready to transform your<br />field operations?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                            Join 15,000+ teams already using Shyft to work smarter.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={handleGetStarted} className="group h-16 px-10 rounded-full bg-white text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-white/10 flex items-center justify-center gap-2">
                                {isAuthenticated ? 'Go to Dashboard' : 'Get started free'}
                                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={() => navigate('/contact')} className="h-16 px-10 rounded-full border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-colors">
                                Talk to sales
                            </button>
                        </div>
                        <p className="text-sm text-zinc-600 mt-8">
                            Free 14-day trial • No credit card required • Cancel anytime
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Floating Dashboard Widget for logged-in users */}
            <FloatingDashboardWidget />
        </div>
    );
};

export default Home;