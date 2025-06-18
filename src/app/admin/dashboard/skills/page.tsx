'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function SkillsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Skills</h2>
          <p className="text-muted-foreground">
            Organize your skills by categories and proficiency levels.
          </p>
        </div>
        <Button disabled className="mr-2">
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Skill Category
        </Button>
        <Button disabled>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Skill Categories & Skills</CardTitle>
          <CardDescription>
            Your technical expertise. (Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Skills management UI will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
