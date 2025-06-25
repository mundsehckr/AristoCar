"use client"; // Required for hooks

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CreateListingForm } from '@/components/features/ai-listing-creation/CreateListingForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function CreateListingPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Frontend: Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect_url=/sell/create-listing');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // The actual form will call a protected API route on submit
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <CreateListingForm />
      </main>
      <Footer />
    </div>
  );
}