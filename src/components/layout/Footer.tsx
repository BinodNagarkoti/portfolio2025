import Link from 'next/link';
import type { PersonalInfo } from '@/lib/supabase-types';

type FooterProps = {
  personalInfo: PersonalInfo;
};

const Footer = ({ personalInfo }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-muted-foreground py-6 border-t border-border/20 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.github_url && (
            <Link href={personalInfo.github_url} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          )}
          {personalInfo.linkedin_url && (
            <Link href={personalInfo.linkedin_url} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          )}
          {personalInfo.cv_url && (
            <Link href={personalInfo.cv_url} target="_blank" rel="noopener noreferrer">
              CV
            </Link>
          )}
        </nav>
        <p className="text-xs">
          &copy; {currentYear} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
