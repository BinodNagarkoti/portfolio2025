'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function ExperienceAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Experience</h2>
          <p className="text-muted-foreground">
            Add, edit, or remove your professional experiences.
          </p>
        </div>
        <Button disabled>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Experience Records</CardTitle>
          <CardDescription>
            List of your professional roles. (Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Experience management UI will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
