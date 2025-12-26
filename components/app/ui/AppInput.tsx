import React from 'react';

interface AppInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: string;
    onChange?: (value: string) => void;
}

interface AppTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    label?: string;
    error?: string;
    hint?: string;
    onChange?: (value: string) => void;
}

interface AppSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    error?: string;
    hint?: string;
    options: Array<{ value: string; label: string }>;
    onChange?: (value: string) => void;
}

const baseInputClasses = `
    w-full px-4 py-3 rounded-xl 
    bg-zinc-900/50 border border-white/10 
    text-white placeholder-zinc-500
    focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10
    transition-all duration-200
`;

const errorInputClasses = 'border-red-500/50 focus:border-red-500/50';

/**
 * AppInput - Form input component
 */
export const AppInput: React.FC<AppInputProps> = ({
    label,
    error,
    hint,
    icon,
    onChange,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-zinc-300">
                    {label}
                    {props.required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <i className={`fa-solid ${icon} absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500`} />
                )}
                <input
                    className={`
                        ${baseInputClasses}
                        ${icon ? 'pl-11' : ''}
                        ${error ? errorInputClasses : ''}
                        ${className}
                    `}
                    onChange={(e) => onChange?.(e.target.value)}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-exclamation text-xs" />
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-sm text-zinc-500">{hint}</p>
            )}
        </div>
    );
};

/**
 * AppTextarea - Form textarea component
 */
export const AppTextarea: React.FC<AppTextareaProps> = ({
    label,
    error,
    hint,
    onChange,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-zinc-300">
                    {label}
                    {props.required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            <textarea
                className={`
                    ${baseInputClasses}
                    min-h-[100px] resize-y
                    ${error ? errorInputClasses : ''}
                    ${className}
                `}
                onChange={(e) => onChange?.(e.target.value)}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-exclamation text-xs" />
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-sm text-zinc-500">{hint}</p>
            )}
        </div>
    );
};

/**
 * AppSelect - Form select component
 */
export const AppSelect: React.FC<AppSelectProps> = ({
    label,
    error,
    hint,
    options,
    onChange,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-zinc-300">
                    {label}
                    {props.required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            <select
                className={`
                    ${baseInputClasses}
                    ${error ? errorInputClasses : ''}
                    ${className}
                `}
                onChange={(e) => onChange?.(e.target.value)}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-exclamation text-xs" />
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-sm text-zinc-500">{hint}</p>
            )}
        </div>
    );
};

export default AppInput;
