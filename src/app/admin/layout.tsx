import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Binodfolio Admin',
  description: 'Admin panel for Binodfolio.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is nested within the root layout, so it should not contain <html> or <body> tags.
  // It simply passes its children through to the next level.
  return <>{children}</>;
}
