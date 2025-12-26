import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useAuth } from '../src/context/AuthContext';
import FloatingDashboardWidget from '../components/FloatingDashboardWidget';

const Solutions: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const industries = [
        {
            icon: 'fa-wind',
            title: 'HVAC',
            description: 'Climate control installation, maintenance, and emergency repairs.',
            features: ['Smart scheduling for seasonal demand', 'Equipment tracking', 'Maintenance contracts'],
            color: 'blue',
        },
        {
            icon: 'fa-bolt',
            title: 'Electrical',
            description: 'Residential and commercial electrical services.',
            features: ['Safety compliance tracking', 'Permit management', 'Quote automation'],
            color: 'amber',
        },
        {
            icon: 'fa-faucet-drip',
            title: 'Plumbing',
            description: 'Emergency repairs, installations, and maintenance.',
            features: ['Emergency dispatch', 'Parts inventory', 'Customer history'],
            color: 'cyan',
        },
        {
            icon: 'fa-house-chimney',
            title: 'Home Services',
            description: 'Cleaning, landscaping, and property maintenance.',
            features: ['Recurring appointments', 'Route optimization', 'Customer portal'],
            color: 'emerald',
        },
        {
            icon: 'fa-fire-extinguisher',
            title: 'Fire & Safety',
            description: 'Fire alarm installation, inspection, and monitoring.',
            features: ['Compliance reporting', 'Inspection checklists', 'Certificate generation'],
            color: 'red',
        },
        {
            icon: 'fa-elevator',
            title: 'Elevators',
            description: 'Elevator and escalator maintenance and repair.',
            features: ['Preventive maintenance', 'SLA tracking', 'Multi-site management'],
            color: 'purple',
        },
    ];

    const solutions = [
        {
            icon: 'fa-calendar-days',
            title: 'Smart Scheduling',
            description: 'AI-powered scheduling that considers skills, location, and availability to optimize your calendar.',
            link: '/product',
        },
        {
            icon: 'fa-route',
            title: 'Route Optimization',
            description: 'Reduce drive time and fuel costs with intelligent routing that adapts to traffic.',
            link: '/product',
        },
        {
            icon: 'fa-mobile-screen',
            title: 'Mobile Workforce',
            description: 'Empower technicians with a mobile app that works offline in basements and rural areas.',
            link: '/product',
        },
        {
            icon: 'fa-chart-line',
            title: 'Business Intelligence',
            description: 'Real-time dashboards and reports to track KPIs and make data-driven decisions.',
            link: '/product',
        },
    ];

    return (
        <div className="cinematic-bg min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero */}
                <ScrollReveal>
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-6 backdrop-blur-md">
                            <i className="fa-solid fa-building text-purple-400" />
                            Industry Solutions
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                            Built for your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">industry.</span>
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                            Shyft is designed for field service businesses of all sizes. From HVAC to electrical,
                            we have the features and workflows your team needs.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Industries Grid */}
                <div className="mb-32">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight">
                            Industries We Serve
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industries.map((industry, i) => (
                            <ScrollReveal key={i} delay={i < 3 ? "0" : "100"}>
                                <div className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/10 h-full hover:bg-zinc-900/50 hover:border-white/20 transition-all backdrop-blur-md group">
                                    <div className={`w-14 h-14 rounded-2xl bg-${industry.color}-500/10 border border-${industry.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <i className={`fa-solid ${industry.icon} text-${industry.color}-400 text-2xl`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{industry.title}</h3>
                                    <p className="text-zinc-400 mb-6">{industry.description}</p>
                                    <ul className="space-y-2">
                                        {industry.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-zinc-500">
                                                <i className={`fa-solid fa-check text-${industry.color}-400 text-xs`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Core Solutions */}
                <div className="mb-32">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                                Core Solutions
                            </h2>
                            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                                Powerful features designed to streamline every aspect of field operations.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {solutions.map((solution, i) => (
                            <ScrollReveal key={i} delay={i % 2 === 0 ? "0" : "100"}>
                                <Link to={solution.link} className="block group">
                                    <div className="card-spotlight p-8 rounded-3xl bg-zinc-900/30 border border-white/10 hover:bg-zinc-900/50 hover:border-white/20 transition-all backdrop-blur-md">
                                        <div className="flex items-start gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <i className={`fa-solid ${solution.icon} text-white text-xl`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                                    {solution.title}
                                                    <i className="fa-solid fa-arrow-right ml-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </h3>
                                                <p className="text-zinc-400">{solution.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <ScrollReveal>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                        {[
                            { value: '15K+', label: 'Teams using Shyft' },
                            { value: '2M+', label: 'Jobs completed' },
                            { value: '99.9%', label: 'Uptime SLA' },
                            { value: '4.9★', label: 'App Store rating' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-zinc-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* CTA */}
                <ScrollReveal>
                    <div className="card-spotlight text-center p-16 rounded-[2.5rem] bg-zinc-900/30 border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Ready to transform your operations?
                            </h2>
                            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                                Join thousands of field service teams already using Shyft to work smarter.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                                    className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 text-lg"
                                >
                                    {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
                                    <i className="fa-solid fa-arrow-right ml-2" />
                                </button>
                                <Link
                                    to="/contact"
                                    className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all text-lg"
                                >
                                    Talk to Sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Floating Dashboard Widget */}
            <FloatingDashboardWidget />
        </div>
    );
};

export default Solutions;
