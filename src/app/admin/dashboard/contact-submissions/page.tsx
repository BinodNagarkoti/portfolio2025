'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon, Trash2Icon } from "lucide-react";

// Placeholder data - replace with Supabase fetch
const sampleSubmissions = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', message: 'Loved your work on Project X!', submitted_at: new Date().toISOString(), is_read: false },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', message: 'Inquiry about collaboration.', submitted_at: new Date(Date.now() - 86400000).toISOString(), is_read: true },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', message: 'Quick question about your skills.', submitted_at: new Date(Date.now() - 172800000).toISOString(), is_read: false },
];

export default function ContactSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact Form Submissions</h2>
        <p className="text-muted-foreground">
          View messages sent through your portfolio's contact form.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            Messages from potential clients and collaborators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message (Excerpt)</TableHead>
                <TableHead className="text-right">Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleSubmissions.map((submission) => (
                <TableRow key={submission.id} className={!submission.is_read ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Badge variant={submission.is_read ? "outline" : "default"}>
                      {submission.is_read ? "Read" : "New"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {new Date(submission.submitted_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" disabled><EyeIcon className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" disabled><Trash2Icon className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {sampleSubmissions.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No submissions yet.</p>
          )}
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Note: Full CRUD functionality and Supabase integration for contact submissions will be implemented in a future step.
      </p>
    </div>
  );
}
