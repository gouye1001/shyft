import React, { useMemo } from 'react';

interface PasswordStrengthProps {
    password: string;
    className?: string;
}

interface Requirement {
    label: string;
    met: boolean;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className = '' }) => {
    const requirements: Requirement[] = useMemo(() => [
        { label: '8+ characters', met: password.length >= 8 },
        { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'Lowercase letter', met: /[a-z]/.test(password) },
        { label: 'Number', met: /[0-9]/.test(password) },
        { label: 'Special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ], [password]);

    const strength = useMemo(() => {
        const metCount = requirements.filter(r => r.met).length;
        if (metCount === 0) return { level: 0, label: '', color: '' };
        if (metCount <= 2) return { level: 1, label: 'Weak', color: 'red' };
        if (metCount <= 3) return { level: 2, label: 'Fair', color: 'amber' };
        if (metCount <= 4) return { level: 3, label: 'Good', color: 'blue' };
        return { level: 4, label: 'Strong', color: 'emerald' };
    }, [requirements]);

    const colorClasses = {
        red: 'bg-red-500',
        amber: 'bg-amber-500',
        blue: 'bg-blue-500',
        emerald: 'bg-emerald-500',
    };

    const textColorClasses = {
        red: 'text-red-400',
        amber: 'text-amber-400',
        blue: 'text-blue-400',
        emerald: 'text-emerald-400',
    };

    if (!password) return null;

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Strength Bar */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-500">Password strength</span>
                    {strength.level > 0 && (
                        <span className={`text-xs font-medium ${textColorClasses[strength.color as keyof typeof textColorClasses]}`}>
                            {strength.label}
                        </span>
                    )}
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={`
                h-1.5 flex-1 rounded-full transition-all duration-500
                ${level <= strength.level
                                    ? `${colorClasses[strength.color as keyof typeof colorClasses]} shadow-lg shadow-current/30`
                                    : 'bg-zinc-800'
                                }
              `}
                        />
                    ))}
                </div>
            </div>

            {/* Requirements Checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {requirements.map((req, index) => (
                    <div
                        key={index}
                        className={`
              flex items-center gap-2 text-xs transition-all duration-300
              ${req.met ? 'text-emerald-400' : 'text-zinc-600'}
            `}
                    >
                        <div className={`
              w-4 h-4 rounded-full flex items-center justify-center
              transition-all duration-300
              ${req.met
                                ? 'bg-emerald-500/20 scale-100'
                                : 'bg-zinc-800 scale-90'
                            }
            `}>
                            <i className={`fa-solid ${req.met ? 'fa-check' : 'fa-circle'} text-[8px]`} />
                        </div>
                        {req.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordStrength;
