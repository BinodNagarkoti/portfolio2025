'use client';

import {
  Code2Icon, DatabaseIcon, ServerCogIcon, CloudIcon, ContainerIcon, GitForkIcon,
  GithubIcon, ZapIcon, CpuIcon, PaletteIcon, GlobeIcon, ShieldCheckIcon, Settings2Icon,
  RouteIcon, RefreshCwIcon, CheckCheckIcon, CreditCardIcon, MousePointerClickIcon,
  Share2Icon, WindIcon, WrenchIcon
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JQueryIcon, FormikIcon, VercelIcon, ReactRouterIcon } from './Icons';

const techIcons: { name: string; icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>; color?: string }[] = [
  { name: 'HTML', icon: Code2Icon },
  { name: 'CSS', icon: Code2Icon },
  { name: 'Javascript', icon: Code2Icon, color: "text-yellow-400" },
  { name: 'React', icon: CpuIcon, color: "text-sky-400" },
  { name: 'JQuery', icon: JQueryIcon },
  { name: 'Node.js', icon: ServerCogIcon, color: "text-green-500" },
  { name: 'Express.js', icon: RouteIcon },
  { name: 'MongoDB', icon: DatabaseIcon, color: "text-green-600" },
  { name: 'MySQL', icon: DatabaseIcon },
  { name: 'GraphQL', icon: Share2Icon, color: "text-pink-500" },
  { name: 'PostgreSQL', icon: DatabaseIcon, color: "text-blue-500" },
  { name: 'Google OAuth', icon: ShieldCheckIcon, color: "text-red-500" },
  { name: 'Tailwind CSS', icon: WindIcon, color: "text-cyan-400" },
  { name: 'Shadcn UI', icon: PaletteIcon },
  { name: 'Git', icon: GitForkIcon, color: "text-orange-500" },
  { name: 'Github', icon: GithubIcon },
  { name: 'Heroku', icon: CloudIcon, color: "text-purple-500" },
  { name: 'Vercel', icon: VercelIcon },
  { name: 'Next.js', icon: ZapIcon },
  { name: 'TypeScript', icon: Code2Icon, color: "text-blue-400" },
  { name: 'Redux', icon: RefreshCwIcon, color: "text-purple-400" },
  { name: 'Firebase', icon: ZapIcon, color: "text-yellow-500" },
  { name: 'Zod', icon: CheckCheckIcon, color: "text-blue-600" },
  { name: 'Khalti', icon: CreditCardIcon, color: "text-purple-600" },
  { name: 'Stripe', icon: CreditCardIcon, color: "text-indigo-500" },
  { name: 'AWS', icon: CloudIcon, color: "text-orange-400" },
  { name: 'Docker', icon: ContainerIcon, color: "text-sky-500" },
  { name: 'Supabase', icon: ShieldCheckIcon, color: "text-green-500" },
  { name: 'Cpanel', icon: Settings2Icon },
  { name: 'Wordpress', icon: GlobeIcon, color: "text-blue-600" },
  { name: 'WIX', icon: MousePointerClickIcon },
  { name: 'Canva', icon: PaletteIcon, color: "text-teal-400" },
  { name: 'Figma', icon: PaletteIcon, color: "text-pink-400" },
  { name: 'Axios', icon: Code2Icon },
  { name: 'React Router DOM', icon: ReactRouterIcon },
  { name: 'Formik', icon: FormikIcon },
  { name: 'React Hook Form', icon: WrenchIcon },
];

const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunkedArr: T[][] = [];
  let index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
};

const TechCarousel = () => {
  const iconRows = chunkArray(techIcons, 6);

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-card/50 p-4 shadow-inner md:h-full">
      {iconRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            "flex w-max animate-marquee gap-4",
            rowIndex % 2 !== 0 && "marquee-reverse"
          )}
          style={{ '--marquee-duration': `${row.length * 6}s` } as React.CSSProperties}
        >
          {[...row, ...row].map((tech, techIndex) => {
            const Icon = tech.icon;
            return (
              <div key={`${rowIndex}-${techIndex}`} className="flex flex-col h-24 w-24 flex-shrink-0 items-center justify-center gap-2 rounded-2xl bg-card p-2 shadow-md backdrop-blur-sm">
                <Icon className={cn("h-10 w-10 text-muted-foreground", tech.color)} />
                <p className="text-xs text-center text-muted-foreground font-medium truncate w-full">{tech.name}</p>
              </div>
            );
          })}
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50"></div>
    </div>
  );
};

export default TechCarousel;
