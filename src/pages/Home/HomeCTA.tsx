import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';
import { useAuth } from '../../context/AuthContext';

interface HomeCTAProps {
    onGetStarted: () => void;
}

const HomeCTA: React.FC<HomeCTAProps> = ({ onGetStarted }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                        Ready to transform your<br />field operations?
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                        Join 15,000+ teams already using Shyft to work smarter.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={onGetStarted} className="group h-16 px-10 rounded-full bg-white text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-white/10 flex items-center justify-center gap-2">
                            {isAuthenticated ? 'Go to Dashboard' : 'Get started free'}
                            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={() => navigate('/contact')} className="h-16 px-10 rounded-full border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-colors">
                            Talk to sales
                        </button>
                    </div>
                    <p className="text-sm text-zinc-600 mt-8">
                        Free 14-day trial • No credit card required • Cancel anytime
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default HomeCTA;
