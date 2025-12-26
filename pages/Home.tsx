import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IntegrationsSection from '../components/IntegrationsSection';
import PricingSection from '../components/PricingSection';
import CTASection from '../components/CTASection';

const Home: React.FC = () => {
    return (
        <>
            <HeroSection />
            <div className="max-w-7xl mx-auto px-6">
                <StatsSection />
            </div>
            <FeaturesSection />
            <div className="max-w-7xl mx-auto px-6">
                <IntegrationsSection />
            </div>
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </>
    );
};

export default Home;