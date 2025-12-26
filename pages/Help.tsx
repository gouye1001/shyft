import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Breadcrumbs from '../components/Breadcrumbs';

const Help: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['Getting Started', 'Dashboard', 'Mobile App', 'Billing', 'Integrations', 'Troubleshooting'];

    const articles = [
        {
            id: 1,
            title: 'How to create your first job',
            category: 'Getting Started',
            excerpt: 'Learn how to set up and dispatch your first job in under 5 minutes.',
            readTime: '3 min read'
        },
        {
            id: 2,
            title: 'Setting up team members',
            category: 'Getting Started',
            excerpt: 'Add technicians, assign roles, and manage your team permissions.',
            readTime: '5 min read'
        },
        {
            id: 3,
            title: 'Understanding the dashboard',
            category: 'Dashboard',
            excerpt: 'Navigate your dashboard and use key features for daily operations.',
            readTime: '4 min read'
        },
        {
            id: 4,
            title: 'Mobile app installation guide',
            category: 'Mobile App',
            excerpt: 'Download and set up the Shyft mobile app for your technicians.',
            readTime: '2 min read'
        },
        {
            id: 5,
            title: 'Changing your subscription plan',
            category: 'Billing',
            excerpt: 'Upgrade, downgrade, or modify your plan at any time.',
            readTime: '3 min read'
        },
        {
            id: 6,
            title: 'Connecting QuickBooks',
            category: 'Integrations',
            excerpt: 'Sync your accounting data with QuickBooks in just a few clicks.',
            readTime: '6 min read'
        },
        {
            id: 7,
            title: 'Troubleshooting sync issues',
            category: 'Troubleshooting',
            excerpt: 'Common sync problems and how to resolve them.',
            readTime: '4 min read'
        },
        {
            id: 8,
            title: 'Using route optimization',
            category: 'Dashboard',
            excerpt: 'Save time and fuel with our intelligent routing algorithm.',
            readTime: '5 min read'
        }
    ];

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: 'Home' },
                    { label: 'Help Center' }
                ]}
                className="mb-8"
            />

            {/* Header */}
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6">
                        How can we help?
                    </h1>
                    <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Search our knowledge base or browse articles by category
                    </p>

                    {/* Search */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-full bg-zinc-900/50 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Quick Links */}
            <ScrollReveal>
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: 'fa-rocket', title: 'Getting Started', desc: 'New to Shyft? Start here', color: 'blue' },
                        { icon: 'fa-video', title: 'Video Tutorials', desc: 'Learn with step-by-step videos', color: 'purple' },
                        { icon: 'fa-headset', title: 'Contact Support', desc: 'Need help? We\'re here for you', color: 'emerald' }
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
                            <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center mb-4 group-hover:bg-${item.color}-500/30 transition-colors`}>
                                <i className={`fa-solid ${item.icon} text-${item.color}-400 text-xl`} />
                            </div>
                            <h3 className="text-white font-medium mb-2">{item.title}</h3>
                            <p className="text-sm text-zinc-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

            {/* Category Filter */}
            <ScrollReveal>
                <div className="flex flex-wrap gap-3 mb-12">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === 'all'
                                ? 'bg-white text-black'
                                : 'bg-zinc-900/50 text-zinc-400 border border-white/10 hover:text-white'
                            }`}
                    >
                        All Articles
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category
                                    ? 'bg-white text-black'
                                    : 'bg-zinc-900/50 text-zinc-400 border border-white/10 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </ScrollReveal>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
                {filteredArticles.map((article, index) => (
                    <ScrollReveal key={article.id} delay={`${index * 50}`}>
                        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    {article.category}
                                </span>
                                <span className="text-xs text-zinc-500">{article.readTime}</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-sm text-zinc-500 mb-4">{article.excerpt}</p>
                            <div className="flex items-center text-blue-400 text-sm group-hover:gap-2 transition-all">
                                <span>Read article</span>
                                <i className="fa-solid fa-arrow-right ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* Contact CTA */}
            <ScrollReveal>
                <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10">
                    <i className="fa-solid fa-circle-question text-4xl text-blue-400 mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-3">
                        Still need help?
                    </h3>
                    <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                        Can't find what you're looking for? Our support team is available 24/7 to help you.
                    </p>
                    <button className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all">
                        Contact Support
                    </button>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Help;
