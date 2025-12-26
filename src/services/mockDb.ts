/**
 * Mock Database Service with STABLE REFERENCES
 * Uses cached data to prevent infinite loops with useSyncExternalStore
 */

// ========================================
// Types
// ========================================

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface Job {
    id: string;
    title: string;
    customerId: string;
    customerName: string;
    address: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    assigneeId: string;
    assigneeName: string;
    scheduledDate: string;
    scheduledTime: string;
    amount: number;
    description?: string;
    createdAt: string;
    completedAt?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'dispatcher' | 'technician';
    status: 'active' | 'pending' | 'inactive';
    availability: 'available' | 'on-job' | 'off-duty';
    jobsCompleted: number;
    rating: number;
    createdAt: string;
}

export interface Invoice {
    id: string;
    jobId: string;
    customerId: string;
    customerName: string;
    jobTitle: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    date: string;
    dueDate: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'job' | 'payment' | 'team' | 'system';
    read: boolean;
    createdAt: string;
}

export interface AuditEvent {
    id: string;
    action: string;
    description: string;
    userId: string;
    userName: string;
    type: 'user' | 'job' | 'billing' | 'settings' | 'login';
    timestamp: string;
}

export type DataKey = 'customers' | 'jobs' | 'team' | 'invoices' | 'notifications' | 'audit' | 'all';

// ========================================
// Storage Keys
// ========================================

const STORAGE_KEYS = {
    CUSTOMERS: 'shyft_customers',
    JOBS: 'shyft_jobs',
    TEAM: 'shyft_team',
    INVOICES: 'shyft_invoices',
    NOTIFICATIONS: 'shyft_notifications',
    AUDIT: 'shyft_audit',
    INITIALIZED: 'shyft_db_initialized',
} as const;

// ========================================
// CACHED DATA - Stable references for useSyncExternalStore
// ========================================

let _customers: Customer[] = [];
let _jobs: Job[] = [];
let _team: TeamMember[] = [];
let _invoices: Invoice[] = [];
let _notifications: Notification[] = [];
let _audit: AuditEvent[] = [];

// ========================================
// Subscription System
// ========================================

type Listener = () => void;
const listeners: Map<DataKey, Set<Listener>> = new Map();

export function subscribe(key: DataKey, listener: Listener): () => void {
    if (!listeners.has(key)) {
        listeners.set(key, new Set());
    }
    listeners.get(key)!.add(listener);
    return () => {
        listeners.get(key)?.delete(listener);
    };
}

function notifyListeners(key: DataKey): void {
    listeners.get(key)?.forEach(listener => listener());
    listeners.get('all')?.forEach(listener => listener());
}

// ========================================
// Helper Functions
// ========================================

function generateId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function loadFromStorage<T>(key: string): T[] {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveToStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
}

// ========================================
// Default Data
// ========================================

const today = new Date();
const formatDate = (d: Date) => d.toISOString().split('T')[0];
const addDays = (d: Date, days: number) => new Date(d.getTime() + days * 24 * 60 * 60 * 1000);

const defaultCustomers: Customer[] = [
    { id: 'cust-1', name: 'John Smith', email: 'john@example.com', phone: '(555) 123-4567', address: '123 Main St, San Francisco, CA', status: 'active', createdAt: '2024-01-01' },
    { id: 'cust-2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 234-5678', address: '456 Oak Ave, Oakland, CA', status: 'active', createdAt: '2024-01-02' },
    { id: 'cust-3', name: 'Mike Williams', email: 'mike@example.com', phone: '(555) 345-6789', address: '789 Pine Rd, Berkeley, CA', status: 'active', createdAt: '2024-01-03' },
];

const defaultTeam: TeamMember[] = [
    { id: 'team-1', name: 'Mike Thompson', email: 'mike@shyft.io', phone: '(555) 111-1111', role: 'technician', status: 'active', availability: 'on-job', jobsCompleted: 127, rating: 4.9, createdAt: '2023-10-01' },
    { id: 'team-2', name: 'Alex Rodriguez', email: 'alex@shyft.io', phone: '(555) 222-2222', role: 'technician', status: 'active', availability: 'available', jobsCompleted: 98, rating: 4.7, createdAt: '2023-10-15' },
    { id: 'team-3', name: 'Sam Kim', email: 'sam@shyft.io', phone: '(555) 333-3333', role: 'technician', status: 'active', availability: 'on-job', jobsCompleted: 156, rating: 4.8, createdAt: '2023-09-01' },
];

const defaultJobs: Job[] = [
    { id: 'job-1', title: 'HVAC Repair', customerId: 'cust-1', customerName: 'John Smith', address: '123 Main St', status: 'completed', priority: 'high', assigneeId: 'team-1', assigneeName: 'Mike T.', scheduledDate: formatDate(addDays(today, -2)), scheduledTime: '09:00', amount: 450, createdAt: formatDate(addDays(today, -5)), completedAt: formatDate(addDays(today, -2)) },
    { id: 'job-2', title: 'Plumbing Install', customerId: 'cust-2', customerName: 'Sarah Johnson', address: '456 Oak Ave', status: 'in-progress', priority: 'medium', assigneeId: 'team-2', assigneeName: 'Alex R.', scheduledDate: formatDate(today), scheduledTime: '10:00', amount: 800, createdAt: formatDate(addDays(today, -3)) },
    { id: 'job-3', title: 'Electrical Check', customerId: 'cust-3', customerName: 'Mike Williams', address: '789 Pine Rd', status: 'scheduled', priority: 'low', assigneeId: 'team-3', assigneeName: 'Sam K.', scheduledDate: formatDate(addDays(today, 1)), scheduledTime: '14:00', amount: 250, createdAt: formatDate(addDays(today, -1)) },
];

const defaultInvoices: Invoice[] = [
    { id: 'inv-1', jobId: 'job-1', customerId: 'cust-1', customerName: 'John Smith', jobTitle: 'HVAC Repair', amount: 450, status: 'paid', date: formatDate(addDays(today, -2)), dueDate: formatDate(addDays(today, 12)) },
];

const defaultNotifications: Notification[] = [
    { id: 'notif-1', title: 'New Job Request', message: 'Sarah Johnson requested plumbing service', type: 'job', read: false, createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
    { id: 'notif-2', title: 'Payment Received', message: 'Invoice INV-001 paid by John Smith ($450)', type: 'payment', read: false, createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
];

// ========================================
// Initialization - Load into cache
// ========================================

function loadCache(): void {
    _customers = loadFromStorage<Customer>(STORAGE_KEYS.CUSTOMERS);
    _jobs = loadFromStorage<Job>(STORAGE_KEYS.JOBS);
    _team = loadFromStorage<TeamMember>(STORAGE_KEYS.TEAM);
    _invoices = loadFromStorage<Invoice>(STORAGE_KEYS.INVOICES);
    _notifications = loadFromStorage<Notification>(STORAGE_KEYS.NOTIFICATIONS);
    _audit = loadFromStorage<AuditEvent>(STORAGE_KEYS.AUDIT);
}

export function initializeDatabase(): void {
    const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);

    if (!isInitialized) {
        saveToStorage(STORAGE_KEYS.CUSTOMERS, defaultCustomers);
        saveToStorage(STORAGE_KEYS.JOBS, defaultJobs);
        saveToStorage(STORAGE_KEYS.TEAM, defaultTeam);
        saveToStorage(STORAGE_KEYS.INVOICES, defaultInvoices);
        saveToStorage(STORAGE_KEYS.NOTIFICATIONS, defaultNotifications);
        saveToStorage(STORAGE_KEYS.AUDIT, []);
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }

    loadCache();
}

export function resetDatabase(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    initializeDatabase();
    notifyListeners('all');
}

// ========================================
// GETTERS - Return CACHED references (stable)
// ========================================

export function getCustomers(): Customer[] {
    return _customers;
}

export function getJobs(): Job[] {
    return _jobs;
}

export function getTeamMembers(): TeamMember[] {
    return _team;
}

export function getTechnicians(): TeamMember[] {
    return _team.filter(t => t.role === 'technician' && t.status === 'active');
}

export function getInvoices(): Invoice[] {
    return _invoices;
}

export function getNotifications(): Notification[] {
    return _notifications;
}

export function getAuditEvents(): AuditEvent[] {
    return _audit;
}

// ========================================
// Customer Methods
// ========================================

export function addCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Customer {
    const newCustomer: Customer = {
        ...customer,
        id: generateId('cust'),
        createdAt: new Date().toISOString(),
    };
    _customers = [..._customers, newCustomer];
    saveToStorage(STORAGE_KEYS.CUSTOMERS, _customers);
    notifyListeners('customers');
    return newCustomer;
}

export function updateCustomer(id: string, updates: Partial<Customer>): Customer | undefined {
    const index = _customers.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    const updated = { ..._customers[index], ...updates };
    _customers = [..._customers.slice(0, index), updated, ..._customers.slice(index + 1)];
    saveToStorage(STORAGE_KEYS.CUSTOMERS, _customers);
    notifyListeners('customers');
    return updated;
}

export function deleteCustomer(id: string): boolean {
    const len = _customers.length;
    _customers = _customers.filter(c => c.id !== id);
    if (_customers.length === len) return false;
    saveToStorage(STORAGE_KEYS.CUSTOMERS, _customers);
    notifyListeners('customers');
    return true;
}

// ========================================
// Job Methods
// ========================================

export function addJob(job: Omit<Job, 'id' | 'createdAt'>): Job {
    const newJob: Job = {
        ...job,
        id: generateId('job'),
        createdAt: new Date().toISOString(),
    };
    _jobs = [..._jobs, newJob];
    saveToStorage(STORAGE_KEYS.JOBS, _jobs);
    notifyListeners('jobs');
    return newJob;
}

export function updateJob(id: string, updates: Partial<Job>): Job | undefined {
    const index = _jobs.findIndex(j => j.id === id);
    if (index === -1) return undefined;

    const updated = { ..._jobs[index], ...updates };
    if (updates.status === 'completed' && !updated.completedAt) {
        updated.completedAt = new Date().toISOString();
    }

    _jobs = [..._jobs.slice(0, index), updated, ..._jobs.slice(index + 1)];
    saveToStorage(STORAGE_KEYS.JOBS, _jobs);
    notifyListeners('jobs');
    return updated;
}

export function deleteJob(id: string): { success: boolean; warning?: string } {
    const hasInvoice = _invoices.some(i => i.jobId === id);
    const len = _jobs.length;
    _jobs = _jobs.filter(j => j.id !== id);
    if (_jobs.length === len) return { success: false };
    saveToStorage(STORAGE_KEYS.JOBS, _jobs);
    notifyListeners('jobs');
    return { success: true, warning: hasInvoice ? 'Invoice still exists' : undefined };
}

export function getJobsByDate(date: string): Job[] {
    return _jobs.filter(j => j.scheduledDate === date);
}

export function getJobsForDateRange(startDate: string, endDate: string): Job[] {
    return _jobs.filter(j => j.scheduledDate >= startDate && j.scheduledDate <= endDate);
}

// ========================================
// Team Methods
// ========================================

export function addTeamMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'jobsCompleted' | 'rating'>): TeamMember {
    const newMember: TeamMember = {
        ...member,
        id: generateId('team'),
        createdAt: new Date().toISOString(),
        jobsCompleted: 0,
        rating: 0,
    };
    _team = [..._team, newMember];
    saveToStorage(STORAGE_KEYS.TEAM, _team);
    notifyListeners('team');
    return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | undefined {
    const index = _team.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    const updated = { ..._team[index], ...updates };
    _team = [..._team.slice(0, index), updated, ..._team.slice(index + 1)];
    saveToStorage(STORAGE_KEYS.TEAM, _team);
    notifyListeners('team');
    return updated;
}

export function deleteTeamMember(id: string): boolean {
    const len = _team.length;
    _team = _team.filter(t => t.id !== id);
    if (_team.length === len) return false;
    saveToStorage(STORAGE_KEYS.TEAM, _team);
    notifyListeners('team');
    return true;
}

// ========================================
// Invoice Methods
// ========================================

export function addInvoice(invoice: Omit<Invoice, 'id'>): Invoice {
    const newInvoice: Invoice = { ...invoice, id: generateId('inv') };
    _invoices = [..._invoices, newInvoice];
    saveToStorage(STORAGE_KEYS.INVOICES, _invoices);
    notifyListeners('invoices');
    return newInvoice;
}

export function updateInvoice(id: string, updates: Partial<Invoice>): Invoice | undefined {
    const index = _invoices.findIndex(i => i.id === id);
    if (index === -1) return undefined;

    const updated = { ..._invoices[index], ...updates };
    _invoices = [..._invoices.slice(0, index), updated, ..._invoices.slice(index + 1)];
    saveToStorage(STORAGE_KEYS.INVOICES, _invoices);
    notifyListeners('invoices');
    return updated;
}

// ========================================
// Notification Methods
// ========================================

export function addNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const newNotif: Notification = {
        ...notification,
        id: generateId('notif'),
        createdAt: new Date().toISOString(),
    };
    _notifications = [newNotif, ..._notifications];
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, _notifications);
    notifyListeners('notifications');
    return newNotif;
}

export function markNotificationRead(id: string): void {
    const index = _notifications.findIndex(n => n.id === id);
    if (index !== -1) {
        const updated = { ..._notifications[index], read: true };
        _notifications = [..._notifications.slice(0, index), updated, ..._notifications.slice(index + 1)];
        saveToStorage(STORAGE_KEYS.NOTIFICATIONS, _notifications);
        notifyListeners('notifications');
    }
}

export function markAllNotificationsRead(): void {
    _notifications = _notifications.map(n => ({ ...n, read: true }));
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, _notifications);
    notifyListeners('notifications');
}

export function deleteNotification(id: string): void {
    _notifications = _notifications.filter(n => n.id !== id);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, _notifications);
    notifyListeners('notifications');
}

// ========================================
// Dashboard Stats (computed, but stable when data stable)
// ========================================

export function getDashboardStats() {
    const completedJobs = _jobs.filter(j => j.status === 'completed');
    const activeJobs = _jobs.filter(j => j.status === 'in-progress' || j.status === 'scheduled');
    const totalRevenue = completedJobs.reduce((sum, j) => sum + j.amount, 0);
    const paidInvoices = _invoices.filter(i => i.status === 'paid');
    const paidRevenue = paidInvoices.reduce((sum, i) => sum + i.amount, 0);
    const pendingRevenue = _invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
    const onFieldTeam = _team.filter(t => t.availability === 'on-job').length;
    const totalTechnicians = _team.filter(t => t.role === 'technician').length;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayJobs = _jobs.filter(j => j.scheduledDate === todayStr);

    return {
        totalRevenue,
        paidRevenue,
        pendingRevenue,
        activeJobs: activeJobs.length,
        completedJobs: completedJobs.length,
        totalJobs: _jobs.length,
        todayJobs: todayJobs.length,
        onFieldTeam,
        totalTechnicians,
        avgJobValue: completedJobs.length > 0 ? Math.round(totalRevenue / completedJobs.length) : 0,
    };
}

export function getRecentJobs(limit: number = 5): Job[] {
    return [..._jobs]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
}

export function getCustomerStats() {
    return _customers.map(customer => {
        const customerJobs = _jobs.filter(j => j.customerId === customer.id);
        const completedJobs = customerJobs.filter(j => j.status === 'completed');
        const totalSpent = completedJobs.reduce((sum, j) => sum + j.amount, 0);
        return {
            ...customer,
            totalJobs: customerJobs.length,
            totalSpent,
            lastJob: customerJobs.length > 0
                ? customerJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
                : null,
        };
    });
}

// Initialize on import
initializeDatabase();

const mockDb = {
    subscribe,
    initializeDatabase,
    resetDatabase,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerStats,
    getJobs,
    addJob,
    updateJob,
    deleteJob,
    getJobsByDate,
    getJobsForDateRange,
    getRecentJobs,
    getTeamMembers,
    getTechnicians,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getInvoices,
    addInvoice,
    updateInvoice,
    getNotifications,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    getAuditEvents,
    getDashboardStats,
};

export default mockDb;
