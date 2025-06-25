import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Squares from '@/components/reactbits/Backgrounds/Squares/Squares';

export const metadata: Metadata = {
  title: 'Binodfolio | Binod Nagarkoti - Full Stack Developer',
  description: 'Portfolio of Binod Nagarkoti, a passionate Full Stack Developer specializing in JavaScript MERN stack, NextJS, and cloud technologies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased relative">
        <Squares className="absolute inset-0 -z-10 size-full" speed={0.2} squareSize={30} borderColor='hsl(var(--border) / 0.5)' hoverFillColor='hsl(var(--accent) / 0.1)' />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
