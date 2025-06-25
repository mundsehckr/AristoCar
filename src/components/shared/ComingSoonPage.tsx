
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { HardHat, Wrench } from 'lucide-react'; // Using HardHat for construction
import Link from 'next/link';

interface ComingSoonPageProps {
  pageName?: string;
  message?: string;
}

export function ComingSoonPage({ 
  pageName = "This Page", 
  message = "We're working hard to bring you this feature. Please check back soon!" 
}: ComingSoonPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center py-12 pt-28 sm:pt-32 px-4">
        <HardHat className="h-24 w-24 text-accent mb-6" />
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">
          {pageName} Coming Soon!
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          {message}
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">Go Back to Homepage</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
