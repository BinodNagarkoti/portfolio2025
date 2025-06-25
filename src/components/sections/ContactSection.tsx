'use client';

import SectionWrapper from '@/components/common/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import type { PersonalInfo } from '@/lib/supabase-types';

const friendlyLinks = [
    {name: 'Firebase', href: '#'},
    {name: 'Next.js', href: '#'},
    {name: 'Tailwind CSS', href: '#'},
    {name: 'Shadcn UI', href: '#'},
]

const ContactSection = ({ personalInfo }: { personalInfo: PersonalInfo }) => {

  return (
    <SectionWrapper id="contact" title="Contact" subtitle="">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Let's start collaborating</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className="text-muted-foreground">
              I&apos;m currently available for freelance projects or full-time opportunities. If you have a project in mind, or just want to say hi, feel free to reach out. Let&apos;s build something amazing together!
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={personalInfo.github_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GithubIcon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={personalInfo.linkedin_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`mailto:${personalInfo.contact_email}`} aria-label="Email">
                  <MailIcon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
            <CardTitle>Friendly Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {friendlyLinks.map(link => (
                <Link key={link.name} href={link.href} className="flex items-center p-2 -m-2 rounded-md hover:bg-secondary">
                    <span className="font-medium text-sm text-foreground">{link.name}</span>
                </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
