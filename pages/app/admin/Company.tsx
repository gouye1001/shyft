import React, { useState } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppInput, AppTextarea } from '../../../components/app/ui';

const AdminCompany: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const companyData = {
        name: user?.companyName || 'Shyft Company',
        industry: 'Field Service',
        website: 'www.shyft.io',
        phone: '(555) 123-4567',
        email: 'contact@shyft.io',
        address: '123 Business St, San Francisco, CA 94102',
        taxId: 'XX-XXXXXXX',
        timezone: 'Pacific Time (PT)',
        currency: 'USD ($)',
    };

    return (
        <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Company Settings</h1>
                    <p className="text-zinc-400">Manage your organization's profile and preferences</p>
                </div>
                <AppButton
                    variant={isEditing ? 'primary' : 'secondary'}
                    icon={isEditing ? 'fa-check' : 'fa-edit'}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Save Changes' : 'Edit Settings'}
                </AppButton>
            </div>

            {/* Company Profile */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-building text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Company Profile</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="flex items-start gap-6 mb-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl text-white font-bold shrink-0">
                            {companyData.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-1">{companyData.name}</h3>
                            <p className="text-zinc-400 mb-3">{companyData.industry}</p>
                            {isEditing && (
                                <AppButton variant="secondary" size="sm" icon="fa-image">
                                    Upload Logo
                                </AppButton>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AppInput
                            label="Company Name"
                            defaultValue={companyData.name}
                            disabled={!isEditing}
                        />
                        <AppInput
                            label="Website"
                            defaultValue={companyData.website}
                            icon="fa-globe"
                            disabled={!isEditing}
                        />
                        <AppInput
                            label="Phone"
                            defaultValue={companyData.phone}
                            icon="fa-phone"
                            disabled={!isEditing}
                        />
                        <AppInput
                            label="Email"
                            defaultValue={companyData.email}
                            icon="fa-envelope"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="mt-4">
                        <AppTextarea
                            label="Address"
                            defaultValue={companyData.address}
                            disabled={!isEditing}
                        />
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Business Settings */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-gear text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Business Settings</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AppInput
                            label="Tax ID / EIN"
                            defaultValue={companyData.taxId}
                            disabled={!isEditing}
                        />
                        <AppInput
                            label="Industry"
                            defaultValue={companyData.industry}
                            disabled={!isEditing}
                        />
                        <AppInput
                            label="Time Zone"
                            defaultValue={companyData.timezone}
                            disabled={!isEditing}
                        />
                        <AppInput
                            label="Currency"
                            defaultValue={companyData.currency}
                            disabled={!isEditing}
                        />
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Service Area */}
            <AppCard>
                <AppCardHeader
                    action={
                        isEditing && (
                            <AppButton variant="ghost" size="sm" icon="fa-plus">
                                Add Area
                            </AppButton>
                        )
                    }
                >
                    <i className="fa-solid fa-map-location-dot text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Service Areas</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="flex flex-wrap gap-2">
                        {['San Francisco', 'Oakland', 'Berkeley', 'Palo Alto', 'San Jose'].map((area) => (
                            <div key={area} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/50 border border-white/[0.06]">
                                <i className="fa-solid fa-location-dot text-zinc-500 text-sm" />
                                <span className="text-white">{area}</span>
                                {isEditing && (
                                    <button className="ml-1 text-zinc-500 hover:text-red-400 transition-colors">
                                        <i className="fa-solid fa-xmark text-xs" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </AppCardContent>
            </AppCard>

            {/* Data Export */}
            <AppCard>
                <AppCardHeader>
                    <i className="fa-solid fa-database text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Data Management</h2>
                </AppCardHeader>
                <AppCardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white font-medium">Export Company Data</div>
                            <div className="text-sm text-zinc-500">Download all your data in JSON or CSV format</div>
                        </div>
                        <AppButton variant="secondary" icon="fa-download">
                            Export Data
                        </AppButton>
                    </div>
                </AppCardContent>
            </AppCard>
        </div>
    );
};

export default AdminCompany;
