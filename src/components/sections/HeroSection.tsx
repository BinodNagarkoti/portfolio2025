
'use client'; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, CodeIcon } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '../ui/badge';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center py-20 pt-24 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-foreground tracking-tighter">
              {personalInfo.name}
            </h1>
            <p className="mt-2 text-xl font-medium text-muted-foreground">
              {personalInfo.title}
            </p>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground/80 mx-auto md:mx-0">
              A passionate developer specializing in creating modern and performant web applications with a focus on user experience and clean code.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link href="#contact">
                  Contact Me
                </Link>
              </Button>
               <Button variant="outline" size="lg" asChild>
                  <Link href={personalInfo.cvLink} target="_blank">
                    Download CV
                  </Link>
                </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] group">
              <div className="absolute inset-0 bg-card rounded-lg shadow-lg p-2">
                 <Image
                    src="https://placehold.co/600x400.png"
                    alt="Developer illustration"
                    fill
                    className="object-cover rounded-md"
                    data-ai-hint="developer illustration"
                    priority
                  />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                <CodeIcon className="w-6 h-6"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
