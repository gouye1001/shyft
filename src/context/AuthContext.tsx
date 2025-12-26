import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// ============================================
// Types
// ============================================

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateUser: (updates: Partial<Pick<User, 'name' | 'email'>>) => void;
}

// ============================================
// Constants
// ============================================

const AUTH_STORAGE_KEY = 'shyft_auth';
const USERS_STORAGE_KEY = 'shyft_users';

// Default demo users for testing
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
// Helper Functions
// ============================================

interface StoredUser {
    email: string;
    password: string;
    name: string;
}

const getStoredUsers = (): StoredUser[] => {
    try {
        const stored = localStorage.getItem(USERS_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // Invalid JSON, reset
    }
    // Initialize with demo users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
};

const saveUser = (user: StoredUser): void => {
    const users = getStoredUsers();
    const existingIndex = users.findIndex(u => u.email === user.email);
    if (existingIndex >= 0) {
        users[existingIndex] = user;
    } else {
        users.push(user);
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const generateUserId = (): string => {
    return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

const createUserFromCredentials = (email: string, name: string): User => ({
    id: generateUserId(),
    name,
    email,
    createdAt: new Date().toISOString(),
});

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

    // Restore session from localStorage on mount
    useEffect(() => {
        const restoreSession = () => {
            try {
                const stored = localStorage.getItem(AUTH_STORAGE_KEY);
                if (stored) {
                    const user = JSON.parse(stored) as User;
                    setState({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return;
                }
            } catch {
                // Invalid stored data
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
            setState(prev => ({ ...prev, isLoading: false }));
        };

        // Small delay to simulate loading
        const timer = setTimeout(restoreSession, 100);
        return () => clearTimeout(timer);
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = getStoredUsers();
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (!foundUser) {
            return { success: false, error: 'Invalid email or password' };
        }

        const user = createUserFromCredentials(foundUser.email, foundUser.name);

        // Save to localStorage
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });

        return { success: true };
    }, []);

    const signup = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = getStoredUsers();
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
            return { success: false, error: 'An account with this email already exists' };
        }

        // Create new user
        const user = createUserFromCredentials(email, name);

        // Save user credentials
        saveUser({ email, password, name });

        // Save session
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });

        return { success: true };
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
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
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

            // Also update stored credentials if email changed
            if (updates.email || updates.name) {
                const users = getStoredUsers();
                const userIdx = users.findIndex(u => u.email === prev.user!.email);
                if (userIdx >= 0) {
                    users[userIdx] = {
                        ...users[userIdx],
                        email: updates.email || users[userIdx].email,
                        name: updates.name || users[userIdx].name,
                    };
                    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
                }
            }

            return { ...prev, user: updatedUser };
        });
    }, []);

    const value: AuthContextType = {
        ...state,
        login,
        signup,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
