import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Pricing: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    const getPrice = (monthlyPrice: number) => {
        if (billingCycle === 'annual') {
            return Math.floor(monthlyPrice * 0.8); // 20% discount
        }
        return monthlyPrice;
    };

    const plans = [
        {
            name: 'Starter',
            description: 'Perfect for side hustles',
            price: 0,
            period: '/mo',
            features: ['Up to 20 jobs/month', 'Mobile app access', 'Basic dispatch', 'Email support', '1 user'],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Pro',
            description: 'For growing businesses',
            price: 29,
            period: '/user',
            features: ['Unlimited jobs', 'Route optimization', 'QuickBooks sync', 'Team management', 'Priority support', 'Advanced analytics', 'Custom forms', 'API access'],
            cta: 'Start Trial',
            popular: true
        },
        {
            name: 'Enterprise',
            description: 'For global fleets',
            price: null,
            period: '',
            features: ['Everything in Pro', 'Dedicated support', 'SLA guarantee', 'Custom integrations', 'Advanced security', 'Training & onboarding', 'Account manager'],
            cta: 'Contact Sales',
            popular: false
        }
    ];

    const comparisonFeatures = [
        { name: 'Mobile App Access', starter: true, pro: true, enterprise: true },
        { name: 'Jobs per month', starter: '20', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Users', starter: '1', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Route Optimization', starter: false, pro: true, enterprise: true },
        { name: 'QuickBooks Sync', starter: false, pro: true, enterprise: true },
        { name: 'Custom Forms', starter: false, pro: true, enterprise: true },
        { name: 'Advanced Analytics', starter: false, pro: true, enterprise: true },
        { name: 'API Access', starter: false, pro: 'Limited', enterprise: 'Full' },
        { name: 'Priority Support', starter: false, pro: true, enterprise: true },
        { name: 'SLA Support', starter: false, pro: false, enterprise: true },
        { name: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
        { name: 'Custom Integrations', starter: false, pro: false, enterprise: true },
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-semibold text-white tracking-tight mb-6">Plans for every stage.</h1>
                    <p className="text-xl text-zinc-400 mb-8">Transparent pricing. No contracts.</p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-zinc-900/50 border border-white/10">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly'
                                    ? 'bg-white text-black'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all relative ${billingCycle === 'annual'
                                    ? 'bg-white text-black'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Annual
                            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>
            </ScrollReveal>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {plans.map((plan, index) => (
                    <ScrollReveal key={plan.name} delay={`${index * 100}`}>
                        <div className={`
                            relative p-8 rounded-3xl transition-all duration-300
                            ${plan.popular
                                ? 'bg-blue-900/10 border-2 border-blue-500/30 shadow-lg shadow-blue-500/10'
                                : 'bg-zinc-900/30 border border-white/10 hover:border-white/20'
                            }
                        `}>
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-3xl"></div>
                            )}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-white font-medium mb-2">{plan.name}</h3>
                            <div className="text-4xl font-bold text-white mb-2">
                                {plan.price === null ? (
                                    'Custom'
                                ) : plan.price === 0 ? (
                                    '$0'
                                ) : (
                                    <>
                                        ${getPrice(plan.price)}
                                        {billingCycle === 'annual' && plan.price > 0 && (
                                            <span className="text-lg text-zinc-500 font-normal line-through ml-2">
                                                ${plan.price}
                                            </span>
                                        )}
                                    </>
                                )}
                                <span className="text-lg text-zinc-500 font-normal">{plan.period}</span>
                            </div>
                            {billingCycle === 'annual' && plan.price && plan.price > 0 && (
                                <div className="text-sm text-emerald-400 mb-4">
                                    Save ${(plan.price - getPrice(plan.price)) * 12}/year
                                </div>
                            )}
                            <p className="text-sm text-zinc-500 mb-6">{plan.description}</p>
                            <button className={`
                                w-full py-3 rounded-full font-medium transition-all mb-8
                                ${plan.popular
                                    ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/20'
                                    : 'border border-white/20 text-white hover:bg-white hover:text-black'
                                }
                            `}>
                                {plan.cta}
                            </button>
                            <ul className="space-y-3">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                                        <i className={`fa-solid fa-check mt-0.5 ${plan.popular ? 'text-blue-400' : 'text-emerald-400'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* Comparison Table */}
            <ScrollReveal>
                <div className="border-t border-white/10 pt-16">
                    <h3 className="text-3xl font-semibold text-white mb-12 text-center">Compare all features</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 pr-4 text-zinc-500 font-medium w-1/2">Features</th>
                                    <th className="py-4 px-4 text-white font-medium text-center w-1/6">Starter</th>
                                    <th className="py-4 px-4 text-blue-400 font-medium text-center w-1/6">Pro</th>
                                    <th className="py-4 pl-4 text-white font-medium text-center w-1/6">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-400">
                                {comparisonFeatures.map((feature, index) => (
                                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 pr-4">{feature.name}</td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof feature.starter === 'boolean' ? (
                                                feature.starter ? (
                                                    <i className="fa-solid fa-check text-emerald-400" />
                                                ) : (
                                                    <span className="text-zinc-700">-</span>
                                                )
                                            ) : (
                                                <span className="text-white">{feature.starter}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof feature.pro === 'boolean' ? (
                                                feature.pro ? (
                                                    <i className="fa-solid fa-check text-blue-400" />
                                                ) : (
                                                    <span className="text-zinc-700">-</span>
                                                )
                                            ) : (
                                                <span className="text-white">{feature.pro}</span>
                                            )}
                                        </td>
                                        <td className="py-4 pl-4 text-center">
                                            {typeof feature.enterprise === 'boolean' ? (
                                                feature.enterprise ? (
                                                    <i className="fa-solid fa-check text-emerald-400" />
                                                ) : (
                                                    <span className="text-zinc-700">-</span>
                                                )
                                            ) : (
                                                <span className="text-white">{feature.enterprise}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ScrollReveal>

            {/* FAQ Section */}
            <ScrollReveal>
                <div className="mt-32">
                    <h3 className="text-3xl font-semibold text-white mb-12 text-center">Frequently asked questions</h3>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            { q: 'Can I change plans anytime?', a: 'Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately.' },
                            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, ACH transfers, and can invoice for annual contracts.' },
                            { q: 'Is there a free trial?', a: 'Yes! Try Pro features free for 14 days. No credit card required.' },
                            { q: 'Do you offer discounts for nonprofits?', a: 'Yes, we offer special pricing for registered nonprofits. Contact sales for details.' }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10">
                                <h4 className="text-white font-medium mb-2">{faq.q}</h4>
                                <p className="text-zinc-400 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Pricing;