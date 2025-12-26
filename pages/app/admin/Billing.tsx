import React, { useState } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppTable } from '../../../components/app/ui';

interface PaymentMethod {
    id: string;
    type: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiry: string;
    isDefault: boolean;
}

interface BillingHistory {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
    invoice: string;
}

const mockPaymentMethods: PaymentMethod[] = [
    { id: '1', type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: '2', type: 'mastercard', last4: '8888', expiry: '06/24', isDefault: false },
];

const mockBillingHistory: BillingHistory[] = [
    { id: '1', date: 'Jan 1, 2024', amount: 99, status: 'paid', invoice: 'INV-2024-001' },
    { id: '2', date: 'Dec 1, 2023', amount: 99, status: 'paid', invoice: 'INV-2023-012' },
    { id: '3', date: 'Nov 1, 2023', amount: 99, status: 'paid', invoice: 'INV-2023-011' },
];

const AdminBilling: React.FC = () => {
    const { user } = useAuth();
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const currentPlan = {
        name: user?.subscriptionTier || 'Professional',
        price: 99,
        period: 'month',
        renewDate: 'February 1, 2024',
        features: ['Unlimited jobs', 'Up to 10 team members', 'Analytics', 'Priority support'],
    };

    const plans = [
        { name: 'Starter', price: 29, features: ['50 jobs/month', '3 team members', 'Basic analytics'] },
        { name: 'Professional', price: 99, features: ['Unlimited jobs', '10 team members', 'Full analytics', 'Priority support'], popular: true },
        { name: 'Enterprise', price: 249, features: ['Everything in Pro', 'Unlimited team', 'Dedicated support', 'Custom integrations'] },
    ];

    const cardIcons: Record<string, string> = {
        visa: 'fa-cc-visa',
        mastercard: 'fa-cc-mastercard',
        amex: 'fa-cc-amex',
    };

    const columns = [
        {
            key: 'date',
            header: 'Date',
            render: (item: BillingHistory) => <span className="text-white">{item.date}</span>,
        },
        {
            key: 'invoice',
            header: 'Invoice',
            render: (item: BillingHistory) => <span className="text-zinc-400">{item.invoice}</span>,
        },
        {
            key: 'amount',
            header: 'Amount',
            render: (item: BillingHistory) => <span className="text-white font-medium">${item.amount}</span>,
        },
        {
            key: 'status',
            header: 'Status',
            render: (item: BillingHistory) => (
                <AppBadge variant={item.status === 'paid' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </AppBadge>
            ),
        },
        {
            key: 'actions',
            header: '',
            render: () => (
                <AppButton variant="ghost" size="sm" icon="fa-download">
                    PDF
                </AppButton>
            ),
        },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Billing & Subscription</h1>
                <p className="text-zinc-400">Manage your subscription and payment methods</p>
            </div>

            {/* Current Plan */}
            <AppCard className="border-blue-500/20">
                <div className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <i className="fa-solid fa-crown text-blue-400 text-xl" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-semibold text-white">{currentPlan.name}</h3>
                                <AppBadge variant="info">Current Plan</AppBadge>
                            </div>
                            <div className="text-zinc-400 mb-3">
                                <span className="text-2xl font-bold text-white">${currentPlan.price}</span>
                                <span className="text-zinc-500">/{currentPlan.period}</span>
                            </div>
                            <div className="text-sm text-zinc-500">
                                Next billing date: <span className="text-zinc-300">{currentPlan.renewDate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <AppButton variant="secondary">
                            Cancel Plan
                        </AppButton>
                        <AppButton variant="primary" icon="fa-arrow-up">
                            Upgrade
                        </AppButton>
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-white/[0.06] bg-blue-500/5">
                    <div className="flex flex-wrap gap-4">
                        {currentPlan.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                                <i className="fa-solid fa-check text-blue-400 text-xs" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </AppCard>

            {/* Payment Methods */}
            <AppCard>
                <AppCardHeader
                    action={
                        <AppButton variant="secondary" size="sm" icon="fa-plus">
                            Add Card
                        </AppButton>
                    }
                >
                    <i className="fa-solid fa-credit-card text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Payment Methods</h2>
                </AppCardHeader>
                <div className="divide-y divide-white/[0.04]">
                    {mockPaymentMethods.map((method) => (
                        <div key={method.id} className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                    <i className={`fa-brands ${cardIcons[method.type]} text-xl text-zinc-300`} />
                                </div>
                                <div>
                                    <div className="text-white font-medium flex items-center gap-2">
                                        •••• {method.last4}
                                        {method.isDefault && (
                                            <AppBadge variant="success" size="sm">Default</AppBadge>
                                        )}
                                    </div>
                                    <div className="text-sm text-zinc-500">Expires {method.expiry}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!method.isDefault && (
                                    <AppButton variant="ghost" size="sm">
                                        Make Default
                                    </AppButton>
                                )}
                                <AppButton variant="ghost" size="sm" icon="fa-trash" className="text-red-400 hover:text-red-300">
                                    Remove
                                </AppButton>
                            </div>
                        </div>
                    ))}
                </div>
            </AppCard>

            {/* Billing History */}
            <AppCard>
                <AppCardHeader
                    action={
                        <AppButton variant="ghost" size="sm" icon="fa-download">
                            Export All
                        </AppButton>
                    }
                >
                    <i className="fa-solid fa-receipt text-zinc-400" />
                    <h2 className="text-lg font-semibold text-white">Billing History</h2>
                </AppCardHeader>
                <AppTable
                    columns={columns}
                    data={mockBillingHistory}
                    keyExtractor={(item) => item.id}
                    emptyMessage="No billing history"
                    emptyIcon="fa-receipt"
                />
            </AppCard>
        </div>
    );
};

export default AdminBilling;
