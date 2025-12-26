import React, { useState } from 'react';
import { AppCard, AppCardHeader, AppButton, AppBadge, AppTable, AppModal, AppInput, AppTextarea, AppSelect } from '../../components/app/ui';
import mockDb, { Job, Customer, TeamMember } from '../../src/services/mockDb';
import { useJobs, useCustomers, useTechnicians } from '../../src/hooks/useMockData';

/**
 * AppJobs - Job management page with instant reactivity
 * Features: CRUD operations, dynamic customer dropdown, delete with invoice warning
 */
const AppJobs: React.FC = () => {
    // Use subscription hooks for instant updates
    const jobs = useJobs();
    const customers = useCustomers();
    const technicians = useTechnicians();

    const [filter, setFilter] = useState<'all' | 'scheduled' | 'in-progress' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteWarning, setDeleteWarning] = useState<string | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state for new job
    const [formData, setFormData] = useState({
        title: '',
        customerId: '',
        description: '',
        priority: 'medium' as Job['priority'],
        assigneeId: '',
        scheduledDate: '',
        scheduledTime: '',
        amount: '',
    });

    // Filter jobs
    const filteredJobs = jobs.filter(job => {
        const matchesFilter = filter === 'all' ||
            (filter === 'scheduled' && job.status === 'scheduled') ||
            (filter === 'in-progress' && job.status === 'in-progress') ||
            (filter === 'completed' && job.status === 'completed');
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.customerName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Badge variants
    const statusBadgeVariant = (status: string) => {
        switch (status) {
            case 'in-progress': return 'info';
            case 'scheduled': return 'warning';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            default: return 'neutral';
        }
    };

    const priorityBadgeVariant = (priority: string) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'neutral';
            default: return 'neutral';
        }
    };

    // Filter counts
    const filterCounts = {
        all: jobs.length,
        scheduled: jobs.filter(j => j.status === 'scheduled').length,
        'in-progress': jobs.filter(j => j.status === 'in-progress').length,
        completed: jobs.filter(j => j.status === 'completed').length,
    };

    // Handle create job
    const handleCreateJob = async () => {
        if (!formData.title || !formData.customerId || !formData.assigneeId) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        const customer = customers.find(c => c.id === formData.customerId);
        const technician = technicians.find(t => t.id === formData.assigneeId);

        if (!customer || !technician) {
            alert('Invalid customer or technician selected');
            setIsSubmitting(false);
            return;
        }

        try {
            mockDb.addJob({
                title: formData.title,
                customerId: formData.customerId,
                customerName: customer.name,
                address: customer.address,
                status: 'scheduled',
                priority: formData.priority,
                assigneeId: formData.assigneeId,
                assigneeName: technician.name.split(' ')[0] + ' ' + (technician.name.split(' ')[1]?.charAt(0) || '') + '.',
                scheduledDate: formData.scheduledDate || new Date().toISOString().split('T')[0],
                scheduledTime: formData.scheduledTime || '09:00',
                amount: parseFloat(formData.amount) || 0,
                description: formData.description,
            });

            mockDb.addNotification({
                title: 'Job Created',
                message: `New job "${formData.title}" scheduled for ${customer.name}`,
                type: 'job',
                read: false,
            });

            setShowCreateModal(false);
            resetForm();
        } catch (error) {
            console.error('Failed to create job:', error);
            alert('Failed to create job');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle job status update
    const handleUpdateJobStatus = (job: Job, newStatus: Job['status']) => {
        mockDb.updateJob(job.id, { status: newStatus });

        if (newStatus === 'completed') {
            mockDb.addInvoice({
                jobId: job.id,
                customerId: job.customerId,
                customerName: job.customerName,
                jobTitle: job.title,
                amount: job.amount,
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            });

            mockDb.addNotification({
                title: 'Job Completed',
                message: `${job.assigneeName} completed "${job.title}" for ${job.customerName}`,
                type: 'job',
                read: false,
            });
        }

        setSelectedJob(null);
    };

    // Handle delete job
    const handleDeleteJob = () => {
        if (!selectedJob) return;

        const result = mockDb.deleteJob(selectedJob.id);
        if (result.warning) {
            console.warn(result.warning);
        }

        setShowDeleteConfirm(false);
        setSelectedJob(null);
        setDeleteWarning(undefined);
    };

    // Initiate delete with warning check
    const initiateDelete = (job: Job) => {
        const invoices = mockDb.getInvoices();
        const hasInvoice = invoices.some(i => i.jobId === job.id);

        setSelectedJob(job);
        setDeleteWarning(hasInvoice ? 'This job has an associated invoice that will remain in the system.' : undefined);
        setShowDeleteConfirm(true);
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: '',
            customerId: '',
            description: '',
            priority: 'medium',
            assigneeId: '',
            scheduledDate: '',
            scheduledTime: '',
            amount: '',
        });
    };

    // Table columns
    const columns = [
        {
            key: 'title',
            header: 'Job',
            render: (job: Job) => (
                <div>
                    <div className="text-white font-medium">{job.title}</div>
                    <div className="text-sm text-zinc-500">{job.address}</div>
                </div>
            ),
        },
        {
            key: 'customer',
            header: 'Customer',
            render: (job: Job) => <span className="text-zinc-300">{job.customerName}</span>,
        },
        {
            key: 'status',
            header: 'Status',
            render: (job: Job) => (
                <AppBadge variant={statusBadgeVariant(job.status)} dot>
                    {job.status.replace('-', ' ')}
                </AppBadge>
            ),
        },
        {
            key: 'priority',
            header: 'Priority',
            render: (job: Job) => (
                <AppBadge variant={priorityBadgeVariant(job.priority)} size="sm">
                    {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                </AppBadge>
            ),
        },
        {
            key: 'assignee',
            header: 'Assignee',
            render: (job: Job) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white font-medium">
                        {job.assigneeName.charAt(0)}
                    </div>
                    <span className="text-zinc-300">{job.assigneeName}</span>
                </div>
            ),
        },
        {
            key: 'amount',
            header: 'Amount',
            render: (job: Job) => (
                <span className="text-emerald-400 font-medium">${job.amount.toLocaleString()}</span>
            ),
        },
        {
            key: 'actions',
            header: '',
            render: (job: Job) => (
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                        className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                        title="View details"
                    >
                        <i className="fa-solid fa-eye" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); initiateDelete(job); }}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Delete"
                    >
                        <i className="fa-solid fa-trash" />
                    </button>
                </div>
            ),
            className: 'w-20',
        },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Jobs</h1>
                    <p className="text-zinc-400">Manage and track all your service jobs ({jobs.length} total)</p>
                </div>
                <AppButton variant="primary" icon="fa-plus" onClick={() => setShowCreateModal(true)}>
                    New Job
                </AppButton>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-1 p-1 rounded-xl bg-zinc-900/50 border border-white/[0.06]">
                    {[
                        { key: 'all', label: 'All' },
                        { key: 'scheduled', label: 'Scheduled' },
                        { key: 'in-progress', label: 'In Progress' },
                        { key: 'completed', label: 'Completed' },
                    ].map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key as typeof filter)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === f.key
                                ? 'bg-white/10 text-white'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {f.label}
                            <span className={`text-xs px-1.5 py-0.5 rounded-md ${filter === f.key ? 'bg-white/10' : 'bg-zinc-800'}`}>
                                {filterCounts[f.key as keyof typeof filterCounts]}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="relative flex-1 max-w-md">
                    <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search jobs or customers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>
            </div>

            {/* Jobs Table */}
            <AppCard>
                <AppTable
                    columns={columns}
                    data={filteredJobs}
                    keyExtractor={(job) => job.id}
                    onRowClick={(job) => setSelectedJob(job)}
                    emptyMessage="No jobs found matching your criteria"
                    emptyIcon="fa-briefcase"
                />
            </AppCard>

            {/* Job Detail Modal */}
            <AppModal
                isOpen={!!selectedJob && !showDeleteConfirm}
                onClose={() => setSelectedJob(null)}
                title={selectedJob?.title || 'Job Details'}
                description={`Customer: ${selectedJob?.customerName}`}
                size="lg"
                footer={
                    <>
                        {selectedJob?.status === 'scheduled' && (
                            <AppButton
                                variant="info"
                                icon="fa-play"
                                onClick={() => selectedJob && handleUpdateJobStatus(selectedJob, 'in-progress')}
                            >
                                Start Job
                            </AppButton>
                        )}
                        {selectedJob?.status === 'in-progress' && (
                            <AppButton
                                variant="success"
                                icon="fa-check"
                                onClick={() => selectedJob && handleUpdateJobStatus(selectedJob, 'completed')}
                            >
                                Complete Job
                            </AppButton>
                        )}
                        <AppButton variant="secondary" onClick={() => setSelectedJob(null)}>
                            Close
                        </AppButton>
                    </>
                }
            >
                {selectedJob && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Status</div>
                                <AppBadge variant={statusBadgeVariant(selectedJob.status)} dot>
                                    {selectedJob.status.replace('-', ' ')}
                                </AppBadge>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Priority</div>
                                <AppBadge variant={priorityBadgeVariant(selectedJob.priority)}>
                                    {selectedJob.priority.charAt(0).toUpperCase() + selectedJob.priority.slice(1)}
                                </AppBadge>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Assignee</div>
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white font-medium">
                                        {selectedJob.assigneeName.charAt(0)}
                                    </div>
                                    {selectedJob.assigneeName}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Scheduled</div>
                                <div className="text-white">{selectedJob.scheduledDate} at {selectedJob.scheduledTime}</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500 mb-1">Address</div>
                            <div className="text-white">{selectedJob.address}</div>
                        </div>
                        {selectedJob.description && (
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Description</div>
                                <div className="text-white">{selectedJob.description}</div>
                            </div>
                        )}
                        <div>
                            <div className="text-sm text-zinc-500 mb-1">Estimated Amount</div>
                            <div className="text-2xl font-bold text-emerald-400">${selectedJob.amount.toLocaleString()}</div>
                        </div>
                    </div>
                )}
            </AppModal>

            {/* Delete Confirmation Modal */}
            <AppModal
                isOpen={showDeleteConfirm}
                onClose={() => { setShowDeleteConfirm(false); setSelectedJob(null); setDeleteWarning(undefined); }}
                title="Delete Job"
                description={`Are you sure you want to delete "${selectedJob?.title}"?`}
                size="sm"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => { setShowDeleteConfirm(false); setSelectedJob(null); setDeleteWarning(undefined); }}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="danger"
                            icon="fa-trash"
                            onClick={handleDeleteJob}
                        >
                            Delete
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-3">
                    <p className="text-zinc-400">
                        This action cannot be undone.
                    </p>
                    {deleteWarning && (
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                            <i className="fa-solid fa-exclamation-triangle mr-2" />
                            {deleteWarning}
                        </div>
                    )}
                </div>
            </AppModal>

            {/* Create Job Modal */}
            <AppModal
                isOpen={showCreateModal}
                onClose={() => { setShowCreateModal(false); resetForm(); }}
                title="Create New Job"
                description="Fill in the details for the new service job"
                size="lg"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => { setShowCreateModal(false); resetForm(); }}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="primary"
                            icon="fa-check"
                            onClick={handleCreateJob}
                            loading={isSubmitting}
                        >
                            Create Job
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-5">
                    <AppInput
                        label="Job Title"
                        placeholder="e.g. HVAC Repair"
                        value={formData.title}
                        onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                        required
                    />

                    <AppSelect
                        label="Customer"
                        options={[
                            { value: '', label: 'Select a customer...' },
                            ...customers.map(c => ({ value: c.id, label: `${c.name} - ${c.phone}` }))
                        ]}
                        value={formData.customerId}
                        onChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
                        required
                    />

                    <AppTextarea
                        label="Description"
                        placeholder="Describe the job details..."
                        value={formData.description}
                        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <AppSelect
                            label="Priority"
                            options={[
                                { value: 'low', label: 'Low' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'high', label: 'High' },
                            ]}
                            value={formData.priority}
                            onChange={(value) => setFormData(prev => ({ ...prev, priority: value as Job['priority'] }))}
                        />

                        <AppSelect
                            label="Assign To"
                            options={[
                                { value: '', label: 'Select technician...' },
                                ...technicians.map(t => ({ value: t.id, label: t.name }))
                            ]}
                            value={formData.assigneeId}
                            onChange={(value) => setFormData(prev => ({ ...prev, assigneeId: value }))}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <AppInput
                            label="Scheduled Date"
                            type="date"
                            value={formData.scheduledDate}
                            onChange={(value) => setFormData(prev => ({ ...prev, scheduledDate: value }))}
                        />
                        <AppInput
                            label="Scheduled Time"
                            type="time"
                            value={formData.scheduledTime}
                            onChange={(value) => setFormData(prev => ({ ...prev, scheduledTime: value }))}
                        />
                    </div>

                    <AppInput
                        label="Estimated Amount"
                        placeholder="0.00"
                        icon="fa-dollar-sign"
                        value={formData.amount}
                        onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
                    />
                </div>
            </AppModal>
        </div>
    );
};

export default AppJobs;
