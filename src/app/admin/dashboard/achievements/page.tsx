'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function AchievementsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Achievements</h2>
          <p className="text-muted-foreground">
            Showcase your notable accomplishments.
          </p>
        </div>
        <Button disabled>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Achievement
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>
            Your accomplishments. (Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Achievements management UI will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
