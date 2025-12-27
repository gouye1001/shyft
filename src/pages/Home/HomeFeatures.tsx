import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

const HomeFeatures: React.FC = () => {
    return (
        <section className="py-24 bg-[#060606]">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                            And so much more
                        </h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">
                            Everything you need to run efficient field operations.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: 'fa-credit-card', title: 'Payments', desc: 'Accept cards on-site' },
                        { icon: 'fa-comments', title: 'SMS Updates', desc: 'Automatic ETA texts' },
                        { icon: 'fa-plug', title: 'Integrations', desc: 'QuickBooks, Stripe, 50+' },
                        { icon: 'fa-shield-halved', title: 'Security', desc: 'SOC 2 compliant' },
                        { icon: 'fa-file-invoice', title: 'Invoicing', desc: 'Send in one click' },
                        { icon: 'fa-headset', title: 'Support', desc: '24/7 live chat' },
                        { icon: 'fa-users', title: 'Team Mgmt', desc: 'Unlimited users' },
                        { icon: 'fa-globe', title: 'Multi-location', desc: 'Scale across regions' },
                    ].map((feature, i) => (
                        <ScrollReveal key={i}>
                            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <i className={`fa-solid ${feature.icon} text-white`} />
                                </div>
                                <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                                <p className="text-xs text-zinc-500">{feature.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeFeatures;
