import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white border-blue-600',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white border-white/10',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30',
    ghost: 'bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white border-transparent',
    success: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    info: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
};

/**
 * AppButton - Consistent button component with variants
 */
export const AppButton: React.FC<AppButtonProps> = ({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const isDisabled = disabled || loading;

    return (
        <button
            className={`
                inline-flex items-center justify-center font-medium rounded-xl
                border transition-all duration-200
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${fullWidth ? 'w-full' : ''}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            disabled={isDisabled}
            {...props}
        >
            {loading && (
                <i className="fa-solid fa-spinner fa-spin" />
            )}
            {!loading && icon && iconPosition === 'left' && (
                <i className={`fa-solid ${icon}`} />
            )}
            <span>{children}</span>
            {!loading && icon && iconPosition === 'right' && (
                <i className={`fa-solid ${icon}`} />
            )}
        </button>
    );
};

export default AppButton;
