import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, UserPlus } from 'lucide-react';

export function CTABannerSection() {
  return (
    <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-6 animate-slide-in-up" style={{animationDelay: '0.1s'}}>
          Ready to Get Started?
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto animate-slide-in-up" style={{animationDelay: '0.2s'}}>
          Whether you're looking to sell your car or find your next dream vehicle, Carversal Marketplace makes it easy.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-in-up" style={{animationDelay: '0.3s'}}>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
            <Link href="/sell/create-listing">
              <Briefcase className="mr-2 h-5 w-5" />
              Sell Your Car
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground w-full sm:w-auto"
          >
            <Link href="/signup">
              <UserPlus className="mr-2 h-5 w-5" />
              Create an Account
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
