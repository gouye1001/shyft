import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// ============================================
// Types
// ============================================

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: 'admin' | 'owner' | 'dispatcher' | 'technician';
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
// Demo Users (PURE MOCK - No API calls)
// ============================================

const DEMO_USERS: Array<{ email: string; password: string; name: string; role: 'admin' | 'dispatcher' | 'technician' }> = [
    { email: 'demo@shyft.io', password: 'demo123', name: 'Demo User', role: 'technician' },
    { email: 'admin@shyft.io', password: 'admin123', name: 'Admin User', role: 'admin' },
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
// Provider Component (PURE MOCK)
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

    // Restore session from localStorage ONLY (no API calls)
    useEffect(() => {
        const restoreSession = () => {
            // Check for tokens in URL (cross-subdomain transfer)
            const urlParams = new URLSearchParams(window.location.search);
            const urlAccessToken = urlParams.get('access_token');
            const urlRefreshToken = urlParams.get('refresh_token');

            if (urlAccessToken && urlRefreshToken) {
                // Save tokens from URL and clean up the URL
                localStorage.setItem('access_token', urlAccessToken);
                localStorage.setItem('refresh_token', urlRefreshToken);
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            // Check for stored auth
            const storedAuth = localStorage.getItem('shyft_auth');
            const hasToken = localStorage.getItem('access_token');

            if (storedAuth && hasToken) {
                try {
                    const user = JSON.parse(storedAuth) as User;
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

            // No valid session
            setState({ user: null, isAuthenticated: false, isLoading: false });
        };

        restoreSession();
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

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
            role: foundUser.role,
            createdAt: new Date().toISOString(),
        };

        // Store in localStorage
        localStorage.setItem('shyft_auth', JSON.stringify(user));
        localStorage.setItem('access_token', 'demo_token');
        localStorage.setItem('refresh_token', 'demo_refresh');

        setState({ user, isAuthenticated: true, isLoading: false });
        return { success: true };
    }, []);

    const signup = useCallback(async (
        name: string,
        email: string,
        _password: string,
        _companyName?: string
    ): Promise<{ success: boolean; error?: string }> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const user: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            role: 'admin', // New signups are admins of their company
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem('shyft_auth', JSON.stringify(user));
        localStorage.setItem('access_token', 'demo_token');
        localStorage.setItem('refresh_token', 'demo_refresh');

        setState({ user, isAuthenticated: true, isLoading: false });
        return { success: true };
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('shyft_auth');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setState({ user: null, isAuthenticated: false, isLoading: false });
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
        // No-op in mock mode - user already loaded from localStorage
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                signup,
                logout,
                updateUser,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
