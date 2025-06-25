
'use client'; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, DownloadIcon } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import dynamic from 'next/dynamic';
import { Card } from '../ui/card';
import Image from 'next/image';
import BlurText from "@/components/reactbits/TextAnimations/BlurText/BlurText";
import Squares from "@/components/reactbits/Backgrounds/Squares/Squares";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/10 to-primary/10 py-20 pt-32 md:pt-20">
      <Squares className="absolute inset-0 z-0 size-full" speed={0.5} squareSize={40} direction='diagonal' borderColor='#999' hoverFillColor='#222' />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-fade-in-up">
          <BlurText component={'span'} text='Hello, I&apos;m' className="text-lg font-semibold uppercase tracking-wider font-headline text-primary" />
            <BlurText component='h1' text={personalInfo.name} className="mt-2 text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-foreground" />
            <p className="mt-4 text-xl md:text-2xl text-foreground">
              A passionate <span className="text-primary font-semibold">{personalInfo.title}</span> specializing in creating modern and performant web applications.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform transition-transform hover:scale-105">
                <Link href="#contact">
                  Get In Touch <ArrowDownIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {personalInfo.cvLink && (
                 <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10 shadow-lg transform transition-transform hover:scale-105">
                  <Link href={personalInfo.cvLink} target="_blank" download>
                    Download CV <DownloadIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
             <div className="relative w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
                {/* Orbiting Line */}
                <div className="absolute w-full h-full rounded-full border-2 border-white/50 animate-spin-slow" />
                
                {/* Blue Blob Shape */}
                <div className="absolute w-5/6 h-5/6 bg-primary/80 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-blob" />

                {/* Profile Image with its own glow */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse" />
                  <Image
                    src="/me.png"
                    alt={personalInfo.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    data-ai-hint="profile picture"
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
