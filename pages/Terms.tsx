import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Breadcrumbs from '../components/Breadcrumbs';

const Terms: React.FC = () => {
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
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
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
                    <h1 className="text-5xl font-semibold text-white mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-zinc-400">
                        Last updated: December 26, 2025
                    </p>
                </div>
            </ScrollReveal>

            {/* Introduction */}
            <ScrollReveal>
                <div className="p-6 rounded-2xl bg-blue-900/10 border border-blue-500/30 mb-12">
                    <p className="text-zinc-300 leading-relaxed">
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Shyft platform. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>
                </div>
            </ScrollReveal>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map((section, index) => (
                    <ScrollReveal key={index} delay={`${index * 50}`}>
                        <div className="pb-8 border-b border-white/10 last:border-0">
                            <h2 className="text-2xl font-medium text-white mb-4">
                                {section.title}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                                {section.content}
                            </p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* Footer CTA */}
            <ScrollReveal>
                <div className="mt-16 p-8 rounded-2xl bg-zinc-900/30 border border-white/10 text-center">
                    <p className="text-zinc-400 mb-4">
                        Have questions about our Terms of Service?
                    </p>
                    <button className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        Contact Legal Team
                    </button>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Terms;
