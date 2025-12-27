import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useAuth } from '../context/AuthContext';
import { usePricing, useSubscription } from '../hooks';
import FloatingDashboardWidget from '../components/FloatingDashboardWidget';

const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';

const Pricing: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { data: pricing } = usePricing();
    const { startCheckout } = useSubscription();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

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

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">
                            Ready to transform your operations?
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                            Plans for every stage.
                        </h1>
                        <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                            Transparent pricing. No hidden fees. No contracts.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly'
                                    ? 'bg-white text-black shadow-lg shadow-white/10'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all relative ${billingCycle === 'annual'
                                    ? 'bg-white text-black shadow-lg shadow-white/10'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                Annual
                                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-lg border border-white/20">
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 items-start">
                    {plans.map((plan, index) => (
                        <ScrollReveal key={plan.name} delay={`${index * 100}`}>
                            <div className={`
                                card-spotlight relative p-8 rounded-[2rem] transition-all duration-300 backdrop-blur-xl h-full flex flex-col border
                                ${plan.popular
                                    ? 'bg-zinc-900/40 border-white/10 ring-1 ring-white/5 shadow-xl'
                                    : 'bg-zinc-950/30 border-white/5 hover:border-white/10'
                                }
                            `}>
                                {/* Header with optional Popular badge */}
                                <div className="mb-6">
                                    {plan.popular && (
                                        <span className="inline-block px-3 py-1 mb-4 bg-white/10 text-white text-[10px] font-medium uppercase tracking-wider rounded-full border border-white/20">
                                            Popular
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-sm text-zinc-400 font-medium">{plan.description}</p>
                                </div>

                                {/* Price display */}
                                <div className="mb-2">
                                    {plan.price === null ? (
                                        <span className="text-3xl font-semibold text-zinc-300">Custom</span>
                                    ) : plan.price === 0 ? (
                                        <>
                                            <span className="text-3xl font-semibold text-zinc-400">Free</span>
                                            <span className="text-lg text-zinc-500 font-normal ml-1">{plan.period}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-4xl font-bold text-white tracking-tight">
                                                ${getPrice(plan.price)}
                                            </span>
                                            {billingCycle === 'annual' && (
                                                <span className="text-xl text-zinc-500 font-normal line-through ml-3 decoration-zinc-600">
                                                    ${plan.price}
                                                </span>
                                            )}
                                            <span className="text-lg text-zinc-500 font-normal ml-1">{plan.period}</span>
                                        </>
                                    )}
                                </div>

                                {/* Savings badge or subtitle */}
                                {billingCycle === 'annual' && plan.price !== null && plan.price > 0 ? (
                                    <div className="text-sm text-emerald-400 font-medium mb-6 bg-emerald-500/10 inline-block px-3 py-1 rounded-full border border-emerald-500/20">
                                        Save ${(plan.price - getPrice(plan.price)) * 12}/year
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-500 mb-6">
                                        {plan.price === 0 ? 'No credit card required' : plan.price === null ? 'Tailored to your needs' : 'Billed monthly'}
                                    </p>
                                )}

                                <div className="flex-grow">
                                    <div className="h-px w-full bg-white/10 mb-8" />
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'}`}>
                                                    <i className="fa-solid fa-check text-xs" />
                                                </div>
                                                <span className="leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    disabled={checkoutLoading === plan.name}
                                    onClick={async () => {
                                        if (plan.name === 'Enterprise') {
                                            navigate('/enterprise');
                                        } else if (plan.name === 'Starter' && plan.price === 0) {
                                            // Free tier - just go to signup/dashboard
                                            navigate(isAuthenticated ? '/dashboard' : '/signup');
                                        } else if (USE_REAL_API && isAuthenticated && pricing?.priceIds) {
                                            // Paid tier with real API - start Stripe checkout
                                            setCheckoutLoading(plan.name);
                                            const priceId = plan.name === 'Pro'
                                                ? pricing.priceIds.professional
                                                : pricing.priceIds.starter;
                                            await startCheckout(priceId);
                                            setCheckoutLoading(null);
                                        } else {
                                            // Demo mode or not authenticated
                                            navigate(isAuthenticated ? '/dashboard' : '/signup');
                                        }
                                    }}
                                    className={`
                                    w-full py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide
                                    ${plan.popular
                                            ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/20 hover:-translate-y-1 disabled:opacity-50'
                                            : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:-translate-y-1 disabled:opacity-50'
                                        }
                                `}>
                                    {checkoutLoading === plan.name ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fa-solid fa-spinner fa-spin" />
                                            Processing...
                                        </span>
                                    ) : plan.cta}
                                </button>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Comparison Table */}
                <ScrollReveal>
                    <div className="card-spotlight rounded-[2.5rem] bg-zinc-900/30 border border-white/10 p-8 md:p-12 backdrop-blur-md overflow-hidden">
                        <h3 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">Compare features</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-6 pr-4 text-zinc-400 font-medium w-1/2 uppercase text-xs tracking-wider">Features</th>
                                        <th className="py-6 px-4 text-white font-bold text-center w-1/6">Starter</th>
                                        <th className="py-6 px-4 text-blue-400 font-bold text-center w-1/6">Pro</th>
                                        <th className="py-6 pl-4 text-white font-bold text-center w-1/6">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody className="text-zinc-300">
                                    {comparisonFeatures.map((feature, index) => (
                                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="py-5 pr-4 group-hover:text-white transition-colors">{feature.name}</td>
                                            <td className="py-5 px-4 text-center">
                                                {typeof feature.starter === 'boolean' ? (
                                                    feature.starter ? (
                                                        <i className="fa-solid fa-check text-emerald-400" />
                                                    ) : (
                                                        <span className="text-zinc-600">-</span>
                                                    )
                                                ) : (
                                                    <span className="text-white font-medium">{feature.starter}</span>
                                                )}
                                            </td>
                                            <td className="py-5 px-4 text-center bg-blue-500/5">
                                                {typeof feature.pro === 'boolean' ? (
                                                    feature.pro ? (
                                                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                                                            <i className="fa-solid fa-check text-xs" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-zinc-600">-</span>
                                                    )
                                                ) : (
                                                    <span className="text-blue-400 font-bold">{feature.pro}</span>
                                                )}
                                            </td>
                                            <td className="py-5 pl-4 text-center">
                                                {typeof feature.enterprise === 'boolean' ? (
                                                    feature.enterprise ? (
                                                        <i className="fa-solid fa-check text-emerald-400" />
                                                    ) : (
                                                        <span className="text-zinc-600">-</span>
                                                    )
                                                ) : (
                                                    <span className="text-white font-medium">{feature.enterprise}</span>
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
                        <h3 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">Frequently asked questions</h3>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {[
                                { q: 'Can I change plans anytime?', a: 'Yes! Upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
                                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, ACH transfers, and can invoice for annual contracts.' },
                                { q: 'Is there a free trial?', a: 'Yes! Try Pro features free for 14 days. No credit card required to start.' },
                                { q: 'Do you offer discounts for nonprofits?', a: 'Yes, we offer special pricing for registered nonprofits. Contact sales for details.' }
                            ].map((faq, i) => (
                                <div key={i} className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all">
                                    <h4 className="text-white font-bold mb-3">{faq.q}</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Floating Dashboard Widget */}
            <FloatingDashboardWidget />
        </div>
    );
};

export default Pricing;