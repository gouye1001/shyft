import React, { useState } from 'react';

interface FormInputProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel' | 'textarea';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    className?: string;
    showPasswordToggle?: boolean;
    maxLength?: number;
    showCharCount?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    autoComplete,
    className = '',
    showPasswordToggle = true,
    maxLength,
    showCharCount = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const isTextarea = type === 'textarea';

    const baseInputClasses = `
    w-full bg-zinc-900/50 rounded-xl px-4 py-3.5
    text-white placeholder:text-zinc-600
    border-2 transition-all duration-300 ease-out
    focus:outline-none
    ${error
            ? 'border-brand-danger/50 focus:border-brand-danger focus:shadow-[0_0_20px_-5px_rgba(229,72,77,0.3)]'
            : isFocused
                ? 'border-brand-accent/50 shadow-[0_0_30px_-10px_rgba(91,91,214,0.4)]'
                : 'border-white/10 hover:border-white/20'
        }
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

    return (
        <div className={`relative group ${className}`}>
            {/* Floating Label */}
            <label
                htmlFor={id}
                className={`
          absolute left-4 transition-all duration-200 pointer-events-none z-10
          ${(isFocused || value)
                        ? '-top-2.5 text-xs px-2 bg-black rounded'
                        : 'top-3.5 text-sm'
                    }
          ${error
                        ? 'text-brand-danger'
                        : isFocused
                            ? 'text-brand-accent-light'
                            : 'text-zinc-500'
                    }
        `}
            >
                {label}
                {required && <span className="text-brand-danger ml-1">*</span>}
            </label>

            {/* Focus Glow */}
            <div
                className={`
          absolute inset-0 rounded-xl transition-opacity duration-300
          bg-gradient-to-r from-brand-accent/20 via-brand-accent/10 to-brand-accent/20
          blur-xl -z-10
          ${isFocused && !error ? 'opacity-100' : 'opacity-0'}
        `}
            />

            {isTextarea ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={isFocused || value ? placeholder : ''}
                    disabled={disabled}
                    maxLength={maxLength}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`${baseInputClasses} min-h-[120px] resize-y`}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            ) : (
                <div className="relative">
                    <input
                        id={id}
                        type={inputType}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={isFocused || value ? placeholder : ''}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        maxLength={maxLength}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`${baseInputClasses} ${isPassword && showPasswordToggle ? 'pr-12' : ''}`}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                    />

                    {/* Password Toggle */}
                    {isPassword && showPasswordToggle && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                            tabIndex={-1}
                        >
                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                        </button>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-2 text-sm text-brand-danger flex items-center gap-2 animate-shake"
                >
                    <i className="fa-solid fa-exclamation-circle text-xs" />
                    {error}
                </p>
            )}

            {/* Character Count */}
            {showCharCount && maxLength && (
                <p className="mt-1 text-xs text-zinc-500 text-right">
                    {value.length}/{maxLength}
                </p>
            )}
        </div>
    );
};

export default FormInput;
