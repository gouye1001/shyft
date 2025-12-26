import React, { useState } from 'react';
import { Page } from '../App';
import ScrollReveal from '../components/ScrollReveal';
import FormInput from '../components/FormInput';
import MagneticButton from '../components/MagneticButton';
import GlowOrb from '../components/GlowOrb';

interface ContactProps {
    onNavigate: (page: Page) => void;
    onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const faqs = [
    { q: 'How long is the free trial?', a: '14 days with full access to all Pro features.' },
    { q: 'Do I need a credit card to start?', a: 'No, you can start your trial without a credit card.' },
    { q: 'Can I cancel anytime?', a: 'Yes, cancel with one click. No questions asked.' },
    { q: 'Do you offer enterprise plans?', a: 'Yes! Contact us for custom pricing and features.' },
];

const Contact: React.FC<ContactProps> = ({ onNavigate, onShowToast }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!subject.trim()) newErrors.subject = 'Subject is required';
        if (!message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        onShowToast?.('success', 'Message sent! We\'ll get back to you within 24 hours.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setIsLoading(false);
    };

    return (
        <div className="aurora-bg min-h-screen">
            {/* Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <GlowOrb size="lg" color="cyan" className="top-20 left-1/4" />
                <GlowOrb size="md" color="purple" className="bottom-0 right-1/3" />

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
                            Get in touch
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-xl mx-auto">
                            Have a question or want to learn more? We'd love to hear from you.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Main Content */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <ScrollReveal>
                            <div className="bg-zinc-900/30 border border-white/10 rounded-3xl p-8 md:p-10">
                                <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
                                <p className="text-zinc-400 mb-8">We'll respond within 24 hours.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <FormInput
                                            id="contact-name"
                                            label="Name"
                                            value={name}
                                            onChange={setName}
                                            error={errors.name}
                                            required
                                        />
                                        <FormInput
                                            id="contact-email"
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={setEmail}
                                            error={errors.email}
                                            required
                                        />
                                    </div>

                                    <FormInput
                                        id="contact-subject"
                                        label="Subject"
                                        value={subject}
                                        onChange={setSubject}
                                        error={errors.subject}
                                        required
                                    />

                                    <FormInput
                                        id="contact-message"
                                        label="Message"
                                        type="textarea"
                                        value={message}
                                        onChange={setMessage}
                                        error={errors.message}
                                        required
                                        maxLength={500}
                                        showCharCount
                                    />

                                    <MagneticButton
                                        variant="primary"
                                        size="lg"
                                        type="submit"
                                        className="w-full"
                                        loading={isLoading}
                                    >
                                        Send Message
                                    </MagneticButton>
                                </form>
                            </div>
                        </ScrollReveal>

                        {/* Info & FAQ */}
                        <div className="space-y-12">
                            {/* Contact Info */}
                            <ScrollReveal delay="100">
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white">Other ways to reach us</h2>

                                    <div className="grid gap-4">
                                        {[
                                            { icon: 'fa-envelope', label: 'Email', value: 'hello@shyft.io', href: 'mailto:hello@shyft.io' },
                                            { icon: 'fa-phone', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                                            { icon: 'fa-location-dot', label: 'Office', value: '123 Tech Street, SF, CA 94105' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-white/10 group hover:border-white/20 transition-all">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                                    <i className={`fa-solid ${item.icon} text-blue-400`} />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-500 uppercase tracking-wider">{item.label}</div>
                                                    {item.href ? (
                                                        <a href={item.href} className="text-white hover:text-blue-400 transition-colors">{item.value}</a>
                                                    ) : (
                                                        <div className="text-white">{item.value}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* FAQ */}
                            <ScrollReveal delay="200">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
                                    <div className="space-y-3">
                                        {faqs.map((faq, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl border border-white/10 overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                                                >
                                                    <span className="text-white font-medium">{faq.q}</span>
                                                    <i className={`fa-solid fa-chevron-down text-zinc-400 text-sm transition-transform duration-300 ${expandedFaq === i ? 'rotate-180' : ''}`} />
                                                </button>
                                                <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                                                    <div className="px-4 pb-4 text-zinc-400">
                                                        {faq.a}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
