import React, { useState } from 'react';

const AppHelp: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const articles = [
        { title: 'Getting started with jobs', category: 'Basics', icon: 'fa-rocket' },
        { title: 'Managing your team', category: 'Team', icon: 'fa-users' },
        { title: 'Creating invoices', category: 'Billing', icon: 'fa-file-invoice' },
        { title: 'Using the mobile app', category: 'Mobile', icon: 'fa-mobile-screen' },
        { title: 'Understanding analytics', category: 'Reports', icon: 'fa-chart-line' },
        { title: 'Account settings', category: 'Account', icon: 'fa-gear' },
    ];

    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Help Center</h1>
                <p className="text-zinc-400">Find answers and get support</p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 text-lg"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Contact Support', icon: 'fa-headset', color: 'blue' },
                    { label: 'Report Bug', icon: 'fa-bug', color: 'red' },
                    { label: 'Feature Request', icon: 'fa-lightbulb', color: 'yellow' },
                ].map((action) => (
                    <button
                        key={action.label}
                        className={`p-5 rounded-2xl bg-${action.color}-500/10 border border-${action.color}-500/20 hover:bg-${action.color}-500/20 transition-all text-left`}
                    >
                        <i className={`fa-solid ${action.icon} text-${action.color}-400 text-xl mb-3 block`} />
                        <span className="text-white font-medium">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Articles */}
            <div className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h2 className="text-lg font-semibold text-white">Popular Articles</h2>
                </div>
                <div className="divide-y divide-white/5">
                    {filteredArticles.map((article, i) => (
                        <button key={i} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <i className={`fa-solid ${article.icon} text-zinc-400`} />
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-medium">{article.title}</div>
                                <div className="text-sm text-zinc-500">{article.category}</div>
                            </div>
                            <i className="fa-solid fa-chevron-right text-zinc-600" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppHelp;
