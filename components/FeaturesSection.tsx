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
                    <div className="mb-24">
                        <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
                            Designed for <span className="text-zinc-600">focus.</span>
                        </h2>
                        <p className="text-xl text-zinc-300 max-w-xl">
                            Everything you need to run your business, without the clutter.
                            Engineered for speed and reliability.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Bento Grid 2.0 */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 min-h-[800px]">

                    {/* Large Card: Scheduling */}
                    <div className="md:col-span-4 card-spotlight rounded-3xl border border-white/10 bg-zinc-900/20 p-8 flex flex-col justify-between group overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 border border-blue-500/30">
                                <i className="fa-regular fa-calendar text-blue-400 text-xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">Intelligent Scheduling</h3>
                            <p className="text-zinc-400 max-w-sm text-lg">Drag, drop, done. Shyft automatically resolves conflicts and optimizes travel routes.</p>
                        </div>

                        {/* Visual: Gantt/Timeline View */}
                        <div className="mt-8 bg-zinc-950/50 rounded-xl border border-white/10 h-56 w-full relative overflow-hidden shadow-2xl">
                            {/* Header */}
                            <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 flex items-center px-4 gap-4 bg-zinc-900/50">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="h-1.5 rounded-full bg-zinc-800 w-24" />
                            </div>

                            {/* Timeline Rows */}
                            <div className="p-4 pt-14 space-y-3">
                                {/* Row 1 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-medium">JD</div>
                                    <div className="flex-1 h-8 rounded-lg bg-zinc-900 overflow-hidden relative">
                                        <div className="absolute top-1 bottom-1 left-4 w-32 bg-blue-500/20 border border-blue-500/30 rounded flex items-center px-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
                                            <div className="h-1.5 w-16 bg-blue-400/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                {/* Row 2 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-medium">AS</div>
                                    <div className="flex-1 h-8 rounded-lg bg-zinc-900 overflow-hidden relative">
                                        <div className="absolute top-1 bottom-1 left-40 w-24 bg-purple-500/20 border border-purple-500/30 rounded flex items-center px-2">
                                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-2" />
                                            <div className="h-1.5 w-12 bg-purple-400/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                {/* Row 3 */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-medium">MR</div>
                                    <div className="flex-1 h-8 rounded-lg bg-zinc-900 overflow-hidden relative">
                                        <div className="absolute top-1 bottom-1 left-12 w-40 bg-emerald-500/20 border border-emerald-500/30 rounded flex items-center px-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
                                            <div className="h-1.5 w-20 bg-emerald-400/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tall Card: Mobile */}
                    <div className="md:col-span-2 card-spotlight rounded-3xl border border-white/10 bg-zinc-900/20 p-8 relative overflow-hidden group min-h-[400px]">
                        <div className="relative z-10 mb-8">
                            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                                <i className="fa-solid fa-mobile-screen text-white text-xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">Tech App</h3>
                            <p className="text-zinc-400">Offline-first. Always fast.</p>
                        </div>
                        {/* Visual: Phone Mockup */}
                        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[240px] h-[340px] bg-black border-[6px] border-zinc-800 rounded-[32px] shadow-2xl overflow-hidden">
                            {/* Phone Screen */}
                            <div className="w-full h-full bg-zinc-950 p-4 relative">
                                {/* Status Bar */}
                                <div className="flex justify-between items-center mb-6 px-1">
                                    <div className="text-[10px] font-bold text-white">9:41</div>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-1 bg-white rounded-full" />
                                        <div className="w-1 h-1 bg-white/50 rounded-full" />
                                    </div>
                                </div>

                                {/* Map Overlay */}
                                <div className="absolute inset-x-0 top-0 h-40 bg-zinc-900/50 z-0">
                                    <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M0 20 Q 30 10 50 50 T 100 80" fill="none" stroke="#444" strokeWidth="1" />
                                        <path d="M20 0 V 100" fill="none" stroke="#333" strokeWidth="0.5" />
                                        <path d="M80 0 V 100" fill="none" stroke="#333" strokeWidth="0.5" />
                                    </svg>
                                </div>

                                {/* Job Card */}
                                <div className="relative z-10 mt-20">
                                    <div className="bg-zinc-900 rounded-xl p-3 border border-white/10 shadow-lg mb-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Up Next</div>
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        </div>
                                        <div className="text-sm text-white font-medium mb-0.5">1240 Market St</div>
                                        <div className="text-[10px] text-zinc-400">San Francisco, CA</div>
                                    </div>

                                    <div className="bg-blue-600 rounded-xl p-3 border border-blue-500 shadow-lg flex items-center justify-center gap-2">
                                        <i className="fa-solid fa-location-arrow text-white text-xs"></i>
                                        <span className="text-sm text-white font-medium">Start Route</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wide Card: Finance */}
                    <div className="md:col-span-3 card-spotlight rounded-3xl border border-white/10 bg-zinc-900/20 p-8 flex flex-col justify-between group h-[340px]">
                        <div>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/30">
                                <i className="fa-solid fa-bolt text-emerald-400 text-xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">Instant Pay</h3>
                            <p className="text-zinc-400 max-w-xs">Get paid the moment the job is done.</p>
                        </div>
                        <div className="flex items-end justify-between border-t border-white/5 pt-6 mt-6">
                            <div className="flex flex-col">
                                <span className="text-zinc-500 text-sm mb-1">Processing Fee</span>
                                <span className="text-5xl font-bold text-white tracking-tighter">0.8<span className="text-2xl text-zinc-500">%</span></span>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                                Lowest in class
                            </div>
                        </div>
                    </div>

                    {/* Box Card: CRM */}
                    <div className="md:col-span-3 card-spotlight rounded-3xl border border-white/10 bg-zinc-900/20 p-8 flex flex-col group h-[340px]">
                        <div>
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-500/30">
                                <i className="fa-regular fa-user text-purple-400 text-xl"></i>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">Customer CRM</h3>
                            <p className="text-zinc-400">Every interaction, logged automatically.</p>
                        </div>

                        <div className="mt-auto space-y-3 relative">
                            {/* Chat Bubbles */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-700 flex-shrink-0" />
                                <div className="p-3 bg-zinc-800 rounded-2xl rounded-tl-none border border-white/5 text-sm text-zinc-300">
                                    Technician was great!
                                </div>
                            </div>
                            <div className="flex gap-3 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                                    <i className="fa-solid fa-headset text-xs text-white"></i>
                                </div>
                                <div className="p-3 bg-blue-600/20 rounded-2xl rounded-tr-none border border-blue-500/20 text-sm text-blue-200">
                                    Thanks! Invoice sent.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;