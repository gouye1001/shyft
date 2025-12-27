import React from 'react';

interface AppCardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

interface AppCardHeaderProps {
    children: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

interface AppCardContentProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * AppCard - Consistent card component for app pages
 * Uses div with role="button" when clickable to allow nested interactive elements
 */
export const AppCard: React.FC<AppCardProps> = ({
    children,
    className = '',
    padding = 'none',
    onClick
}) => {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <div
            onClick={onClick}
            onKeyDown={onClick ? handleKeyDown : undefined}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            className={`rounded-2xl bg-zinc-900/50 border border-white/[0.06] overflow-hidden text-left w-full ${paddingClasses[padding]} ${className}`}
        >
            {children}
        </div>
    );
};

export const AppCardHeader: React.FC<AppCardHeaderProps> = ({
    children,
    action,
    className = ''
}) => (
    <div className={`px-6 py-4 border-b border-white/[0.06] flex items-center justify-between ${className}`}>
        <div className="flex items-center gap-3">
            {children}
        </div>
        {action && <div>{action}</div>}
    </div>
);

export const AppCardContent: React.FC<AppCardContentProps> = ({
    children,
    className = ''
}) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export default AppCard;
