import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple';

interface AppBadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    dot?: boolean;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
    error: 'bg-red-500/15 text-red-400 border-red-500/25',
    info: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    neutral: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
};

const dotColors: Record<BadgeVariant, string> = {
    success: 'bg-emerald-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    neutral: 'bg-zinc-400',
    purple: 'bg-purple-400',
};

/**
 * AppBadge - Status badge component
 */
export const AppBadge: React.FC<AppBadgeProps> = ({
    children,
    variant = 'neutral',
    size = 'md',
    dot = false,
    className = '',
}) => {
    const sizeClasses = size === 'sm'
        ? 'px-2 py-0.5 text-[10px]'
        : 'px-3 py-1 text-xs';

    return (
        <span className={`
            inline-flex items-center gap-1.5 font-medium rounded-full border
            ${variantClasses[variant]}
            ${sizeClasses}
            ${className}
        `}>
            {dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
            )}
            {children}
        </span>
    );
};

export default AppBadge;
