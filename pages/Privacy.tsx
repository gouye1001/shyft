import React, { useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Breadcrumbs from '../components/Breadcrumbs';

const Privacy: React.FC = () => {
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
                        { label: 'Privacy Policy' }
                    ]}
                    className="mb-8"
                />

                {/* Header */}
                <ScrollReveal>
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-zinc-400">
                            Last updated: December 26, 2025
                        </p>
                    </div>
                </ScrollReveal>

                {/* Introduction */}
                <ScrollReveal>
                    <div className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/10 mb-12 backdrop-blur-md">
                        <p className="text-zinc-300 leading-relaxed text-lg mb-6">
                            At Shyft, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
                        </p>
                        <p className="text-zinc-300 leading-relaxed text-lg">
                            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Quick Summary */}
                <ScrollReveal>
                    <div className="card-spotlight p-8 rounded-3xl bg-zinc-900/20 border border-white/5 mb-16">
                        <h3 className="text-2xl font-bold text-white mb-8">Quick Summary</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: 'fa-shield-halved', title: 'Secure', desc: 'Your data is encrypted and protected' },
                                { icon: 'fa-eye-slash', title: 'Private', desc: 'We never sell your data to third parties' },
                                { icon: 'fa-hand-holding-heart', title: 'Transparent', desc: 'You control your information at all times' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <i className={`fa-solid ${item.icon} text-emerald-400 text-lg`} />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold mb-1">{item.title}</div>
                                        <div className="text-sm text-zinc-400">{item.desc}</div>
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
                    <div className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-white/10 text-center relative overflow-hidden card-spotlight">
                        <div className="absolute inset-0 bg-emerald-500/5" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 ring-1 ring-emerald-500/40">
                                <i className="fa-solid fa-envelope text-3xl text-emerald-400" />
                            </div>
                            <p className="text-zinc-300 mb-8 text-lg">
                                Questions about how we handle your data?
                            </p>
                            <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5">
                                Contact Privacy Team
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Privacy;
