import React, { useState } from 'react';
import { AppCard, AppCardHeader, AppCardContent, AppButton } from '../../components/app/ui';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQItem[] = [
    { category: 'Getting Started', question: 'How do I create my first job?', answer: 'Navigate to Jobs in the sidebar, click "New Job" and fill in the customer details, service type, and schedule. You can then assign it to a technician.' },
    { category: 'Getting Started', question: 'How do I invite team members?', answer: 'Go to Team in the sidebar and click "Invite Member". Enter their email and select their role. They\'ll receive an invitation to join your organization.' },
    { category: 'Jobs', question: 'How do I track job status?', answer: 'Each job has a status indicator (Scheduled, In Progress, Completed). Technicians can update status from the mobile app, and you\'ll see updates in real-time on the dashboard.' },
    { category: 'Jobs', question: 'Can I assign multiple technicians to a job?', answer: 'Yes! When creating or editing a job, you can select multiple team members. This is useful for larger projects that require a team effort.' },
    { category: 'Billing', question: 'How do I create an invoice?', answer: 'Go to Invoices and click "New Invoice". Select the customer and job, enter the amount, and send it directly via email or download as PDF.' },
    { category: 'Billing', question: 'How do I upgrade my subscription?', answer: 'Navigate to Settings > Billing and click "Upgrade". Choose your new plan and complete the payment process.' },
];

const categories = ['All', 'Getting Started', 'Jobs', 'Billing', 'Team', 'Settings'];

const AppHelp: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const resources = [
        { icon: 'fa-book', title: 'Documentation', description: 'Comprehensive guides and tutorials', link: '#' },
        { icon: 'fa-video', title: 'Video Tutorials', description: 'Step-by-step video walkthroughs', link: '#' },
        { icon: 'fa-graduation-cap', title: 'Shyft Academy', description: 'Learn best practices', link: '#' },
        { icon: 'fa-code', title: 'API Reference', description: 'For developers and integrations', link: '#' },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">How can we help?</h1>
                <p className="text-zinc-400 mb-6">Search our knowledge base or browse categories below</p>

                <div className="max-w-lg mx-auto">
                    <div className="relative">
                        <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/50 border border-white/[0.06] text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 text-lg transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Quick Resources */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {resources.map((resource) => (
                    <a
                        key={resource.title}
                        href={resource.link}
                        className="p-5 rounded-2xl bg-zinc-900/50 border border-white/[0.06] hover:border-white/10 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                            <i className={`fa-solid ${resource.icon} text-blue-400 text-xl`} />
                        </div>
                        <h3 className="text-white font-medium mb-1">{resource.title}</h3>
                        <p className="text-sm text-zinc-500">{resource.description}</p>
                    </a>
                ))}
            </div>

            {/* FAQ Section */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-circle-question text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
                </AppCardHeader>

                {/* Category Filter */}
                <div className="px-6 py-4 border-b border-white/[0.04]">
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Accordions */}
                <div className="divide-y divide-white/[0.04]">
                    {filteredFaqs.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <i className="fa-solid fa-search text-4xl text-zinc-600 mb-4" />
                            <p className="text-zinc-400">No results found for "{searchQuery}"</p>
                        </div>
                    ) : (
                        filteredFaqs.map((faq, i) => (
                            <div key={i} className="px-6">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full py-5 flex items-center justify-between text-left"
                                >
                                    <span className="text-white font-medium pr-4">{faq.question}</span>
                                    <i className={`fa-solid fa-chevron-down text-zinc-500 transition-transform ${expandedFaq === i ? 'rotate-180' : ''
                                        }`} />
                                </button>
                                {expandedFaq === i && (
                                    <div className="pb-5 text-zinc-400 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </AppCard>

            {/* Contact Support */}
            <AppCard className="text-center">
                <AppCardContent className="py-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                        <i className="fa-solid fa-headset text-3xl text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Need more help?</h3>
                    <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                        Our support team is available 24/7 to help you with any questions or issues.
                    </p>
                    <div className="flex justify-center gap-3">
                        <AppButton variant="secondary" icon="fa-envelope">
                            Email Support
                        </AppButton>
                        <AppButton variant="primary" icon="fa-comments">
                            Live Chat
                        </AppButton>
                    </div>
                </AppCardContent>
            </AppCard>
        </div>
    );
};

export default AppHelp;
