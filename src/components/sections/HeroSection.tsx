
'use client'; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '../ui/badge';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center py-20 pt-24 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <Badge variant="outline" className="mb-4">Full Stack Developer</Badge>
            <h1 className="mt-2 text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-foreground tracking-tighter">
              {personalInfo.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A passionate developer specializing in creating modern and performant web applications with a focus on user experience and clean code.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link href="#contact">
                  Contact Me <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
               <Button variant="outline" size="lg" asChild>
                  <Link href="#projects">
                    View My Work
                  </Link>
                </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
                <div className="relative w-full h-full p-4 rounded-lg shadow-2xl bg-card">
                     <Image
                        src="https://placehold.co/600x400.png"
                        alt="Jimmy - Developer Illustration"
                        fill
                        className="object-cover rounded-md"
                        data-ai-hint="developer illustration"
                        priority
                      />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
