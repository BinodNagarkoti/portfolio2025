import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Binodfolio Admin',
  description: 'Admin panel for Binodfolio.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminRouteGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
