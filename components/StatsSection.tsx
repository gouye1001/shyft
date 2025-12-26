import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { AnimatedCounter } from './GradientText';

interface StatsSectionProps {
    className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ className = '' }) => {
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

    const stats = [
        { value: 15000, suffix: '+', label: 'Active Users', icon: 'fa-users', color: 'blue' },
        { value: 2.8, suffix: 'M', label: 'Jobs Completed', icon: 'fa-briefcase', color: 'emerald' },
        { value: 94, suffix: '%', label: 'On-time Rate', icon: 'fa-clock', color: 'purple' },
        { value: 40, suffix: '%', label: 'Time Saved', icon: 'fa-rocket', color: 'cyan' }
    ];

    return (
        <section
            className={`py-20 relative z-20 ${className}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                            Trusted by teams worldwide
                        </h2>
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                            Join thousands of businesses transforming their field operations with our data-driven platform.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <ScrollReveal key={index} delay={`${index * 100}`}>
                            <div className="card-spotlight h-full p-8 rounded-3xl bg-zinc-900/20 border border-white/10 group relative overflow-hidden text-center transition-transform duration-300">
                                <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center group-hover:bg-${stat.color}-500/20 transition-all duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                                    <i className={`fa-solid ${stat.icon} text-${stat.color}-400 text-2xl drop-shadow-lg`} />
                                </div>
                                <div className="text-5xl font-bold text-white mb-3 tracking-tight">
                                    <AnimatedCounter value={stat.value} />
                                    <span className={`text-${stat.color}-400/80`}>{stat.suffix}</span>
                                </div>
                                <div className="text-zinc-500 font-medium">{stat.label}</div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
