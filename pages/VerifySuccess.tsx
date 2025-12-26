import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

const VerifySuccess: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [countdown, setCountdown] = useState(3);

    // Get the type of auth from location state
    const authType = (location.state as { type?: 'login' | 'signup' })?.type || 'login';

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Use SPA navigation instead of window.location
                    navigate('/dashboard', { replace: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-black relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
            </div>

            <div className="relative z-10 text-center max-w-md">
                {/* Success Animation */}
                <div className="relative mb-8">
                    {/* Outer ring animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 animate-ping" />
                    </div>

                    {/* Success icon */}
                    <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                        <i className="fa-solid fa-check text-4xl text-white animate-bounce" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    {authType === 'signup' ? 'Welcome to Shyft!' : 'Welcome back!'}
                </h1>

                <p className="text-lg text-zinc-400 mb-8">
                    {authType === 'signup'
                        ? "Your account has been created successfully. Let's get you started."
                        : `Good to see you again, ${user?.name || user?.email?.split('@')[0] || 'there'}!`
                    }
                </p>

                {/* Countdown */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-400 font-bold text-lg">{countdown}</span>
                    </div>
                    <span className="text-zinc-400">
                        Redirecting to dashboard...
                    </span>
                </div>

                {/* Manual redirect button */}
                <div className="mt-8">
                    <button
                        onClick={() => navigate('/dashboard', { replace: true })}
                        className="text-sm text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
                    >
                        Skip and go to dashboard now
                    </button>
                </div>

                {/* Features preview for new users */}
                {authType === 'signup' && (
                    <div className="mt-12 grid grid-cols-3 gap-4">
                        {[
                            { icon: 'fa-calendar-days', label: 'Schedule' },
                            { icon: 'fa-users', label: 'Team' },
                            { icon: 'fa-chart-line', label: 'Analytics' },
                        ].map((item) => (
                            <div key={item.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <i className={`fa-solid ${item.icon} text-xl text-zinc-400 mb-2`} />
                                <div className="text-xs text-zinc-500">{item.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifySuccess;
