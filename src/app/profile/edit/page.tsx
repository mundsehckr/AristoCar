
"use client";

import { useEffect, useState } from 'react'; // Added useState here
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UploadCloud, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

const profileEditSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(), // Or more specific validation e.g., .regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number")
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  // avatarFile: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(), // For file upload if implemented
});

type ProfileEditFormData = z.infer<typeof profileEditSchema>;

export default function EditProfilePage() {
  const { isAuthenticated, user, loading, login: updateUserInContext } = useAuth(); // Assuming login can also update user
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect_url=/profile/edit');
    }
    if (user) {
      reset({ // Pre-fill form with user data
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '', // Assuming phone is part of your MockUser
        bio: user.bio || '',     // Assuming bio is part of your MockUser
      });
    }
  }, [isAuthenticated, loading, user, router, reset]);

  const onSubmit = async (data: ProfileEditFormData) => {
    setIsSubmitting(true);
    console.log("Updating profile with:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you'd get the updated user from the API response
    // For simulation, we update the context if possible, or just show success
    if (user) {
        const updatedUser = {
            ...user,
            name: data.name,
            email: data.email,
            phone: data.phone || user.phone, // Keep old phone if new one is empty
            bio: data.bio || user.bio,       // Keep old bio if new one is empty
            // avatarUrl might be updated separately if file upload is handled
        };
        updateUserInContext(updatedUser, undefined); // Update user in AuthContext (no redirect needed here)
    }

    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
    setIsSubmitting(false);
    router.push('/profile'); // Redirect to profile view page
  };
  
  // Fallback data if user is somehow null when page is accessed (should be caught by loading || !isAuthenticated)
  const displayUser = user || {
    name: 'User Name',
    email: 'user@example.com',
    phone: '',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: '',
  };


  if (loading || !isAuthenticated || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Loading Edit Profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <Card className="max-w-2xl mx-auto shadow-xl bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary">Edit Profile</CardTitle>
            <CardDescription>Update your personal information and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatarUrl || displayUser.avatarUrl} alt={user.name} data-ai-hint="profile avatar"/>
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatarFile" className="cursor-pointer inline-flex items-center px-4 py-2 border border-input bg-background rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Label>
                  <Input id="avatarFile" type="file" className="hidden" accept="image/*" />
                  {/* Add error display for avatarFile if implemented */}
                </div>
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" {...register("phone")} />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="bio">Bio / About Me</Label>
                <Textarea id="bio" {...register("bio")} rows={4} placeholder="Tell us a bit about yourself..." />
                {errors.bio && <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" asChild type="button">
                  <Link href="/profile">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
