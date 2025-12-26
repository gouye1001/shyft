import React from 'react';
import { useAuth } from '../../src/context/AuthContext';

const AppSettings: React.FC = () => {
    const { user } = useAuth();

    const sections = [
        {
            title: 'Profile',
            icon: 'fa-user',
            settings: [
                { label: 'Full Name', value: user?.name || 'Not set', editable: true },
                { label: 'Email', value: user?.email || '', editable: false },
                { label: 'Phone', value: '+1 (555) 123-4567', editable: true },
            ]
        },
        {
            title: 'Notifications',
            icon: 'fa-bell',
            settings: [
                { label: 'Email Notifications', value: true, type: 'toggle' },
                { label: 'Push Notifications', value: true, type: 'toggle' },
                { label: 'SMS Alerts', value: false, type: 'toggle' },
            ]
        },
        {
            title: 'Appearance',
            icon: 'fa-palette',
            settings: [
                { label: 'Theme', value: 'Dark', type: 'select', options: ['Dark', 'Light', 'System'] },
                { label: 'Compact Mode', value: false, type: 'toggle' },
            ]
        },
    ];

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-zinc-400">Manage your account and preferences</p>
            </div>

            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section.title} className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                            <i className={`fa-solid ${section.icon} text-zinc-400`} />
                            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                        </div>
                        <div className="divide-y divide-white/5">
                            {section.settings.map((setting, i) => (
                                <div key={i} className="px-6 py-4 flex items-center justify-between">
                                    <span className="text-zinc-300">{setting.label}</span>
                                    {setting.type === 'toggle' ? (
                                        <button className={`w-12 h-6 rounded-full transition-colors ${setting.value ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                        </button>
                                    ) : setting.type === 'select' ? (
                                        <select className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white">
                                            {setting.options?.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <span className="text-zinc-400">{setting.value}</span>
                                            {setting.editable && (
                                                <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Danger Zone */}
                <div className="rounded-2xl bg-zinc-900/50 border border-red-500/20 overflow-hidden">
                    <div className="px-6 py-4 border-b border-red-500/20 flex items-center gap-3">
                        <i className="fa-solid fa-triangle-exclamation text-red-400" />
                        <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
                    </div>
                    <div className="p-6">
                        <button className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium hover:bg-red-500/20 transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSettings;
