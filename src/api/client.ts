// API Client for Shyft Backend
// Handles authentication, requests, and error handling

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

interface ApiError {
    error: string;
    status: number;
}

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
}

class ApiClient {
    private baseUrl: string;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    private onUnauthorized?: () => void;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.loadTokens();
    }

    // Load tokens from localStorage
    private loadTokens() {
        this.accessToken = localStorage.getItem('access_token');
        this.refreshToken = localStorage.getItem('refresh_token');
    }

    // Save tokens to localStorage
    setTokens(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    }

    // Clear tokens
    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    // Set callback for unauthorized responses
    setOnUnauthorized(callback: () => void) {
        this.onUnauthorized = callback;
    }

    // Make authenticated request
    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { method = 'GET', body, headers = {} } = options;

        const requestHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...headers,
        };

        if (this.accessToken) {
            requestHeaders['Authorization'] = `Bearer ${this.accessToken}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        // Handle 401 - try to refresh token
        if (response.status === 401 && this.refreshToken) {
            const refreshed = await this.tryRefreshToken();
            if (refreshed) {
                // Retry the request with new token
                requestHeaders['Authorization'] = `Bearer ${this.accessToken}`;
                const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
                    method,
                    headers: requestHeaders,
                    body: body ? JSON.stringify(body) : undefined,
                });

                if (!retryResponse.ok) {
                    const error = await retryResponse.json();
                    throw { error: error.error, status: retryResponse.status } as ApiError;
                }
                return retryResponse.json();
            } else {
                this.clearTokens();
                this.onUnauthorized?.();
                throw { error: 'Session expired', status: 401 } as ApiError;
            }
        }

        if (!response.ok) {
            const error = await response.json();
            throw { error: error.error || 'Request failed', status: response.status } as ApiError;
        }

        return response.json();
    }

    // Try to refresh the access token
    private async tryRefreshToken(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: this.refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.session) {
                    this.setTokens(data.session.access_token, data.session.refresh_token);
                    return true;
                }
            }
            return false;
        } catch {
            return false;
        }
    }

    // Auth endpoints
    async login(email: string, password: string) {
        const data = await this.request<{
            user: any;
            session: { access_token: string; refresh_token: string };
        }>('/auth/login', {
            method: 'POST',
            body: { email, password },
        });

        if (data.session) {
            this.setTokens(data.session.access_token, data.session.refresh_token);
        }
        return data;
    }

    async signup(email: string, password: string, fullName: string, companyName: string) {
        const data = await this.request<{
            user: any;
            session: { access_token: string; refresh_token: string } | null;
            message: string;
        }>('/auth/signup', {
            method: 'POST',
            body: { email, password, fullName, companyName },
        });

        if (data.session) {
            this.setTokens(data.session.access_token, data.session.refresh_token);
        }
        return data;
    }

    async logout() {
        await this.request('/auth/logout', { method: 'POST' });
        this.clearTokens();
    }

    async getCurrentUser() {
        return this.request<{ user: any; profile: any }>('/auth/me');
    }

    async forgotPassword(email: string) {
        return this.request('/auth/forgot-password', {
            method: 'POST',
            body: { email },
        });
    }

    // Dashboard endpoints
    async getDashboardStats() {
        return this.request<{
            stats: {
                totalRevenue: number;
                monthlyRevenue: number;
                completedJobs: number;
                monthlyJobs: number;
                pendingJobs: number;
                inProgressJobs: number;
                teamSize: number;
                avgResponseTime: string;
            };
            recentActivity: { today: number };
        }>('/dashboard/stats');
    }

    async getDashboardTeam() {
        return this.request<{ technicians: any[] }>('/dashboard/team');
    }

    async getRevenueChartData() {
        return this.request<{ labels: string[]; data: number[] }>('/dashboard/charts/revenue');
    }

    // Jobs endpoints
    async getJobs() {
        return this.request<{ jobs: any[] }>('/jobs');
    }

    async getJob(id: string) {
        return this.request<{ job: any }>(`/jobs/${id}`);
    }

    async createJob(jobData: {
        customer_name: string;
        customer_address: string;
        customer_phone?: string;
        description: string;
        priority?: string;
        scheduled_at?: string;
        amount?: number;
    }) {
        return this.request<{ job: any }>('/jobs', {
            method: 'POST',
            body: jobData,
        });
    }

    async updateJob(id: string, updates: any) {
        return this.request<{ job: any }>(`/jobs/${id}`, {
            method: 'PATCH',
            body: updates,
        });
    }

    async dispatchJob(jobId: string, technicianId: string) {
        return this.request<{ job: any; message: string }>(`/jobs/${jobId}/dispatch`, {
            method: 'POST',
            body: { technician_id: technicianId },
        });
    }

    async completeJob(jobId: string, amount?: number) {
        return this.request<{ job: any; message: string }>(`/jobs/${jobId}/complete`, {
            method: 'POST',
            body: { amount },
        });
    }

    // Technicians endpoints
    async getTechnicians() {
        return this.request<{ technicians: any[] }>('/technicians');
    }

    async getAvailableTechnicians() {
        return this.request<{ technicians: any[] }>('/technicians/available');
    }

    // Billing endpoints
    async getPrices() {
        return this.request<{
            prices: any;
            priceIds: { starter: string; professional: string };
        }>('/billing/prices');
    }

    async getSubscription() {
        return this.request<{
            subscription: {
                active: boolean;
                tier: string;
                currentPeriodEnd: string | null;
                cancelAtPeriodEnd: boolean;
            };
        }>('/billing/subscription');
    }

    async createCheckoutSession(priceId: string, successUrl: string, cancelUrl: string) {
        return this.request<{ url: string }>('/billing/checkout', {
            method: 'POST',
            body: { priceId, successUrl, cancelUrl },
        });
    }

    async createPortalSession(returnUrl: string) {
        return this.request<{ url: string }>('/billing/portal', {
            method: 'POST',
            body: { returnUrl },
        });
    }
}

// Singleton instance
export const api = new ApiClient(API_BASE_URL);
export type { ApiError };
