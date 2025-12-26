import React from 'react';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import GradientText from './GradientText';

const HeroSection: React.FC = () => {
    return (
        <section className="relative pt-32 md:pt-40 pb-32 lg:pt-48 lg:pb-40 overflow-hidden cinematic-bg">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Central Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                <ScrollReveal>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm text-zinc-300">Now serving 15,000+ teams worldwide</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
                        Orchestrate{' '}
                        <br className="hidden sm:block" />
                        <GradientText
                            colors={['#60a5fa', '#a78bfa', '#22d3ee']}
                            className="font-bold"
                        >
                            the field.
                        </GradientText>
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        The all-in-one platform for modern service teams.
                        <br className="hidden sm:block" />
                        <span className="text-zinc-500">Beautifully simple. Insanely powerful.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-20 md:mb-28">
                        <MagneticButton variant="primary" size="lg">
                            <span>Start free trial</span>
                            <i className="fa-solid fa-arrow-right text-sm ml-2" />
                        </MagneticButton>
                        <MagneticButton variant="secondary" size="lg">
                            <i className="fa-solid fa-play text-xs mr-2" />
                            Watch the film
                        </MagneticButton>
                    </div>
                </ScrollReveal>

                {/* Dashboard Visual */}
                <ScrollReveal delay="200" className="w-full">
                    <div className="relative w-full max-w-5xl mx-auto">
                        {/* Glow behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-blue-500/15 blur-[100px] rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-purple-500/10 blur-[80px] rounded-full" />

                        {/* The Screen */}
                        <div className="relative bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                            {/* Header */}
                            <div className="h-10 md:h-12 border-b border-white/10 bg-zinc-950 flex items-center px-4 justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                                </div>
                                <div className="flex-1 max-w-xs mx-4">
                                    <div className="bg-zinc-900/50 rounded-lg px-3 py-1.5 text-xs text-zinc-500 text-center border border-white/5">
                                        app.shyft.io/dashboard
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono text-zinc-600">v2.4</div>
                            </div>

                            {/* UI Body */}
                            <div className="flex h-72 md:h-96 bg-zinc-950">
                                {/* Sidebar */}
                                <div className="w-14 md:w-56 border-r border-white/5 p-3 md:p-4 flex flex-col gap-1">
                                    <div className="h-8 w-full bg-white/10 rounded flex items-center px-3 text-xs text-white font-medium">
                                        <i className="fa-solid fa-gauge-high md:mr-3" />
                                        <span className="hidden md:inline">Dashboard</span>
                                    </div>
                                    {['fa-calendar-days', 'fa-users', 'fa-briefcase', 'fa-file-invoice'].map((icon, i) => (
                                        <div key={i} className="h-8 w-full hover:bg-white/5 rounded flex items-center px-3 text-xs text-zinc-500 transition-colors cursor-pointer">
                                            <i className={`fa-solid ${icon} md:mr-3`} />
                                            <span className="hidden md:inline">{['Schedule', 'Team', 'Jobs', 'Invoices'][i]}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Main View */}
                                <div className="flex-1 p-4 md:p-6 relative overflow-hidden">
                                    {/* Map Background */}
                                    <div className="absolute inset-0 opacity-10">
                                        <svg className="w-full h-full" viewBox="0 0 400 300">
                                            {[...Array(6)].map((_, i) => (
                                                <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#444" strokeWidth="0.5" />
                                            ))}
                                            {[...Array(8)].map((_, i) => (
                                                <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#444" strokeWidth="0.5" />
                                            ))}
                                            <path d="M 50 150 Q 150 80 250 150 T 380 100" fill="none" stroke="#555" strokeWidth="2" />
                                            <path d="M 180 0 Q 160 150 200 300" fill="none" stroke="#555" strokeWidth="2" />
                                        </svg>
                                    </div>

                                    {/* Floating Cards */}
                                    <div className="relative z-10 flex flex-col md:flex-row gap-4">
                                        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl animate-float flex-1 max-w-xs">
                                            <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Revenue</div>
                                            <div className="text-2xl md:text-3xl font-bold text-white">$12,404</div>
                                            <div className="flex items-center gap-1 text-emerald-500 text-sm mt-1">
                                                <i className="fa-solid fa-arrow-up text-[10px]" />
                                                <span>12% this week</span>
                                            </div>
                                        </div>
                                        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl animate-float flex-1 max-w-xs" style={{ animationDelay: '1s' }}>
                                            <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Active Jobs</div>
                                            <div className="text-2xl md:text-3xl font-bold text-white">24</div>
                                            <div className="flex -space-x-2 mt-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-black flex items-center justify-center text-[10px] text-white font-medium">M</div>
                                                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-black flex items-center justify-center text-[10px] text-white font-medium">S</div>
                                                <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-black flex items-center justify-center text-[10px] text-white font-medium">J</div>
                                                <div className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-black flex items-center justify-center text-[10px] text-white font-medium">+5</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Route Visualization */}
                                    <div className="absolute bottom-4 right-4 w-48 md:w-64 bg-black/90 backdrop-blur border border-white/10 rounded-xl p-3 hidden sm:block">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs text-white font-bold">MS</div>
                                            <div>
                                                <div className="text-sm text-white font-medium">Mike S.</div>
                                                <div className="text-xs text-zinc-400">Arriving in 4m</div>
                                            </div>
                                        </div>
                                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-[80%] rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Gradient Fade at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default HeroSection;