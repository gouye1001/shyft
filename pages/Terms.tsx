import React, { useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Breadcrumbs from '../components/Breadcrumbs';

const Terms: React.FC = () => {
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

    const sections = [
        {
            title: '1. Acceptance of Terms',
            content: `By accessing and using Shyft ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
        },
        {
            title: '2. Use License',
            content: `Permission is granted to temporarily access and use the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            
• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to reverse engineer any software contained on Shyft's platform
• Remove any copyright or other proprietary notations from the materials
• Transfer the materials to another person or "mirror" the materials on any other server`
        },
        {
            title: '3. User Account',
            content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Shyft reserves the right to refuse service, terminate accounts, or remove content at our sole discretion.`
        },
        {
            title: '4. Service Subscription',
            content: `Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis. At the end of each Billing Cycle, your subscription will automatically renew unless you cancel it or Shyft cancels it.`
        },
        {
            title: '5. Cancellation and Refunds',
            content: `You may cancel your subscription at any time through your account settings. Upon cancellation, you will have access to the Service until the end of your current Billing Cycle. Refunds are provided on a case-by-case basis and at Shyft's sole discretion.`
        },
        {
            title: '6. Data Privacy',
            content: `Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which governs the Service and informs users of our data collection practices.`
        },
        {
            title: '7. Intellectual Property',
            content: `The Service and its original content, features, and functionality are and will remain the exclusive property of Shyft and its licensors. The Service is protected by copyright, trademark, and other laws.`
        },
        {
            title: '8. Limitation of Liability',
            content: `In no event shall Shyft, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.`
        },
        {
            title: '9. Changes to Terms',
            content: `We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.`
        },
        {
            title: '10. Contact Information',
            content: `If you have any questions about these Terms, please contact us at legal@shyft-demo.com.`
        }
    ];

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

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: 'Home' },
                        { label: 'Terms of Service' }
                    ]}
                    className="mb-8"
                />

                {/* Header */}
                <ScrollReveal>
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                            Terms of Service
                        </h1>
                        <p className="text-zinc-400">
                            Last updated: December 26, 2025
                        </p>
                    </div>
                </ScrollReveal>

                {/* Introduction */}
                <ScrollReveal>
                    <div className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/10 mb-12 backdrop-blur-md">
                        <p className="text-zinc-300 leading-relaxed text-lg">
                            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Shyft platform. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <ScrollReveal key={index} delay={`${index * 50}`}>
                            <div className="card-spotlight p-8 rounded-3xl bg-black/20 border border-white/5 hover:border-white/10 transition-all">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Footer CTA */}
                <ScrollReveal>
                    <div className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 text-center relative overflow-hidden card-spotlight">
                        <div className="absolute inset-0 bg-blue-500/5" />
                        <div className="relative z-10">
                            <p className="text-zinc-300 mb-6 text-lg">
                                Have questions about our Terms of Service?
                            </p>
                            <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5">
                                Contact Legal Team
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Terms;
