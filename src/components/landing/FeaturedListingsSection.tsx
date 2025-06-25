
import { CarCard } from '@/components/shared/CarCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleCars = [
  { id: '1', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'suv white modern', title: '2022 Hyundai Creta SX', year: 2022, price: 1500000, mileage: 12000, transmission: 'Automatic', fuelType: 'Petrol', location: 'Mumbai, MH', isFeatured: true, isTrending: true },
  { id: '7', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'hatchback sporty yellow', title: '2023 Maruti Swift ZXI+', year: 2023, price: 900000, mileage: 4000, transmission: 'AMT', fuelType: 'Petrol', location: 'Noida, UP', isFeatured: true, isTrending: true, isRecentlyAdded: true },
  { id: '2', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'sedan silver luxury', title: '2021 Honda City ZX', year: 2021, price: 1250000, mileage: 18000, transmission: 'CVT', fuelType: 'Petrol', location: 'Delhi, DL', isRecentlyAdded: true },
  { id: '4', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'ev teal compact', title: '2023 Tata Nexon EV Max', year: 2023, price: 1800000, mileage: 7000, transmission: 'Automatic', fuelType: 'Electric', location: 'Pune, MH', isFeatured: true, isRecentlyAdded: true },
  { id: '5', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'sedan red elegant', title: '2022 Skoda Slavia Ambition', year: 2022, price: 1350000, mileage: 9000, transmission: 'Automatic', fuelType: 'Petrol', location: 'Chennai, TN', isSold: true },
  { id: '6', imageUrl: 'https://placehold.co/600x338.png', imageHint: 'suv grey sturdy', title: '2021 Mahindra XUV700 AX5', year: 2021, price: 1950000, mileage: 22000, transmission: 'Manual', fuelType: 'Diesel', location: 'Hyderabad, TS', isTrending: true },
];

export function FeaturedListingsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            Find the Best Car For You
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-2">
            Explore a wide range of quality pre-owned vehicles tailored to your needs.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 sm:grid-cols-3">
              <TabsTrigger value="all">All Cars</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCars.map((car, index) => (
                <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.05 + 0.1}s`}}>
                  <CarCard {...car} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="featured">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCars.filter(car => car.isFeatured).map((car, index) => (
                <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.05 + 0.1}s`}}>
                  <CarCard {...car} />
                </div>
              ))}
              {sampleCars.filter(car => car.isFeatured).length === 0 && <p className="col-span-full text-center text-muted-foreground">No featured cars at the moment.</p>}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCars.filter(car => car.isRecentlyAdded).map((car, index) => ( 
                <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.05 + 0.1}s`}}>
                  <CarCard {...car} />
                </div>
              ))}
               {sampleCars.filter(car => car.isRecentlyAdded).length === 0 && <p className="col-span-full text-center text-muted-foreground">No recently added cars to show.</p>}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <Button variant="outline" asChild className="text-accent hover:text-accent hover:bg-accent/10 border-accent">
            <Link href="/search">
              View All Listings <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
