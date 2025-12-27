import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
    icon: string;
    iconColor?: string;
    title: string;
    description: string;
    actionLabel?: string;
    actionIcon?: string;
    onAction?: () => void;
    actionRoute?: string;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    iconColor = 'text-zinc-400',
    title,
    description,
    actionLabel,
    actionIcon = 'fa-plus',
    onAction,
    actionRoute,
    secondaryActionLabel,
    onSecondaryAction,
    className = '',
}) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else if (actionRoute) {
            navigate(actionRoute);
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <i className={`fa-solid ${icon} text-2xl ${iconColor}`} />
            </div>

            {/* Text */}
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 max-w-xs mb-6">{description}</p>

            {/* Actions */}
            <div className="flex items-center gap-3">
                {actionLabel && (
                    <button
                        onClick={handleAction}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
                    >
                        <i className={`fa-solid ${actionIcon} text-xs`} />
                        {actionLabel}
                    </button>
                )}
                {secondaryActionLabel && onSecondaryAction && (
                    <button
                        onClick={onSecondaryAction}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                        {secondaryActionLabel}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
