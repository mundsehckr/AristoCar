
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center py-12 pt-28 sm:pt-32 px-4">
        <Frown className="h-24 w-24 text-destructive mb-6" />
        <h1 className="font-headline text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">Go Back to Homepage</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
