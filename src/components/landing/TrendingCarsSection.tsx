
import { CarCard } from '@/components/shared/CarCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Sample data for trending cars - replace with dynamic data later
const trendingCarsData = [
  { id: 't1', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'hatchback modern city', title: 'Maruti Suzuki Swift', year: 2023, price: 750000, mileage: 8000, transmission: 'AMT', fuelType: 'Petrol', location: 'Popular City, IN', isTrending: true, isFeatured: true }, // Nearly New, Trending, Featured
  { id: 't2', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'suv compact family', title: 'Kia Seltos', year: 2022, price: 1600000, mileage: 15000, transmission: 'Automatic', fuelType: 'Diesel', location: 'Metro Area, IN', isTrending: true, isRecentlyAdded: true },
  { id: 't3', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'sedan elegant executive', title: 'Honda City', year: 2023, price: 1300000, mileage: 10000, transmission: 'CVT', fuelType: 'Petrol', location: 'Urban Center, IN', isTrending: true }, // Nearly New, Trending
  { id: 't4', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'suv luxury black', title: 'Toyota Fortuner', year: 2021, price: 3500000, mileage: 40000, transmission: 'Automatic', fuelType: 'Diesel', location: 'Major City, IN', isTrending: true, isSold: true},
];

export function TrendingCarsSection() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            Trending Cars of the Year
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-2">
            Check out the most popular and sought-after models in the Indian market right now.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingCarsData.map((car, index) => (
             <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.1 + 0.1}s`}}>
                <CarCard {...car} />
             </div>
          ))}
        </div>
        <div className="mt-12 text-center">
             <Button variant="outline" asChild className="text-accent hover:text-accent hover:bg-accent/10 border-accent">
                <Link href="/search?sort=trending">
                View More Trending <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
