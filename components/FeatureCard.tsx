import React from 'react';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    benefits?: string[];
    tags?: string[];
    variant?: 'default' | 'highlighted' | 'compact';
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    benefits,
    tags,
    variant = 'default',
    className = '',
}) => {
    if (variant === 'compact') {
        return (
            <div className={`group p-6 rounded-2xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-all duration-300 ${className}`}>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                        <i className={`fa-solid ${icon} text-blue-400 text-xl`} />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-zinc-400">{description}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                group relative p-8 rounded-3xl border transition-all duration-300
                ${variant === 'highlighted'
                    ? 'bg-blue-900/10 border-blue-500/30 hover:border-blue-500/50'
                    : 'bg-zinc-900/30 border-white/10 hover:border-white/20'
                }
                ${className}
            `}
        >
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl pointer-events-none" />

            <div className="relative z-10">
                {/* Icon */}
                <div className={`
                    w-14 h-14 rounded-xl mb-6
                    flex items-center justify-center
                    transition-all duration-300
                    ${variant === 'highlighted'
                        ? 'bg-blue-500/30 group-hover:bg-blue-500/40'
                        : 'bg-white/10 group-hover:bg-white/15'
                    }
                `}>
                    <i className={`fa-solid ${icon} text-2xl ${variant === 'highlighted' ? 'text-blue-400' : 'text-white'}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 mb-6 leading-relaxed">
                    {description}
                </p>

                {/* Benefits */}
                {benefits && benefits.length > 0 && (
                    <ul className="space-y-2 mb-6">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-zinc-500">
                                <i className={`fa-solid fa-check mt-0.5 ${variant === 'highlighted' ? 'text-blue-400' : 'text-emerald-400'}`} />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`
                                    px-3 py-1 rounded-full text-xs font-medium
                                    ${variant === 'highlighted'
                                        ? 'bg-blue-500/20 text-blue-300'
                                        : 'bg-white/5 text-zinc-400'
                                    }
                                `}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeatureCard;
