import React, { useState } from 'react';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppTable, AppModal, AppInput, AppSelect } from '../../components/app/ui';
import mockDb, { Invoice } from '../../src/services/mockDb';
import { useInvoices, useCustomers, useJobs } from '../../src/hooks/useMockData';

/**
 * AppInvoices - Fully functional invoices page connected to mockDb
 * Features: Real invoice data, Mark as Paid, Create Invoice, Filters
 */
const AppInvoices: React.FC = () => {
    const invoices = useInvoices();
    const customers = useCustomers();
    const jobs = useJobs();

    const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        customerId: '',
        jobId: '',
        amount: '',
        dueDate: '',
    });

    // Filter invoices
    const filteredInvoices = invoices.filter(inv =>
        filter === 'all' || inv.status === filter
    );

    const statusBadgeVariant = (status: string) => {
        switch (status) {
            case 'paid': return 'success';
            case 'pending': return 'warning';
            case 'overdue': return 'error';
            default: return 'neutral';
        }
    };

    // Calculate stats
    const stats = {
        total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
        paid: invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
        pending: invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
        overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
    };

    // Get completable jobs (completed but no invoice yet)
    const completedJobIds = new Set(invoices.map(i => i.jobId));
    const invoiceableJobs = jobs.filter(j =>
        j.status === 'completed' && !completedJobIds.has(j.id)
    );

    // Handle mark as paid
    const handleMarkPaid = (invoice: Invoice) => {
        mockDb.updateInvoice(invoice.id, { status: 'paid' });
        setSelectedInvoice(null);
    };

    // Handle create invoice
    const handleCreateInvoice = () => {
        if (!formData.customerId || !formData.amount) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        const customer = customers.find(c => c.id === formData.customerId);
        const job = jobs.find(j => j.id === formData.jobId);

        mockDb.addInvoice({
            jobId: formData.jobId || '',
            customerId: formData.customerId,
            customerName: customer?.name || 'Unknown',
            jobTitle: job?.title || 'Custom Invoice',
            amount: parseFloat(formData.amount),
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            dueDate: formData.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        });

        setShowCreateModal(false);
        resetForm();
        setIsSubmitting(false);
    };

    const resetForm = () => {
        setFormData({ customerId: '', jobId: '', amount: '', dueDate: '' });
    };

    // When job is selected, auto-fill amount
    const handleJobSelect = (jobId: string) => {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            setFormData(prev => ({
                ...prev,
                jobId,
                customerId: job.customerId,
                amount: job.amount.toString(),
            }));
        }
    };

    const columns = [
        {
            key: 'id',
            header: 'Invoice',
            render: (inv: Invoice) => (
                <div>
                    <div className="text-white font-medium">{inv.id}</div>
                    <div className="text-sm text-zinc-500">{inv.jobTitle}</div>
                </div>
            ),
        },
        {
            key: 'customer',
            header: 'Customer',
            render: (inv: Invoice) => <span className="text-zinc-300">{inv.customerName}</span>,
        },
        {
            key: 'amount',
            header: 'Amount',
            render: (inv: Invoice) => (
                <span className="text-white font-medium">${inv.amount.toLocaleString()}</span>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            render: (inv: Invoice) => (
                <AppBadge variant={statusBadgeVariant(inv.status)} dot>
                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                </AppBadge>
            ),
        },
        {
            key: 'date',
            header: 'Date',
            render: (inv: Invoice) => <span className="text-zinc-400">{inv.date}</span>,
        },
        {
            key: 'dueDate',
            header: 'Due',
            render: (inv: Invoice) => (
                <span className={inv.status === 'overdue' ? 'text-red-400' : 'text-zinc-400'}>
                    {inv.dueDate}
                </span>
            ),
        },
        {
            key: 'actions',
            header: '',
            render: (inv: Invoice) => (
                <div className="flex items-center gap-2">
                    {inv.status !== 'paid' && (
                        <AppButton
                            variant="ghost"
                            size="sm"
                            icon="fa-check"
                            onClick={(e) => { e.stopPropagation(); handleMarkPaid(inv); }}
                        >
                            Pay
                        </AppButton>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Invoices</h1>
                    <p className="text-zinc-400">Manage billing and payments ({invoices.length} total)</p>
                </div>
                <div className="flex gap-3">
                    <AppButton variant="secondary" icon="fa-download">
                        Export
                    </AppButton>
                    <AppButton variant="primary" icon="fa-plus" onClick={() => setShowCreateModal(true)}>
                        New Invoice
                    </AppButton>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: stats.total, color: 'blue', icon: 'fa-chart-line' },
                    { label: 'Paid', value: stats.paid, color: 'emerald', icon: 'fa-check-circle' },
                    { label: 'Pending', value: stats.pending, color: 'yellow', icon: 'fa-clock' },
                    { label: 'Overdue', value: stats.overdue, color: 'red', icon: 'fa-exclamation-circle' },
                ].map((stat, i) => (
                    <AppCard key={i} padding="md">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                                <i className={`fa-solid ${stat.icon} text-${stat.color}-400`} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">${stat.value.toLocaleString()}</div>
                        <div className="text-sm text-zinc-500">{stat.label}</div>
                    </AppCard>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-1 p-1 rounded-xl bg-zinc-900/50 border border-white/[0.06] w-fit">
                {[
                    { key: 'all', label: 'All', count: invoices.length },
                    { key: 'paid', label: 'Paid', count: invoices.filter(i => i.status === 'paid').length },
                    { key: 'pending', label: 'Pending', count: invoices.filter(i => i.status === 'pending').length },
                    { key: 'overdue', label: 'Overdue', count: invoices.filter(i => i.status === 'overdue').length },
                ].map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key as typeof filter)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === f.key ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        {f.label}
                        <span className={`text-xs px-1.5 py-0.5 rounded-md ${filter === f.key ? 'bg-white/10' : 'bg-zinc-800'}`}>
                            {f.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <AppCard>
                <AppTable
                    columns={columns}
                    data={filteredInvoices}
                    keyExtractor={(inv) => inv.id}
                    onRowClick={(inv) => setSelectedInvoice(inv)}
                    emptyMessage="No invoices found"
                    emptyIcon="fa-file-invoice"
                />
            </AppCard>

            {/* Invoice Detail Modal */}
            <AppModal
                isOpen={!!selectedInvoice}
                onClose={() => setSelectedInvoice(null)}
                title={selectedInvoice?.id || ''}
                description={`Invoice for ${selectedInvoice?.customerName}`}
                size="md"
                footer={
                    <>
                        <AppButton variant="secondary" icon="fa-download">
                            Download PDF
                        </AppButton>
                        {selectedInvoice?.status !== 'paid' && (
                            <AppButton
                                variant="success"
                                icon="fa-check"
                                onClick={() => selectedInvoice && handleMarkPaid(selectedInvoice)}
                            >
                                Mark as Paid
                            </AppButton>
                        )}
                    </>
                }
            >
                {selectedInvoice && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <AppBadge variant={statusBadgeVariant(selectedInvoice.status)} dot>
                                {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                            </AppBadge>
                            <div className="text-3xl font-bold text-white">
                                ${selectedInvoice.amount.toLocaleString()}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Customer</div>
                                <div className="text-white">{selectedInvoice.customerName}</div>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Job</div>
                                <div className="text-white">{selectedInvoice.jobTitle}</div>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Invoice Date</div>
                                <div className="text-white">{selectedInvoice.date}</div>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Due Date</div>
                                <div className={selectedInvoice.status === 'overdue' ? 'text-red-400' : 'text-white'}>
                                    {selectedInvoice.dueDate}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AppModal>

            {/* Create Invoice Modal */}
            <AppModal
                isOpen={showCreateModal}
                onClose={() => { setShowCreateModal(false); resetForm(); }}
                title="Create Invoice"
                description="Generate a new invoice"
                size="lg"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => { setShowCreateModal(false); resetForm(); }}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="primary"
                            icon="fa-check"
                            onClick={handleCreateInvoice}
                            loading={isSubmitting}
                        >
                            Create Invoice
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-5">
                    {invoiceableJobs.length > 0 && (
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <div className="text-sm text-blue-400 mb-2">
                                <i className="fa-solid fa-info-circle mr-2" />
                                Quick: Select a completed job to auto-fill details
                            </div>
                            <AppSelect
                                label="From Completed Job"
                                options={[
                                    { value: '', label: 'Select a job...' },
                                    ...invoiceableJobs.map(j => ({
                                        value: j.id,
                                        label: `${j.title} - ${j.customerName} ($${j.amount})`
                                    }))
                                ]}
                                value={formData.jobId}
                                onChange={handleJobSelect}
                            />
                        </div>
                    )}

                    <AppSelect
                        label="Customer"
                        options={[
                            { value: '', label: 'Select customer...' },
                            ...customers.map(c => ({ value: c.id, label: c.name }))
                        ]}
                        value={formData.customerId}
                        onChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <AppInput
                            label="Amount"
                            placeholder="0.00"
                            icon="fa-dollar-sign"
                            value={formData.amount}
                            onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
                            required
                        />
                        <AppInput
                            label="Due Date"
                            type="date"
                            value={formData.dueDate}
                            onChange={(value) => setFormData(prev => ({ ...prev, dueDate: value }))}
                            required
                        />
                    </div>
                </div>
            </AppModal>
        </div>
    );
};

export default AppInvoices;
