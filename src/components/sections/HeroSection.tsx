import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedShape from '@/components/common/AnimatedShape';
import { ArrowDownIcon, DownloadIcon } from 'lucide-react';
import { personalInfo, projectsData } from '@/lib/data';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted/30 py-20 pt-32 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-fade-in-up">
            <span className="text-lg font-semibold text-primary uppercase tracking-wider font-headline">
              Hello, I&apos;m
            </span>
            <h1 className="mt-2 text-5xl md:text-6xl lg:text-7xl font-bold text-foreground font-headline">
              {personalInfo.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground">
              A passionate <span className="text-primary">{personalInfo.title}</span> specializing in creating modern and performant web applications.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform transition-transform hover:scale-105">
                <Link href="#contact">
                  Get In Touch <ArrowDownIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {personalInfo.cvLink && (
                 <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:text-black hover:bg-primary/10 shadow-lg transform transition-transform hover:scale-105">
                  <Link href={personalInfo.cvLink} target="_blank" download>
                    Download CV <DownloadIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <AnimatedShape projectLogos={projectsData.map(project => project.imageUrl)} />
          </div>
        </div>
      </div>
      {/* Subtle background pattern or shapes */}
      <div className="absolute inset-0 opacity-5 overflow-hidden z-0">
        {/* Example: SVG pattern or positioned shapes */}
      </div>
    </section>
  );
};

export default HeroSection;
