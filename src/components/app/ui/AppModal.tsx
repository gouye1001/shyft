import React, { useEffect, useRef } from 'react';

interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

/**
 * AppModal - Modal dialog component
 */
export const AppModal: React.FC<AppModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className={`
                    relative w-full ${sizeClasses[size]}
                    bg-zinc-900 border border-white/10 rounded-2xl
                    shadow-2xl shadow-black/50
                    animate-in fade-in zoom-in-95 duration-200
                `}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-white/[0.06]">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-white">{title}</h2>
                            {description && (
                                <p className="mt-1 text-sm text-zinc-400">{description}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 -mt-1 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            <i className="fa-solid fa-xmark text-lg" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppModal;
