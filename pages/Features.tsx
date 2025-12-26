import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Features: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <ScrollReveal>
                <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-8">
                    Built for <br /><span className="text-zinc-600">complexity.</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mb-24">
                    Shyft handles the heavy lifting of field operations. From AI-driven dispatch to instant payments, we've engineered every pixel to save you time.
                </p>
            </ScrollReveal>

            {/* Feature 1: Dispatch */}
            <section className="mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <ScrollReveal>
                        <div className="relative aspect-square bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            {/* Abstract Map UI */}
                            <div className="relative w-3/4 h-3/4 bg-black rounded-xl border border-white/10 p-4 shadow-2xl">
                                <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <div className="space-y-3">
                                    <div className="h-2 w-1/3 bg-zinc-800 rounded"></div>
                                    <div className="h-32 bg-zinc-900/50 rounded-lg border border-white/5 relative overflow-hidden">
                                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                            <path d="M 20 20 L 50 50 L 80 30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                                            <circle cx="20" cy="20" r="3" fill="white" />
                                            <circle cx="80" cy="30" r="3" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800"></div>
                                        <div className="space-y-1">
                                            <div className="h-2 w-24 bg-zinc-800 rounded"></div>
                                            <div className="h-2 w-16 bg-zinc-800 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay="100">
                        <h3 className="text-3xl font-medium text-white mb-4">Autonomous Dispatch</h3>
                        <p className="text-lg text-zinc-400 mb-6">
                            Stop playing Tetris with your calendar. Our routing engine analyzes traffic, technician skill set, and job priority to build the perfect schedule in milliseconds.
                        </p>
                        <ul className="space-y-3 text-zinc-500">
                            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-blue-500"></i> Real-time traffic adaptation</li>
                            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-blue-500"></i> Skill-based matching</li>
                            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-blue-500"></i> Multi-day project support</li>
                        </ul>
                    </ScrollReveal>
                </div>
            </section>

            {/* Feature 2: Mobile */}
            <section className="mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                    <ScrollReveal delay="100" className="md:order-2">
                         <div className="relative aspect-square bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
                            {/* Phone UI */}
                            <div className="w-[200px] h-[380px] bg-black border-[6px] border-zinc-800 rounded-[30px] p-4 relative shadow-2xl">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-800 rounded-b-xl z-10"></div>
                                <div className="mt-6 space-y-4">
                                    <div className="bg-zinc-900 p-3 rounded-lg border border-white/10">
                                        <div className="text-[10px] text-zinc-500 uppercase">Status</div>
                                        <div className="text-white font-medium">En Route</div>
                                    </div>
                                    <div className="bg-blue-600 p-3 rounded-lg text-white">
                                        <div className="flex justify-between items-center">
                                            <span>Start Job</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </div>
                                    <div className="h-32 bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center text-zinc-700">
                                        <i className="fa-solid fa-camera text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </ScrollReveal>
                    <ScrollReveal className="md:order-1">
                        <h3 className="text-3xl font-medium text-white mb-4">The Technician OS</h3>
                        <p className="text-lg text-zinc-400 mb-6">
                            Give your team a tool they'll actually love. Works completely offline, syncs instantly when back online.
                        </p>
                        <ul className="space-y-3 text-zinc-500">
                            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-white"></i> Offline mode</li>
                            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-white"></i> Photo & signature capture</li>
                            <li className="flex items-center gap-3"><i className="fa-solid fa-check text-white"></i> Integrated inventory</li>
                        </ul>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default Features;