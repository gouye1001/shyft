/**
 * Centralized Frontend Types
 * Single source of truth for all shared types across the application.
 */

// ============================================
// User & Auth Types
// ============================================

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: UserRole;
    companyId?: string;
    companyName?: string;
    subscriptionTier?: SubscriptionTier;
    createdAt: string;
}

export type UserRole = 'admin' | 'owner' | 'dispatcher' | 'technician';
export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

// ============================================
// Customer Types
// ============================================

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: CustomerStatus;
    createdAt: string;
}

export type CustomerStatus = 'active' | 'inactive';

export interface CustomerWithStats extends Customer {
    totalJobs: number;
    totalSpent: number;
    lastJob: string | null;
}

// ============================================
// Job Types
// ============================================

export interface Job {
    id: string;
    title: string;
    customerId: string;
    customerName: string;
    address: string;
    status: JobStatus;
    priority: JobPriority;
    assigneeId: string;
    assigneeName: string;
    scheduledDate: string;
    scheduledTime: string;
    amount: number;
    description?: string;
    createdAt: string;
    completedAt?: string;
}

export type JobStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type JobPriority = 'low' | 'medium' | 'high';

// ============================================
// Team Types
// ============================================

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: TeamRole;
    status: TeamMemberStatus;
    availability: TeamAvailability;
    jobsCompleted: number;
    rating: number;
    createdAt: string;
}

export type TeamRole = 'admin' | 'dispatcher' | 'technician';
export type TeamMemberStatus = 'active' | 'pending' | 'inactive';
export type TeamAvailability = 'available' | 'on-job' | 'off-duty';

// ============================================
// Invoice Types
// ============================================

export interface Invoice {
    id: string;
    jobId: string;
    customerId: string;
    customerName: string;
    jobTitle: string;
    amount: number;
    status: InvoiceStatus;
    date: string;
    dueDate: string;
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

// ============================================
// Notification Types
// ============================================

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    createdAt: string;
}

export type NotificationType = 'job' | 'payment' | 'team' | 'system';

// ============================================
// Dashboard Types
// ============================================

export interface DashboardStats {
    totalRevenue: number;
    paidRevenue: number;
    pendingRevenue: number;
    activeJobs: number;
    completedJobs: number;
    totalJobs: number;
    todayJobs: number;
    onFieldTeam: number;
    totalTechnicians: number;
    avgJobValue: number;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// ============================================
// Form Types
// ============================================

export interface SelectOption {
    value: string;
    label: string;
}

// ============================================
// Component Prop Helpers
// ============================================

export type PropsWithClassName<P = unknown> = P & {
    className?: string;
};

export type PropsWithChildren<P = unknown> = P & {
    children: React.ReactNode;
};
