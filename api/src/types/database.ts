// Database types - will be auto-generated from Supabase
// Run: npm run generate:types

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            companies: {
                Row: {
                    id: string;
                    name: string;
                    subscription_tier: 'starter' | 'professional' | 'enterprise';
                    stripe_customer_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    subscription_tier?: 'starter' | 'professional' | 'enterprise';
                    stripe_customer_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    subscription_tier?: 'starter' | 'professional' | 'enterprise';
                    stripe_customer_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            profiles: {
                Row: {
                    id: string;
                    user_id: string;
                    company_id: string;
                    full_name: string;
                    role: 'admin' | 'manager' | 'technician';
                    avatar_url: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    company_id: string;
                    full_name: string;
                    role: 'admin' | 'manager' | 'technician';
                    avatar_url?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    company_id?: string;
                    full_name?: string;
                    role?: 'admin' | 'manager' | 'technician';
                    avatar_url?: string | null;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'profiles_company_id_fkey';
                        columns: ['company_id'];
                        referencedRelation: 'companies';
                        referencedColumns: ['id'];
                    }
                ];
            };
            jobs: {
                Row: {
                    id: string;
                    company_id: string;
                    customer_name: string;
                    customer_address: string;
                    customer_phone: string | null;
                    description: string;
                    status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
                    priority: 'low' | 'medium' | 'high' | 'urgent';
                    assigned_to: string | null;
                    scheduled_at: string | null;
                    completed_at: string | null;
                    amount: number | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    company_id: string;
                    customer_name: string;
                    customer_address: string;
                    customer_phone?: string | null;
                    description: string;
                    status?: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
                    priority?: 'low' | 'medium' | 'high' | 'urgent';
                    assigned_to?: string | null;
                    scheduled_at?: string | null;
                    completed_at?: string | null;
                    amount?: number | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    company_id?: string;
                    customer_name?: string;
                    customer_address?: string;
                    customer_phone?: string | null;
                    description?: string;
                    status?: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
                    priority?: 'low' | 'medium' | 'high' | 'urgent';
                    assigned_to?: string | null;
                    scheduled_at?: string | null;
                    completed_at?: string | null;
                    amount?: number | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'jobs_company_id_fkey';
                        columns: ['company_id'];
                        referencedRelation: 'companies';
                        referencedColumns: ['id'];
                    }
                ];
            };
            technicians: {
                Row: {
                    id: string;
                    profile_id: string;
                    company_id: string;
                    skills: string[];
                    status: 'available' | 'busy' | 'offline';
                    current_location: Json | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    profile_id: string;
                    company_id: string;
                    skills?: string[];
                    status?: 'available' | 'busy' | 'offline';
                    current_location?: Json | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    profile_id?: string;
                    company_id?: string;
                    skills?: string[];
                    status?: 'available' | 'busy' | 'offline';
                    current_location?: Json | null;
                    created_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'technicians_company_id_fkey';
                        columns: ['company_id'];
                        referencedRelation: 'companies';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'technicians_profile_id_fkey';
                        columns: ['profile_id'];
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
