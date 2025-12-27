import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const FeaturesSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cards = containerRef.current?.getElementsByClassName('card-spotlight');
        if (!cards) return;

        for (const card of cards as HTMLCollectionOf<HTMLElement>) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <section id="features" className="bg-black py-32 relative z-10" onMouseMove={handleMouseMove} ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <ScrollReveal>
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.1] mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                            Everything you need.
                            <br />
                            <span className="text-zinc-600">Nothing you don't.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
                            Powerful features that work together seamlessly.
                            Designed for speed, built for reliability.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Bento Grid - Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 mb-4 md:mb-5">

                    {/* HERO: Smart Dispatch - 4 cols */}
                    <ScrollReveal className="md:col-span-4">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative h-full min-h-[380px]">
                            <div className="relative z-10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                    <i className="fa-solid fa-brain text-brand-accent-light text-lg md:text-xl"></i>
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 tracking-[-0.02em]">Smart Dispatch</h3>
                                <p className="text-zinc-400 max-w-sm text-base md:text-lg leading-relaxed">AI-powered job assignment that considers skills, location, and priority.</p>
                            </div>

                            {/* Visual: Route Map */}
                            <div className="mt-6 bg-zinc-950/60 rounded-xl border border-white/[0.06] h-44 md:h-52 w-full relative overflow-hidden">
                                <div className="absolute inset-0 opacity-40">
                                    <svg className="w-full h-full" viewBox="0 0 400 200">
                                        <defs>
                                            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                            </linearGradient>
                                        </defs>
                                        {/* Grid lines */}
                                        <path d="M0 50 H400" stroke="#333" strokeWidth="0.5" />
                                        <path d="M0 100 H400" stroke="#333" strokeWidth="0.5" />
                                        <path d="M0 150 H400" stroke="#333" strokeWidth="0.5" />
                                        <path d="M100 0 V200" stroke="#333" strokeWidth="0.5" />
                                        <path d="M200 0 V200" stroke="#333" strokeWidth="0.5" />
                                        <path d="M300 0 V200" stroke="#333" strokeWidth="0.5" />
                                        {/* Route path */}
                                        <path
                                            d="M50 150 Q100 100 150 120 T250 80 T350 60"
                                            fill="none"
                                            stroke="url(#routeGradient)"
                                            strokeWidth="2"
                                            strokeDasharray="8 4"
                                            className="animate-pulse"
                                        />
                                    </svg>
                                </div>
                                {/* Location pins */}
                                <div className="absolute top-[75%] left-[12%] w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                                <div className="absolute top-[60%] left-[37%] w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.6)]" />
                                <div className="absolute top-[40%] left-[62%] w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(192,132,252,0.6)]" />
                                <div className="absolute top-[30%] left-[87%] w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                                {/* Stats overlay */}
                                <div className="absolute bottom-3 left-3 right-3 flex gap-3">
                                    <div className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06] text-xs">
                                        <span className="text-zinc-500">Drive time</span>
                                        <span className="text-white ml-2 font-medium">-40%</span>
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06] text-xs">
                                        <span className="text-zinc-500">Jobs/day</span>
                                        <span className="text-emerald-400 ml-2 font-medium">+3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* TALL: Mobile App - 2 cols */}
                    <ScrollReveal delay="100" className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 relative overflow-hidden group min-h-[380px] h-full">
                            <div className="relative z-10 mb-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                    <i className="fa-solid fa-mobile-screen text-brand-accent-light text-lg md:text-xl"></i>
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 tracking-[-0.02em]">Technician App</h3>
                                <p className="text-zinc-400 text-base">Offline-first. Lightning fast.</p>
                            </div>
                            {/* Phone Mockup */}
                            <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[180px] md:w-[200px] h-[280px] md:h-[300px] bg-black border-[5px] border-zinc-800 rounded-[28px] shadow-2xl overflow-hidden">
                                <div className="w-full h-full bg-zinc-950 p-3 relative">
                                    <div className="flex justify-between items-center mb-4 px-1">
                                        <div className="text-[9px] font-semibold text-white">9:41</div>
                                        <div className="flex gap-0.5">
                                            <div className="w-2.5 h-1 bg-white rounded-full" />
                                            <div className="w-1 h-1 bg-white/50 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="bg-zinc-900 rounded-lg p-2.5 border border-white/[0.08] mb-2">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <div className="text-[8px] text-zinc-500 uppercase tracking-wider">Next Job</div>
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        </div>
                                        <div className="text-xs text-white font-medium">1240 Market St</div>
                                        <div className="text-[9px] text-zinc-500">San Francisco</div>
                                    </div>
                                    <div className="bg-blue-600 rounded-lg p-2.5 flex items-center justify-center gap-1.5">
                                        <i className="fa-solid fa-location-arrow text-white text-[10px]"></i>
                                        <span className="text-xs text-white font-medium">Start Route</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Bento Grid - Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 mb-4 md:mb-5">

                    {/* Route Optimization - 2 cols */}
                    <ScrollReveal className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[280px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                <i className="fa-solid fa-route text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-[-0.02em]">Route Optimization</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">Real-time traffic adaptation and multi-stop planning.</p>
                            <div className="mt-auto pt-4 border-t border-white/[0.04]">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-semibold text-white tracking-tighter">2-3</span>
                                    <span className="text-zinc-500 text-sm">hrs saved daily</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Instant Payments - 2 cols */}
                    <ScrollReveal delay="50" className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[280px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                <i className="fa-solid fa-bolt text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-[-0.02em]">Instant Payments</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">Get paid on-site. Cards, ACH, digital wallets.</p>
                            <div className="mt-auto pt-4 border-t border-white/[0.04] flex items-end justify-between">
                                <div>
                                    <span className="text-3xl font-semibold text-white tracking-tighter">0.8</span>
                                    <span className="text-zinc-500 text-lg">%</span>
                                </div>
                                <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                    Lowest fee
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Customer CRM - 2 cols */}
                    <ScrollReveal delay="100" className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[280px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                <i className="fa-regular fa-user text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-[-0.02em]">Customer CRM</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">Every interaction logged. Full history at a glance.</p>
                            <div className="mt-auto space-y-2">
                                <div className="flex gap-2 items-start">
                                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex-shrink-0" />
                                    <div className="p-2 bg-zinc-800/80 rounded-xl rounded-tl-none border border-white/[0.04] text-xs text-zinc-300">
                                        Great service!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Bento Grid - Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 mb-4 md:mb-5">

                    {/* Automated Workflows - 3 cols */}
                    <ScrollReveal className="md:col-span-3">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[260px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                <i className="fa-solid fa-gears text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-[-0.02em]">Automated Workflows</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">Trigger-based automation for notifications, follow-ups, and invoicing.</p>
                            <div className="mt-auto pt-5 flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/60 border border-white/[0.06]">
                                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                                    <span className="text-xs text-zinc-400">Job completed</span>
                                </div>
                                <i className="fa-solid fa-arrow-right text-zinc-600 text-xs"></i>
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/60 border border-white/[0.06]">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span className="text-xs text-zinc-400">Invoice sent</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Customer Portal - 3 cols */}
                    <ScrollReveal delay="50" className="md:col-span-3">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[260px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                <i className="fa-solid fa-users text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-[-0.02em]">Customer Portal</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">Self-service booking, real-time tracking, instant communication.</p>
                            <div className="mt-auto pt-5">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-semibold text-white tracking-tighter">70%</span>
                                    <span className="text-zinc-500 text-sm">fewer support calls</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Bento Grid - Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 mb-4 md:mb-5">

                    {/* Inventory Management - 2 cols TALL */}
                    <ScrollReveal className="md:col-span-2 md:row-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[400px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-5 border border-brand-accent/20">
                                <i className="fa-solid fa-boxes-stacked text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-[-0.02em]">Inventory</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-5">Track parts across trucks and warehouses.</p>

                            {/* Inventory bars */}
                            <div className="space-y-3 flex-1">
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-zinc-400">HVAC Filters</span>
                                        <span className="text-zinc-500">24</span>
                                    </div>
                                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                                        <div className="h-full w-[80%] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-zinc-400">Copper Tubing</span>
                                        <span className="text-zinc-500">156</span>
                                    </div>
                                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                                        <div className="h-full w-[95%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-zinc-400">Thermostats</span>
                                        <span className="text-red-400">8</span>
                                    </div>
                                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                                        <div className="h-full w-[20%] bg-gradient-to-r from-red-500 to-rose-500 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                <span>3 items low stock</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Analytics - 2 cols */}
                    <ScrollReveal delay="50" className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[190px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-4 border border-brand-accent/20">
                                <i className="fa-solid fa-chart-line text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1 tracking-[-0.02em]">Analytics</h3>
                            <p className="text-zinc-500 text-sm">Real-time KPIs and insights</p>
                        </div>
                    </ScrollReveal>

                    {/* Custom Forms - 2 cols */}
                    <ScrollReveal delay="100" className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[190px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-4 border border-brand-accent/20">
                                <i className="fa-solid fa-list-check text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1 tracking-[-0.02em]">Custom Forms</h3>
                            <p className="text-zinc-500 text-sm">Checklists with photo requirements</p>
                        </div>
                    </ScrollReveal>

                    {/* Team Collaboration - 2 cols */}
                    <ScrollReveal delay="50" className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[190px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-4 border border-brand-accent/20">
                                <i className="fa-solid fa-comments text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1 tracking-[-0.02em]">Team Chat</h3>
                            <p className="text-zinc-500 text-sm">Built-in messaging and file sharing</p>
                        </div>
                    </ScrollReveal>

                    {/* Compliance - 2 cols */}
                    <ScrollReveal delay="100" className="md:col-span-2">
                        <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col group h-full min-h-[190px]">
                            <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-4 border border-brand-accent/20">
                                <i className="fa-solid fa-shield-halved text-brand-accent-light text-lg"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1 tracking-[-0.02em]">Compliance</h3>
                            <p className="text-zinc-500 text-sm">Safety checklists and certifications</p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Bento Grid - Row 5: Integrations (Full Width) */}
                <ScrollReveal>
                    <div className="card-spotlight rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 group">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-4 border border-brand-accent/20">
                                    <i className="fa-solid fa-plug text-brand-accent-light text-lg"></i>
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-[-0.02em]">Integrations</h3>
                                <p className="text-zinc-400 text-sm md:text-base">Connect with 50+ tools you already use.</p>
                            </div>
                            <div className="flex flex-wrap gap-3 md:gap-4">
                                {['QuickBooks', 'Stripe', 'Slack', 'Calendar', 'Salesforce'].map((name) => (
                                    <div key={name} className="px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/[0.06] text-sm text-zinc-300 font-medium">
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default FeaturesSection;