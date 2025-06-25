
import * as React from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  Code2Icon,
  DatabaseIcon,
  ServerCogIcon,
  CloudIcon,
  ContainerIcon,
  GitForkIcon,
  WindIcon,
  ZapIcon,
  CpuIcon,
  PaletteIcon,
  GlobeIcon,
  ShoppingBagIcon,
  MessageSquareIcon,
  BrainIcon,
  ShieldCheckIcon,
  Settings2Icon,
  BriefcaseIcon,
  UsersIcon,
  RouteIcon,
  FilmIcon,
  BotIcon,
  CalculatorIcon
} from 'lucide-react';
import type { PersonalInfo } from './supabase-types';

export const blogPosts = [
    {
        id: 'blog-1',
        title: 'The Beauty of AI',
        date: '2024-07-20',
        snippet: 'Exploring the fascinating and sometimes surprising world of artificial intelligence and its creative potential.',
        tags: ['AI', 'Tech', 'Opinion'],
        link: '#'
    },
    {
        id: 'blog-2',
        title: 'Universal Design Notes',
        date: '2024-07-15',
        snippet: 'A deep dive into the principles of universal design and how to apply them to create more accessible web applications.',
        tags: ['Design', 'Accessibility', 'Web Dev'],
        link: '#'
    },
    {
        id: 'blog-3',
        title: 'Sugar, Jodo, and Zod',
        date: '2024-07-10',
        snippet: 'A technical comparison of three popular data validation libraries in the JavaScript ecosystem.',
        tags: ['JavaScript', 'TypeScript', 'Tooling'],
        link: '#'
    },
];

// Fallback static data that conforms to the PersonalInfo type from Supabase
export const staticPersonalInfo: PersonalInfo = {
  id: 'static-id',
  name: 'Binod Nagarkoti',
  title: 'Frontend & Full Stack Developer',
  contact_email: 'binod1365@gmail.com',
  phone: '+9779803135946',
  location: 'Kathmandu, Nepal',
  github_url: 'https://github.com/BinodNagarkoti',
  linkedin_url: 'https://linkedin.com/in/binod-nagarkoti-496245128?utm_source=share&utm_campaign=share_via&utm_medium=android_app',
  cv_url: '/binod_nagarkoti.pdf',
  subtitle: 'Passionate about building modern web experiences.',
  bio: 'A passionate developer specializing in creating modern and performant web applications with a focus on user experience and clean code.',
  position: 'Full Stack Developer',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
