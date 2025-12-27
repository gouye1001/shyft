import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FloatingDashboardWidget from '../../components/FloatingDashboardWidget';

// Sub-components
import HomeHero from './HomeHero';
import HomeFeatures from './HomeFeatures';
import HomeTestimonials from './HomeTestimonials';
import HomeCTA from './HomeCTA';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleGetStarted = () => {
        navigate(isAuthenticated ? '/dashboard' : '/signup');
    };

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <HomeHero onGetStarted={handleGetStarted} />

            {/* Logos Section */}
            <section className="py-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs text-zinc-600 uppercase tracking-[0.2em] mb-10">
                        Trusted by 15,000+ field service teams
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
                        {['ServiceTitan', 'Jobber', 'FieldEdge', 'Housecall Pro', 'ServiceMax'].map((company) => (
                            <div key={company} className="text-lg font-semibold text-zinc-700 hover:text-zinc-500 transition-colors cursor-default">{company}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <HomeFeatures />

            {/* Testimonials */}
            <HomeTestimonials />

            {/* CTA Section */}
            <HomeCTA onGetStarted={handleGetStarted} />

            {/* Floating Dashboard Widget for logged-in users */}
            <FloatingDashboardWidget />
        </div>
    );
};

export default Home;
