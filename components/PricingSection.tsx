import React from 'react';
import ScrollReveal from './ScrollReveal';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
                <div className="mb-20">
                     <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
                        Predictable pricing.
                    </h2>
                    <p className="text-xl text-zinc-400">
                        Start for free. Scale as you grow.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free */}
                <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/50 flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-white mb-2">Starter</h3>
                        <p className="text-zinc-500 text-sm">For individuals.</p>
                    </div>
                    <div className="mb-8">
                        <span className="text-4xl font-bold text-white">$0</span>
                    </div>
                    <ul className="space-y-4 text-sm text-zinc-400 flex-1 mb-8">
                        <li className="flex gap-3"><span className="text-white">✓</span> 1 User</li>
                        <li className="flex gap-3"><span className="text-white">✓</span> 20 Jobs / mo</li>
                        <li className="flex gap-3"><span className="text-white">✓</span> Basic Mobile App</li>
                    </ul>
                    <button className="w-full py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all">Start Free</button>
                </div>

                {/* Pro */}
                <div className="p-8 rounded-3xl border border-white/20 bg-zinc-900 flex flex-col relative">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-white mb-2">Pro</h3>
                        <p className="text-zinc-500 text-sm">For growing teams.</p>
                    </div>
                    <div className="mb-8">
                        <span className="text-4xl font-bold text-white">$29</span>
                        <span className="text-zinc-500"> / user</span>
                    </div>
                    <ul className="space-y-4 text-sm text-zinc-300 flex-1 mb-8">
                        <li className="flex gap-3"><span className="text-blue-500">✓</span> Unlimited Jobs</li>
                        <li className="flex gap-3"><span className="text-blue-500">✓</span> Route Optimization</li>
                        <li className="flex gap-3"><span className="text-blue-500">✓</span> QuickBooks Sync</li>
                    </ul>
                    <button className="w-full py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all">Start Trial</button>
                </div>

                {/* Scale */}
                <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/50 flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-white mb-2">Enterprise</h3>
                        <p className="text-zinc-500 text-sm">For organizations.</p>
                    </div>
                    <div className="mb-8">
                        <span className="text-4xl font-bold text-white">Custom</span>
                    </div>
                    <ul className="space-y-4 text-sm text-zinc-400 flex-1 mb-8">
                        <li className="flex gap-3"><span className="text-white">✓</span> SSO & Audit Logs</li>
                        <li className="flex gap-3"><span className="text-white">✓</span> Dedicated Support</li>
                        <li className="flex gap-3"><span className="text-white">✓</span> Custom API</li>
                    </ul>
                    <button className="w-full py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all">Contact Us</button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default PricingSection;