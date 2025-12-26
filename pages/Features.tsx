import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import FeatureCard from '../components/FeatureCard';
import { mockFeatures } from '../src/utils/mockData';

const Features: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Group features by category
    const categories = ['all', ...Array.from(new Set(mockFeatures.map(f => f.category)))];

    const filteredFeatures = selectedCategory === 'all'
        ? mockFeatures
        : mockFeatures.filter(f => f.category === selectedCategory);

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <ScrollReveal>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <i className="fa-solid fa-sparkles text-blue-400 text-sm" />
                        <span className="text-sm text-blue-300">12+ Powerful Features</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-8">
                        Everything you need.
                        <br />
                        <span className="text-zinc-600">Nothing you don't.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        Shyft isn't just software—it's the complete operating system for modern field service businesses.
                        From dispatch to payment, we've built every feature with one goal: make your team unstoppable.
                    </p>
                </div>
            </ScrollReveal>

            {/* Category Filter */}
            <ScrollReveal delay="100">
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                                ${selectedCategory === category
                                    ? 'bg-white text-black shadow-lg shadow-white/20'
                                    : 'bg-zinc-900/50 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white'
                                }
                            `}
                        >
                            {category === 'all' ? 'All Features' : category}
                        </button>
                    ))}
                </div>
            </ScrollReveal>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {filteredFeatures.map((feature, index) => (
                    <ScrollReveal key={feature.id} delay={`${index * 50}`}>
                        <FeatureCard
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            benefits={feature.benefits}
                            tags={feature.tags}
                            variant={index === 0 ? 'highlighted' : 'default'}
                        />
                    </ScrollReveal>
                ))}
            </div>

            {/* Feature Deep Dives */}
            <div className="space-y-32 mb-32">
                {/* Feature 1: Smart Dispatch */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <div className="relative aspect-square bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                {/* Abstract Map UI */}
                                <div className="relative w-3/4 h-3/4 bg-black rounded-xl border border-white/10 p-4 shadow-2xl">
                                    <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-1/3 bg-zinc-800 rounded"></div>
                                        <div className="h-32 bg-zinc-900/50 rounded-lg border border-white/5 relative overflow-hidden">
                                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                                <path d="M 20 20 L 50 50 L 80 30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                                                <circle cx="20" cy="20" r="3" fill="white" />
                                                <circle cx="80" cy="30" r="3" fill="white" />
                                            </svg>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-8 w-8 rounded-full bg-zinc-800"></div>
                                            <div className="space-y-1">
                                                <div className="h-2 w-24 bg-zinc-800 rounded"></div>
                                                <div className="h-2 w-16 bg-zinc-800 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay="100">
                            <div className="space-y-4">
                                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                                    Dispatch & Routing
                                </div>
                                <h3 className="text-4xl font-medium text-white">Autonomous Dispatch</h3>
                                <p className="text-lg text-zinc-400">
                                    Stop playing Tetris with your calendar. Our routing engine analyzes traffic, technician skill set, and job priority to build the perfect schedule in milliseconds.
                                </p>
                                <ul className="space-y-3 text-zinc-500">
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-check text-blue-500"></i>
                                        Real-time traffic adaptation
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-check text-blue-500"></i>
                                        Skill-based matching
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-check text-blue-500"></i>
                                        Multi-day project support
                                    </li>
                                </ul>
                                <div className="pt-4">
                                    <div className="inline-flex items-center gap-6 text-sm">
                                        <div>
                                            <div className="text-3xl font-bold text-white">40%</div>
                                            <div className="text-zinc-500">Less drive time</div>
                                        </div>
                                        <div className="w-px h-12 bg-white/10"></div>
                                        <div>
                                            <div className="text-3xl font-bold text-white">2-3hrs</div>
                                            <div className="text-zinc-500">Saved per tech daily</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Feature 2: Mobile */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <ScrollReveal delay="100" className="md:order-2">
                            <div className="relative aspect-square bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
                                {/* Phone UI */}
                                <div className="w-[200px] h-[380px] bg-black border-[6px] border-zinc-800 rounded-[30px] p-4 relative shadow-2xl">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-800 rounded-b-xl z-10"></div>
                                    <div className="mt-6 space-y-4">
                                        <div className="bg-zinc-900 p-3 rounded-lg border border-white/10">
                                            <div className="text-[10px] text-zinc-500 uppercase">Status</div>
                                            <div className="text-white font-medium">En Route</div>
                                        </div>
                                        <div className="bg-blue-600 p-3 rounded-lg text-white">
                                            <div className="flex justify-between items-center">
                                                <span>Start Job</span>
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                        </div>
                                        <div className="h-32 bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center text-zinc-700">
                                            <i className="fa-solid fa-camera text-2xl"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal className="md:order-1">
                            <div className="space-y-4">
                                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium">
                                    Mobile Experience
                                </div>
                                <h3 className="text-4xl font-medium text-white">The Technician OS</h3>
                                <p className="text-lg text-zinc-400">
                                    Give your team a tool they'll actually love. Works completely offline, syncs instantly when back online. Everything they need, nothing they don't.
                                </p>
                                <ul className="space-y-3 text-zinc-500">
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-check text-emerald-500"></i>
                                        Offline mode - works anywhere
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-check text-emerald-500"></i>
                                        Photo & signature capture
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-check text-emerald-500"></i>
                                        Integrated inventory tracking
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-check text-emerald-500"></i>
                                        Built-in navigation
                                    </li>
                                </ul>
                                <div className="pt-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-zinc-900"></div>
                                                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-zinc-900"></div>
                                                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-zinc-900"></div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-white font-medium">iOS & Android</div>
                                                <div className="text-zinc-500">Native apps available</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </div>

            {/* Bottom CTA */}
            <ScrollReveal>
                <div className="text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to see it in action?
                    </h2>
                    <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Join 15,000+ teams who've transformed their field operations with Shyft.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all shadow-lg shadow-white/20">
                            Start free trial
                            <i className="fa-solid fa-arrow-right ml-2" />
                        </button>
                        <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all">
                            Schedule demo
                        </button>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Features;