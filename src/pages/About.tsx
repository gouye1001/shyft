import React, { useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <div
            className="cinematic-bg min-h-screen pt-32 pb-20 px-6 relative overflow-hidden"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero */}
                <ScrollReveal>
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            Our Vision
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                            We're building the future <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">of field service.</span>
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                            Shyft was born from frustration. After watching field service teams struggle with clunky software for years, we decided to build something better.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Story */}
                <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
                    <ScrollReveal>
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Story</h2>
                            <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
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
                        <div className="card-spotlight aspect-square rounded-3xl bg-zinc-900/40 border border-white/10 flex items-center justify-center p-8 backdrop-blur-xl">
                            <div className="text-center">
                                <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400 mb-4">2022</div>
                                <div className="text-xl text-zinc-300 font-medium">Founded in <span className="text-white">San Francisco</span></div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Mission */}
                <ScrollReveal>
                    <div className="card-spotlight p-12 rounded-3xl bg-zinc-900/30 border border-white/10 mb-32 text-center backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8">
                                <i className="fa-solid fa-bullseye text-3xl text-emerald-400" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Our Mission</h2>
                            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed font-light">
                                "Make field service software that technicians actually want to use. When your team loves their tools, everything else falls into place: happier customers, higher revenue, less stress."
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Values */}
                <div className="mb-32">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center tracking-tight">Values that drive us</h2>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: 'fa-bolt',
                                title: 'Speed First',
                                desc: 'Every feature is designed to save you time. If it slows you down, we kill it.',
                                color: 'amber'
                            },
                            {
                                icon: 'fa-users',
                                title: 'Built with Users',
                                desc: "We ship features our customers ask for, not what looks good in a pitch deck.",
                                color: 'blue'
                            },
                            {
                                icon: 'fa-shield-halved',
                                title: 'Rock-Solid Reliability',
                                desc: 'Your business depends on us. We take that responsibility seriously.',
                                color: 'emerald'
                            }
                        ].map((value, i) => (
                            <ScrollReveal key={i} delay={`${i * 100}`}>
                                <div className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/10 h-full hover:bg-zinc-900/50 transition-all backdrop-blur-md">
                                    <div className={`w-14 h-14 rounded-2xl bg-${value.color}-500/10 border border-${value.color}-500/20 flex items-center justify-center mb-6`}>
                                        <i className={`fa-solid ${value.icon} text-${value.color}-400 text-2xl`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                    <p className="text-zinc-300 leading-relaxed text-lg">{value.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Meet the Team</h2>
                        <p className="text-xl text-zinc-400">A small team obsessed with making field service better</p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-4 gap-8 mb-32">
                    {[
                        { name: 'Sarah Chen', role: 'Co-Founder & CEO', avatar: 'SC', color: 'blue' },
                        { name: 'Marcus Rodriguez', role: 'Co-Founder & CTO', avatar: 'MR', color: 'purple' },
                        { name: 'Emily Wu', role: 'Head of Product', avatar: 'EW', color: 'cyan' },
                        { name: 'James Park', role: 'Head of Engineering', avatar: 'JP', color: 'emerald' }
                    ].map((member, i) => (
                        <ScrollReveal key={i} delay={`${i * 50}`}>
                            <div className="card-spotlight rounded-3xl bg-zinc-900/20 border border-white/5 p-6 hover:border-white/20 transition-all group backdrop-blur-sm text-center">
                                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-${member.color}-500/20 to-${member.color}-600/20 ring-1 ring-${member.color}-400/30 flex items-center justify-center text-2xl font-bold text-white group-hover:scale-105 transition-transform shadow-lg shadow-${member.color}-500/10`}>
                                    {member.avatar}
                                </div>
                                <div className="text-lg font-bold text-white mb-1">{member.name}</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wide">{member.role}</div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* CTA */}
                <ScrollReveal>
                    <div className="card-spotlight text-center p-16 rounded-[2.5rem] bg-zinc-900/30 border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Join our mission
                            </h2>
                            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                                We're always looking for talented people who want to make a real impact.
                                Check out our open positions.
                            </p>
                            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-1 active:translate-y-0 text-lg">
                                View Careers
                                <i className="fa-solid fa-arrow-right ml-2" />
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default About;
