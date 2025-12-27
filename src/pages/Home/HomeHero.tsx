import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import { useAuth } from '../../context/AuthContext';

interface HomeHeroProps {
    onGetStarted: () => void;
}

const HomeHero: React.FC<HomeHeroProps> = ({ onGetStarted }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
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
                                onClick={onGetStarted}
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
                                            <img
                                                src="https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-122.4194,37.7749,11,0/600x300?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                                                alt="Map"
                                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                                backgroundSize: '20px 20px'
                                            }} />
                                            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" />
                                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse" />
                                            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse" />
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
    );
};

export default HomeHero;
