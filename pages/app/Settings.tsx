import React, { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppInput, AppModal } from '../../components/app/ui';

interface SettingToggle {
    label: string;
    description?: string;
    value: boolean;
}

const AppSettings: React.FC = () => {
    const { user } = useAuth();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [notifications, setNotifications] = useState<Record<string, boolean>>({
        email: true,
        push: true,
        sms: false,
        jobUpdates: true,
        paymentAlerts: true,
        teamActivity: false,
    });

    const toggleNotification = (key: string) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
        <button
            onClick={onToggle}
            className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-blue-600' : 'bg-zinc-700'}`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'left-7' : 'left-1'}`} />
        </button>
    );

    return (
        <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Settings</h1>
                <p className="text-zinc-400">Manage your account and preferences</p>
            </div>

            {/* Profile Section */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-user text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Profile</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="flex items-start gap-6 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl text-white font-bold">
                            {(user?.name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-1">{user?.name || 'User'}</h3>
                            <p className="text-zinc-400 mb-3">{user?.email}</p>
                            <AppButton variant="secondary" size="sm" icon="fa-camera">
                                Change Avatar
                            </AppButton>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AppInput label="Full Name" defaultValue={user?.name || ''} />
                        <AppInput label="Email" defaultValue={user?.email || ''} type="email" disabled />
                        <AppInput label="Phone" placeholder="(555) 123-4567" icon="fa-phone" />
                        <AppInput label="Time Zone" defaultValue="Pacific Time (PT)" disabled />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <AppButton variant="primary" icon="fa-check">
                            Save Changes
                        </AppButton>
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Security Section */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-shield-halved text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Security</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                            <div>
                                <div className="text-white font-medium">Password</div>
                                <div className="text-sm text-zinc-500">Last changed 30 days ago</div>
                            </div>
                            <AppButton variant="secondary" size="sm" onClick={() => setShowPasswordModal(true)}>
                                Change
                            </AppButton>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                            <div>
                                <div className="text-white font-medium">Two-Factor Authentication</div>
                                <div className="text-sm text-zinc-500">Add an extra layer of security</div>
                            </div>
                            <AppBadge variant="warning">Not Enabled</AppBadge>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="text-white font-medium">Active Sessions</div>
                                <div className="text-sm text-zinc-500">2 devices currently logged in</div>
                            </div>
                            <AppButton variant="ghost" size="sm">
                                View All
                            </AppButton>
                        </div>
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Notifications Section */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-bell text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Notifications</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium text-zinc-400 mb-3">Channels</h4>
                        {[
                            { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                            { key: 'push', label: 'Push Notifications', desc: 'Browser notifications' },
                            { key: 'sms', label: 'SMS Alerts', desc: 'Text message alerts' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                                <div>
                                    <div className="text-white">{item.label}</div>
                                    <div className="text-sm text-zinc-500">{item.desc}</div>
                                </div>
                                <ToggleSwitch
                                    enabled={notifications[item.key]}
                                    onToggle={() => toggleNotification(item.key)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/[0.06]">
                        <h4 className="text-sm font-medium text-zinc-400 mb-3">Alert Types</h4>
                        {[
                            { key: 'jobUpdates', label: 'Job Updates', desc: 'New jobs and status changes' },
                            { key: 'paymentAlerts', label: 'Payment Alerts', desc: 'Payment received or overdue' },
                            { key: 'teamActivity', label: 'Team Activity', desc: 'Team member actions' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                                <div>
                                    <div className="text-white">{item.label}</div>
                                    <div className="text-sm text-zinc-500">{item.desc}</div>
                                </div>
                                <ToggleSwitch
                                    enabled={notifications[item.key]}
                                    onToggle={() => toggleNotification(item.key)}
                                />
                            </div>
                        ))}
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Appearance */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-palette text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Appearance</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <div className="text-white">Theme</div>
                            <div className="text-sm text-zinc-500">Choose your preferred theme</div>
                        </div>
                        <div className="flex gap-2 p-1 rounded-xl bg-zinc-800/50 border border-white/[0.06]">
                            {['Dark', 'Light', 'System'].map((theme) => (
                                <button
                                    key={theme}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${theme === 'Dark' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    {theme}
                                </button>
                            ))}
                        </div>
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Danger Zone */}
            <AppCard className="border-red-500/20">
                <AppCardHeader>
                    <i className="fa-solid fa-triangle-exclamation text-red-400" />
                    <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white">Delete Account</div>
                            <div className="text-sm text-zinc-500">Permanently delete your account and all data</div>
                        </div>
                        <AppButton variant="danger" icon="fa-trash">
                            Delete Account
                        </AppButton>
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Password Modal */}
            <AppModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
                title="Change Password"
                description="Update your account password"
                footer={
                    <>
                        <AppButton variant="secondary" onClick={() => setShowPasswordModal(false)}>
                            Cancel
                        </AppButton>
                        <AppButton variant="primary" icon="fa-check">
                            Update Password
                        </AppButton>
                    </>
                }
            >
                <div className="space-y-4">
                    <AppInput label="Current Password" type="password" required />
                    <AppInput label="New Password" type="password" required />
                    <AppInput label="Confirm Password" type="password" required />
                </div>
            </AppModal>
        </div>
    );
};

export default AppSettings;
