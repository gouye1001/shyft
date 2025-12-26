import React, { useState, useRef } from 'react';
import { Page } from '../App';
import ScrollReveal from '../components/ScrollReveal';
import FormInput from '../components/FormInput';
import MagneticButton from '../components/MagneticButton';

interface EnterpriseProps {
    onNavigate: (page: Page) => void;
    onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const enterpriseFeatures = [
    {
        icon: 'fa-shield-halved',
        title: 'Advanced Security',
        description: 'SSO, SAML, audit logs, and role-based access controls for enterprise compliance.'
    },
    {
        icon: 'fa-headset',
        title: 'Dedicated Support',
        description: '24/7 priority support with dedicated account manager and SLA guarantees.'
    },
    {
        icon: 'fa-cubes',
        title: 'Custom Integrations',
        description: 'Tailored API integrations with your existing ERP, CRM, and business systems.'
    },
    {
        icon: 'fa-graduation-cap',
        title: 'Training & Onboarding',
        description: 'Personalized onboarding, training sessions, and documentation for your team.'
    },
    {
        icon: 'fa-server',
        title: 'Dedicated Infrastructure',
        description: 'Isolated instances with custom SLAs, data residency, and performance guarantees.'
    },
    {
        icon: 'fa-chart-line',
        title: 'Advanced Analytics',
        description: 'Custom dashboards, reporting, and business intelligence integrations.'
    }
];

const faqs = [
    { q: 'What is the minimum contract length?', a: 'Enterprise contracts are typically annual, but we offer flexible terms based on your needs.' },
    { q: 'Can we get a custom demo?', a: 'Yes! Our sales team will prepare a tailored demo showcasing features relevant to your industry.' },
    { q: 'What support options are available?', a: '24/7 priority support via phone, email, and dedicated Slack channel with your account team.' },
    { q: 'Do you offer data migration?', a: 'Yes, we provide full data migration assistance from your existing systems at no extra cost.' }
];

const Enterprise: React.FC<EnterpriseProps> = ({ onNavigate, onShowToast }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!company.trim()) newErrors.company = 'Company name is required';
        if (!teamSize.trim()) newErrors.teamSize = 'Team size is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        onShowToast?.('success', 'Thank you! Our enterprise team will contact you within 24 hours.');
        setName('');
        setEmail('');
        setCompany('');
        setTeamSize('');
        setMessage('');
        setIsLoading(false);
    };

    return (
        <div
            className="cinematic-bg min-h-screen pt-40 pb-20 relative overflow-hidden"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero */}
                <div className="text-center mb-20">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8">
                            <i className="fa-solid fa-building" />
                            Enterprise Solutions
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                            Built for scale.
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                            Custom solutions for organizations that need enterprise-grade security, dedicated support, and tailored integrations.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Features Grid */}
                <ScrollReveal>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                        {enterpriseFeatures.map((feature, i) => (
                            <div
                                key={i}
                                className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/20 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                                    <i className={`fa-solid ${feature.icon} text-purple-400 text-xl`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Contact Form Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
                    <ScrollReveal>
                        <div className="card-spotlight bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-2">Talk to our sales team</h2>
                            <p className="text-zinc-300 mb-10">Tell us about your needs and we'll create a custom plan.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <FormInput
                                        id="enterprise-name"
                                        label="Name"
                                        value={name}
                                        onChange={setName}
                                        error={errors.name}
                                        required
                                        placeholder="John Doe"
                                    />
                                    <FormInput
                                        id="enterprise-email"
                                        label="Work Email"
                                        type="email"
                                        value={email}
                                        onChange={setEmail}
                                        error={errors.email}
                                        required
                                        placeholder="john@company.com"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <FormInput
                                        id="enterprise-company"
                                        label="Company"
                                        value={company}
                                        onChange={setCompany}
                                        error={errors.company}
                                        required
                                        placeholder="Company name"
                                    />
                                    <FormInput
                                        id="enterprise-team-size"
                                        label="Team Size"
                                        value={teamSize}
                                        onChange={setTeamSize}
                                        error={errors.teamSize}
                                        required
                                        placeholder="e.g., 50-100"
                                    />
                                </div>

                                <FormInput
                                    id="enterprise-message"
                                    label="How can we help?"
                                    type="textarea"
                                    value={message}
                                    onChange={setMessage}
                                    maxLength={500}
                                    showCharCount
                                    placeholder="Tell us about your requirements..."
                                />

                                <MagneticButton
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    className="w-full"
                                    loading={isLoading}
                                >
                                    Request Demo
                                </MagneticButton>
                            </form>
                        </div>
                    </ScrollReveal>

                    {/* Trusted By & Benefits */}
                    <div className="space-y-12 pt-8">
                        <ScrollReveal delay="100">
                            <div>
                                <h3 className="text-sm text-zinc-500 uppercase tracking-widest mb-6">Why Enterprise?</h3>
                                <div className="space-y-6">
                                    {[
                                        { icon: 'fa-lock', label: 'SOC 2 Type II Certified', desc: 'Enterprise-grade security compliance' },
                                        { icon: 'fa-clock', label: '99.99% Uptime SLA', desc: 'Guaranteed availability for mission-critical ops' },
                                        { icon: 'fa-users', label: 'Unlimited Users', desc: 'Scale your entire organization without limits' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                                <i className={`fa-solid ${item.icon} text-white`} />
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{item.label}</div>
                                                <div className="text-zinc-400 text-sm">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay="200">
                            <div className="card-spotlight p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <i className="fa-solid fa-phone text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">Prefer to talk?</div>
                                        <div className="text-zinc-400 text-sm">Schedule a call with our team</div>
                                    </div>
                                </div>
                                <a
                                    href="tel:+15551234567"
                                    className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
                                >
                                    +1 (555) 123-4567
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* FAQ Section - Grid style matching Pricing page */}
                <ScrollReveal>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">Enterprise FAQ</h3>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {faqs.map((faq, i) => (
                                <div key={i} className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all">
                                    <h4 className="text-white font-bold mb-3">{faq.q}</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* CTA */}
                <ScrollReveal>
                    <div className="mt-32 text-center">
                        <div className="card-spotlight inline-block p-12 rounded-[2.5rem] bg-zinc-900/30 border border-white/10">
                            <h3 className="text-3xl font-bold text-white mb-4">Ready to get started?</h3>
                            <p className="text-zinc-400 mb-8 max-w-md">
                                Join hundreds of enterprises already using Shyft to streamline their field operations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => onNavigate('pricing')}
                                    className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                                >
                                    View Pricing
                                </button>
                                <button
                                    onClick={() => onNavigate('contact')}
                                    className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-all"
                                >
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Enterprise;
