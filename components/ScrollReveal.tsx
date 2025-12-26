import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: '0' | '100' | '200' | '300';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '', delay = '0' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const delayClass = delay === '100' ? 'delay-100' : delay === '200' ? 'delay-200' : delay === '300' ? 'delay-300' : '';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      } ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;