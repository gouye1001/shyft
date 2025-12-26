import React from 'react';
import ScrollReveal from './ScrollReveal';

interface IntegrationsSectionProps {
    className?: string;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ className = '' }) => {
    const integrations = [
        { name: 'QuickBooks', icon: 'fa-book', color: 'text-emerald-400' },
        { name: 'Stripe', icon: 'fa-credit-card', color: 'text-purple-400' },
        { name: 'Slack', icon: 'fa-slack', color: 'text-yellow-400' },
        { name: 'Google Calendar', icon: 'fa-calendar', color: 'text-blue-400' },
        { name: 'Salesforce', icon: 'fa-cloud', color: 'text-cyan-400' },
        { name: 'Zapier', icon: 'fa-bolt', color: 'text-orange-400' }
    ];

    return (
        <section className={`py-20 ${className}`}>
            <ScrollReveal>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <i className="fa-solid fa-plug text-purple-400 text-sm" />
                        <span className="text-sm text-purple-300">50+ Integrations</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                        Connects with your stack
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Seamlessly integrate with the tools you already use. Two-way sync means your data is always up to date.
                    </p>
                </div>
            </ScrollReveal>

            {/* Integration Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                {integrations.map((integration, index) => (
                    <ScrollReveal key={index} delay={`${index * 50}`}>
                        <div className="aspect-square p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all group flex flex-col items-center justify-center">
                            <div className="w-16 h-16 mb-3 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                <i className={`fa-brands ${integration.icon} text-3xl ${integration.color}`} />
                            </div>
                            <div className="text-sm text-zinc-400 text-center">{integration.name}</div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* CTA */}
            <ScrollReveal>
                <div className="text-center">
                    <p className="text-zinc-500 mb-4">And 40+ more integrations available</p>
                    <button className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        View all integrations
                        <i className="fa-solid fa-arrow-right ml-2" />
                    </button>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default IntegrationsSection;
