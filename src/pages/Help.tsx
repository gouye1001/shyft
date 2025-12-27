import React, { useState, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Breadcrumbs from '../components/Breadcrumbs';

const Help: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
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

    const categories = [
        { id: 'all', name: 'All Topics', icon: 'fa-layer-group' },
        { id: 'getting-started', name: 'Getting Started', icon: 'fa-rocket' },
        { id: 'account', name: 'Account & Billing', icon: 'fa-user-gear' },
        { id: 'features', name: 'Features & Usage', icon: 'fa-wand-magic-sparkles' },
        { id: 'troubleshooting', name: 'Troubleshooting', icon: 'fa-screwdriver-wrench' }
    ];

    const articles = [
        {
            title: 'How to create your first job',
            category: 'getting-started',
            excerpt: 'Learn the basics of creating and dispatching jobs to your team.',
            readTime: '3 min read'
        },
        {
            title: 'Understanding billing cycles',
            category: 'account',
            excerpt: 'Everything you need to know about monthly vs annual billing.',
            readTime: '5 min read'
        },
        {
            title: 'Integrating with QuickBooks',
            category: 'features',
            excerpt: 'Step-by-step guide to syncing your invoices and payments.',
            readTime: '8 min read'
        },
        {
            title: 'Resetting your password',
            category: 'account',
            excerpt: 'Locked out? Here is how to regain access to your account.',
            readTime: '2 min read'
        },
        {
            title: 'Mobile app connection issues',
            category: 'troubleshooting',
            excerpt: 'Common solutions for connectivity problems in the field.',
            readTime: '4 min read'
        },
        {
            title: 'Managing team permissions',
            category: 'features',
            excerpt: 'Control what your team members can see and do in Shyft.',
            readTime: '6 min read'
        }
    ];

    const quickLinks = [
        { title: 'Contact Support', icon: 'fa-headset', desc: 'Talk to a human' },
        { title: 'System Status', icon: 'fa-server', desc: 'Check uptime' },
        { title: 'Community Forum', icon: 'fa-users', desc: 'Join the discussion' }
    ];

    const filteredArticles = activeCategory === 'all'
        ? articles
        : articles.filter(article => article.category === activeCategory);

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
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: 'Home' },
                        { label: 'Help Center' }
                    ]}
                    className="mb-8"
                />

                {/* Header & Search */}
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            How can we help?
                        </h1>
                        <p className="text-xl text-zinc-300 mb-10">
                            Search our knowledge base or browse topics below.
                        </p>
                        <div className="relative group">
                            <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-white transition-colors text-lg" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-zinc-900/50 border border-white/10 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-lg shadow-black/20 text-lg backdrop-blur-xl"
                            />
                        </div>
                    </div>
                </ScrollReveal>

                {/* Categories */}
                <ScrollReveal>
                    <div className="flex flex-wrap gap-4 justify-center mb-16">
                        {categories.map((category, _index) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`
                                    flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300
                                    ${activeCategory === category.id
                                        ? 'bg-white text-black border-white shadow-lg shadow-white/20 scale-105 font-bold'
                                        : 'bg-zinc-900/30 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                                    }
                                `}
                            >
                                <i className={`fa-solid ${category.icon}`} />
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Articles List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-6 pl-2">Popular Articles</h2>
                        {filteredArticles.map((article, index) => (
                            <ScrollReveal key={index} delay={`${index * 50}`}>
                                <a href="#" className="card-spotlight group block p-8 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                            {categories.find(c => c.id === article.category)?.name}
                                        </span>
                                        <span className="text-zinc-500 text-sm flex items-center gap-2">
                                            <i className="fa-regular fa-clock" />
                                            {article.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-zinc-300 text-sm mb-4">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                                        Read Article <i className="fa-solid fa-arrow-right ml-2 text-xs" />
                                    </div>
                                </a>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-6 pl-2">Quick Support</h2>
                        {quickLinks.map((link, index) => (
                            <ScrollReveal key={index} delay={`${index * 100}`}>
                                <div className="card-spotlight p-6 rounded-3xl bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 hover:border-white/10 transition-all group flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                        <i className={`fa-solid ${link.icon} text-zinc-400 group-hover:text-white transition-colors text-lg`} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{link.title}</h4>
                                        <p className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">{link.desc}</p>
                                    </div>
                                    <i className="fa-solid fa-chevron-right ml-auto text-zinc-600 group-hover:text-white transition-colors" />
                                </div>
                            </ScrollReveal>
                        ))}

                        <ScrollReveal delay="300">
                            <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                <div className="relative z-10">
                                    <h3 className="font-bold text-xl mb-2">Still need help?</h3>
                                    <p className="text-blue-100 text-sm mb-6">Our support team is available 24/7 to assist you.</p>
                                    <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                                        Open Ticket
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
