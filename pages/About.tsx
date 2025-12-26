import React from 'react';
import { Page } from '../App';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import GlowOrb from '../components/GlowOrb';
import GradientText, { AnimatedCounter } from '../components/GradientText';

interface AboutProps {
    onNavigate: (page: Page) => void;
}

const teamMembers = [
    { name: 'Alex Chen', role: 'CEO & Founder', avatar: 'AC', color: 'blue', bio: 'Former ops lead at Uber. 10+ years in field service.' },
    { name: 'Sarah Kim', role: 'CTO', avatar: 'SK', color: 'purple', bio: 'Ex-Google engineer. Built systems serving 100M+ users.' },
    { name: 'Marcus Johnson', role: 'Head of Product', avatar: 'MJ', color: 'cyan', bio: 'Product veteran from Stripe and Square.' },
    { name: 'Emily Rodriguez', role: 'Head of Design', avatar: 'ER', color: 'emerald', bio: 'Led design at Airbnb and Figma.' },
];

const values = [
    { icon: 'fa-bolt', title: 'Move Fast', desc: 'We ship weekly. Speed is a feature.' },
    { icon: 'fa-heart', title: 'Customer Obsessed', desc: 'Every decision starts with the customer.' },
    { icon: 'fa-code', title: 'Build Beautiful', desc: 'Great software should feel magical.' },
    { icon: 'fa-handshake', title: 'Win Together', desc: 'Collaboration over competition. Always.' },
];

const milestones = [
    { year: '2021', title: 'Founded', desc: 'Started in a garage with a simple idea.' },
    { year: '2022', title: 'Seed Round', desc: '$4M raised to build the team.' },
    { year: '2023', title: '10K Users', desc: 'Crossed 10,000 active teams.' },
    { year: '2024', title: 'Series A', desc: '$25M to scale globally.' },
];

const About: React.FC<AboutProps> = ({ onNavigate }) => {
    return (
        <div className="aurora-bg">
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <GlowOrb size="xl" color="blue" className="top-0 left-1/4" />
                <GlowOrb size="lg" color="purple" className="bottom-0 right-1/4" />

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                            <i className="fa-solid fa-building text-blue-400 text-sm" />
                            <span className="text-sm text-zinc-300">About Shyft</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                            We're building the future of{' '}
                            <GradientText colors={['#3b82f6', '#8b5cf6', '#06b6d4']}>field operations</GradientText>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Shyft is on a mission to empower service businesses with software that's as
                            powerful as enterprise tools, but as simple as consumer apps.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 border-y border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: 15000, suffix: '+', label: 'Active Teams' },
                            { value: 2, suffix: 'M+', label: 'Jobs Completed' },
                            { value: 50, suffix: '+', label: 'Countries' },
                            { value: 99.9, suffix: '%', label: 'Uptime' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-zinc-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
                            <p className="text-zinc-400 max-w-lg mx-auto">The principles that guide everything we do.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <ScrollReveal key={i} delay={i < 2 ? '100' : '200'}>
                                <div className="group p-8 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <i className={`fa-solid ${value.icon} text-xl text-white`} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                                    <p className="text-zinc-400">{value.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
                            <p className="text-zinc-400 max-w-lg mx-auto">The people making it all happen.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, i) => (
                            <ScrollReveal key={i} delay={i < 2 ? '100' : '200'}>
                                <div className="group text-center">
                                    <div className={`
                    w-32 h-32 mx-auto rounded-2xl mb-6
                    bg-gradient-to-br from-${member.color}-500/30 to-${member.color}-600/10
                    border border-white/10 group-hover:border-white/20
                    flex items-center justify-center
                    transition-all duration-300 group-hover:scale-105
                  `}>
                                        <span className={`text-3xl font-bold text-${member.color}-400`}>
                                            {member.avatar}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                                    <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                                    <p className="text-zinc-500 text-sm">{member.bio}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-32 border-t border-white/10">
                <div className="max-w-4xl mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
                        </div>
                    </ScrollReveal>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

                        <div className="space-y-12">
                            {milestones.map((milestone, i) => (
                                <ScrollReveal key={i} delay={i % 2 === 0 ? '0' : '100'}>
                                    <div className="flex gap-8 items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 relative z-10">
                                            <span className="text-sm font-bold text-white">{milestone.year}</span>
                                        </div>
                                        <div className="pt-4">
                                            <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                                            <p className="text-zinc-400">{milestone.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 border-t border-white/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to join the movement?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-10">
                            Start your free trial today. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <MagneticButton variant="primary" size="lg" onClick={() => onNavigate('signup')}>
                                Start Free Trial
                            </MagneticButton>
                            <MagneticButton variant="secondary" size="lg" onClick={() => onNavigate('contact')}>
                                Contact Sales
                            </MagneticButton>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default About;
