import React, { useState } from 'react';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppTable, AppModal, AppInput, AppSelect } from '../../../components/app/ui';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'dispatcher' | 'technician';
    status: 'active' | 'pending' | 'inactive';
    lastActive: string;
    joinDate: string;
}

const mockUsers: User[] = [
    { id: 1, name: 'Mike Thompson', email: 'mike@company.com', role: 'technician', status: 'active', lastActive: '2 min ago', joinDate: 'Jan 2024' },
    { id: 2, name: 'Alex Rodriguez', email: 'alex@company.com', role: 'technician', status: 'active', lastActive: '15 min ago', joinDate: 'Jan 2024' },
    { id: 3, name: 'Sam Kim', email: 'sam@company.com', role: 'technician', status: 'active', lastActive: '1 hour ago', joinDate: 'Dec 2023' },
    { id: 4, name: 'Jordan Davis', email: 'jordan@company.com', role: 'dispatcher', status: 'active', lastActive: '5 min ago', joinDate: 'Nov 2023' },
    { id: 5, name: 'Taylor Wilson', email: 'taylor@company.com', role: 'admin', status: 'active', lastActive: 'Just now', joinDate: 'Oct 2023' },
    { id: 6, name: 'Casey Brown', email: 'casey@company.com', role: 'technician', status: 'pending', lastActive: 'Never', joinDate: 'Pending' },
];

const AdminUsers: React.FC = () => {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const roleBadgeVariant = (role: string) => {
        switch (role) {
            case 'admin': return 'purple';
            case 'dispatcher': return 'info';
            case 'technician': return 'neutral';
            default: return 'neutral';
        }
    };

    const statusBadgeVariant = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'inactive': return 'error';
            default: return 'neutral';
        }
    };

    const stats = {
        total: mockUsers.length,
        active: mockUsers.filter(u => u.status === 'active').length,
        pending: mockUsers.filter(u => u.status === 'pending').length,
        admins: mockUsers.filter(u => u.role === 'admin').length,
    };

    const columns = [
        {
            key: 'name',
            header: 'User',
            render: (user: User) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-sm text-zinc-500">{user.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            header: 'Role',
            render: (user: User) => (
                <AppBadge variant={roleBadgeVariant(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </AppBadge>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            render: (user: User) => (
                <AppBadge variant={statusBadgeVariant(user.status)} dot>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </AppBadge>
            ),
        },
        {
            key: 'lastActive',
            header: 'Last Active',
            render: (user: User) => <span className="text-zinc-400">{user.lastActive}</span>,
        },
        {
            key: 'joinDate',
            header: 'Joined',
            render: (user: User) => <span className="text-zinc-400">{user.joinDate}</span>,
        },
        {
            key: 'actions',
            header: '',
            render: (user: User) => (
                <button
                    onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                    className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <i className="fa-solid fa-ellipsis-vertical" />
                </button>
            ),
        },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">User Management</h1>
                    <p className="text-zinc-400">Manage team members and their access levels</p>
                </div>
                <AppButton variant="primary" icon="fa-user-plus" onClick={() => setShowInviteModal(true)}>
                    Invite User
                </AppButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users', value: stats.total, icon: 'fa-users', color: 'blue' },
                    { label: 'Active', value: stats.active, icon: 'fa-circle-check', color: 'emerald' },
                    { label: 'Pending', value: stats.pending, icon: 'fa-clock', color: 'yellow' },
                    { label: 'Admins', value: stats.admins, icon: 'fa-shield', color: 'purple' },
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

            {/* Users Table */}
            <AppCard>
                <AppTable
                    columns={columns}
                    data={mockUsers}
                    keyExtractor={(user) => user.id}
                    onRowClick={(user) => setSelectedUser(user)}
                    emptyMessage="No users found"
                    emptyIcon="fa-users"
                />
            </AppCard>

            {/* User Detail Modal */}
            <AppModal
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                title={selectedUser?.name || ''}
                description={selectedUser?.email}
                footer={
                    <>
                        <AppButton variant="danger" icon="fa-trash">
                            Remove User
                        </AppButton>
                        <AppButton variant="primary" icon="fa-save">
                            Save Changes
                        </AppButton>
                    </>
                }
            >
                {selectedUser && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl text-white font-bold">
                                {selectedUser.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                                <div className="flex gap-2 mb-1">
                                    <AppBadge variant={roleBadgeVariant(selectedUser.role)}>
                                        {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                                    </AppBadge>
                                    <AppBadge variant={statusBadgeVariant(selectedUser.status)} dot>
                                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                                    </AppBadge>
                                </div>
                                <div className="text-sm text-zinc-500">Joined {selectedUser.joinDate}</div>
                            </div>
                        </div>
                        <AppSelect
                            label="Role"
                            options={[
                                { value: 'technician', label: 'Technician' },
                                { value: 'dispatcher', label: 'Dispatcher' },
                                { value: 'admin', label: 'Admin' },
                            ]}
                            defaultValue={selectedUser.role}
                        />
                        <AppSelect
                            label="Status"
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                            defaultValue={selectedUser.status}
                        />
                    </div>
                )}
            </AppModal>

            {/* Invite Modal */}
            <AppModal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                title="Invite New User"
                description="Send an invitation email to join your organization"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => setShowInviteModal(false)}>
                            Cancel
                        </AppButton>
                        <AppButton variant="primary" icon="fa-paper-plane">
                            Send Invitation
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-5">
                    <AppInput label="Full Name" placeholder="John Doe" required />
                    <AppInput label="Email Address" placeholder="john@company.com" type="email" icon="fa-envelope" required />
                    <AppSelect
                        label="Role"
                        options={[
                            { value: 'technician', label: 'Technician' },
                            { value: 'dispatcher', label: 'Dispatcher' },
                            { value: 'admin', label: 'Admin' },
                        ]}
                        required
                    />
                </div>
            </AppModal>
        </div>
    );
};

export default AdminUsers;
