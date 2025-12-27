import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const NotFound: React.FC = () => {
    return (
        <div className="cinematic-bg min-h-screen pt-40 pb-20 relative overflow-hidden flex items-center justify-center">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
                <ScrollReveal>
                    <div className="mb-8">
                        <span className="text-[150px] md:text-[200px] font-bold text-white/5 leading-none block">404</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 -mt-16">
                        Page not found
                    </h1>

                    <p className="text-xl text-zinc-400 mb-12 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-all"
                        >
                            Go to Homepage
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                        >
                            Contact Support
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default NotFound;
