import React, { useState, useRef } from 'react';

interface MagneticButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
    loading?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    loading = false,
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || disabled) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) * 0.15;
        const y = (e.clientY - centerY) * 0.15;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const sizeClasses = {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-7 text-base',
        lg: 'h-14 px-10 text-lg',
    };

    const variantClasses = {
        primary: `
      bg-white text-black font-semibold
      hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]
      active:scale-95
    `,
        secondary: `
      bg-transparent text-white font-medium
      border-2 border-white/20
      hover:border-white/40 hover:bg-white/5
      active:scale-95
    `,
        ghost: `
      bg-transparent text-zinc-400 font-medium
      hover:text-white hover:bg-white/5
      active:scale-95
    `,
    };

    return (
        <button
            ref={buttonRef}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`
        relative overflow-hidden rounded-full
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            {/* Shine Effect */}
            <div
                className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
          -translate-x-full transition-transform duration-700
          ${isHovered && variant === 'primary' ? 'translate-x-full' : ''}
        `}
            />

            {/* Ripple Effect on Hover */}
            {variant === 'secondary' && isHovered && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse" />
            )}

            {/* Content */}
            <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : ''}`}>
                {children}
            </span>

            {/* Loading Spinner */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </button>
    );
};

export default MagneticButton;
