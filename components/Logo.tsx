import React from 'react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`${sizeClasses[size]} relative rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3/5 h-3/5"
            >
                {/* S letter stylized as a route/path */}
                <path
                    d="M24 8C24 6 20 4 16 4C12 4 8 6 8 8C8 10 10 11 12 11.5C10 12 8 13.5 8 16C8 18.5 10 20 12 20.5C10 21 8 22.5 8 25C8 27 12 29 16 29C20 29 24 27 24 25C24 23 22 21.5 20 21C22 20.5 24 19 24 16.5C24 14 22 12.5 20 12C22 11.5 24 10 24 8Z"
                    fill="white"
                    opacity="0.9"
                />
            </svg>
        </div>
    );
};

export default Logo;
