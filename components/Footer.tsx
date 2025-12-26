import React, { useState } from 'react';
import { Page } from '../App';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setEmail('');
                setIsSubscribed(false);
            }, 3000);
        }
    };

    const footerLinks = {
        Product: [
            { label: 'Features', page: 'features' as Page },
            { label: 'Pricing', page: 'pricing' as Page },
            { label: 'Dashboard Demo', page: 'dashboard' as Page },
            { label: 'API Docs', external: true },
        ],
        Company: [
            { label: 'About', page: 'about' as Page },
            { label: 'Careers', external: true },
            { label: 'Blog', external: true },
            { label: 'Press', external: true },
        ],
        Resources: [
            { label: 'Help Center', external: true },
            { label: 'Contact', page: 'contact' as Page },
            { label: 'Community', external: true },
            { label: 'Status', external: true },
        ],
        Legal: [
            { label: 'Privacy', page: 'privacy' as Page },
            { label: 'Terms', page: 'terms' as Page },
            { label: 'Security', external: true },
            { label: 'Cookies', external: true },
        ],
    };

    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
            {/* Subtle gradient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Top Section: Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-16 border-b border-white/10">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Stay in the loop</h3>
                        <p className="text-zinc-500">Get product updates and industry insights delivered to your inbox.</p>
                    </div>
                    <form onSubmit={handleSubscribe} className="flex gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                            {isSubscribed && (
                                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                                    <span className="text-emerald-400 text-sm font-medium">
                                        <i className="fa-solid fa-check mr-2" />
                                        Subscribed!
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors shrink-0"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Main Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 py-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div
                            className="flex items-center gap-2.5 cursor-pointer group mb-6"
                            onClick={() => onNavigate('home')}
                        >
                            <div className="w-9 h-9 rounded-xl bg-brand-surface border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg viewBox="0 0 32 32" fill="none" className="w-[60%] h-[60%]">
                                    <path d="M8 7L16 13L8 19" stroke="#5B5BD6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24 13L16 19L24 25" stroke="#5B5BD6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg text-white">Shyft</span>
                        </div>
                        <p className="text-sm text-zinc-500 mb-6">
                            The modern platform for field service management.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: 'fa-twitter', label: 'Twitter' },
                                { icon: 'fa-linkedin-in', label: 'LinkedIn' },
                                { icon: 'fa-github', label: 'GitHub' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                    aria-label={social.label}
                                >
                                    <i className={`fa-brands ${social.icon}`} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Sections */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-white mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        {link.external ? (
                                            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                                                {link.label}
                                                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-50" />
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() => link.page && onNavigate(link.page)}
                                                className="text-sm text-zinc-400 hover:text-white transition-colors"
                                            >
                                                {link.label}
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-600">
                        © {new Date().getFullYear()} Shyft Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-xs">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-zinc-500">All systems operational</span>
                        </div>
                        <select className="bg-transparent text-xs text-zinc-500 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                        </select>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;