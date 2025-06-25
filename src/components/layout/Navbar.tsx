
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
  const [navStyle, setNavStyle] = useState<'stage1' | 'stage2' | 'stage3' | 'stage4' | 'stage5'>('stage1');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollableHeight = docHeight - winHeight;

      // Stage 1: At the very top
      if (scrollY < 50) {
        setNavStyle('stage1');
        return;
      }
      
      // Stage 5: At the very bottom
      if (scrollY + winHeight >= docHeight - 50) {
        setNavStyle('stage5');
        return;
      }
      
      // Stages 2-5: Based on scroll percentage
      const scrollPercentage = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;

      if (scrollPercentage < 0.25) {
        setNavStyle('stage2');
      } else if (scrollPercentage < 0.5) {
        setNavStyle('stage3');
      } else if (scrollPercentage < 0.75) {
        setNavStyle('stage4');
      } else {
        setNavStyle('stage5');
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
      case 'stage1':
        return 'max-w-xl px-6 h-16'; // Largest
      case 'stage2':
        return 'max-w-lg px-5 h-[3.75rem]'; // Large
      case 'stage3':
        return 'max-w-md px-4 h-14'; // Medium
      case 'stage4':
        return 'max-w-sm px-3 h-[3.25rem]'; // Small
      case 'stage5':
        return 'max-w-xs px-2 h-12'; // Smallest
      default:
        return 'max-w-xl px-6 h-16';
    }
  };

  const getContentClasses = () => {
    switch (navStyle) {
      case 'stage1': // Largest
        return {
          logo: 'h-9 w-9 text-sm',
          navButton: 'text-sm px-3 py-2 h-9',
          iconButton: 'h-9 w-9',
          navWrapper: 'space-x-1',
        };
      case 'stage2':
        return {
          logo: 'h-[34px] w-[34px] text-sm',
          navButton: 'text-sm px-2.5 py-1.5 h-8',
          iconButton: 'h-[34px] w-[34px]',
          navWrapper: 'space-x-1',
        };
      case 'stage3':
        return {
          logo: 'h-8 w-8 text-xs',
          navButton: 'text-xs px-2 py-1 h-[30px]',
          iconButton: 'h-8 w-8',
          navWrapper: 'space-x-0.5',
        };
      case 'stage4':
        return {
          logo: 'h-[30px] w-[30px] text-xs',
          navButton: 'text-xs px-1.5 py-1 h-7',
          iconButton: 'h-[30px] w-[30px]',
          navWrapper: 'space-x-0.5',
        };
      case 'stage5': // Smallest
        return {
          logo: 'h-7 w-7 text-[10px]',
          navButton: 'text-[10px] px-1.5 py-0.5 h-6',
          iconButton: 'h-7 w-7',
          navWrapper: 'space-x-0',
        };
      default:
        return {
          logo: 'h-9 w-9 text-sm',
          navButton: 'text-sm px-3 py-2 h-9',
          iconButton: 'h-9 w-9',
          navWrapper: 'space-x-1',
        };
    }
  };

  const contentClasses = getContentClasses();

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
          className={cn(
            "relative flex items-center justify-center text-center overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(var(--accent-rgb),0.5)] ring-1 ring-border/50 bg-gradient-to-br from-primary/10 to-accent/10 hover:rotate-12",
            contentClasses.logo
            )}
        >
          <span className="font-bold text-foreground">BN</span>
        </Link>
        <div className={cn("flex items-center", contentClasses.navWrapper)}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className={cn(
                "font-medium transition-all duration-300 text-foreground",
                contentClasses.navButton
                )}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full transition-all duration-300 hover:scale-110",
            contentClasses.iconButton
            )}
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
