import React from 'react';

const AppSchedule: React.FC = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

    const mockEvents = [
        { day: 0, hour: 9, title: 'HVAC Repair', duration: 2, color: 'blue' },
        { day: 0, hour: 14, title: 'Plumbing', duration: 1, color: 'emerald' },
        { day: 1, hour: 10, title: 'Electrical', duration: 3, color: 'purple' },
        { day: 2, hour: 8, title: 'Maintenance', duration: 2, color: 'cyan' },
        { day: 3, hour: 13, title: 'Install', duration: 2, color: 'blue' },
        { day: 4, hour: 9, title: 'Inspection', duration: 1, color: 'yellow' },
    ];

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Schedule</h1>
                    <p className="text-zinc-400">Weekly calendar view of all jobs</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10">
                        <i className="fa-solid fa-chevron-left" />
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium">
                        This Week
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10">
                        <i className="fa-solid fa-chevron-right" />
                    </button>
                </div>
            </div>

            <div className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
                {/* Days Header */}
                <div className="grid grid-cols-8 border-b border-white/5">
                    <div className="p-4 text-xs text-zinc-500 uppercase" />
                    {days.map((day, i) => (
                        <div key={day} className={`p-4 text-center border-l border-white/5 ${i === 0 ? 'bg-blue-500/10' : ''}`}>
                            <div className="text-xs text-zinc-500 uppercase">{day}</div>
                            <div className={`text-lg font-bold ${i === 0 ? 'text-blue-400' : 'text-white'}`}>
                                {23 + i}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Time Grid */}
                <div className="grid grid-cols-8">
                    {hours.map((hour) => (
                        <React.Fragment key={hour}>
                            <div className="p-2 text-xs text-zinc-500 text-right pr-4 border-b border-white/5">
                                {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                            </div>
                            {days.map((_, dayIndex) => {
                                const event = mockEvents.find(e => e.day === dayIndex && e.hour === hour);
                                return (
                                    <div key={dayIndex} className="h-16 border-l border-b border-white/5 relative">
                                        {event && (
                                            <div
                                                className={`absolute inset-x-1 top-1 bg-${event.color}-500/20 border border-${event.color}-500/30 rounded-lg p-2`}
                                                style={{ height: `${event.duration * 64 - 8}px` }}
                                            >
                                                <div className={`text-xs font-medium text-${event.color}-400`}>{event.title}</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppSchedule;
