import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animate?: boolean;
}

/**
 * AppSkeleton - Loading placeholder component
 * Use to show loading states before content loads.
 */
export const AppSkeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular',
    width,
    height,
    animate = true,
}) => {
    const baseClasses = 'bg-white/5';
    const animationClasses = animate ? 'animate-pulse' : '';

    const variantClasses = {
        text: 'rounded h-4',
        circular: 'rounded-full',
        rectangular: 'rounded-xl',
    };

    const style: React.CSSProperties = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : '100%'),
    };

    return (
        <div
            className={`${baseClasses} ${animationClasses} ${variantClasses[variant]} ${className}`}
            style={style}
        />
    );
};

/**
 * AppSkeletonText - Multiple lines of skeleton text
 */
export const AppSkeletonText: React.FC<{
    lines?: number;
    className?: string;
}> = ({ lines = 3, className = '' }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <AppSkeleton
                    key={i}
                    variant="text"
                    width={i === lines - 1 ? '60%' : '100%'}
                />
            ))}
        </div>
    );
};

/**
 * AppSkeletonCard - Card-shaped skeleton
 */
export const AppSkeletonCard: React.FC<{
    className?: string;
}> = ({ className = '' }) => {
    return (
        <div className={`p-6 rounded-xl bg-brand-surface border border-white/5 ${className}`}>
            <div className="flex items-center gap-4 mb-4">
                <AppSkeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <AppSkeleton variant="text" width="50%" />
                    <AppSkeleton variant="text" width="30%" />
                </div>
            </div>
            <AppSkeletonText lines={2} />
        </div>
    );
};

/**
 * AppSkeletonTable - Table rows skeleton
 */
export const AppSkeletonTable: React.FC<{
    rows?: number;
    columns?: number;
    className?: string;
}> = ({ rows = 5, columns = 4, className = '' }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex gap-4 p-4 rounded-xl bg-brand-surface/50"
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <AppSkeleton
                            key={colIndex}
                            variant="text"
                            width={colIndex === 0 ? '40%' : '20%'}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AppSkeleton;
