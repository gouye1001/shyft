import { useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '../api';

// Generic hook state
interface UseApiState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

// ============================================
// Dashboard Hooks
// ============================================

export function useDashboardStats() {
    const [state, setState] = useState<UseApiState<{
        totalRevenue: number;
        monthlyRevenue: number;
        completedJobs: number;
        monthlyJobs: number;
        pendingJobs: number;
        inProgressJobs: number;
        teamSize: number;
        avgResponseTime: string;
    }>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const refresh = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await api.getDashboardStats();
            setState({ data: result.stats, isLoading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({ data: null, isLoading: false, error: error.error || 'Failed to load stats' });
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { ...state, refresh };
}

export function useDashboardTeam() {
    const [state, setState] = useState<UseApiState<any[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const refresh = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await api.getDashboardTeam();
            setState({ data: result.technicians, isLoading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({ data: null, isLoading: false, error: error.error || 'Failed to load team' });
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { ...state, refresh };
}

export function useRevenueChart() {
    const [state, setState] = useState<UseApiState<{ labels: string[]; data: number[] }>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const refresh = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await api.getRevenueChartData();
            setState({ data: result, isLoading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({ data: null, isLoading: false, error: error.error || 'Failed to load chart' });
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { ...state, refresh };
}

// ============================================
// Jobs Hooks
// ============================================

export function useJobs() {
    const [state, setState] = useState<UseApiState<any[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const refresh = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await api.getJobs();
            setState({ data: result.jobs, isLoading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({ data: null, isLoading: false, error: error.error || 'Failed to load jobs' });
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const createJob = useCallback(async (jobData: Parameters<typeof api.createJob>[0]) => {
        try {
            const result = await api.createJob(jobData);
            refresh();
            return { success: true, job: result.job };
        } catch (err) {
            const error = err as ApiError;
            return { success: false, error: error.error };
        }
    }, [refresh]);

    const dispatchJob = useCallback(async (jobId: string, technicianId: string) => {
        try {
            await api.dispatchJob(jobId, technicianId);
            refresh();
            return { success: true };
        } catch (err) {
            const error = err as ApiError;
            return { success: false, error: error.error };
        }
    }, [refresh]);

    const completeJob = useCallback(async (jobId: string, amount?: number) => {
        try {
            await api.completeJob(jobId, amount);
            refresh();
            return { success: true };
        } catch (err) {
            const error = err as ApiError;
            return { success: false, error: error.error };
        }
    }, [refresh]);

    return { ...state, refresh, createJob, dispatchJob, completeJob };
}

// ============================================
// Billing Hooks
// ============================================

export function useSubscription() {
    const [state, setState] = useState<UseApiState<{
        active: boolean;
        tier: string;
        currentPeriodEnd: string | null;
        cancelAtPeriodEnd: boolean;
    }>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const refresh = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await api.getSubscription();
            setState({ data: result.subscription, isLoading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({
                data: { active: false, tier: 'free', currentPeriodEnd: null, cancelAtPeriodEnd: false },
                isLoading: false,
                error: error.error || 'Failed to load subscription'
            });
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const startCheckout = useCallback(async (priceId: string) => {
        try {
            const successUrl = `${window.location.origin}/dashboard?checkout=success`;
            const cancelUrl = `${window.location.origin}/pricing?checkout=cancelled`;
            const result = await api.createCheckoutSession(priceId, successUrl, cancelUrl);
            if (result.url) {
                window.location.href = result.url;
            }
            return { success: true };
        } catch (err) {
            const error = err as ApiError;
            return { success: false, error: error.error };
        }
    }, []);

    const openBillingPortal = useCallback(async () => {
        try {
            const result = await api.createPortalSession(window.location.href);
            if (result.url) {
                window.location.href = result.url;
            }
            return { success: true };
        } catch (err) {
            const error = err as ApiError;
            return { success: false, error: error.error };
        }
    }, []);

    return { ...state, refresh, startCheckout, openBillingPortal };
}

export function usePricing() {
    const [state, setState] = useState<UseApiState<{
        prices: any;
        priceIds: { starter: string; professional: string };
    }>>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const load = async () => {
            try {
                const result = await api.getPrices();
                setState({ data: result, isLoading: false, error: null });
            } catch (err) {
                const error = err as ApiError;
                setState({ data: null, isLoading: false, error: error.error || 'Failed to load pricing' });
            }
        };
        load();
    }, []);

    return state;
}

// ============================================
// Technicians Hooks
// ============================================

export function useTechnicians() {
    const [state, setState] = useState<UseApiState<any[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const refresh = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await api.getTechnicians();
            setState({ data: result.technicians, isLoading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({ data: null, isLoading: false, error: error.error || 'Failed to load technicians' });
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { ...state, refresh };
}

export function useAvailableTechnicians() {
    const [state, setState] = useState<UseApiState<any[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const refresh = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await api.getAvailableTechnicians();
            setState({ data: result.technicians, isLoading: false, error: null });
        } catch (err) {
            const error = err as ApiError;
            setState({ data: null, isLoading: false, error: error.error || 'Failed to load technicians' });
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { ...state, refresh };
}
