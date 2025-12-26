import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockJobs, mockTeam, mockStats } from '../utils/mockData';
import type { Job, TeamMember } from '../utils/mockData';

interface AppState {
    jobs: Job[];
    team: TeamMember[];
    stats: typeof mockStats;
}

interface AppContextType {
    state: AppState;
    selectedPlan: string | null;
    setSelectedPlan: (plan: string | null) => void;
    addJob: (job: Omit<Job, 'id'>) => void;
    updateJob: (id: number, updates: Partial<Job>) => void;
    deleteJob: (id: number) => void;
    addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
    updateTeamMember: (id: number, updates: Partial<TeamMember>) => void;
    deleteTeamMember: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        jobs: mockJobs,
        team: mockTeam,
        stats: mockStats
    });

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    // Job operations
    const addJob = (job: Omit<Job, 'id'>) => {
        const newJob: Job = {
            ...job,
            id: Math.max(...state.jobs.map(j => j.id), 0) + 1
        };
        setState(prev => ({
            ...prev,
            jobs: [...prev.jobs, newJob],
            stats: {
                ...prev.stats,
                activeJobs: prev.stats.activeJobs + 1,
                jobsScheduledToday: prev.stats.jobsScheduledToday + 1
            }
        }));
    };

    const updateJob = (id: number, updates: Partial<Job>) => {
        setState(prev => ({
            ...prev,
            jobs: prev.jobs.map(job =>
                job.id === id ? { ...job, ...updates } : job
            )
        }));
    };

    const deleteJob = (id: number) => {
        setState(prev => ({
            ...prev,
            jobs: prev.jobs.filter(job => job.id !== id),
            stats: {
                ...prev.stats,
                activeJobs: Math.max(0, prev.stats.activeJobs - 1)
            }
        }));
    };

    // Team member operations
    const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
        const newMember: TeamMember = {
            ...member,
            id: Math.max(...state.team.map(m => m.id), 0) + 1
        };
        setState(prev => ({
            ...prev,
            team: [...prev.team, newMember],
            stats: {
                ...prev.stats,
                totalTeam: prev.stats.totalTeam + 1
            }
        }));
    };

    const updateTeamMember = (id: number, updates: Partial<TeamMember>) => {
        setState(prev => ({
            ...prev,
            team: prev.team.map(member =>
                member.id === id ? { ...member, ...updates } : member
            )
        }));
    };

    const deleteTeamMember = (id: number) => {
        setState(prev => ({
            ...prev,
            team: prev.team.filter(member => member.id !== id),
            stats: {
                ...prev.stats,
                totalTeam: Math.max(0, prev.stats.totalTeam - 1)
            }
        }));
    };

    const value: AppContextType = {
        state,
        selectedPlan,
        setSelectedPlan,
        addJob,
        updateJob,
        deleteJob,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
