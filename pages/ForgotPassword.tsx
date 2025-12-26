import React, { useState, useRef } from 'react';
import { Page } from '../App';
import FormInput from '../components/FormInput';
import MagneticButton from '../components/MagneticButton';

interface ForgotPasswordProps {
    onNavigate: (page: Page) => void;
    onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate, onShowToast }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setError('');
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSuccess(true);
        onShowToast?.('success', 'Reset link sent! Check your email.');
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 cinematic-bg relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md relative z-10" ref={containerRef} onMouseMove={handleMouseMove}>
                <div className="card-spotlight p-8 md:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 shadow-2xl backdrop-blur-xl">
                    {isSuccess ? (
                        <div className="text-center">
                            {/* Success State */}
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-8 shadow-inner">
                                <i className="fa-solid fa-envelope-circle-check text-4xl text-emerald-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Check your email</h1>
                            <p className="text-zinc-300 mb-8 max-w-sm mx-auto leading-relaxed">
                                We've sent a password reset link to <span className="text-white font-medium">{email}</span>.
                                The link will expire in 24 hours.
                            </p>

                            <div className="space-y-4">
                                <MagneticButton
                                    variant="primary"
                                    size="md"
                                    onClick={() => onNavigate('login')}
                                    className="w-full"
                                >
                                    Back to Login
                                </MagneticButton>

                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="block w-full text-sm text-zinc-500 hover:text-white transition-colors"
                                >
                                    Didn't receive it? Try again
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Form State */}
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 mb-6 shadow-inner">
                                    <i className="fa-solid fa-key text-2xl text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Forgot password?</h1>
                                <p className="text-zinc-300">No worries, we'll send you reset instructions.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <FormInput
                                    id="forgot-email"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    placeholder="name@company.com"
                                    error={error}
                                    required
                                    autoComplete="email"
                                />

                                <MagneticButton
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    className="w-full"
                                    loading={isLoading}
                                >
                                    Send Reset Link
                                </MagneticButton>
                            </form>

                            <button
                                onClick={() => onNavigate('login')}
                                className="mt-8 w-full text-center text-sm text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-2 group"
                            >
                                <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
                                Back to login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
