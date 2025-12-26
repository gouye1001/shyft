import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'hover' | 'click';
    delay?: number;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = 'top',
    trigger = 'hover',
    delay = 200,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            updatePosition();
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    const updatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        let x = 0;
        let y = 0;

        switch (position) {
            case 'top':
                x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                y = triggerRect.top - tooltipRect.height - 8;
                break;
            case 'bottom':
                x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                y = triggerRect.bottom + 8;
                break;
            case 'left':
                x = triggerRect.left - tooltipRect.width - 8;
                y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                break;
            case 'right':
                x = triggerRect.right + 8;
                y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                break;
        }

        setCoords({ x, y });
    };

    useEffect(() => {
        if (isVisible) {
            updatePosition();
        }
    }, [isVisible]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleClick = () => {
        if (trigger === 'click') {
            setIsVisible(!isVisible);
        }
    };

    const positionClasses = {
        top: 'mb-2',
        bottom: 'mt-2',
        left: 'mr-2',
        right: 'ml-2',
    };

    const arrowClasses = {
        top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-zinc-800 border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-zinc-800 border-l-transparent border-r-transparent border-t-transparent',
        left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-zinc-800 border-t-transparent border-b-transparent border-r-transparent',
        right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-zinc-800 border-t-transparent border-b-transparent border-l-transparent',
    };

    return (
        <div className="relative inline-block">
            <div
                ref={triggerRef}
                onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
                onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
                onClick={handleClick}
                className="inline-block"
            >
                {children}
            </div>

            {isVisible && (
                <>
                    {/* Portal-like positioning */}
                    <div
                        ref={tooltipRef}
                        className={`
                            fixed z-50 px-3 py-2 text-sm text-white
                            bg-zinc-800 border border-white/10 rounded-lg
                            shadow-xl shadow-black/50
                            pointer-events-none
                            animate-in fade-in duration-200
                            ${positionClasses[position]}
                            ${className}
                        `}
                        style={{
                            left: `${coords.x}px`,
                            top: `${coords.y}px`,
                        }}
                        role="tooltip"
                    >
                        {content}
                        {/* Arrow */}
                        <div
                            className={`
                                absolute w-0 h-0
                                border-4
                                ${arrowClasses[position]}
                            `}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Tooltip;
