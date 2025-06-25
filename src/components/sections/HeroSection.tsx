
'use client'; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, DownloadIcon } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Image from 'next/image';
import BlurText from "@/components/reactbits/TextAnimations/BlurText/BlurText";
import Squares from "@/components/reactbits/Backgrounds/Squares/Squares";
import PixelTransition from "@/components/reactbits/Animation/PixelTransition/PixelTransition";

const HeroSection = () => {
  return (
    <section id="home" className=" min-h-screen flex items-center justify-center overflow-hidden bg-background py-20 pt-32 md:pt-20">
      {/* <Squares className="absolute inset-0 z-0 size-full" speed={0.5} squareSize={40} direction='diagonal' borderColor='hsl(var(--border))' hoverFillColor='hsl(var(--accent))' /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-fade-in-up">
          <BlurText component={'span'} text='Hello, I&apos;m' className="hover:text-accent/80 transition-colors text-lg font-semibold uppercase tracking-wider font-headline text-primary" />
            <BlurText component='h1' text={personalInfo.name} className="hover:text-accent/80 transition-colors mt-2 text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-foreground" />
            <p className="mt-4 text-xl md:text-2xl text-muted">
              A passionate <span className="text-primary font-semibold">{personalInfo.title}</span> specializing in creating modern and performant web applications.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-primary hover:bg-accent hover:text-accent-foreground text-primary-foreground shadow-lg transform transition-transform hover:scale-105">
                <Link href="#contact">
                  Get In Touch <ArrowDownIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {personalInfo.cvLink && (
                 <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-accent hover:text-accent-foreground shadow-lg transform transition-transform hover:scale-105">
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
              <div className="absolute w-full h-full rounded-full border-2 border-primary/20 animate-spin-slow" />
              <div className="relative w-5/6 h-5/6 overflow-hidden rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-blob">
              <PixelTransition
              firstContent={
                <div className="relative w-full h-full">
                // {/* Image container that is also the blob, with image masked inside */}
                <Image
                    src="/me.png"
                    alt={personalInfo.name}
                    fill
                    className="object-cover w-full h-full grayscale"
                    data-ai-hint="profile picture"
                    priority
                    />
                    {/* Inner shadow overlay to blend edges */}
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_20px_hsl(var(--background))]"></div>
                  </div>
                  }
                secondContent={
                  <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#111"
                  }}
                  >
                  <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Hire Me!</p>
                  </div>
                }
                pixelColor='#ffffff'
                animationStepDuration={0.4}
                className="custom-pixel-card"
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
