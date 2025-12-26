import React, { useState } from 'react';

const mockJobs = [
    { id: 1, title: 'HVAC Repair', customer: 'John Smith', address: '123 Main St', status: 'In Progress', priority: 'High', assignee: 'Mike T.', time: '2:30 PM' },
    { id: 2, title: 'Plumbing Install', customer: 'Sarah Johnson', address: '456 Oak Ave', status: 'Scheduled', priority: 'Medium', assignee: 'Alex R.', time: '4:00 PM' },
    { id: 3, title: 'Electrical Check', customer: 'Mike Williams', address: '789 Pine Rd', status: 'Completed', priority: 'Low', assignee: 'Sam K.', time: '11:00 AM' },
    { id: 4, title: 'Water Heater Replace', customer: 'Emily Brown', address: '321 Elm St', status: 'Scheduled', priority: 'High', assignee: 'Mike T.', time: 'Tomorrow' },
    { id: 5, title: 'AC Maintenance', customer: 'David Lee', address: '654 Maple Dr', status: 'In Progress', priority: 'Medium', assignee: 'Alex R.', time: '3:00 PM' },
];

const AppJobs: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'scheduled' | 'in-progress' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredJobs = mockJobs.filter(job => {
        const matchesFilter = filter === 'all' ||
            (filter === 'scheduled' && job.status === 'Scheduled') ||
            (filter === 'in-progress' && job.status === 'In Progress') ||
            (filter === 'completed' && job.status === 'Completed');
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.customer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const statusColors: Record<string, string> = {
        'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'Scheduled': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Completed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    };

    const priorityColors: Record<string, string> = {
        'High': 'text-red-400',
        'Medium': 'text-yellow-400',
        'Low': 'text-zinc-400',
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Jobs</h1>
                    <p className="text-zinc-400">Manage and track all your service jobs</p>
                </div>
                <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-plus" />
                    New Job
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex gap-2 p-1 rounded-xl bg-zinc-900/50 border border-white/5">
                    {[
                        { key: 'all', label: 'All' },
                        { key: 'scheduled', label: 'Scheduled' },
                        { key: 'in-progress', label: 'In Progress' },
                        { key: 'completed', label: 'Completed' },
                    ].map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key as typeof filter)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f.key
                                    ? 'bg-white/10 text-white'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <div className="relative flex-1 max-w-md">
                    <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-white/5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/20"
                    />
                </div>
            </div>

            {/* Jobs Table */}
            <div className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 text-left">
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Job</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Priority</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Assignee</th>
                            <th className="px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredJobs.map((job) => (
                            <tr key={job.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-white font-medium">{job.title}</div>
                                    <div className="text-sm text-zinc-500">{job.address}</div>
                                </td>
                                <td className="px-6 py-4 text-zinc-300">{job.customer}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 font-medium ${priorityColors[job.priority]}`}>{job.priority}</td>
                                <td className="px-6 py-4 text-zinc-300">{job.assignee}</td>
                                <td className="px-6 py-4 text-zinc-400">{job.time}</td>
                                <td className="px-6 py-4">
                                    <button className="text-zinc-500 hover:text-white transition-colors">
                                        <i className="fa-solid fa-ellipsis-vertical" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppJobs;
