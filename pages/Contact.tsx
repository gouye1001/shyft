import React, { useState, useRef } from 'react';
import { Page } from '../App';
import ScrollReveal from '../components/ScrollReveal';
import FormInput from '../components/FormInput';
import MagneticButton from '../components/MagneticButton';

interface ContactProps {
    onNavigate: (page: Page) => void;
    onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const faqs = [
    { q: 'How long is the free trial?', a: '14 days with full access to all Pro features. No credit card required to start.' },
    { q: 'Do I need a credit card to start?', a: 'No, you can start your trial without a credit card. Upgrade only when you are ready.' },
    { q: 'Can I cancel anytime?', a: 'Yes, cancel with one click from your dashboard. No hidden fees or contracts.' },
    { q: 'Do you offer enterprise plans?', a: 'Yes! We offer custom dedicated instances, SLA guarantees, and priority support for large teams.' },
];

const Contact: React.FC<ContactProps> = ({ onNavigate, onShowToast }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
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
        <div
            className="cinematic-bg min-h-screen pt-40 pb-20 relative overflow-hidden"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero */}
                <div className="text-center mb-20">
                    <ScrollReveal>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                            Get in touch
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                            Have a question or want to learn more? We'd love to hear from you.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <ScrollReveal>
                        <div className="card-spotlight bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
                            <p className="text-zinc-300 mb-10">We'll respond within 24 hours.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <FormInput
                                        id="contact-name"
                                        label="Name"
                                        value={name}
                                        onChange={setName}
                                        error={errors.name}
                                        required
                                        placeholder="John Doe"
                                    />
                                    <FormInput
                                        id="contact-email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={setEmail}
                                        error={errors.email}
                                        required
                                        placeholder="john@company.com"
                                    />
                                </div>

                                <FormInput
                                    id="contact-subject"
                                    label="Subject"
                                    value={subject}
                                    onChange={setSubject}
                                    error={errors.subject}
                                    required
                                    placeholder="How can we help?"
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
                                    placeholder="Tell us about your project..."
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
                    <div className="space-y-12 pt-8">
                        {/* Contact Info */}
                        <ScrollReveal delay="100">
                            <div className="space-y-8">
                                <h2 className="text-2xl font-bold text-white">Other ways to reach us</h2>

                                <div className="grid gap-4">
                                    {[
                                        { icon: 'fa-envelope', label: 'Email', value: 'hello@shyft.io', href: 'mailto:hello@shyft.io', color: 'blue' },
                                        { icon: 'fa-phone', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567', color: 'cyan' },
                                        { icon: 'fa-location-dot', label: 'Office', value: '123 Tech Street, SF, CA 94105', color: 'purple' },
                                    ].map((item, i) => (
                                        <div key={i} className="card-spotlight flex items-center gap-6 p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/20 transition-all group backdrop-blur-md">
                                            <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center group-hover:bg-${item.color}-500/20 transition-colors`}>
                                                <i className={`fa-solid ${item.icon} text-${item.color}-400 text-xl`} />
                                            </div>
                                            <div>
                                                <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">{item.label}</div>
                                                {item.href ? (
                                                    <a href={item.href} className="text-lg text-white hover:text-blue-400 transition-colors font-medium">{item.value}</a>
                                                ) : (
                                                    <div className="text-lg text-white font-medium">{item.value}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* FAQ - Grid style matching Pricing page */}
                        <ScrollReveal delay="200">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-8">FAQ</h2>
                                <div className="grid gap-6">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className="card-spotlight p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all">
                                            <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                                            <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
