import React from 'react';
import ScrollReveal from './ScrollReveal';
import { AnimatedCounter } from './GradientText';

interface StatsSectionProps {
    className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ className = '' }) => {
    const stats = [
        { value: 15000, suffix: '+', label: 'Active Users', icon: 'fa-users' },
        { value: 2.8, suffix: 'M', label: 'Jobs Completed', icon: 'fa-briefcase' },
        { value: 94, suffix: '%', label: 'On-time Rate', icon: 'fa-clock' },
        { value: 40, suffix: '%', label: 'Time Saved', icon: 'fa-bolt' }
    ];

    return (
        <section className={`py-20 ${className}`}>
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                        Trusted by teams worldwide
                    </h2>
                    <p className="text-xl text-zinc-400">
                        Join thousands of businesses transforming their field operations
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <ScrollReveal key={index} delay={`${index * 100}`}>
                        <div className="text-center p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all group">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                                <i className={`fa-solid ${stat.icon} text-blue-400 text-xl`} />
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">
                                <AnimatedCounter end={stat.value} />
                                {stat.suffix}
                            </div>
                            <div className="text-zinc-500 text-sm">{stat.label}</div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
