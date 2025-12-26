import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import { useAuth } from '../src/context/AuthContext';

const Product: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    const handleTryNow = () => {
        navigate(isAuthenticated ? '/dashboard' : '/signup');
    };

    return (
        <div
            className="cinematic-bg min-h-screen pt-32 pb-20 px-6 relative overflow-hidden"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Section */}
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md">
                            <i className="fa-solid fa-cube text-blue-400 text-sm" />
                            <span className="text-sm text-blue-300">Field Service Management Platform</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                            One platform.<br />
                            <span className="text-gradient">Complete control.</span>
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10">
                            Shyft brings scheduling, dispatch, tracking, and payments into a single
                            intelligent system—so your team can focus on what matters: the work.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <MagneticButton variant="primary" size="lg" onClick={handleTryNow}>
                                <span className="font-semibold">Try it now</span>
                                <i className="fa-solid fa-arrow-right text-sm ml-2" />
                            </MagneticButton>
                            <MagneticButton variant="secondary" size="lg" onClick={() => navigate('/pricing')}>
                                <span className="font-medium">View pricing</span>
                            </MagneticButton>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Product Preview - Dashboard Mockup */}
                <ScrollReveal delay="100">
                    <div className="relative mb-32">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

                        <div className="relative bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl shadow-black/80 overflow-hidden">
                            {/* Window Chrome */}
                            <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-4 backdrop-blur-md">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex items-center gap-2 h-7 px-4 bg-zinc-900/50 rounded-full border border-white/5">
                                    <i className="fa-solid fa-lock text-[10px] text-zinc-500" />
                                    <span className="text-xs text-zinc-400">app.shyft.io/dashboard</span>
                                </div>
                                <div className="w-16" />
                            </div>

                            {/* Dashboard Content */}
                            <div className="grid grid-cols-[240px_1fr] min-h-[500px]">
                                {/* Sidebar */}
                                <div className="border-r border-white/5 bg-zinc-900/20 p-4 space-y-6 hidden md:block">
                                    <div className="flex items-center gap-2 px-2 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
                                        <div className="h-3 w-20 bg-zinc-700 rounded-full" />
                                    </div>
                                    <div className="space-y-1">
                                        {['Dashboard', 'Schedule', 'Team', 'Jobs', 'Invoices', 'Analytics'].map((item, i) => (
                                            <div key={item} className={`h-10 rounded-lg flex items-center px-3 gap-3 ${i === 0 ? 'bg-white/5 text-white' : 'text-zinc-600'}`}>
                                                <div className={`w-4 h-4 rounded ${i === 0 ? 'bg-blue-500/50' : 'bg-zinc-800'}`} />
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="p-6 bg-[#050505]">
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-white mb-1">Good morning, Team</h2>
                                            <p className="text-sm text-zinc-500">Thursday, December 26</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
                                            <div className="h-10 px-4 rounded-lg bg-blue-600 flex items-center text-white text-sm font-medium">
                                                + New Job
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        {[
                                            { label: 'Revenue Today', value: '$2,340', change: '+12%', color: 'emerald' },
                                            { label: 'Active Jobs', value: '4', color: 'blue' },
                                            { label: 'Team On Field', value: '3/4', color: 'purple' },
                                            { label: 'Avg Response', value: '24min', change: '-8%', color: 'cyan' },
                                        ].map((stat, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                                <div className="text-xs text-zinc-500 mb-1">{stat.label}</div>
                                                <div className="text-xl font-bold text-white">{stat.value}</div>
                                                {stat.change && (
                                                    <div className={`text-xs ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'} mt-1`}>
                                                        {stat.change}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Map Preview */}
                                    <div className="h-48 rounded-xl bg-zinc-900/30 border border-white/5 relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-20">
                                            <svg className="w-full h-full" width="100%" height="100%">
                                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                                                </pattern>
                                                <rect width="100%" height="100%" fill="url(#grid)" />
                                            </svg>
                                        </div>
                                        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                                        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-xs text-white">
                                            <i className="fa-solid fa-location-dot text-blue-400 mr-2" />
                                            Live Operations Map
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* How It Works */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">How Shyft Works</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            From job request to payment collection—streamlined into three simple steps.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {[
                        {
                            step: '01',
                            title: 'Schedule & Dispatch',
                            description: 'Jobs come in, AI assigns the right tech based on skills, location, and availability. Routes are optimized automatically.',
                            icon: 'fa-calendar-check',
                            color: 'blue'
                        },
                        {
                            step: '02',
                            title: 'Execute & Track',
                            description: 'Techs get job details on their mobile app. Real-time GPS tracking keeps everyone in sync. Customers get ETA updates.',
                            icon: 'fa-mobile-screen',
                            color: 'emerald'
                        },
                        {
                            step: '03',
                            title: 'Complete & Collect',
                            description: 'Job completion triggers invoicing. Accept payment on-site. Reports generate automatically. Everyone goes home happy.',
                            icon: 'fa-check-circle',
                            color: 'purple'
                        }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i === 0 ? '0' : i === 1 ? '100' : '200'}>
                            <div className="card-spotlight p-8 rounded-2xl bg-zinc-900/30 border border-white/10 h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 border border-${item.color}-500/30 flex items-center justify-center`}>
                                        <i className={`fa-solid ${item.icon} text-${item.color}-400 text-lg`} />
                                    </div>
                                    <span className="text-5xl font-bold text-zinc-800">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Platform Highlights */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Built for Modern Teams</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Everything you need to run efficient field operations.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {[
                        { icon: 'fa-route', label: 'Smart Routing', stat: '40% less drive time' },
                        { icon: 'fa-mobile-alt', label: 'Mobile App', stat: 'Works offline' },
                        { icon: 'fa-credit-card', label: 'Payments', stat: 'Get paid on-site' },
                        { icon: 'fa-chart-line', label: 'Analytics', stat: 'Real-time insights' },
                        { icon: 'fa-users', label: 'Team Mgmt', stat: 'Unlimited users' },
                        { icon: 'fa-plug', label: 'Integrations', stat: '50+ apps' },
                        { icon: 'fa-shield-halved', label: 'Security', stat: 'SOC 2 compliant' },
                        { icon: 'fa-headset', label: 'Support', stat: '24/7 help' },
                    ].map((item, i) => (
                        <ScrollReveal key={i}>
                            <div className="p-6 rounded-xl bg-zinc-900/20 border border-white/5 hover:border-white/10 transition-all text-center group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <i className={`fa-solid ${item.icon} text-white text-lg`} />
                                </div>
                                <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                                <p className="text-sm text-zinc-500">{item.stat}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Bottom CTA */}
                <ScrollReveal>
                    <div className="card-spotlight text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to transform your operations?
                        </h2>
                        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Join 15,000+ service teams running on Shyft.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleTryNow}
                                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all shadow-lg shadow-white/20"
                            >
                                Start free trial
                                <i className="fa-solid fa-arrow-right ml-2" />
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all"
                            >
                                Talk to sales
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Product;
