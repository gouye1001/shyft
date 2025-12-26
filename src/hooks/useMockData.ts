import { useCallback, useSyncExternalStore } from 'react';
import mockDb, { DataKey, subscribe } from '../services/mockDb';

/**
 * useMockData - Hook for subscribing to mockDb changes
 * 
 * IMPORTANT: The getter function MUST return a STABLE reference 
 * (the same array/object if data hasn't changed).
 * mockDb now caches data internally and only creates new references on writes.
 */
export function useMockData<T>(key: DataKey, getter: () => T): T {
    const subscribeToData = useCallback(
        (callback: () => void) => subscribe(key, callback),
        [key]
    );

    // getter must return stable reference - mockDb handles this
    return useSyncExternalStore(subscribeToData, getter, getter);
}

// Pre-built hooks
export function useCustomers() {
    return useMockData('customers', mockDb.getCustomers);
}

export function useCustomerStats() {
    // This creates new objects, so we need to be careful
    // For now, use simple polling or accept re-renders on customer changes
    return useMockData('customers', mockDb.getCustomerStats);
}

export function useJobs() {
    return useMockData('jobs', mockDb.getJobs);
}

export function useTechnicians() {
    return useMockData('team', mockDb.getTechnicians);
}

export function useTeamMembers() {
    return useMockData('team', mockDb.getTeamMembers);
}

export function useInvoices() {
    return useMockData('invoices', mockDb.getInvoices);
}

export function useNotifications() {
    return useMockData('notifications', mockDb.getNotifications);
}

export function useDashboardStats() {
    return useMockData('all', mockDb.getDashboardStats);
}

export function useRecentJobs(limit: number = 5) {
    const getter = useCallback(() => mockDb.getRecentJobs(limit), [limit]);
    return useMockData('jobs', getter);
}

export default useMockData;
