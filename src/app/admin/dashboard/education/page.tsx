'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function EducationAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Education</h2>
          <p className="text-muted-foreground">
            Add, edit, or remove your educational qualifications.
          </p>
        </div>
        <Button disabled>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Education Records</CardTitle>
          <CardDescription>
            List of your academic achievements. (Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Education management UI will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
