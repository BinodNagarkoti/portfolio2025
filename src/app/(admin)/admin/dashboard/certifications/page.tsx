'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function CertificationsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Certifications</h2>
          <p className="text-muted-foreground">
            List your certifications and upload relevant documents.
          </p>
        </div>
        <Button disabled>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Certification
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>
            Your professional certifications. (Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Certifications management UI (including PDF uploads) will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
