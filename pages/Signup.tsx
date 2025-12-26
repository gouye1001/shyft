import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import MagneticButton from '../components/MagneticButton';
import PasswordStrength from '../components/PasswordStrength';
import { useAuth } from '../src/context/AuthContext';

interface SignupProps {
    onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onShowToast }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!company.trim()) newErrors.company = 'Company name is required';
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!acceptTerms) {
            newErrors.terms = 'You must accept the terms';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const fullName = `${firstName} ${lastName}`.trim();
            const result = await signup(fullName, email, password);

            if (result.success) {
                onShowToast?.('success', 'Account created! Welcome to Shyft.');
                setTimeout(() => navigate('/verify-success', { replace: true, state: { type: 'signup' } }), 300);
            } else {
                onShowToast?.('error', result.error || 'Signup failed');
                setErrors({ email: result.error || 'Signup failed' });
            }
        } catch {
            onShowToast?.('error', 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 cinematic-bg relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-lg relative z-10" ref={containerRef} onMouseMove={handleMouseMove}>
                <div className="card-spotlight p-8 md:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 shadow-2xl backdrop-blur-xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-6 backdrop-blur-md">
                            <i className="fa-solid fa-rocket text-blue-400" />
                            <span className="text-sm text-zinc-300">14-day free trial</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Create your account</h1>
                        <p className="text-zinc-300">No credit card required. Cancel anytime.</p>
                    </div>

                    {/* Social Signup */}
                    <div className="flex gap-3 mb-8">
                        <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium">
                            <i className="fa-brands fa-microsoft text-lg" />
                            Microsoft
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                id="signup-firstname"
                                label="First Name"
                                value={firstName}
                                onChange={setFirstName}
                                error={errors.firstName}
                                required
                            />
                            <FormInput
                                id="signup-lastname"
                                label="Last Name"
                                value={lastName}
                                onChange={setLastName}
                                error={errors.lastName}
                                required
                            />
                        </div>

                        <FormInput
                            id="signup-email"
                            label="Work Email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="name@company.com"
                            error={errors.email}
                            required
                            autoComplete="email"
                        />

                        <FormInput
                            id="signup-company"
                            label="Company Name"
                            value={company}
                            onChange={setCompany}
                            error={errors.company}
                            required
                        />

                        <FormInput
                            id="signup-password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            error={errors.password}
                            required
                            autoComplete="new-password"
                        />

                        <PasswordStrength password={password} />

                        <FormInput
                            id="signup-confirm"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            error={errors.confirmPassword}
                            required
                            autoComplete="new-password"
                        />

                        {/* Terms Checkbox */}
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div
                                onClick={() => setAcceptTerms(!acceptTerms)}
                                className={`
                                    w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5
                                    transition-all duration-200 shrink-0
                                    ${acceptTerms
                                        ? 'bg-blue-500 border-blue-500'
                                        : errors.terms
                                            ? 'border-red-500/50'
                                            : 'border-white/20 group-hover:border-white/40'
                                    }
                                `}
                            >
                                {acceptTerms && <i className="fa-solid fa-check text-[10px] text-white" />}
                            </div>
                            <span className="text-sm text-zinc-300">
                                I agree to the{' '}
                                <Link to="/terms" className="text-white hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-white hover:underline">Privacy Policy</Link>
                            </span>
                        </label>
                        {errors.terms && (
                            <p className="text-sm text-red-400 flex items-center gap-2 -mt-2">
                                <i className="fa-solid fa-exclamation-circle text-xs" />
                                {errors.terms}
                            </p>
                        )}

                        <MagneticButton
                            variant="primary"
                            size="lg"
                            type="submit"
                            className="w-full"
                            loading={isLoading}
                        >
                            Create Account
                        </MagneticButton>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-500">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-white hover:text-blue-400 transition-colors font-medium"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;