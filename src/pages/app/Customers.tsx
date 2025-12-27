import React, { useState } from 'react';
import { AppCard, AppButton, AppBadge, AppTable, AppModal, AppInput, AppTextarea, AppSelect } from '../../components/app/ui';
import mockDb, { Customer } from '../../services/mockDb';
import { useCustomerStats } from '../../hooks/useMockData';

/**
 * AppCustomers - Customer management with instant reactivity
 * Features: Add, Edit, Delete customers with real CRUD operations
 */
const AppCustomers: React.FC = () => {
    // Use subscription-based hook for instant updates
    const customers = useCustomerStats();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<ReturnType<typeof mockDb.getCustomerStats>[0] | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Create form state
    const [createFormData, setCreateFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });

    // Edit form state
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'active' as Customer['status'],
    });

    // Filter customers
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
    );

    // Stats
    const stats = {
        total: customers.length,
        active: customers.filter(c => c.status === 'active').length,
        totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
        avgValue: customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length) : 0,
    };

    // Handle create customer
    const handleCreateCustomer = () => {
        if (!createFormData.firstName || !createFormData.lastName || !createFormData.email) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        mockDb.addCustomer({
            name: `${createFormData.firstName} ${createFormData.lastName}`,
            email: createFormData.email,
            phone: createFormData.phone || '',
            address: createFormData.address || '',
            status: 'active',
        });

        mockDb.addNotification({
            title: 'Customer Added',
            message: `New customer ${createFormData.firstName} ${createFormData.lastName} added`,
            type: 'team',
            read: false,
        });

        setShowCreateModal(false);
        resetCreateForm();
        setIsSubmitting(false);
    };

    // Handle edit customer
    const handleEditCustomer = () => {
        if (!selectedCustomer || !editFormData.name || !editFormData.email) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        mockDb.updateCustomer(selectedCustomer.id, {
            name: editFormData.name,
            email: editFormData.email,
            phone: editFormData.phone,
            address: editFormData.address,
            status: editFormData.status,
        });

        setShowEditModal(false);
        setSelectedCustomer(null);
        setIsSubmitting(false);
    };

    // Handle delete customer
    const handleDeleteCustomer = () => {
        if (!selectedCustomer) return;

        mockDb.deleteCustomer(selectedCustomer.id);
        mockDb.addNotification({
            title: 'Customer Removed',
            message: `Customer ${selectedCustomer.name} has been removed`,
            type: 'team',
            read: false,
        });

        setShowDeleteConfirm(false);
        setSelectedCustomer(null);
    };

    // Open edit modal
    const openEditModal = (customer: typeof customers[0]) => {
        setSelectedCustomer(customer);
        setEditFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            status: customer.status,
        });
        setShowEditModal(true);
    };

    const resetCreateForm = () => {
        setCreateFormData({ firstName: '', lastName: '', email: '', phone: '', address: '' });
    };

    // Table columns
    const columns = [
        {
            key: 'name',
            header: 'Customer',
            render: (customer: typeof customers[0]) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-sm text-white font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div className="text-white font-medium">{customer.name}</div>
                        <div className="text-sm text-zinc-500">{customer.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'phone',
            header: 'Phone',
            render: (customer: typeof customers[0]) => <span className="text-zinc-300">{customer.phone || '--'}</span>,
        },
        {
            key: 'totalJobs',
            header: 'Jobs',
            render: (customer: typeof customers[0]) => <span className="text-white font-medium">{customer.totalJobs}</span>,
        },
        {
            key: 'totalSpent',
            header: 'Total Spent',
            render: (customer: typeof customers[0]) => (
                <span className="text-emerald-400 font-medium">${customer.totalSpent.toLocaleString()}</span>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            render: (customer: typeof customers[0]) => (
                <AppBadge variant={customer.status === 'active' ? 'success' : 'neutral'} dot>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </AppBadge>
            ),
        },
        {
            key: 'actions',
            header: '',
            render: (customer: typeof customers[0]) => (
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); openEditModal(customer); }}
                        className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                        title="Edit"
                    >
                        <i className="fa-solid fa-pen" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); setShowDeleteConfirm(true); }}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Delete"
                    >
                        <i className="fa-solid fa-trash" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Customers</h1>
                    <p className="text-zinc-400">Manage your customer database ({customers.length} total)</p>
                </div>
                <div className="flex gap-3">
                    <AppButton variant="secondary" icon="fa-download">
                        Export
                    </AppButton>
                    <AppButton variant="primary" icon="fa-plus" onClick={() => setShowCreateModal(true)}>
                        Add Customer
                    </AppButton>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Customers', value: stats.total, icon: 'fa-users', color: 'blue' },
                    { label: 'Active', value: stats.active, icon: 'fa-circle-check', color: 'emerald' },
                    { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: 'fa-dollar-sign', color: 'purple' },
                    { label: 'Avg. Value', value: `$${stats.avgValue}`, icon: 'fa-chart-simple', color: 'cyan' },
                ].map((stat, i) => (
                    <AppCard key={i} padding="md">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                                <i className={`fa-solid ${stat.icon} text-${stat.color}-400`} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-zinc-500">{stat.label}</div>
                            </div>
                        </div>
                    </AppCard>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                />
            </div>

            {/* Table */}
            <AppCard>
                <AppTable
                    columns={columns}
                    data={filteredCustomers}
                    keyExtractor={(customer) => customer.id}
                    onRowClick={(customer) => { setSelectedCustomer(customer); }}
                    emptyMessage="No customers found"
                    emptyIcon="fa-users"
                />
            </AppCard>

            {/* Create Customer Modal */}
            <AppModal
                isOpen={showCreateModal}
                onClose={() => { setShowCreateModal(false); resetCreateForm(); }}
                title="Add New Customer"
                description="Enter customer information"
                size="lg"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => { setShowCreateModal(false); resetCreateForm(); }}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="primary"
                            icon="fa-check"
                            onClick={handleCreateCustomer}
                            loading={isSubmitting}
                        >
                            Add Customer
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <AppInput
                            label="First Name"
                            placeholder="John"
                            value={createFormData.firstName}
                            onChange={(value) => setCreateFormData(prev => ({ ...prev, firstName: value }))}
                            required
                        />
                        <AppInput
                            label="Last Name"
                            placeholder="Doe"
                            value={createFormData.lastName}
                            onChange={(value) => setCreateFormData(prev => ({ ...prev, lastName: value }))}
                            required
                        />
                    </div>
                    <AppInput
                        label="Email"
                        placeholder="john@example.com"
                        type="email"
                        icon="fa-envelope"
                        value={createFormData.email}
                        onChange={(value) => setCreateFormData(prev => ({ ...prev, email: value }))}
                        required
                    />
                    <AppInput
                        label="Phone"
                        placeholder="(555) 123-4567"
                        icon="fa-phone"
                        value={createFormData.phone}
                        onChange={(value) => setCreateFormData(prev => ({ ...prev, phone: value }))}
                    />
                    <AppTextarea
                        label="Address"
                        placeholder="Street address, city, state, zip"
                        value={createFormData.address}
                        onChange={(value) => setCreateFormData(prev => ({ ...prev, address: value }))}
                    />
                </div>
            </AppModal>

            {/* Edit Customer Modal */}
            <AppModal
                isOpen={showEditModal}
                onClose={() => { setShowEditModal(false); setSelectedCustomer(null); }}
                title="Edit Customer"
                description={selectedCustomer?.email}
                size="lg"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => { setShowEditModal(false); setSelectedCustomer(null); }}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="primary"
                            icon="fa-save"
                            onClick={handleEditCustomer}
                            loading={isSubmitting}
                        >
                            Save Changes
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-5">
                    <AppInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={editFormData.name}
                        onChange={(value) => setEditFormData(prev => ({ ...prev, name: value }))}
                        required
                    />
                    <AppInput
                        label="Email"
                        placeholder="john@example.com"
                        type="email"
                        icon="fa-envelope"
                        value={editFormData.email}
                        onChange={(value) => setEditFormData(prev => ({ ...prev, email: value }))}
                        required
                    />
                    <AppInput
                        label="Phone"
                        placeholder="(555) 123-4567"
                        icon="fa-phone"
                        value={editFormData.phone}
                        onChange={(value) => setEditFormData(prev => ({ ...prev, phone: value }))}
                    />
                    <AppTextarea
                        label="Address"
                        placeholder="Street address, city, state, zip"
                        value={editFormData.address}
                        onChange={(value) => setEditFormData(prev => ({ ...prev, address: value }))}
                    />
                    <AppSelect
                        label="Status"
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                        value={editFormData.status}
                        onChange={(value) => setEditFormData(prev => ({ ...prev, status: value as Customer['status'] }))}
                    />
                </div>
            </AppModal>

            {/* Delete Confirmation Modal */}
            <AppModal
                isOpen={showDeleteConfirm}
                onClose={() => { setShowDeleteConfirm(false); setSelectedCustomer(null); }}
                title="Delete Customer"
                description={`Are you sure you want to delete ${selectedCustomer?.name}?`}
                size="sm"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => { setShowDeleteConfirm(false); setSelectedCustomer(null); }}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="danger"
                            icon="fa-trash"
                            onClick={handleDeleteCustomer}
                        >
                            Delete
                        </AppButton>
                    </>
                }
            >
                <p className="text-zinc-400">
                    This action cannot be undone. All associated job history will remain but without customer reference.
                </p>
            </AppModal>
        </div>
    );
};

export default AppCustomers;
