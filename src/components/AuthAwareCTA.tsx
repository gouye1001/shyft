import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AuthAwareCTAProps {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    /** Text for non-authenticated users */
    guestText?: string;
    /** Text for authenticated users */
    authText?: string;
    /** Icon class for the button */
    icon?: string;
    /** Where to redirect authenticated users */
    authRoute?: string;
    /** Where to redirect guests */
    guestRoute?: string;
}

const AuthAwareCTA: React.FC<AuthAwareCTAProps> = ({
    variant = 'primary',
    size = 'lg',
    className = '',
    guestText = 'Start Free Trial',
    authText = 'Go to Dashboard',
    icon = 'fa-arrow-right',
    authRoute = '/dashboard',
    guestRoute = '/signup',
}) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const variantClasses = {
        primary: 'bg-white text-black font-semibold hover:bg-zinc-200 shadow-lg shadow-white/10',
        secondary: 'border border-white/20 text-white font-semibold hover:bg-white/5',
    };

    const handleClick = () => {
        navigate(isAuthenticated ? authRoute : guestRoute);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                rounded-full transition-all inline-flex items-center gap-2
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                ${className}
            `}
        >
            {isAuthenticated ? authText : guestText}
            {icon && <i className={`fa-solid ${icon} text-sm`} />}
        </button>
    );
};

export default AuthAwareCTA;
