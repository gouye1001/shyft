import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

const HomeTestimonials: React.FC = () => {
    const testimonials = [
        {
            quote: "Shyft replaced three different tools for us. The dispatch alone saves our coordinator 2 hours every day.",
            name: "Michael Torres",
            role: "Owner",
            company: "Torres HVAC",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
            quote: "Our technicians actually use the app now. Before Shyft, we had 50% adoption. Now it's 100%.",
            name: "Jennifer Martinez",
            role: "Operations Director",
            company: "Bay Area Services",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
        },
        {
            quote: "The route optimization paid for itself in the first week. We're saving $3K/month on fuel.",
            name: "David Chen",
            role: "Fleet Manager",
            company: "Premier Plumbing",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
    ];

    return (
        <section className="py-32 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="text-sm text-amber-400 uppercase tracking-wider font-semibold mb-4">Customer Stories</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Loved by teams everywhere
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <ScrollReveal key={i}>
                            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 h-full flex flex-col hover:border-white/10 transition-colors">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <i key={s} className="fa-solid fa-star text-amber-400 text-sm" />)}
                                </div>
                                <blockquote className="text-lg text-white leading-relaxed mb-8 flex-1">"{t.quote}"</blockquote>
                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <div className="text-white font-semibold">{t.name}</div>
                                        <div className="text-sm text-zinc-500">{t.role}, {t.company}</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeTestimonials;
