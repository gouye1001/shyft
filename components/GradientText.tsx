import React, { useEffect, useRef, useState } from 'react';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
    colors?: string[];
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    className = '',
    animate = false,
    colors = ['#fff', '#a1a1aa', '#fff'],
}) => {
    const [gradientPosition, setGradientPosition] = useState(0);

    useEffect(() => {
        if (!animate) return;

        const interval = setInterval(() => {
            setGradientPosition(prev => (prev + 1) % 200);
        }, 50);

        return () => clearInterval(interval);
    }, [animate]);

    const gradientStyle = animate
        ? {
            backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
            backgroundSize: '200% 100%',
            backgroundPosition: `${gradientPosition}% 50%`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        }
        : {
            background: `linear-gradient(180deg, ${colors.join(', ')})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        };

    return (
        <span className={className} style={gradientStyle}>
            {children}
        </span>
    );
};

// Animated Counter Component
interface AnimatedCounterProps {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    duration = 2000,
    prefix = '',
    suffix = '',
    className = '',
}) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const startTime = Date.now();
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        setDisplayValue(Math.floor(value * easeOut));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, duration, hasAnimated]);

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
    );
};

// Typewriter Effect Component
interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 50,
    delay = 0,
    className = '',
    onComplete,
}) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(interval);
                    onComplete?.();
                    // Blink cursor for a bit then hide
                    setTimeout(() => setShowCursor(false), 2000);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay, onComplete]);

    return (
        <span className={className}>
            {displayText}
            <span className={`inline-block w-0.5 h-[1em] bg-current ml-0.5 ${showCursor ? 'animate-pulse' : 'opacity-0'}`} />
        </span>
    );
};

export default GradientText;
