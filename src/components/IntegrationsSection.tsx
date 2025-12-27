import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

interface IntegrationsSectionProps {
    className?: string;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ className = '' }) => {
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

    const integrations = [
        { name: 'QuickBooks', icon: 'fa-solid fa-file-invoice-dollar', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { name: 'Stripe', icon: 'fa-brands fa-stripe', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { name: 'Slack', icon: 'fa-brands fa-slack', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        { name: 'Google Calendar', icon: 'fa-brands fa-google', color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { name: 'Salesforce', icon: 'fa-brands fa-salesforce', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { name: 'Zapier', icon: 'fa-solid fa-bolt', color: 'text-orange-400', bg: 'bg-orange-500/10' }
    ];

    return (
        <section
            className={`py-32 relative z-10 ${className}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            <ScrollReveal>
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 transition-colors hover:bg-purple-500/20 cursor-pointer">
                        <i className="fa-solid fa-plug text-purple-400 text-xs" />
                        <span className="text-sm font-medium text-purple-300">50+ Integrations</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
                        Connects with your stack
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Seamlessly integrate with the tools you already use. Two-way sync means your data is always up to date.
                    </p>
                </div>
            </ScrollReveal>

            {/* Integration Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {integrations.map((integration, index) => (
                        <ScrollReveal key={index} delay={`${index * 50}`}>
                            <button className="card-spotlight w-full aspect-square p-6 rounded-3xl bg-zinc-900/20 border border-white/10 flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                <div className={`w-16 h-16 mb-4 rounded-2xl ${integration.bg} border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <i className={`${integration.icon} text-3xl ${integration.color} group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all`} />
                                </div>
                                <div className="text-sm font-medium text-zinc-400 text-center group-hover:text-white transition-colors">{integration.name}</div>
                            </button>
                        </ScrollReveal>
                    ))}
                </div>

                {/* CTA */}
                <ScrollReveal>
                    <div className="text-center">
                        <p className="text-zinc-500 mb-6">And 40+ more integrations available</p>
                        <button className="group px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/10">
                            View all integrations
                            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default IntegrationsSection;
