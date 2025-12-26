import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Breadcrumbs from '../components/Breadcrumbs';

const Privacy: React.FC = () => {
    const sections = [
        {
            title: '1. Information We Collect',
            content: `We collect several types of information from and about users of our Service:

• Personal Information: Name, email address, phone number, company name, and billing information
• Usage Data: Information about how you use our Service, including access times, pages viewed, and navigation paths
• Device Information: IP address, browser type, operating system, and device identifiers
• Location Data: Approximate location derived from IP address and precise location if you enable location services`
        },
        {
            title: '2. How We Use Your Information',
            content: `We use the information we collect to:

• Provide, maintain, and improve our Service
• Process transactions and send related information
• Send technical notices, updates, security alerts, and support messages
• Respond to your comments, questions, and customer service requests
• Monitor and analyze trends, usage, and activities in connection with our Service
• Detect, investigate, and prevent fraudulent transactions and other illegal activities
• Personalize and improve the Service and provide content and features that match your interests`
        },
        {
            title: '3. Information Sharing and Disclosure',
            content: `We may share your information in the following situations:

• With Service Providers: We share information with third-party service providers who perform services on our behalf
• For Legal Reasons: If required by law or if we believe disclosure is necessary to protect our rights or comply with legal process
• Business Transfers: In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business
• With Your Consent: We may share information with your consent or at your direction`
        },
        {
            title: '4. Data Retention',
            content: `We retain your personal information for as long as necessary to provide you with our Service and fulfill the purposes described in this Privacy Policy. We may also retain and use your information to comply with our legal obligations, resolve disputes, and enforce our agreements.`
        },
        {
            title: '5. Security',
            content: `We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.`
        },
        {
            title: '6. Your Rights and Choices',
            content: `You have certain rights regarding your personal information:

• Access: You can request access to the personal information we hold about you
• Correction: You can request that we correct inaccurate or incomplete information
• Deletion: You can request deletion of your personal information
• Opt-Out: You can opt out of receiving promotional communications from us
• Data Portability: You can request a copy of your data in a structured, commonly used format`
        },
        {
            title: '7. Cookies and Tracking Technologies',
            content: `We use cookies and similar tracking technologies to collect and track information about your use of our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.`
        },
        {
            title: '8. Third-Party Services',
            content: `Our Service may contain links to third-party websites or services that are not owned or controlled by Shyft. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you access.`
        },
        {
            title: '9. Children\'s Privacy',
            content: `Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.`
        },
        {
            title: '10. International Data Transfers',
            content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our Service, you consent to this transfer.`
        },
        {
            title: '11. Changes to This Privacy Policy',
            content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.`
        },
        {
            title: '12. Contact Us',
            content: `If you have any questions about this Privacy Policy, please contact us at:

Email: privacy@shyft-demo.com
Address: 123 Privacy Street, San Francisco, CA 94102`
        }
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: 'Home' },
                    { label: 'Privacy Policy' }
                ]}
                className="mb-8"
            />

            {/* Header */}
            <ScrollReveal>
                <div className="mb-12">
                    <h1 className="text-5xl font-semibold text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-400">
                        Last updated: December 26, 2025
                    </p>
                </div>
            </ScrollReveal>

            {/* Introduction */}
            <ScrollReveal>
                <div className="p-6 rounded-2xl bg-emerald-900/10 border border-emerald-500/30 mb-12">
                    <p className="text-zinc-300 leading-relaxed mb-4">
                        At Shyft, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
                    </p>
                    <p className="text-zinc-300 leading-relaxed">
                        Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
                    </p>
                </div>
            </ScrollReveal>

            {/* Quick Summary */}
            <ScrollReveal>
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10 mb-12">
                    <h3 className="text-xl font-medium text-white mb-4">Quick Summary</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { icon: 'fa-shield-halved', title: 'Secure', desc: 'Your data is encrypted and protected' },
                            { icon: 'fa-eye-slash', title: 'Private', desc: 'We never sell your data to third parties' },
                            { icon: 'fa-hand-holding-heart', title: 'Transparent', desc: 'You control your information' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                    <i className={`fa-solid ${item.icon} text-emerald-400`} />
                                </div>
                                <div>
                                    <div className="text-white font-medium">{item.title}</div>
                                    <div className="text-sm text-zinc-500">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map((section, index) => (
                    <ScrollReveal key={index} delay={`${index * 30}`}>
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
                    <i className="fa-solid fa-envelope text-3xl text-emerald-400 mb-4" />
                    <p className="text-zinc-400 mb-4">
                        Questions about how we handle your data?
                    </p>
                    <button className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        Contact Privacy Team
                    </button>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Privacy;
