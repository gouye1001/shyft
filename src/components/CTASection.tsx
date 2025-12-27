import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { useAuth } from '../context/AuthContext';

const CTASection: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleGetStarted = () => {
        navigate(isAuthenticated ? '/dashboard' : '/signup');
    };

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Subtle center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <ScrollReveal>
                    <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-8">
                        Ready to build?
                    </h2>
                    <div className="flex flex-col items-center gap-6">
                        <button
                            onClick={handleGetStarted}
                            className="h-14 px-8 rounded-full bg-white text-black text-lg font-medium hover:scale-105 transition-transform"
                        >
                            Get started for free
                        </button>
                        <p className="text-zinc-500 text-sm">
                            No credit card required. Cancel anytime.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default CTASection;