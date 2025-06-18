'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";

// Placeholder data - replace with Supabase fetch
const sampleProjects = [
  { id: '1', title: 'Project Alpha', description: 'A cool project about X.', technologies: ['React', 'Node.js'] },
  { id: '2', title: 'Project Beta', description: 'Another amazing project.', technologies: ['Next.js', 'Supabase'] },
];

export default function ProjectsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Projects</h2>
          <p className="text-muted-foreground">
            Add, edit, or remove your portfolio projects.
          </p>
        </div>
        <Button disabled> {/* Disabled until functionality is added */}
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="truncate">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Technologies:</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" disabled>Edit</Button>
                <Button variant="destructive" size="sm" disabled>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       <p className="text-sm text-muted-foreground">
        Note: Full CRUD functionality and Supabase integration for projects will be implemented in a future step.
      </p>
    </div>
  );
}
