import React from 'react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-7 h-7',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`${sizeClasses[size]} relative flex items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Rounded square background */}
                <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="8"
                    fill="#0A0A0B"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                />
                {/* Two interlocking chevrons creating an abstract 'S' */}
                <path
                    d="M10 9L16 14L10 19"
                    stroke="#5B5BD6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22 13L16 18L22 23"
                    stroke="#5B5BD6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default Logo;
