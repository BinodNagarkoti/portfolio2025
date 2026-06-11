import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/admin/', '/api/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
