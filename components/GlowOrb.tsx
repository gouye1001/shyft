import React from 'react';

interface GlowOrbProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'purple' | 'cyan' | 'emerald' | 'amber';
    className?: string;
    animated?: boolean;
}

const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[600px] h-[600px]',
};

const colorMap = {
    blue: 'from-blue-500/30 via-blue-600/20 to-transparent',
    purple: 'from-purple-500/30 via-fuchsia-600/20 to-transparent',
    cyan: 'from-cyan-400/30 via-teal-500/20 to-transparent',
    emerald: 'from-emerald-400/30 via-green-500/20 to-transparent',
    amber: 'from-amber-400/30 via-orange-500/20 to-transparent',
};

const GlowOrb: React.FC<GlowOrbProps> = ({
    size = 'md',
    color = 'blue',
    className = '',
    animated = true
}) => {
    return (
        <div
            className={`
        absolute rounded-full blur-[100px] pointer-events-none
        bg-gradient-radial ${colorMap[color]} ${sizeMap[size]}
        ${animated ? 'animate-pulse-slow' : ''}
        ${className}
      `}
        />
    );
};

export default GlowOrb;
