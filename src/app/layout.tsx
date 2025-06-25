import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Squares from '@/components/reactbits/Backgrounds/Squares/Squares';
import { getPersonalInfo } from '@/lib/actions';
import { staticPersonalInfo } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const personalInfo = await getPersonalInfo();
  const info = personalInfo ?? staticPersonalInfo;
  
  const title = `${info.name} | ${info.title}`;
  const description = info.bio || `Portfolio of ${info.name}, a passionate Full Stack Developer.`;

  return {
    title,
    description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personalInfo = await getPersonalInfo();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased relative ">
        <Squares className="absolute inset-0 -z-10 size-full" speed={0.1} squareSize={30} borderColor='hsl(var(--border) / 0.1)' hoverFillColor='hsl(var(--accent) / 0.05)' />
        <Navbar personalInfo={personalInfo ?? staticPersonalInfo} />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
