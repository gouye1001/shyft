import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const PricingSection: React.FC = () => {
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
                        <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                        <div className="text-3xl font-bold text-white mb-1">Free</div>
                        <p className="text-zinc-500 text-sm mb-6">For individuals getting started</p>
                        <ul className="space-y-3 text-sm text-zinc-400 mb-8 flex-grow">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-zinc-500" />
                                Up to 3 team members
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-zinc-500" />
                                Basic scheduling
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-zinc-500" />
                                Mobile app access
                            </li>
                        </ul>
                        <Link
                            to="/signup"
                            className="w-full py-3 rounded-full border border-white/10 text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-all text-center"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Pro - Featured */}
                    <div className="relative p-8 rounded-3xl border-2 border-white/20 bg-zinc-900/50 flex flex-col pt-6">
                        <div className="inline-block self-start px-3 py-1 bg-zinc-900 text-white text-[10px] font-medium uppercase tracking-wider rounded-full border border-white/20 mb-4">
                            Popular
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-bold text-white">$29</span>
                            <span className="text-zinc-500">/user/mo</span>
                        </div>
                        <p className="text-zinc-500 text-sm mb-6">For growing teams</p>
                        <ul className="space-y-3 text-sm text-zinc-300 mb-8 flex-grow">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-white" />
                                Unlimited team members
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-white" />
                                Advanced scheduling
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-white" />
                                Real-time GPS tracking
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-white" />
                                Priority support
                            </li>
                        </ul>
                        <Link
                            to="/signup"
                            className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all text-center"
                        >
                            Start Trial
                        </Link>
                    </div>

                    {/* Enterprise */}
                    <div className="p-8 rounded-3xl border border-white/5 bg-zinc-950/30 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                        <div className="text-3xl font-bold text-white mb-1">Custom</div>
                        <p className="text-zinc-500 text-sm mb-6">For large organizations</p>
                        <ul className="space-y-3 text-sm text-zinc-400 mb-8 flex-grow">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-zinc-500" />
                                SSO & SAML
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-zinc-500" />
                                Dedicated support
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-zinc-500" />
                                Custom integrations
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-check text-xs text-zinc-500" />
                                SLA guarantees
                            </li>
                        </ul>
                        <Link
                            to="/enterprise"
                            className="w-full py-3 rounded-full border border-white/10 text-zinc-400 font-medium hover:bg-white/5 hover:text-white transition-all text-center"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;