import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../api';

// ============================================
// Types
// ============================================

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    companyId?: string;
    companyName?: string;
    subscriptionTier?: string;
    createdAt: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (name: string, email: string, password: string, companyName?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateUser: (updates: Partial<Pick<User, 'name' | 'email'>>) => void;
    refreshUser: () => Promise<void>;
}

// ============================================
// Constants
// ============================================

const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';

// Demo users for fallback/testing
const DEMO_USERS: Array<{ email: string; password: string; name: string }> = [
    { email: 'demo@shyft.io', password: 'demo123', name: 'Demo User' },
    { email: 'admin@shyft.io', password: 'admin123', name: 'Admin User' },
];

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// ============================================
// Provider Component
// ============================================

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Set up unauthorized handler
    useEffect(() => {
        api.setOnUnauthorized(() => {
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        });
    }, []);

    // Restore session on mount
    useEffect(() => {
        const restoreSession = async () => {
            // Check for tokens in URL (cross-subdomain transfer)
            const urlParams = new URLSearchParams(window.location.search);
            const urlAccessToken = urlParams.get('access_token');
            const urlRefreshToken = urlParams.get('refresh_token');

            if (urlAccessToken && urlRefreshToken) {
                // Save tokens from URL and clean up the URL
                api.setTokens(urlAccessToken, urlRefreshToken);
                // Remove tokens from URL for security
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            // Check if we have tokens
            const hasToken = localStorage.getItem('access_token');

            if (!hasToken) {
                // Try legacy auth
                const legacyAuth = localStorage.getItem('shyft_auth');
                if (legacyAuth) {
                    try {
                        const user = JSON.parse(legacyAuth) as User;
                        setState({
                            user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        return;
                    } catch {
                        localStorage.removeItem('shyft_auth');
                    }
                }
                setState(prev => ({ ...prev, isLoading: false }));
                return;
            }

            if (USE_REAL_API) {
                try {
                    const { user: authUser, profile } = await api.getCurrentUser();
                    if (authUser) {
                        const user: User = {
                            id: authUser.id,
                            email: authUser.email,
                            name: profile?.full_name || authUser.email,
                            role: profile?.role,
                            companyId: profile?.company_id,
                            companyName: profile?.companies?.name,
                            subscriptionTier: profile?.companies?.subscription_tier,
                            createdAt: authUser.created_at,
                        };
                        setState({
                            user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        return;
                    }
                } catch {
                    api.clearTokens();
                }
            }

            setState(prev => ({ ...prev, isLoading: false }));
        };

        restoreSession();
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        if (USE_REAL_API) {
            try {
                const { user: authUser } = await api.login(email, password);

                // Get full profile
                const { user: fullUser, profile } = await api.getCurrentUser();

                const user: User = {
                    id: authUser?.id || fullUser?.id,
                    email: authUser?.email || email,
                    name: profile?.full_name || authUser?.email || email,
                    role: profile?.role,
                    companyId: profile?.company_id,
                    companyName: profile?.companies?.name,
                    subscriptionTier: profile?.companies?.subscription_tier,
                    createdAt: authUser?.created_at || new Date().toISOString(),
                };

                setState({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                });

                return { success: true };
            } catch (err: any) {
                return { success: false, error: err.error || 'Login failed' };
            }
        }

        // Fallback to demo mode
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundUser = DEMO_USERS.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!foundUser) {
            return { success: false, error: 'Invalid email or password' };
        }

        const user: User = {
            id: `user_${Date.now()}`,
            name: foundUser.name,
            email: foundUser.email,
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem('shyft_auth', JSON.stringify(user));
        setState({ user, isAuthenticated: true, isLoading: false });

        return { success: true };
    }, []);

    const signup = useCallback(async (
        name: string,
        email: string,
        password: string,
        companyName?: string
    ): Promise<{ success: boolean; error?: string }> => {
        if (USE_REAL_API) {
            try {
                const result = await api.signup(email, password, name, companyName || `${name}'s Company`);

                if (result.session) {
                    // Login successful, get user
                    const { user: authUser, profile } = await api.getCurrentUser();

                    const user: User = {
                        id: authUser?.id,
                        email: authUser?.email || email,
                        name: profile?.full_name || name,
                        role: profile?.role,
                        companyId: profile?.company_id,
                        companyName: profile?.companies?.name,
                        subscriptionTier: profile?.companies?.subscription_tier,
                        createdAt: authUser?.created_at || new Date().toISOString(),
                    };

                    setState({ user, isAuthenticated: true, isLoading: false });
                }

                return { success: true };
            } catch (err: any) {
                return { success: false, error: err.error || 'Signup failed' };
            }
        }

        // Fallback demo mode
        await new Promise(resolve => setTimeout(resolve, 500));

        const user: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem('shyft_auth', JSON.stringify(user));
        setState({ user, isAuthenticated: true, isLoading: false });

        return { success: true };
    }, []);

    const logout = useCallback(() => {
        if (USE_REAL_API) {
            api.logout().catch(() => { });
        }
        api.clearTokens();
        localStorage.removeItem('shyft_auth');
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    }, []);

    const updateUser = useCallback((updates: Partial<Pick<User, 'name' | 'email'>>) => {
        setState(prev => {
            if (!prev.user) return prev;
            const updatedUser = { ...prev.user, ...updates };
            localStorage.setItem('shyft_auth', JSON.stringify(updatedUser));
            return { ...prev, user: updatedUser };
        });
    }, []);

    const refreshUser = useCallback(async () => {
        if (!USE_REAL_API) return;

        try {
            const { user: authUser, profile } = await api.getCurrentUser();
            if (authUser) {
                const user: User = {
                    id: authUser.id,
                    email: authUser.email,
                    name: profile?.full_name || authUser.email,
                    role: profile?.role,
                    companyId: profile?.company_id,
                    companyName: profile?.companies?.name,
                    subscriptionTier: profile?.companies?.subscription_tier,
                    createdAt: authUser.created_at,
                };
                setState(prev => ({ ...prev, user }));
            }
        } catch {
            // Ignore errors
        }
    }, []);

    const value: AuthContextType = {
        ...state,
        login,
        signup,
        logout,
        updateUser,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
