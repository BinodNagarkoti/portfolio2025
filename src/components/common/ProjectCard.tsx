
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const isDark = project.cardStyle === 'dark';

  return (
    <Card className={cn(
      "group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1", 
      isDark ? "bg-primary text-primary-foreground" : "bg-card"
    )}>
      <CardHeader className="p-0 relative">
        <div className={cn(
          "aspect-video overflow-hidden relative", 
          isDark ? 'bg-secondary/20' : 'bg-muted/30'
        )}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
            data-ai-hint={project.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-1 font-headline">
          {project.title}
        </CardTitle>
        <CardDescription className={cn(isDark ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
          {project.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => ( 
            <Badge 
              key={tag} 
              variant={isDark ? 'secondary' : 'outline'}
              className={cn(isDark && 'bg-primary-foreground/10 text-primary-foreground/90')}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
