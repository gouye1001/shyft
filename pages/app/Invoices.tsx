import React from 'react';

const mockInvoices = [
    { id: 'INV-001', customer: 'John Smith', amount: 450, status: 'Paid', date: 'Dec 24, 2024' },
    { id: 'INV-002', customer: 'Sarah Johnson', amount: 1200, status: 'Pending', date: 'Dec 23, 2024' },
    { id: 'INV-003', customer: 'Mike Williams', amount: 320, status: 'Paid', date: 'Dec 22, 2024' },
    { id: 'INV-004', customer: 'Emily Brown', amount: 890, status: 'Overdue', date: 'Dec 15, 2024' },
    { id: 'INV-005', customer: 'David Lee', amount: 675, status: 'Pending', date: 'Dec 20, 2024' },
];

const AppInvoices: React.FC = () => {
    const statusColors: Record<string, string> = {
        'Paid': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Overdue': 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    const totalRevenue = mockInvoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
    const pendingAmount = mockInvoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
                    <p className="text-zinc-400">Manage billing and payments</p>
                </div>
                <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-plus" />
                    New Invoice
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <div className="text-sm text-zinc-500 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-emerald-400">${totalRevenue.toLocaleString()}</div>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <div className="text-sm text-zinc-500 mb-1">Pending</div>
                    <div className="text-2xl font-bold text-yellow-400">${pendingAmount.toLocaleString()}</div>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <div className="text-sm text-zinc-500 mb-1">Total Invoices</div>
                    <div className="text-2xl font-bold text-white">{mockInvoices.length}</div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 text-left">
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase">Invoice</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase">Customer</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase">Amount</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase">Date</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {mockInvoices.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-white font-medium">{invoice.id}</td>
                                <td className="px-6 py-4 text-zinc-300">{invoice.customer}</td>
                                <td className="px-6 py-4 text-white font-semibold">${invoice.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[invoice.status]}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-400">{invoice.date}</td>
                                <td className="px-6 py-4">
                                    <button className="text-zinc-500 hover:text-white transition-colors">
                                        <i className="fa-solid fa-ellipsis-vertical" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppInvoices;
