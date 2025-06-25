
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, ShieldCheck, Bell, Lock, Edit3, Loader2, List } from 'lucide-react'; // Added List
import Link from 'next/link';

export default function ProfilePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect_url=/profile');
    }
  }, [isAuthenticated, loading, router]);

  // Use user data from AuthContext, provide sensible fallbacks if user is null (shouldn't happen if protected)
  const displayName = user?.name || 'User Name';
  const displayEmail = user?.email || 'user@example.com';
  const displayPhone = user?.phone || '+91 XXXXX XXXXX'; // Assuming phone might be added to MockUser
  const displayAvatarUrl = user?.avatarUrl || 'https://placehold.co/100x100.png'; // Assuming avatar might be added
  const isVerified = user?.isVerified || false; // Assuming verification status might be added
  const memberSince = user?.memberSince || 'N/A'; // Assuming join date might be added
  const listingsCount = user?.listingsCount || 0;
  const reputation = user?.reputation || 0;


  if (loading || !isAuthenticated || !user) { // Added !user check for robustness
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Loading Profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <Card className="max-w-4xl mx-auto shadow-xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={displayAvatarUrl} alt={displayName} data-ai-hint="profile picture user" />
              <AvatarFallback>{displayName.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="font-headline text-3xl text-primary">{displayName}</CardTitle>
              <CardDescription className="text-muted-foreground">Member since {memberSince}</CardDescription>
              {isVerified && (
                <div className="mt-1 flex items-center justify-center sm:justify-start text-green-600">
                  <ShieldCheck className="h-5 w-5 mr-1" />
                  <span>Verified User</span>
                </div>
              )}
               <p className="text-sm text-muted-foreground mt-1">Reputation: {reputation}/5 ({listingsCount} listings)</p>
            </div>
            <Button asChild variant="outline" className="ml-auto mt-4 sm:mt-0">
                <Link href="/profile/edit"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Link>
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="font-headline text-xl mb-3 text-primary">Personal Information</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-accent" /> Email: {displayEmail}</p>
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-accent" /> Phone: {displayPhone}</p>
              </div>
            </div>
            <Separator />
             <div>
              <h3 className="font-headline text-xl mb-3 text-primary">Account Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Button variant="outline" className="justify-start" asChild>
                    <Link href="/sell/my-listings">
                        <List className="mr-2 h-4 w-4"/> My Listings
                    </Link>
                 </Button>
                 <Button variant="outline" className="justify-start"><ShieldCheck className="mr-2 h-4 w-4"/> Profile Verification</Button>
                 <Button variant="outline" className="justify-start"><Bell className="mr-2 h-4 w-4"/> Notification Preferences</Button>
                 <Button variant="outline" className="justify-start"><Lock className="mr-2 h-4 w-4"/> Privacy Controls</Button>
              </div>
            </div>
            <Separator />
            <div>
                <h3 className="font-headline text-xl mb-3 text-primary">Identity Verification (KYC)</h3>
                <p className="text-sm text-muted-foreground mb-2">For secure transactions, KYC verification might be required by platform policy or for high-value items.</p>
                <Button variant="secondary">Start KYC Verification</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
