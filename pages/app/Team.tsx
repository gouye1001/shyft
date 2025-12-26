import React, { useState } from 'react';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppModal, AppInput, AppSelect } from '../../components/app/ui';
import mockDb, { TeamMember } from '../../src/services/mockDb';
import { useTeamMembers } from '../../src/hooks/useMockData';

/**
 * AppTeam - Team management page connected to mockDb
 * Features: Add Member, Remove Member, Edit roles, Availability status
 */
const AppTeam: React.FC = () => {
    const team = useTeamMembers();

    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<TeamMember | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'technician' as TeamMember['role'],
    });

    // Edit form state
    const [editData, setEditData] = useState<Partial<TeamMember>>({});

    const roleBadgeVariant = (role: string) => {
        switch (role) {
            case 'admin': return 'purple';
            case 'dispatcher': return 'info';
            case 'technician': return 'neutral';
            default: return 'neutral';
        }
    };

    const availabilityBadgeVariant = (availability: string) => {
        switch (availability) {
            case 'available': return 'success';
            case 'on-job': return 'warning';
            case 'off-duty': return 'neutral';
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

    // Stats
    const stats = {
        total: team.length,
        technicians: team.filter(t => t.role === 'technician').length,
        available: team.filter(t => t.availability === 'available').length,
        onJob: team.filter(t => t.availability === 'on-job').length,
    };

    // Handle invite member
    const handleInviteMember = () => {
        if (!formData.name || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        mockDb.addTeamMember({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            status: 'pending',
            availability: 'off-duty',
        });

        mockDb.addNotification({
            title: 'Team Invitation Sent',
            message: `Invitation sent to ${formData.email}`,
            type: 'team',
            read: false,
        });

        setShowInviteModal(false);
        resetForm();
        setIsSubmitting(false);
    };

    // Handle update member
    const handleUpdateMember = () => {
        if (!selectedMember) return;

        mockDb.updateTeamMember(selectedMember.id, editData);
        setSelectedMember(null);
        setEditData({});
    };

    // Handle delete member
    const handleDeleteMember = () => {
        if (!showDeleteConfirm) return;

        mockDb.deleteTeamMember(showDeleteConfirm.id);
        setShowDeleteConfirm(null);
        setSelectedMember(null);
    };

    // Handle availability change
    const handleAvailabilityChange = (member: TeamMember, availability: TeamMember['availability']) => {
        mockDb.updateTeamMember(member.id, { availability });
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', role: 'technician' });
    };

    // Open member for editing
    const openMemberDetail = (member: TeamMember) => {
        setSelectedMember(member);
        setEditData({ role: member.role, status: member.status });
    };

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Team</h1>
                    <p className="text-zinc-400">Manage your team members ({team.length} total)</p>
                </div>
                <AppButton variant="primary" icon="fa-user-plus" onClick={() => setShowInviteModal(true)}>
                    Invite Member
                </AppButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Members', value: stats.total, icon: 'fa-users', color: 'blue' },
                    { label: 'Technicians', value: stats.technicians, icon: 'fa-wrench', color: 'purple' },
                    { label: 'Available', value: stats.available, icon: 'fa-circle-check', color: 'emerald' },
                    { label: 'On Job', value: stats.onJob, icon: 'fa-truck', color: 'yellow' },
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

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((member) => (
                    <AppCard
                        key={member.id}
                        className="cursor-pointer hover:border-white/10 transition-all"
                        onClick={() => openMemberDetail(member)}
                    >
                        <div className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg text-white font-bold shrink-0">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-medium truncate">{member.name}</h3>
                                        {member.status === 'pending' && (
                                            <span className="text-xs bg-yellow-500/10 text-yellow-400 px-1.5 py-0.5 rounded">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-500 truncate mb-2">{member.email}</p>
                                    <div className="flex items-center gap-2">
                                        <AppBadge variant={roleBadgeVariant(member.role)} size="sm">
                                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                        </AppBadge>
                                        <AppBadge variant={availabilityBadgeVariant(member.availability)} size="sm" dot>
                                            {member.availability.replace('-', ' ')}
                                        </AppBadge>
                                    </div>
                                </div>
                            </div>

                            {member.role === 'technician' && (
                                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-zinc-400">
                                            <i className="fa-solid fa-briefcase mr-1.5" />
                                            {member.jobsCompleted} jobs
                                        </span>
                                        {member.rating > 0 && (
                                            <span className="text-yellow-400">
                                                <i className="fa-solid fa-star mr-1" />
                                                {member.rating}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        {(['available', 'on-job', 'off-duty'] as const).map((status) => (
                                            <button
                                                key={status}
                                                onClick={(e) => { e.stopPropagation(); handleAvailabilityChange(member, status); }}
                                                className={`w-8 h-8 rounded-lg text-xs transition-all ${member.availability === status
                                                        ? 'bg-white/10 text-white'
                                                        : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                                    }`}
                                                title={status.replace('-', ' ')}
                                            >
                                                <i className={`fa-solid ${status === 'available' ? 'fa-check' :
                                                        status === 'on-job' ? 'fa-truck' : 'fa-moon'
                                                    }`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </AppCard>
                ))}
            </div>

            {/* Member Detail Modal */}
            <AppModal
                isOpen={!!selectedMember}
                onClose={() => { setSelectedMember(null); setEditData({}); }}
                title={selectedMember?.name || ''}
                description={selectedMember?.email}
                size="md"
                footer={
                    <>
                        <AppButton
                            variant="danger"
                            icon="fa-trash"
                            onClick={() => setShowDeleteConfirm(selectedMember)}
                        >
                            Remove
                        </AppButton>
                        <AppButton
                            variant="primary"
                            icon="fa-save"
                            onClick={handleUpdateMember}
                        >
                            Save Changes
                        </AppButton>
                    </>
                }
            >
                {selectedMember && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl text-white font-bold">
                                {selectedMember.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <AppBadge variant={statusBadgeVariant(selectedMember.status)} dot>
                                        {selectedMember.status}
                                    </AppBadge>
                                    <AppBadge variant={availabilityBadgeVariant(selectedMember.availability)}>
                                        {selectedMember.availability.replace('-', ' ')}
                                    </AppBadge>
                                </div>
                                <div className="text-sm text-zinc-500 mt-1">
                                    Joined {new Date(selectedMember.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-zinc-500">Phone</div>
                                <div className="text-white">{selectedMember.phone || 'Not set'}</div>
                            </div>
                            <div>
                                <div className="text-zinc-500">Jobs Completed</div>
                                <div className="text-white">{selectedMember.jobsCompleted}</div>
                            </div>
                        </div>

                        <AppSelect
                            label="Role"
                            options={[
                                { value: 'technician', label: 'Technician' },
                                { value: 'dispatcher', label: 'Dispatcher' },
                                { value: 'admin', label: 'Admin' },
                            ]}
                            value={editData.role || selectedMember.role}
                            onChange={(value) => setEditData(prev => ({ ...prev, role: value as TeamMember['role'] }))}
                        />

                        <AppSelect
                            label="Status"
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                            value={editData.status || selectedMember.status}
                            onChange={(value) => setEditData(prev => ({ ...prev, status: value as TeamMember['status'] }))}
                        />
                    </div>
                )}
            </AppModal>

            {/* Invite Modal */}
            <AppModal
                isOpen={showInviteModal}
                onClose={() => { setShowInviteModal(false); resetForm(); }}
                title="Invite Team Member"
                description="Send an invitation to join your team"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => { setShowInviteModal(false); resetForm(); }}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="primary"
                            icon="fa-paper-plane"
                            onClick={handleInviteMember}
                            loading={isSubmitting}
                        >
                            Send Invitation
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-5">
                    <AppInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                        required
                    />
                    <AppInput
                        label="Email Address"
                        placeholder="john@company.com"
                        type="email"
                        icon="fa-envelope"
                        value={formData.email}
                        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                        required
                    />
                    <AppInput
                        label="Phone"
                        placeholder="(555) 123-4567"
                        icon="fa-phone"
                        value={formData.phone}
                        onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    />
                    <AppSelect
                        label="Role"
                        options={[
                            { value: 'technician', label: 'Technician' },
                            { value: 'dispatcher', label: 'Dispatcher' },
                            { value: 'admin', label: 'Admin' },
                        ]}
                        value={formData.role}
                        onChange={(value) => setFormData(prev => ({ ...prev, role: value as TeamMember['role'] }))}
                    />
                </div>
            </AppModal>

            {/* Delete Confirmation Modal */}
            <AppModal
                isOpen={!!showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(null)}
                title="Remove Team Member"
                description={`Are you sure you want to remove ${showDeleteConfirm?.name}?`}
                size="sm"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="danger"
                            icon="fa-trash"
                            onClick={handleDeleteMember}
                        >
                            Remove
                        </AppButton>
                    </>
                }
            >
                <p className="text-zinc-400">
                    This action cannot be undone. The team member will lose access to the platform.
                </p>
            </AppModal>
        </div>
    );
};

export default AppTeam;
