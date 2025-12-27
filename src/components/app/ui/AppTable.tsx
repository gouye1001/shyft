import React from 'react';

interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
}

interface AppTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    onRowClick?: (item: T) => void;
    loading?: boolean;
    emptyMessage?: string;
    emptyDescription?: string;
    emptyIcon?: string;
    emptyAction?: React.ReactNode;
}

/**
 * AppTable - Consistent data table component
 */
export function AppTable<T>({
    columns,
    data,
    keyExtractor,
    onRowClick,
    loading = false,
    emptyMessage = 'No data found',
    emptyDescription,
    emptyIcon = 'fa-inbox',
    emptyAction,
}: AppTableProps<T>) {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3 text-zinc-400">
                    <i className="fa-solid fa-spinner fa-spin text-xl" />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
                    <i className={`fa-solid ${emptyIcon} text-2xl text-zinc-500`} />
                </div>
                <p className="text-white font-medium mb-1">{emptyMessage}</p>
                {emptyDescription && (
                    <p className="text-sm text-zinc-500 max-w-sm mb-4">{emptyDescription}</p>
                )}
                {emptyAction && (
                    <div className="mt-2">{emptyAction}</div>
                )}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/[0.06] text-left">
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className={`px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider ${col.className || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                    {data.map((item, index) => (
                        <tr
                            key={keyExtractor(item)}
                            onClick={() => onRowClick?.(item)}
                            className={`
                                hover:bg-white/[0.02] transition-colors
                                ${onRowClick ? 'cursor-pointer' : ''}
                            `}
                        >
                            {columns.map((col) => (
                                <td
                                    key={String(col.key)}
                                    className={`px-6 py-4 ${col.className || ''}`}
                                >
                                    {col.render
                                        ? col.render(item, index)
                                        : String((item as any)[col.key] ?? '')
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppTable;
