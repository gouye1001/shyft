import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import GradientText from './GradientText';
import { useAuth } from '../src/context/AuthContext';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartTrial = () => {
        navigate(isAuthenticated ? '/dashboard' : '/signup');
    };

    const handleWatchFilm = () => {
        // Navigate to features section as a demo showcase
        navigate('/features');
    };

    return (
        <section className="relative pt-32 md:pt-48 pb-32 lg:pt-56 lg:pb-48 overflow-hidden bg-black selection:bg-blue-500/30">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-radial from-blue-900/20 via-black to-black opacity-50" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                {/* Subtle Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                <ScrollReveal>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-2xl shadow-brand-accent/10 hover:bg-white/10 transition-colors cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                        </span>
                        <span className="text-sm font-medium text-brand-accent-light">v2.4 is now live</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] mb-8 bg-gradient-to-b from-white via-white/90 to-zinc-500 bg-clip-text text-transparent">
                        Built for teams{' '}
                        <br className="hidden sm:block" />
                        that move.
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-normal leading-relaxed">
                        The modern platform for field service management.
                        <br className="hidden sm:block" />
                        <span className="text-zinc-500">Dispatch. Track. Deliver.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
                        <MagneticButton variant="primary" size="lg" className="shadow-lg shadow-brand-accent/20" onClick={handleStartTrial}>
                            <span className="font-semibold">{isAuthenticated ? 'Go to Dashboard' : 'Start free trial'}</span>
                            <i className="fa-solid fa-arrow-right text-sm ml-2" />
                        </MagneticButton>
                        <MagneticButton variant="secondary" size="lg" onClick={handleWatchFilm}>
                            <i className="fa-solid fa-play text-xs mr-2" />
                            <span className="font-medium">Watch the film</span>
                        </MagneticButton>
                    </div>

                    {/* Customer Logos - Early Social Proof */}
                    <div className="mb-20 md:mb-28">
                        <p className="text-sm text-zinc-500 mb-8 uppercase tracking-widest">
                            Trusted by 15,000+ service teams
                        </p>
                        <div className="flex flex-wrap gap-x-10 gap-y-4 items-center justify-center opacity-50 hover:opacity-80 transition-opacity duration-500">
                            {['Acme Corp', 'TechServ', 'ProFix', 'CleanCo', 'FastRepair'].map((company) => (
                                <div key={company} className="text-lg font-semibold text-white tracking-tight cursor-default">
                                    {company}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Dashboard Visualization */}
                <ScrollReveal delay="200" className="w-full">
                    <div className="relative w-full max-w-6xl mx-auto md:perspective-[2000px]">
                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

                        {/* Main Interface Window */}
                        <div className="relative bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl shadow-black/80 overflow-hidden md:rotate-x-[20deg] md:translate-y-10 group transition-transform duration-700 ease-out hover:rotate-x-0 hover:translate-y-0">
                            {/* Window Decor */}
                            <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-4 backdrop-blur-md">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/5" />
                                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/5" />
                                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/5" />
                                </div>
                                <div className="h-5 w-64 bg-zinc-900/50 rounded-full border border-white/5" />
                                <div className="w-4" />
                            </div>

                            {/* App Content */}
                            <div className="grid grid-cols-[240px_1fr] h-[600px] text-left">
                                {/* Sidebar */}
                                <div className="border-r border-white/5 bg-zinc-900/20 p-4 space-y-6 hidden md:block">
                                    <div className="flex items-center gap-2 px-2">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
                                        <div className="h-3 w-20 bg-zinc-800 rounded-full" />
                                    </div>
                                    <div className="space-y-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className={`h-9 rounded-lg flex items-center px-3 gap-3 ${i === 1 ? 'bg-white/5 text-white' : 'text-zinc-600'}`}>
                                                <div className={`w-4 h-4 rounded ${i === 1 ? 'bg-blue-500/50' : 'bg-zinc-800'}`} />
                                                <div className={`h-2 rounded-full ${i === 1 ? 'w-24 bg-zinc-700' : 'w-16 bg-zinc-800'}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Area */}
                                <div className="p-8 bg-[#050505]">
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="space-y-2">
                                            <div className="h-6 w-48 bg-zinc-800 rounded-lg" />
                                            <div className="h-4 w-32 bg-zinc-900 rounded-lg" />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5" />
                                            <div className="w-24 h-10 rounded-lg bg-blue-600 border border-blue-500 flex items-center justify-center">
                                                <div className="h-3 w-12 bg-white/20 rounded-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-3 gap-6">
                                        {/* Large Map Card */}
                                        <div className="col-span-2 h-80 rounded-2xl bg-zinc-900/30 border border-white/5 relative overflow-hidden group/card">
                                            <div className="absolute inset-0 opacity-20">
                                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                    <path d="M0 20 Q 50 10 100 40" stroke="#fff" fill="none" />
                                                    <path d="M0 60 Q 50 80 100 50" stroke="#fff" fill="none" />
                                                </svg>
                                            </div>
                                            {/* Floating Pins */}
                                            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse" />
                                            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)] animate-pulse" style={{ animationDelay: '1s' }} />
                                        </div>

                                        {/* Stats Cards */}
                                        <div className="space-y-6">
                                            <div className="h-36 rounded-2xl bg-zinc-900/30 border border-white/5 p-5">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 mb-4" />
                                                <div className="h-6 w-24 bg-zinc-800 rounded-lg mb-2" />
                                                <div className="h-4 w-16 bg-zinc-900 rounded-lg" />
                                            </div>
                                            <div className="h-36 rounded-2xl bg-zinc-900/30 border border-white/5 p-5">
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 mb-4" />
                                                <div className="h-6 w-24 bg-zinc-800 rounded-lg mb-2" />
                                                <div className="h-4 w-16 bg-zinc-900 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default HeroSection;