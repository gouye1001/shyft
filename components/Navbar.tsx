import React, { useState, useEffect, memo } from 'react';
import { Page } from '../App';
import Logo from './Logo';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const navLinks = [
    { label: 'Product', page: 'features' as Page },
    { label: 'Solutions', page: 'about' as Page },
    { label: 'Pricing', page: 'pricing' as Page },
    { label: 'Enterprise', page: 'contact' as Page },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-5 px-4 md:px-6">
        <div className="flex justify-center">
          {/* Floating Island - uses data-scrolled attribute for CSS transitions */}
          <nav
            className="floating-island"
            data-scrolled={isScrolled ? "true" : "false"}
          >
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 shrink-0 group"
            >
              <Logo size="sm" className="group-hover:scale-110 transition-transform" />
              <span className="font-bold tracking-tight text-white text-sm md:text-base">
                Shyft
              </span>
            </button>

            {/* Desktop Navigation - centered when not scrolled */}
            <div className={`
              hidden md:flex items-center gap-0.5
              ${isScrolled ? '' : 'absolute left-1/2 -translate-x-1/2'}
            `}>
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`
                    nav-item rounded-full font-medium transition-colors duration-200
                    ${currentPage === link.page
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
                className="nav-item text-zinc-400 hover:text-white font-medium transition-all border border-transparent hover:border-white/10 rounded-full whitespace-nowrap"
              >
                Log in
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="nav-cta bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-colors whitespace-nowrap"
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
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-opacity duration-300
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`
          relative z-10 flex flex-col items-center justify-center h-full gap-6 px-6
          transition-all duration-400
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
        `}>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>

          {navLinks.map((link, i) => (
            <button
              key={link.page}
              onClick={() => { setIsMobileMenuOpen(false); onNavigate(link.page); }}
              className={`
                text-2xl font-medium transition-all duration-300
                ${currentPage === link.page ? 'text-white' : 'text-zinc-500 hover:text-white'}
              `}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}

          <div className="w-16 h-px bg-white/10 my-4" />

          <button
            onClick={() => { setIsMobileMenuOpen(false); onNavigate('login'); }}
            className="text-lg text-zinc-400 hover:text-white transition-colors"
          >
            Log in
          </button>
          <button
            onClick={() => { setIsMobileMenuOpen(false); onNavigate('signup'); }}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);