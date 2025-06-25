
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
  return (<>
    

    {/* Desktop Nav */}
    <nav className="hidden md:flex space-x-1 fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block rounded-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/30 shadow-lg">
      <div className='container mx-auto px-6 h-16 flex items-center justify-between'>
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            <div className="text-center overflow-hidden h-9 w-9 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(255,255,255,0.5)] ring-2 ring-gray-300/60 bg-gradient-to-br from-white/10 to-yellow-100/10 hover:rotate-12">
              {/* <CodeXmlIcon className="h-8 w-8 text-accent" /> */}
              <span className="hidden sm:inline">BN</span>
              {/* <img src="./avatar.png" alt="logo" width="36" height="36" loading="eager" className="ease-in-out scale-100 blur-0 grayscale-0 h-9 w-9 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(255,255,255,0.5)] ring-2 ring-gray-300/60 bg-gradient-to-br from-white/10 to-yellow-100/10 hover:rotate-12"/> */}
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>

          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className="text-sm font-medium transition-all duration-300 relative group text-zinc-900 dark:text-zinc-100 dark:drop-shadow-[0_0_8px_#e5e7eb]">
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 w-9 rounded-full hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sun h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
        </button>
      </div>
    </nav>

    {/* Mobile Nav */}
    <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[85%] bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/30 rounded-full shadow-lg transition-all duration-700 ease-out">
      <div className='container mx-auto px-4 h-12'>
        <div className='flex items-center justify-around h-full'>
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className="flex flex-col items-center justify-center gap-0.5 text-sm transition-all duration-300 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
      </div>
      {/* <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
          </Sheet> */}
    </nav>
    {/* </div> */}
    {/* </header> */}
  </>
  );
};

export default Navbar;
