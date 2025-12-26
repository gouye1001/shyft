import React from 'react';

const mockTeam = [
    { id: 1, name: 'Mike Thompson', role: 'Senior Technician', email: 'mike@shyft.io', status: 'On Field', avatar: 'M', jobs: 12 },
    { id: 2, name: 'Alex Rodriguez', role: 'Technician', email: 'alex@shyft.io', status: 'Available', avatar: 'A', jobs: 8 },
    { id: 3, name: 'Sam Kim', role: 'Junior Technician', email: 'sam@shyft.io', status: 'On Field', avatar: 'S', jobs: 5 },
    { id: 4, name: 'Jordan Lee', role: 'Dispatcher', email: 'jordan@shyft.io', status: 'Office', avatar: 'J', jobs: 0 },
];

const AppTeam: React.FC = () => {
    const statusColors: Record<string, string> = {
        'On Field': 'bg-blue-500/20 text-blue-400',
        'Available': 'bg-emerald-500/20 text-emerald-400',
        'Office': 'bg-purple-500/20 text-purple-400',
        'Off Duty': 'bg-zinc-500/20 text-zinc-400',
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Team</h1>
                    <p className="text-zinc-400">Manage your field service team</p>
                </div>
                <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-user-plus" />
                    Add Member
                </button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTeam.map((member) => (
                    <div key={member.id} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {member.avatar}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold">{member.name}</h3>
                                <p className="text-sm text-zinc-500">{member.role}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[member.status]}`}>
                                {member.status}
                            </span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <i className="fa-solid fa-envelope w-4" />
                                {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400">
                                <i className="fa-solid fa-briefcase w-4" />
                                {member.jobs} jobs this week
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                            <button className="flex-1 py-2 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors text-sm">
                                View Profile
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors text-sm">
                                Assign Job
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppTeam;
