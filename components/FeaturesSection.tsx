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
                    <p className="text-xl text-zinc-400 max-w-xl">
                        Everything you need to run your business, without the clutter. 
                        Engineered for speed and reliability.
                    </p>
                </div>
            </ScrollReveal>

            {/* Bento Grid 2.0 */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[400px]">
                
                {/* Large Card: Scheduling */}
                <div className="md:col-span-4 card-spotlight rounded-3xl border border-white/10 p-10 flex flex-col justify-between group">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <i className="fa-regular fa-calendar text-white text-xl"></i>
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-2">Intelligent Scheduling</h3>
                        <p className="text-zinc-500 max-w-sm">Drag, drop, done. Shyft automatically resolves conflicts and optimizes travel routes in the background.</p>
                    </div>
                    {/* Visual */}
                    <div className="mt-8 bg-zinc-900/50 rounded-xl border border-white/5 h-48 w-full relative overflow-hidden">
                        <div className="absolute top-4 left-4 right-4 h-8 bg-zinc-800 rounded-md"></div>
                        <div className="absolute top-16 left-4 w-32 h-24 bg-blue-600/20 border border-blue-500/30 rounded-md p-2">
                             <div className="text-[10px] text-blue-200 font-medium">Acme Corp Repair</div>
                        </div>
                        <div className="absolute top-24 left-40 w-40 h-24 bg-zinc-800/50 border border-white/5 rounded-md p-2">
                             <div className="text-[10px] text-zinc-400 font-medium">Maintenance</div>
                        </div>
                    </div>
                </div>

                {/* Tall Card: Mobile */}
                <div className="md:col-span-2 card-spotlight rounded-3xl border border-white/10 p-10 relative overflow-hidden group">
                     <div className="relative z-10">
                        <h3 className="text-2xl font-medium text-white mb-2">Tech App</h3>
                        <p className="text-zinc-500">Offline-first. Always fast.</p>
                    </div>
                    {/* Visual */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[300px] bg-black border-t-8 border-x-8 border-zinc-800 rounded-t-[32px]">
                        <div className="p-4 pt-8">
                             <div className="flex justify-between items-end mb-6">
                                <div className="text-2xl text-white font-bold">9:41</div>
                                <div className="h-4 w-4 bg-white rounded-full"></div>
                             </div>
                             <div className="bg-zinc-900 rounded-xl p-4 mb-3 border border-white/10">
                                <div className="text-xs text-zinc-500 mb-1">NEXT JOB</div>
                                <div className="text-white font-medium">1240 Market St</div>
                             </div>
                             <div className="bg-blue-600 rounded-xl p-4 border border-blue-500">
                                <div className="text-xs text-blue-200 mb-1">NAVIGATE</div>
                                <div className="text-white font-medium">Start Route</div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Wide Card: Finance */}
                <div className="md:col-span-3 card-spotlight rounded-3xl border border-white/10 p-10 flex flex-col justify-end group">
                    <div className="mb-auto">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <i className="fa-solid fa-bolt text-white text-xl"></i>
                        </div>
                    </div>
                    <div className="flex justify-between items-end relative z-10">
                        <div>
                            <h3 className="text-2xl font-medium text-white mb-2">Instant Pay</h3>
                            <p className="text-zinc-500 max-w-xs">Get paid the moment the job is done. No hardware required.</p>
                        </div>
                        <div className="text-4xl font-bold text-white tracking-tighter">0.8%</div>
                    </div>
                </div>

                {/* Box Card: CRM */}
                <div className="md:col-span-3 card-spotlight rounded-3xl border border-white/10 p-10 flex flex-col group">
                     <div className="mb-auto">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <i className="fa-regular fa-user text-white text-xl"></i>
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-2">Customer CRM</h3>
                        <p className="text-zinc-500">Every interaction, logged automatically.</p>
                    </div>
                    <div className="space-y-3 mt-8 relative z-10">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-zinc-700"></div>
                            <div className="text-sm text-zinc-300">"Technician was great!"</div>
                        </div>
                         <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-zinc-700"></div>
                            <div className="text-sm text-zinc-300">Invoice #2093 Paid</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default FeaturesSection;