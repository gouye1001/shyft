import React, { useState, useEffect } from 'react';
import { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const navLinks = [
    { label: 'Features', page: 'features' as Page },
    { label: 'Pricing', page: 'pricing' as Page },
    { label: 'About', page: 'about' as Page },
    { label: 'Contact', page: 'contact' as Page },
  ];

  const isActive = (page: Page) => currentPage === page;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 md:pt-5">
        {/* Full-width background container */}
        <div className="max-w-7xl mx-auto">
          <div
            className={`
              relative flex items-center justify-between
              transition-all duration-500 ease-out
              ${isScrolled
                ? 'bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-6 py-2.5 shadow-2xl shadow-black/50'
                : 'bg-transparent px-2 py-3'
              }
            `}
          >
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">S</span>
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-bold tracking-tight text-white text-lg">
                Shyft
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive(link.page)
                      ? 'text-white bg-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className={`
                  text-sm font-semibold rounded-full transition-all duration-300
                  ${isScrolled
                    ? 'bg-white text-black px-4 py-2 hover:bg-zinc-200'
                    : 'bg-white text-black px-5 py-2.5 hover:bg-zinc-200 shadow-lg shadow-white/10'
                  }
                `}
              >
                Start Free
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-300
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={`
          relative z-10 flex flex-col items-center justify-center h-full gap-6 px-6
          transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-8'}
        `}>
          {/* Close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>

          {navLinks.map((link, i) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`
                text-2xl font-medium transition-all duration-300
                ${isActive(link.page) ? 'text-white' : 'text-zinc-500 hover:text-white'}
              `}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}

          <div className="w-16 h-px bg-white/10 my-4" />

          <button
            onClick={() => onNavigate('login')}
            className="text-lg text-zinc-400 hover:text-white transition-colors"
          >
            Log in
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;