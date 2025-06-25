
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

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: LucideIcon | ((props: LucideProps) => JSX.Element);
  level?: string;
}

const ReactLogo = (props: LucideProps) => React.createElement(CpuIcon, props);
const NextLogo = (props: LucideProps) => React.createElement(ZapIcon, props);
const TailwindLogo = (props: LucideProps) => React.createElement(WindIcon, props);


export const skillsData: SkillCategory[] = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'HTML5 & CSS3', icon: Code2Icon, level: 'Expert' },
      { name: 'JavaScript (ES6+)', icon: Code2Icon, level: 'Expert' },
      { name: 'TypeScript', icon: Code2Icon, level: 'Expert' },
      { name: 'ReactJS', icon: ReactLogo, level: 'Expert' },
      { name: 'NextJS', icon: NextLogo, level: 'Expert' },
      { name: 'Tailwind CSS', icon: TailwindLogo, level: 'Expert' },
      { name: 'Material UI', icon: PaletteIcon, level: 'Intermediate' },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: ServerCogIcon, level: 'Expert' },
      { name: 'Express.js', icon: RouteIcon, level: 'Expert' },
      { name: 'ASP.NET 8 MVC', icon: ServerCogIcon, level: 'Intermediate' },
    ],
  },
  {
    name: 'Databases & BaaS',
    skills: [
      { name: 'MongoDB', icon: DatabaseIcon, level: 'Expert' },
      { name: 'PostgreSQL', icon: DatabaseIcon, level: 'Expert' },
      { name: 'MySQL', icon: DatabaseIcon, level: 'Expert' },
      { name: 'Microsoft SQL', icon: DatabaseIcon, level: 'Intermediate' },
      { name: 'Supabase', icon: ShieldCheckIcon, level: 'Intermediate' },
      { name: 'Firebase', icon: ZapIcon, level: 'Intermediate' },
      { name: 'Redis', icon: DatabaseIcon, level: 'Basic' },
    ],
  },
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Python', icon: Code2Icon, level: 'Basic' },
      { name: 'C#', icon: Code2Icon, level: 'Intermediate' },
      { name: 'PHP', icon: Code2Icon, level: 'Basic' },
    ],
  },
  {
    name: 'Tools & Platforms',
    skills: [
      { name: 'Git & GitHub', icon: GitForkIcon, level: 'Expert' },
      { name: 'Docker', icon: ContainerIcon, level: 'Intermediate' },
      { name: 'AWS (EC2, S3)', icon: CloudIcon, level: 'Intermediate' },
      { name: 'WordPress', icon: GlobeIcon, level: 'Intermediate' },
      { name: 'C-Panel', icon: Settings2Icon, level: 'Intermediate' },
      { name: 'Google OAuth', icon: ShieldCheckIcon, level: 'Intermediate' },
    ],
  },
];

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
