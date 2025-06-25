
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon, CodeXmlIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { personalInfo } from '@/lib/data';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Personal', href: '#personal-projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isExpanded = isScrolled || isOpen;

  return (
    // This outer header acts as a positioning container
    <header className="fixed top-2 left-0 right-0 z-50 flex justify-center px-4 md:top-4">
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          'flex items-center',
          // When expanded (scrolled or mobile menu open), apply glassmorphism
          isExpanded
            ? 'w-full max-w-3xl rounded-2xl border border-white/10 bg-background/50 p-2 shadow-lg backdrop-blur-lg'
            : 'max-w-fit rounded-full bg-transparent p-1', // Compact and transparent initially
          // Handle mobile menu layout
          isOpen ? 'h-fit flex-col' : 'h-16'
        )}
      >
        <div className="flex w-full items-center justify-between px-3">
          <Link href="#home" className="flex shrink-0 items-center gap-2 text-2xl font-bold text-primary font-headline">
            <CodeXmlIcon className="h-8 w-8" />
            <span className={cn(
              'transition-all duration-300',
              isExpanded ? 'inline' : 'hidden md:inline'
            )}>
              {personalInfo.name.split(' ')[0]}<span className="text-accent">.</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="text-foreground hover:text-accent hover:bg-accent/10">
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <XIcon className="h-6 w-6 text-primary" /> : <MenuIcon className="h-6 w-6 text-primary" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 w-full md:hidden">
            <nav className="flex flex-col items-center space-y-2 pt-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className="w-full text-foreground hover:text-primary hover:bg-primary/10 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
