import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Hero */}
            <ScrollReveal>
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight mb-8">
                        We're building the future <br />
                        <span className="text-zinc-600">of field service.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        Shyft was born from frustration. After watching field service teams struggle with clunky software for years, we decided to build something better.
                    </p>
                </div>
            </ScrollReveal>

            {/* Story */}
            <div className="grid md:grid-cols-2 gap-16 mb-32">
                <ScrollReveal>
                    <div>
                        <h2 className="text-3xl font-medium text-white mb-6">Our Story</h2>
                        <div className="space-y-4 text-zinc-400 leading-relaxed">
                            <p>
                                In 2022, we spoke with over 200 field service businesses. From HVAC companies to electrical contractors, the story was always the same: existing software was built for offices, not trucks.
                            </p>
                            <p>
                                Technicians hated it because it was slow and complicated. Dispatchers hated it because routing took hours. Owners hated it because they paid thousands per month for software nobody wanted to use.
                            </p>
                            <p>
                                So we built Shyft. A platform designed from day one for the chaos of field service. Mobile-first, offline-capable, and intelligent enough to handle the complexity without burying you in it.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay="100">
                    <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 flex items-center justify-center">
                        <div className="text-center p-8">
                            <div className="text-6xl font-bold text-white mb-4">2022</div>
                            <div className="text-zinc-400">Founded in San Francisco</div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Mission */}
            <ScrollReveal>
                <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-white/10 mb-32 text-center">
                    <i className="fa-solid fa-bullseye text-4xl text-emerald-400 mb-6" />
                    <h2 className="text-3xl font-medium text-white mb-6">Our Mission</h2>
                    <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                        Make field service software that technicians actually want to use. When your team loves their tools, everything else falls into place: happier customers, higher revenue, less stress.
                    </p>
                </div>
            </ScrollReveal>

            {/* Values */}
            <div className="mb-32">
                <ScrollReveal>
                    <h2 className="text-4xl font-medium text-white mb-12 text-center">Our Values</h2>
                </ScrollReveal>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: 'fa-bolt',
                            title: 'Speed First',
                            desc: 'Every feature is designed to save you time. If it slows you down, we kill it.',
                            color: 'yellow'
                        },
                        {
                            icon: 'fa-users',
                            title: 'Built with Users',
                            desc: "We ship features our customers ask for, not what looks good in a pitch deck.",
                            color: 'blue'
                        },
                        {
                            icon: 'fa-shield-halved',
                            title: 'Reliability',
                            desc: 'Your business depends on us. We take that responsibility seriously.',
                            color: 'emerald'
                        }
                    ].map((value, i) => (
                        <ScrollReveal key={i} delay={`${i * 100}`}>
                            <div className="p-8 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all">
                                <div className={`w-12 h-12 rounded-xl bg-${value.color}-500/20 flex items-center justify-center mb-6`}>
                                    <i className={`fa-solid ${value.icon} text-${value.color}-400 text-xl`} />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-3">{value.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{value.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Team */}
            <ScrollReveal>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-medium text-white mb-4">Meet the Team</h2>
                    <p className="text-zinc-400">A small team obsessed with making field service better</p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-4 gap-8 mb-32">
                {[
                    { name: 'Sarah Chen', role: 'Co-Founder & CEO', avatar: 'SC' },
                    { name: 'Marcus Rodriguez', role: 'Co-Founder & CTO', avatar: 'MR' },
                    { name: 'Emily Wu', role: 'Head of Product', avatar: 'EW' },
                    { name: 'James Park', role: 'Head of Engineering', avatar: 'JP' }
                ].map((member, i) => (
                    <ScrollReveal key={i} delay={`${i * 50}`}>
                        <div className="text-center group">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                                {member.avatar}
                            </div>
                            <div className="text-white font-medium">{member.name}</div>
                            <div className="text-sm text-zinc-500">{member.role}</div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* CTA */}
            <ScrollReveal>
                <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Join us
                    </h2>
                    <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                        We're always looking for talented people who want to make field service better. Check out our open positions.
                    </p>
                    <button className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all shadow-lg shadow-white/20">
                        View Careers
                        <i className="fa-solid fa-arrow-right ml-2" />
                    </button>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default About;
