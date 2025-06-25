
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

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  imageHint: string;
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  cardStyle?: 'light' | 'dark';
}

export const projectsData: Project[] = [
  {
    id: 'jimmy-blog',
    title: 'Jimmy/blog',
    description: 'A personal blog platform.',
    technologies: ['ReactJS', 'REST API', 'JavaScript'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'blog layout',
    tags: ['web', 'frontend', 'dev'],
    cardStyle: 'light',
  },
  {
    id: 'go-todo',
    title: 'GO TODO',
    description: 'A to-do list application built with Go.',
    technologies: ['Go', 'CLI', 'Backend'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'code snippet',
    tags: ['backend', 'go', 'tool'],
    cardStyle: 'dark',
  },
  {
    id: 'browse-base',
    title: 'BrowseBase',
    description: 'A browser-based database interface.',
    technologies: ['NextJS', 'ReactJS', 'NodeJS'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'dashboard ui',
    tags: ['database', 'frontend', 'tool'],
    cardStyle: 'light',
  },
];

export const personalProjectsData: Project[] = [
   {
    id: 'navelonge',
    title: 'Navelonge',
    description: 'A tool for something.',
    technologies: ['NextJS', 'Supabase', 'TailwindCSS', 'Genkit AI'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract tech',
    tags: ['AI', 'Utility Tools', 'Next.js'],
    cardStyle: 'light',
  },
  {
    id: 'gc-search',
    title: 'GC Search',
    description: 'A specialized search engine.',
    technologies: ['NextJS', 'Supabase', 'TailwindCSS'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'search bar',
    tags: ['Search', 'Tool', 'Next.js'],
    cardStyle: 'light',
  },
  {
    id: 'ai-chat',
    title: 'AI Chat',
    description: 'A conversational AI application.',
    technologies: ['NextJS', 'Genkit AI'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chat bubbles',
    tags: ['AI', 'Chatbot', 'Next.js'],
    cardStyle: 'light',
  }
];


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

export const personalInfo = {
  name: 'Jimmy',
  title: 'Full Stack Developer',
  email: 'jimmy@example.com',
  phone: '+1234567890',
  location: 'Kathmandu, Nepal',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  cvLink: '/jimmy-cv.pdf' 
};
