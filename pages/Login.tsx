import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../components/FormInput';
import MagneticButton from '../components/MagneticButton';
import { useAuth } from '../src/context/AuthContext';

interface LoginProps {
    onShowToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const Login: React.FC<LoginProps> = ({ onShowToast }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // Get redirect destination from location state or default to dashboard
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

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
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                onShowToast?.('success', 'Welcome back! Redirecting to dashboard...');
                setTimeout(() => navigate(from, { replace: true }), 500);
            } else {
                onShowToast?.('error', result.error || 'Login failed');
                setErrors({ password: result.error });
            }
        } catch {
            onShowToast?.('error', 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 cinematic-bg relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md relative z-10" ref={containerRef} onMouseMove={handleMouseMove}>
                <div className="card-spotlight p-8 md:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 shadow-2xl backdrop-blur-xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-6 shadow-inner">
                            <i className="fa-solid fa-fingerprint text-2xl text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Welcome back</h1>
                        <p className="text-zinc-300">Sign in to your Shyft workspace</p>
                    </div>

                    {/* Demo Credentials Notice */}
                    <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-300 text-center">
                            <i className="fa-solid fa-info-circle mr-2" />
                            Demo: <code className="bg-blue-500/20 px-2 py-0.5 rounded">demo@shyft.io</code> / <code className="bg-blue-500/20 px-2 py-0.5 rounded">demo123</code>
                        </p>
                    </div>

                    {/* Social Login */}
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
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">or continue with email</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <FormInput
                            id="login-email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="name@company.com"
                            error={errors.email}
                            required
                            autoComplete="email"
                        />

                        <FormInput
                            id="login-password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            placeholder="••••••••"
                            error={errors.password}
                            required
                            autoComplete="current-password"
                        />

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className={`
                                        w-5 h-5 rounded-md border-2 flex items-center justify-center
                                        transition-all duration-200
                                        ${rememberMe
                                            ? 'bg-blue-500 border-blue-500'
                                            : 'border-white/20 group-hover:border-white/40'
                                        }
                                    `}
                                >
                                    {rememberMe && <i className="fa-solid fa-check text-[10px] text-white" />}
                                </div>
                                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-zinc-400 hover:text-white transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <MagneticButton
                            variant="primary"
                            size="lg"
                            type="submit"
                            className="w-full"
                            loading={isLoading}
                        >
                            Sign In
                        </MagneticButton>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-500">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-white hover:text-blue-400 transition-colors font-medium"
                        >
                            Start free trial
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;