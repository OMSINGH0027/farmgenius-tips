
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './LanguageSelector';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full',
        'transition-all duration-500',
        'glass-nav border-b premium-border',
        scrolled ? 'py-2' : 'py-4'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M21 12a9 9 0 0 0-9-9" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">FarmGenius</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavItem href="#" active>Dashboard</NavItem>
            <NavItem href="#weather">Weather</NavItem>
            <NavItem href="#soil">Soil Analysis</NavItem>
            <NavItem href="#crops">Recommendations</NavItem>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, children, active }) => {
  return (
    <a
      href={href}
      className={cn(
        'text-sm relative px-1 py-2 transition-colors duration-200',
        active ? 'text-primary font-medium' : 'text-foreground/80 hover:text-foreground'
      )}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
      )}
    </a>
  );
};
