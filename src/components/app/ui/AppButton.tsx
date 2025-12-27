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
    primary: 'bg-brand-accent hover:bg-brand-accent-light text-white border-brand-accent',
    secondary: 'bg-brand-elevated hover:bg-zinc-700 text-white border-white/10',
    danger: 'bg-brand-danger/10 hover:bg-brand-danger/20 text-brand-danger border-brand-danger/30',
    ghost: 'bg-transparent hover:bg-white/5 text-brand-text-secondary hover:text-white border-transparent',
    success: 'bg-brand-success/10 hover:bg-brand-success/20 text-brand-success border-brand-success/30',
    info: 'bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent border-brand-accent/30',
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
