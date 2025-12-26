import React, { useState } from 'react';
import { Page } from '../App';
import FormInput from '../components/FormInput';
import MagneticButton from '../components/MagneticButton';
import GlowOrb from '../components/GlowOrb';

interface ForgotPasswordProps {
    onNavigate: (page: Page) => void;
    onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate, onShowToast }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
        <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 aurora-bg relative overflow-hidden">
            {/* Ambient orbs */}
            <GlowOrb size="lg" color="cyan" className="top-20 left-20" />
            <GlowOrb size="md" color="blue" className="bottom-20 right-20" />

            <div className="w-full max-w-md relative z-10">
                {isSuccess ? (
                    <div className="text-center">
                        {/* Success State */}
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-8">
                            <i className="fa-solid fa-envelope-circle-check text-4xl text-emerald-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Check your email</h1>
                        <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                            We've sent a password reset link to <span className="text-white">{email}</span>.
                            The link will expire in 24 hours.
                        </p>

                        <div className="space-y-4">
                            <MagneticButton
                                variant="primary"
                                size="md"
                                onClick={() => onNavigate('login')}
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
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 mb-6">
                                <i className="fa-solid fa-key text-2xl text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-3">Forgot password?</h1>
                            <p className="text-zinc-400">No worries, we'll send you reset instructions.</p>
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
                            className="mt-8 w-full text-center text-sm text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-arrow-left text-xs" />
                            Back to login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
