
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section 
      className="relative py-20 md:py-32 lg:py-40 text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://placehold.co/1920x1080.png?text=')" }}
      data-ai-hint="hero background car"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl text-left">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-in-up" style={{animationDelay: '0.1s'}}>
            Find The Right <span className="text-accent">Car For You</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            We have more than 1000+ cars for you. Explore our diverse collection of quality pre-owned vehicles.
          </p>
          <div className="animate-slide-in-up" style={{animationDelay: '0.3s'}}>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg">
              <Link href="/search">
                View Cars <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
