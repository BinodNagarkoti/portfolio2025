import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Squares from '@/components/reactbits/Backgrounds/Squares/Squares';
import JsonLd from '@/components/seo/JsonLd';
import { getPersonalInfo } from '@/lib/actions';
import { staticPersonalInfo } from '@/lib/data';
import {
  buildPersonJsonLd,
  buildPortfolioMetadata,
  buildWebSiteJsonLd,
} from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const personalInfo = await getPersonalInfo();
  const info = personalInfo ?? staticPersonalInfo;
  return buildPortfolioMetadata(info);
}

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personalInfo = await getPersonalInfo();
  const info = personalInfo ?? staticPersonalInfo;

  return (
    <div className="font-body antialiased relative">
      <JsonLd data={[buildPersonJsonLd(info), buildWebSiteJsonLd(info)]} />
      <Squares className="absolute inset-0 -z-10 size-full" speed={0.1} squareSize={30} borderColor='hsl(var(--border) / 0.1)' hoverFillColor='hsl(var(--accent) / 0.05)' />
      <Navbar personalInfo={info} />
      <main>{children}</main>
      <Footer personalInfo={info} />
    </div>
  );
}
