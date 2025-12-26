import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Page } from '../App';

interface PricingSectionProps {
    onNavigate?: (page: Page) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
    return (
        <section id="pricing" className="py-32 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <ScrollReveal>
                    <div className="mb-20">
                        {/* Value-first messaging before pricing */}
                        <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">
                            After you've seen what Shyft can do
                        </p>
                        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
                            Predictable pricing.
                        </h2>
                        <p className="text-xl text-zinc-400">
                            Start for free. Scale as you grow.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free - De-emphasized */}
                    <div className="p-8 rounded-3xl border border-white/5 bg-zinc-950/30 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-white mb-2">Starter</h3>
                            <p className="text-zinc-500 text-sm">For individuals.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-3xl font-semibold text-zinc-400">Free</span>
                        </div>
                        <ul className="space-y-4 text-sm text-zinc-400 flex-1 mb-8">
                            <li className="flex gap-3"><span className="text-zinc-500">✓</span> 1 User</li>
                            <li className="flex gap-3"><span className="text-zinc-500">✓</span> 20 Jobs / mo</li>
                            <li className="flex gap-3"><span className="text-zinc-500">✓</span> Basic Mobile App</li>
                        </ul>
                        <button className="w-full py-3 rounded-full border border-white/10 text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-all">Get Started</button>
                    </div>

                    {/* Pro - Subtle highlight */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/40 flex flex-col relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 text-white text-[10px] font-medium uppercase tracking-wider rounded-full border border-white/20">
                            Popular
                        </div>
                        <div className="mb-8 mt-2">
                            <h3 className="text-lg font-medium text-white mb-2">Pro</h3>
                            <p className="text-zinc-500 text-sm">For growing teams.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-white">$29</span>
                            <span className="text-zinc-500"> / user</span>
                        </div>
                        <ul className="space-y-4 text-sm text-zinc-300 flex-1 mb-8">
                            <li className="flex gap-3"><span className="text-blue-400">✓</span> Unlimited Jobs</li>
                            <li className="flex gap-3"><span className="text-blue-400">✓</span> Route Optimization</li>
                            <li className="flex gap-3"><span className="text-blue-400">✓</span> QuickBooks Sync</li>
                        </ul>
                        <button className="w-full py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all">Start Trial</button>
                    </div>

                    {/* Enterprise - Subtle */}
                    <div className="p-8 rounded-3xl border border-white/5 bg-zinc-950/30 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-white mb-2">Enterprise</h3>
                            <p className="text-zinc-500 text-sm">For organizations.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-3xl font-semibold text-zinc-300">Custom</span>
                        </div>
                        <ul className="space-y-4 text-sm text-zinc-400 flex-1 mb-8">
                            <li className="flex gap-3"><span className="text-zinc-500">✓</span> SSO & Audit Logs</li>
                            <li className="flex gap-3"><span className="text-zinc-500">✓</span> Dedicated Support</li>
                            <li className="flex gap-3"><span className="text-zinc-500">✓</span> Custom API</li>
                        </ul>
                        <button
                            onClick={() => onNavigate?.('enterprise')}
                            className="w-full py-3 rounded-full border border-white/10 text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-all"
                        >
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;