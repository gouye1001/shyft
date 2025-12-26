import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
    color: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Shyft has completely transformed how we manage our field teams. What used to take hours now takes minutes.",
        author: "Marcus Chen",
        role: "Operations Director",
        company: "TechServ Pro",
        avatar: "MC",
        color: "blue",
    },
    {
        quote: "The mobile app is a game-changer. Our technicians actually love using it, which never happened before.",
        author: "Sarah Williams",
        role: "CEO",
        company: "CleanFlow Services",
        avatar: "SW",
        color: "purple",
    },
    {
        quote: "We've cut our scheduling time by 80% and increased customer satisfaction by 40%. The ROI is incredible.",
        author: "David Rodriguez",
        role: "Owner",
        company: "Elite HVAC Solutions",
        avatar: "DR",
        color: "emerald",
    },
    {
        quote: "Finally, software that understands field service. The route optimization alone pays for itself.",
        author: "Jessica Park",
        role: "Fleet Manager",
        company: "QuickFix Plumbing",
        avatar: "JP",
        color: "cyan",
    },
];

const TestimonialsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cards = containerRef.current?.getElementsByClassName('card-spotlight');
        if (!cards) return;

        for (const card of cards as HTMLCollectionOf<HTMLElement>) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <section
            className="py-32 bg-zinc-950 relative overflow-hidden"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 backdrop-blur-md">
                            <i className="fa-solid fa-star text-amber-400 text-xs" />
                            <span className="text-sm font-medium text-amber-200">Loved by 15,000+ teams</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                            Don't just take our word for it
                        </h2>
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                            See how forward-thinking service companies are scaling their operations with Shyft.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    {testimonials.map((testimonial, index) => (
                        <ScrollReveal key={index} delay={`${index * 100}`} className="h-full">
                            <div className="card-spotlight h-full p-10 rounded-3xl bg-zinc-900/20 border border-white/10 group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-${testimonial.color}-500/20 to-${testimonial.color}-600/5 border border-white/5`}>
                                        <span className={`text-lg font-bold text-${testimonial.color}-400`}>
                                            {testimonial.avatar}
                                        </span>
                                    </div>
                                    <div className="flex gap-1 bg-zinc-900/50 rounded-full px-3 py-1 border border-white/5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i key={star} className="fa-solid fa-star text-amber-400 text-[10px]" />
                                        ))}
                                    </div>
                                </div>

                                <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="text-white font-semibold">{testimonial.author}</div>
                                            <i className="fa-solid fa-circle-check text-blue-500 text-xs" title="Verified Customer" />
                                        </div>
                                        <div className="text-zinc-500 text-sm">{testimonial.role}, {testimonial.company}</div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                                        <i className="fa-solid fa-quote-right text-zinc-700 text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Company Logos */}
                <div className="border-t border-white/10 pt-16">
                    <p className="text-center text-sm font-medium text-zinc-500 mb-10 uppercase tracking-widest">Trusted by industry leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        {['Acme Corp', 'TechServ', 'ProFix', 'CleanCo', 'FastRepair', 'ServicePro'].map((company) => (
                            <div key={company} className="text-xl md:text-2xl font-bold text-white tracking-tight cursor-default">
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
