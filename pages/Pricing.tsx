import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Pricing: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-semibold text-white tracking-tight mb-6">Plans for every stage.</h1>
                    <p className="text-xl text-zinc-400">Transparent pricing. No contracts.</p>
                </div>
            </ScrollReveal>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/30">
                    <h3 className="text-white font-medium mb-2">Starter</h3>
                    <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                    <button className="w-full py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all mb-8">Get Started</button>
                    <p className="text-sm text-zinc-500">Perfect for side hustles.</p>
                </div>
                
                <div className="p-8 rounded-3xl border border-blue-500/30 bg-blue-900/10 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-blue-500"></div>
                    <h3 className="text-white font-medium mb-2">Pro</h3>
                    <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-zinc-500 font-normal">/user</span></div>
                    <button className="w-full py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all mb-8">Start Trial</button>
                    <p className="text-sm text-zinc-500">For growing businesses.</p>
                </div>

                <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/30">
                    <h3 className="text-white font-medium mb-2">Enterprise</h3>
                    <div className="text-4xl font-bold text-white mb-6">Custom</div>
                    <button className="w-full py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all mb-8">Contact Sales</button>
                    <p className="text-sm text-zinc-500">For global fleets.</p>
                </div>
            </div>

            {/* Comparison Table */}
            <ScrollReveal>
                <div className="border-t border-white/10 pt-16">
                    <h3 className="text-2xl text-white mb-12">Compare features</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 text-zinc-500 font-medium w-1/2">Features</th>
                                    <th className="py-4 text-white font-medium w-1/6">Starter</th>
                                    <th className="py-4 text-blue-400 font-medium w-1/6">Pro</th>
                                    <th className="py-4 text-white font-medium w-1/6">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-400">
                                <tr className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-4">Mobile App Access</td>
                                    <td className="py-4 text-white">✓</td>
                                    <td className="py-4 text-white">✓</td>
                                    <td className="py-4 text-white">✓</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-4">Jobs per month</td>
                                    <td className="py-4">20</td>
                                    <td className="py-4 text-white">Unlimited</td>
                                    <td className="py-4 text-white">Unlimited</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-4">Route Optimization</td>
                                    <td className="py-4">-</td>
                                    <td className="py-4 text-white">✓</td>
                                    <td className="py-4 text-white">✓</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-4">QuickBooks Sync</td>
                                    <td className="py-4">-</td>
                                    <td className="py-4 text-white">✓</td>
                                    <td className="py-4 text-white">✓</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-4">API Access</td>
                                    <td className="py-4">-</td>
                                    <td className="py-4">-</td>
                                    <td className="py-4 text-white">✓</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-4">SLA Support</td>
                                    <td className="py-4">-</td>
                                    <td className="py-4">-</td>
                                    <td className="py-4 text-white">✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Pricing;