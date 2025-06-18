'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { PersonalInfo } from '@/lib/supabase-types';
// import { createSupabaseBrowserClient } from '@/lib/supabase/client'; // To be used when fetching/saving
import { generateProfessionalSubtitle } from '@/ai/flows/generate-subtitle-flow'; // AI Flow
import { BotIcon, SaveIcon, UploadCloudIcon } from 'lucide-react';

export default function PersonalInfoPage() {
  const { toast } = useToast();
  // const supabase = createSupabaseBrowserClient(); // Initialize Supabase client when needed
  const [personalInfo, setPersonalInfo] = useState<Partial<PersonalInfo>>({
    name: 'Binod Nagarkoti', // Sample data
    title: 'Frontend & Full Stack Developer',
    contact_email: 'binod1365@gmail.com',
    // other fields will be empty or loaded from Supabase
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const { data, error } = await supabase.from('personal_info').select('*').single();
  //     if (error) {
  //       toast({ variant: 'destructive', title: 'Error fetching data', description: error.message });
  //     } else if (data) {
  //       setPersonalInfo(data);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, [supabase, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement actual file upload to Supabase Storage
      // For now, we'll just store a placeholder name or path
      setPersonalInfo({ ...personalInfo, cv_url: `cvs/${file.name}` }); // Placeholder
      toast({ title: 'CV Selected', description: `${file.name} (Upload not implemented yet)` });
    }
  };

  const handleGenerateSubtitle = async () => {
    setIsAiLoading(true);
    try {
      // In a real app, you'd fetch skills from the DB or have user input them
      const skills = ['NextJS', 'React', 'TypeScript', 'Node.js', 'Supabase', 'TailwindCSS']; 
      const { subtitle } = await generateProfessionalSubtitle({ skills });
      setPersonalInfo(prev => ({ ...prev, subtitle: subtitle || prev.subtitle }));
      toast({ title: 'AI Subtitle Generated!', description: subtitle });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'AI Error', description: error.message || 'Failed to generate subtitle.' });
    }
    setIsAiLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // const { data, error } = await supabase
    //   .from('personal_info')
    //   .upsert({ ...personalInfo, id: personalInfo.id || crypto.randomUUID() }) // Ensure ID for upsert
    //   .select()
    //   .single();

    // if (error) {
    //   toast({ variant: 'destructive', title: 'Error saving data', description: error.message });
    // } else if (data) {
    //   setPersonalInfo(data);
    //   toast({ title: 'Success', description: 'Personal info saved.' });
    // }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    toast({ title: 'Success (Simulated)', description: 'Personal info would be saved here.' });
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Manage your public profile details and AI-generated content.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={personalInfo.name || ''} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="title">Main Title (e.g., Frontend Developer)</Label>
              <Input id="title" name="title" value={personalInfo.title || ''} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="subtitle">Professional Subtitle</Label>
            <div className="flex items-center gap-2">
              <Input id="subtitle" name="subtitle" value={personalInfo.subtitle || ''} onChange={handleChange} placeholder="e.g., Passionate about building modern web experiences." />
              <Button type="button" variant="outline" size="icon" onClick={handleGenerateSubtitle} disabled={isAiLoading} aria-label="Generate subtitle with AI">
                {isAiLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div> : <BotIcon />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">AI can help generate this based on your skills.</p>
          </div>
          
          <div>
            <Label htmlFor="bio">Biography</Label>
            <Textarea id="bio" name="bio" value={personalInfo.bio || ''} onChange={handleChange} rows={5} placeholder="Tell us about yourself..."/>
             <Button type="button" variant="outline" size="sm" className="mt-2" disabled>
                <BotIcon className="mr-2 h-4 w-4" /> Generate Bio with AI (Coming Soon)
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="position">Current Position</Label>
              <Input id="position" name="position" value={personalInfo.position || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={personalInfo.location || ''} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input id="contact_email" name="contact_email" type="email" value={personalInfo.contact_email || ''} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={personalInfo.phone || ''} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input id="github_url" name="github_url" type="url" value={personalInfo.github_url || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input id="linkedin_url" name="linkedin_url" type="url" value={personalInfo.linkedin_url || ''} onChange={handleChange} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="cv_url">CV / Resume (PDF)</Label>
            <div className="flex items-center gap-2">
                <Input id="cv_file_input" type="file" accept=".pdf" onChange={handleCvUpload} className="flex-grow" />
                <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('cv_file_input')?.click()} aria-label="Upload CV">
                    <UploadCloudIcon />
                </Button>
            </div>
            {personalInfo.cv_url && <p className="text-xs text-muted-foreground mt-1">Current: {personalInfo.cv_url} (Upload not fully implemented)</p>}
            <p className="text-xs text-muted-foreground mt-1">Note: Actual file upload to Supabase Storage needs separate backend logic.</p>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div> : <SaveIcon className="mr-2 h-4 w-4" />}
            Save Personal Info
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
