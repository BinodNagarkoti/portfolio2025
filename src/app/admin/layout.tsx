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
  return (
    <html lang="en">
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
