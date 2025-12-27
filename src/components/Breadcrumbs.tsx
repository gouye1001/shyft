import React from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    items,
    separator = <i className="fa-solid fa-chevron-right text-xs" />,
    className = '',
}) => {
    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-2 text-sm ${className}`}
        >
            <ol className="flex items-center gap-2 flex-wrap">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {item.onClick ? (
                                <button
                                    onClick={item.onClick}
                                    className={`
                                        transition-colors
                                        ${isLast
                                            ? 'text-white font-medium cursor-default'
                                            : 'text-zinc-400 hover:text-white'
                                        }
                                    `}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </button>
                            ) : (
                                <span
                                    className={`
                                        ${isLast
                                            ? 'text-white font-medium'
                                            : 'text-zinc-400'
                                        }
                                    `}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <span className="text-zinc-600" aria-hidden="true">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
