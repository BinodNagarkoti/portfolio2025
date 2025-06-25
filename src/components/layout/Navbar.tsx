
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navStyle, setNavStyle] = useState<'top' | 'middle' | 'bottom'>('top');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const isBottom = scrollY + winHeight >= docHeight - 50; // 50px threshold from bottom
      
      if (scrollY < 50) {
        setNavStyle('top');
      } else if (isBottom) {
        setNavStyle('bottom');
      } else {
        setNavStyle('middle');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getNavClasses = () => {
    switch (navStyle) {
      case 'top':
        return 'max-w-lg px-6 h-16'; // Largest state
      case 'middle':
        return 'max-w-md px-4 h-14'; // Intermediate state
      case 'bottom':
        return 'max-w-sm px-3 h-12'; // Smallest state
      default:
        return 'max-w-lg px-6 h-16';
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={cn(
          'hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-40 items-center justify-between rounded-full bg-background/50 backdrop-blur-xl border border-border/20 shadow-lg transition-all duration-500 ease-in-out',
          getNavClasses()
        )}
      >
        <Link
          href="#home"
          className="relative h-9 w-9 flex items-center justify-center text-center overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(var(--accent-rgb),0.5)] ring-1 ring-border/50 bg-gradient-to-br from-primary/10 to-accent/10 hover:rotate-12"
        >
          <span className="font-bold text-sm text-foreground">BN</span>
        </Link>
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className="text-sm font-medium transition-colors duration-300 text-foreground"
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full transition-all duration-300 hover:scale-110"
        >
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
            className="lucide lucide-sun h-5 w-5"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        </Button>
      </nav>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[85%] bg-background/50 backdrop-blur-xl border border-border/20 rounded-full shadow-lg transition-all duration-700 ease-out">
        <div className="container mx-auto px-4 h-12">
          <div className="flex items-center justify-around h-full">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className="flex flex-col items-center justify-center gap-0.5 text-sm transition-all duration-300 text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
