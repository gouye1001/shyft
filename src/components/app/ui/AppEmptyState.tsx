import React from 'react';
import { AppButton } from './AppButton';

interface AppEmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: string;
    };
    className?: string;
}

/**
 * AppEmptyState - Empty state placeholder component
 */
export const AppEmptyState: React.FC<AppEmptyStateProps> = ({
    icon = 'fa-inbox',
    title,
    description,
    action,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
            <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 border border-white/[0.06] flex items-center justify-center mb-6">
                <i className={`fa-solid ${icon} text-3xl text-zinc-500`} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            {description && (
                <p className="text-zinc-400 max-w-sm mb-6">{description}</p>
            )}
            {action && (
                <AppButton
                    variant="primary"
                    icon={action.icon}
                    onClick={action.onClick}
                >
                    {action.label}
                </AppButton>
            )}
        </div>
    );
};

export default AppEmptyState;
