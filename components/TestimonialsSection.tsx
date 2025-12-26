import React, { useState, useEffect, useRef } from 'react';
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isPaused) return;

        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused]);

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
    };

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <i className="fa-solid fa-star text-amber-400 text-sm" />
                            <span className="text-sm text-zinc-300">Loved by 15,000+ teams</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            What our customers say
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Testimonial Card */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className="max-w-3xl mx-auto text-center">
                                        {/* Quote */}
                                        <blockquote className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-10">
                                            "{testimonial.quote}"
                                        </blockquote>

                                        {/* Author */}
                                        <div className="flex items-center justify-center gap-4">
                                            <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center
                        bg-gradient-to-br from-${testimonial.color}-500/30 to-${testimonial.color}-600/10
                        border border-white/10
                      `}>
                                                <span className={`text-lg font-bold text-${testimonial.color}-400`}>
                                                    {testimonial.avatar}
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-white font-semibold">{testimonial.author}</div>
                                                <div className="text-zinc-500 text-sm">{testimonial.role}, {testimonial.company}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`
                  transition-all duration-300 rounded-full
                  ${index === activeIndex
                                        ? 'w-8 h-2 bg-white'
                                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                    }
                `}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Arrow Buttons */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all hidden md:block"
                        aria-label="Previous testimonial"
                    >
                        <i className="fa-solid fa-chevron-left" />
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all hidden md:block"
                        aria-label="Next testimonial"
                    >
                        <i className="fa-solid fa-chevron-right" />
                    </button>
                </div>

                {/* Company Logos */}
                <div className="mt-20 pt-12 border-t border-white/10">
                    <p className="text-center text-sm text-zinc-500 mb-8">Trusted by leading service companies</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
                        {['Acme Corp', 'TechServ', 'ProFix', 'CleanCo', 'FastRepair', 'ServicePro'].map((company) => (
                            <div key={company} className="text-lg md:text-xl font-bold text-white tracking-wide">
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
