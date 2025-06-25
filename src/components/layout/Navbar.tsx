
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXmlIcon, MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { personalInfo } from '@/lib/data';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center border-b border-border/40 pb-4">
        <Link href="#home" className="flex items-center gap-2 text-2xl font-bold text-primary font-headline">
          <CodeXmlIcon className="h-8 w-8 text-accent" />
          <span className="hidden sm:inline">{personalInfo.name}</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className="text-muted-foreground hover:text-primary">
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full py-6">
                 <Link href="#home" className="flex items-center gap-2 text-2xl font-bold text-primary font-headline mb-8">
                    <CodeXmlIcon className="h-8 w-8 text-accent" />
                    <span>{personalInfo.name}</span>
                 </Link>
                <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    asChild
                    className="w-full justify-start text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
              </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
