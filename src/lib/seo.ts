import type { Metadata } from 'next';
import type { PersonalInfo, Post } from './supabase-types';

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:9002';
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

const DEFAULT_OG_IMAGE = '/me.png';

export function buildPortfolioMetadata(info: PersonalInfo): Metadata {
  const title = `${info.name} | ${info.title}`;
  const description =
    info.bio ||
    `${info.name} — ${info.title}. Portfolio showcasing projects, experience, and writing.`;

  return {
    title: {
      default: title,
      template: `%s | ${info.name}`,
    },
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      siteName: info.name,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${info.name} — ${info.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildBlogPostMetadata(post: Post, info: PersonalInfo): Metadata {
  const title = post.title;
  const description = post.snippet || `${post.title} by ${info.name}`;
  const path = `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'article',
      url: path,
      siteName: info.name,
      title,
      description,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [info.name],
      tags: post.tags ?? undefined,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function buildPersonJsonLd(info: PersonalInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: info.name,
    jobTitle: info.title,
    description: info.bio,
    email: info.contact_email,
    url: getSiteUrl(),
    image: absoluteUrl('/me.png'),
    address: info.location
      ? {
          '@type': 'PostalAddress',
          addressLocality: info.location,
        }
      : undefined,
    sameAs: [info.github_url, info.linkedin_url].filter(Boolean),
  };
}

export function buildWebSiteJsonLd(info: PersonalInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${info.name} Portfolio`,
    url: getSiteUrl(),
    description: info.bio,
    author: {
      '@type': 'Person',
      name: info.name,
    },
  };
}

export function buildBlogPostingJsonLd(post: Post, info: PersonalInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.snippet,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: {
      '@type': 'Person',
      name: info.name,
      url: getSiteUrl(),
    },
    publisher: {
      '@type': 'Person',
      name: info.name,
      image: absoluteUrl('/me.png'),
    },
    keywords: post.tags?.join(', '),
  };
}
