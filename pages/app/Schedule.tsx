import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCard, AppCardHeader, AppCardContent, AppButton, AppBadge, AppModal } from '../../components/app/ui';
import mockDb, { Job, TeamMember } from '../../src/services/mockDb';
import { useJobs, useTeamMembers } from '../../src/hooks/useMockData';

/**
 * AppSchedule - Schedule/Calendar view connected to mockDb
 * Features: Week view, job mapping by date, team availability, instant reactivity
 */
const AppSchedule: React.FC = () => {
    const navigate = useNavigate();
    const allJobs = useJobs();
    const team = useTeamMembers();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // Get week start (Monday)
    const getWeekStart = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const weekStart = useMemo(() => getWeekStart(selectedDate), [selectedDate]);

    // Generate week days
    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + i);
            return date;
        });
    }, [weekStart]);

    // Get jobs for the week from mockDb
    const jobsForWeek = useMemo(() => {
        const start = weekDays[0].toISOString().split('T')[0];
        const end = weekDays[6].toISOString().split('T')[0];
        return allJobs.filter(j => j.scheduledDate >= start && j.scheduledDate <= end);
    }, [allJobs, weekDays]);

    // Group jobs by date
    const jobsByDate = useMemo(() => {
        const map = new Map<string, Job[]>();
        jobsForWeek.forEach(job => {
            const dateStr = job.scheduledDate;
            if (!map.has(dateStr)) {
                map.set(dateStr, []);
            }
            map.get(dateStr)!.push(job);
        });
        return map;
    }, [jobsForWeek]);

    // Navigation
    const goToPrevWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 7);
        setSelectedDate(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 7);
        setSelectedDate(newDate);
    };

    const goToToday = () => {
        setSelectedDate(new Date());
    };

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const isToday = (date: Date) => formatDate(date) === formatDate(new Date());
    const isPast = (date: Date) => date < new Date() && !isToday(date);

    const statusColors: Record<string, string> = {
        scheduled: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
        'in-progress': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
        completed: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
        cancelled: 'bg-zinc-500/20 border-zinc-500/30 text-zinc-400',
    };

    const priorityDots: Record<string, string> = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-zinc-500',
    };

    // Handle job status update
    const handleUpdateJobStatus = (job: Job, newStatus: Job['status']) => {
        mockDb.updateJob(job.id, { status: newStatus });

        if (newStatus === 'completed') {
            mockDb.addInvoice({
                jobId: job.id,
                customerId: job.customerId,
                customerName: job.customerName,
                jobTitle: job.title,
                amount: job.amount,
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            });

            mockDb.addNotification({
                title: 'Job Completed',
                message: `${job.assigneeName} completed "${job.title}" for ${job.customerName}`,
                type: 'job',
                read: false,
            });
        }

        setSelectedJob(null);
    };

    // Get available technicians
    const availableTechnicians = team.filter(t =>
        t.role === 'technician' && t.availability === 'available' && t.status === 'active'
    );

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Schedule</h1>
                    <p className="text-zinc-400">
                        {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1 p-1 rounded-xl bg-zinc-900/50 border border-white/[0.06]">
                        <button
                            onClick={() => setViewMode('day')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'day' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Day
                        </button>
                        <button
                            onClick={() => setViewMode('week')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'week' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Week
                        </button>
                    </div>
                    <AppButton variant="primary" icon="fa-plus" onClick={() => navigate('/jobs')}>
                        New Job
                    </AppButton>
                </div>
            </div>

            {/* Week Navigation */}
            <div className="flex items-center gap-3">
                <button
                    onClick={goToPrevWeek}
                    className="w-10 h-10 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
                >
                    <i className="fa-solid fa-chevron-left" />
                </button>
                <button
                    onClick={goToToday}
                    className="px-4 py-2 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                >
                    Today
                </button>
                <button
                    onClick={goToNextWeek}
                    className="w-10 h-10 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
                >
                    <i className="fa-solid fa-chevron-right" />
                </button>
                <span className="text-sm text-zinc-500 ml-2">
                    {jobsForWeek.length} job{jobsForWeek.length !== 1 ? 's' : ''} this week
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-3">
                    <AppCard>
                        {viewMode === 'week' ? (
                            <div className="grid grid-cols-7 divide-x divide-white/[0.04]">
                                {weekDays.map((date) => {
                                    const dateStr = formatDate(date);
                                    const dayJobs = jobsByDate.get(dateStr) || [];
                                    const today = isToday(date);
                                    const past = isPast(date);

                                    return (
                                        <div key={dateStr} className={`min-h-[400px] ${past ? 'opacity-60' : ''}`}>
                                            {/* Day Header */}
                                            <div className={`p-3 border-b border-white/[0.04] text-center ${today ? 'bg-blue-500/10' : ''}`}>
                                                <div className={`text-xs font-medium ${today ? 'text-blue-400' : 'text-zinc-500'}`}>
                                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                                </div>
                                                <div className={`text-lg font-bold ${today ? 'text-white' : 'text-zinc-300'}`}>
                                                    {date.getDate()}
                                                </div>
                                            </div>

                                            {/* Jobs */}
                                            <div className="p-2 space-y-2">
                                                {dayJobs.length === 0 && (
                                                    <div className="text-xs text-zinc-600 text-center py-4">
                                                        No jobs
                                                    </div>
                                                )}
                                                {dayJobs
                                                    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
                                                    .map((job) => (
                                                        <button
                                                            key={job.id}
                                                            onClick={() => setSelectedJob(job)}
                                                            className={`w-full p-2 rounded-lg border text-left transition-all hover:scale-[1.02] ${statusColors[job.status]}`}
                                                        >
                                                            <div className="flex items-center gap-1.5 mb-1">
                                                                <div className={`w-2 h-2 rounded-full ${priorityDots[job.priority]}`} />
                                                                <span className="text-xs font-medium truncate">{job.scheduledTime}</span>
                                                            </div>
                                                            <div className="text-xs font-medium text-white truncate">{job.title}</div>
                                                            <div className="text-xs truncate opacity-70">{job.customerName}</div>
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            // Day View
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </h3>
                                <div className="space-y-3">
                                    {(jobsByDate.get(formatDate(selectedDate)) || [])
                                        .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
                                        .map((job) => (
                                            <button
                                                key={job.id}
                                                onClick={() => setSelectedJob(job)}
                                                className={`w-full p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${statusColors[job.status]}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-white">{job.title}</span>
                                                            <AppBadge variant={job.status === 'completed' ? 'success' : job.status === 'in-progress' ? 'info' : 'warning'} size="sm">
                                                                {job.status}
                                                            </AppBadge>
                                                        </div>
                                                        <div className="text-sm text-zinc-400 mt-1">{job.customerName} • {job.address}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-white">{job.scheduledTime}</div>
                                                        <div className="text-sm text-zinc-500">{job.assigneeName}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    {(jobsByDate.get(formatDate(selectedDate)) || []).length === 0 && (
                                        <div className="text-center py-12 text-zinc-500">
                                            <i className="fa-solid fa-calendar-xmark text-3xl mb-3" />
                                            <p>No jobs scheduled for this day</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </AppCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Team Availability */}
                    <AppCard>
                        <AppCardHeader>
                            <i className="fa-solid fa-users text-zinc-400" />
                            <h3 className="text-white font-semibold">Team Availability</h3>
                        </AppCardHeader>
                        <div className="p-4 space-y-3">
                            {team.filter(t => t.role === 'technician' && t.status === 'active').map((member) => (
                                <div key={member.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm text-white">{member.name.split(' ')[0]}</span>
                                    </div>
                                    <AppBadge
                                        variant={member.availability === 'available' ? 'success' : member.availability === 'on-job' ? 'warning' : 'neutral'}
                                        size="sm"
                                    >
                                        {member.availability.replace('-', ' ')}
                                    </AppBadge>
                                </div>
                            ))}
                        </div>
                    </AppCard>

                    {/* Today's Summary */}
                    <AppCard>
                        <AppCardHeader>
                            <i className="fa-solid fa-chart-simple text-zinc-400" />
                            <h3 className="text-white font-semibold">This Week</h3>
                        </AppCardHeader>
                        <AppCardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400">Total Jobs</span>
                                    <span className="text-white font-medium">{jobsForWeek.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400">Completed</span>
                                    <span className="text-emerald-400 font-medium">
                                        {jobsForWeek.filter(j => j.status === 'completed').length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400">In Progress</span>
                                    <span className="text-blue-400 font-medium">
                                        {jobsForWeek.filter(j => j.status === 'in-progress').length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400">Scheduled</span>
                                    <span className="text-yellow-400 font-medium">
                                        {jobsForWeek.filter(j => j.status === 'scheduled').length}
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-white/[0.06]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-400">Revenue</span>
                                        <span className="text-lg font-bold text-white">
                                            ${jobsForWeek.filter(j => j.status === 'completed').reduce((sum, j) => sum + j.amount, 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </AppCardContent>
                    </AppCard>
                </div>
            </div>

            {/* Job Detail Modal */}
            <AppModal
                isOpen={!!selectedJob}
                onClose={() => setSelectedJob(null)}
                title={selectedJob?.title || ''}
                description={`${selectedJob?.scheduledDate} at ${selectedJob?.scheduledTime}`}
                size="md"
                footer={
                    <>
                        {selectedJob?.status === 'scheduled' && (
                            <AppButton
                                variant="info"
                                icon="fa-play"
                                onClick={() => selectedJob && handleUpdateJobStatus(selectedJob, 'in-progress')}
                            >
                                Start
                            </AppButton>
                        )}
                        {selectedJob?.status === 'in-progress' && (
                            <AppButton
                                variant="success"
                                icon="fa-check"
                                onClick={() => selectedJob && handleUpdateJobStatus(selectedJob, 'completed')}
                            >
                                Complete
                            </AppButton>
                        )}
                        <AppButton variant="secondary" icon="fa-arrow-right" iconPosition="right" onClick={() => navigate('/jobs')}>
                            View in Jobs
                        </AppButton>
                    </>
                }
            >
                {selectedJob && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Customer</div>
                                <div className="text-white font-medium">{selectedJob.customerName}</div>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Assigned To</div>
                                <div className="text-white font-medium">{selectedJob.assigneeName}</div>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Address</div>
                                <div className="text-white">{selectedJob.address}</div>
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500 mb-1">Amount</div>
                                <div className="text-emerald-400 font-bold text-lg">${selectedJob.amount}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <AppBadge variant={selectedJob.status === 'completed' ? 'success' : selectedJob.status === 'in-progress' ? 'info' : 'warning'} dot>
                                {selectedJob.status.replace('-', ' ')}
                            </AppBadge>
                            <AppBadge variant={selectedJob.priority === 'high' ? 'error' : selectedJob.priority === 'medium' ? 'warning' : 'neutral'}>
                                {selectedJob.priority} priority
                            </AppBadge>
                        </div>
                    </div>
                )}
            </AppModal>
        </div>
    );
};

export default AppSchedule;
