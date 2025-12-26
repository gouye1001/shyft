import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
    onDismiss: (id: string) => void;
}

const iconMap: Record<ToastType, string> = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle',
};

const colorMap: Record<ToastType, string> = {
    success: 'border-emerald-500/50 bg-emerald-500/10',
    error: 'border-red-500/50 bg-red-500/10',
    warning: 'border-amber-500/50 bg-amber-500/10',
    info: 'border-blue-500/50 bg-blue-500/10',
};

const iconColorMap: Record<ToastType, string> = {
    success: 'text-emerald-400',
    error: 'text-red-400',
    warning: 'text-amber-400',
    info: 'text-blue-400',
};

const Toast: React.FC<ToastProps> = ({ id, type, message, duration = 4000, onDismiss }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => Math.max(0, prev - (100 / (duration / 50))));
        }, 50);

        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onDismiss(id), 300);
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [duration, id, onDismiss]);

    return (
        <div
            className={`
        relative overflow-hidden
        flex items-center gap-4 px-5 py-4 rounded-2xl
        border backdrop-blur-xl
        ${colorMap[type]}
        transform transition-all duration-300 ease-out
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        shadow-2xl shadow-black/50
      `}
        >
            {/* Glow effect */}
            <div className={`absolute inset-0 opacity-20 blur-xl ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />

            <i className={`fa-solid ${iconMap[type]} ${iconColorMap[type]} text-xl relative z-10`} />
            <span className="text-white text-sm font-medium relative z-10 flex-1">{message}</span>
            <button
                onClick={() => {
                    setIsExiting(true);
                    setTimeout(() => onDismiss(id), 300);
                }}
                className="text-zinc-400 hover:text-white transition-colors relative z-10"
            >
                <i className="fa-solid fa-xmark" />
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <div
                    className={`h-full transition-all duration-50 ${iconColorMap[type].replace('text-', 'bg-')}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

// Toast Container Component
interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContainerProps {
    toasts: ToastItem[];
    onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
    return (
        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-md">
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
};

// Hook for managing toasts
export const useToast = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = (type: ToastType, message: string) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setToasts(prev => [...prev, { id, type, message }]);
    };

    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return {
        toasts,
        addToast,
        dismissToast,
        success: (msg: string) => addToast('success', msg),
        error: (msg: string) => addToast('error', msg),
        warning: (msg: string) => addToast('warning', msg),
        info: (msg: string) => addToast('info', msg),
    };
};

export default Toast;
