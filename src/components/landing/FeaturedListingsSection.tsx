"use client";
import { useEffect, useState } from "react";
import { CarCard } from '@/components/shared/CarCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Listing = {
  _id: string;
  title?: string;
  make: string;
  model: string;
  year: number;
  price?: number;
  suggestedPrice?: number;
  mileage: number;
  location?: string;
  photoUrls: string[];
  // ...other fields from your DB
};

const staticTransmissions = ["Automatic", "Manual", "CVT", "AMT"];
const staticFuelTypes = ["Petrol", "Diesel", "Electric"];
const staticLocations = [
  "Mumbai, MH", "Delhi, DL", "Noida, UP", "Pune, MH", "Chennai, TN", "Hyderabad, TS"
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function FeaturedListingsSection() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/listings", { method: "GET" });
        const data = await res.json();
        if (res.ok && data.listings) {
          setListings(data.listings.slice(0, 6)); // Only show up to 6 for featured section
        } else {
          setListings([]);
        }
      } catch {
        setListings([]);
      }
      setLoading(false);
    };
    fetchListings();
  }, []);

  // Map cars with static/random fields for display
  const mappedCars = listings.map((car, idx) => ({
    id: car._id,
    imageUrl: car.photoUrls?.[0] || "https://placehold.co/600x338.png",
    title: car.title || `${car.year} ${car.make} ${car.model}`,
    year: car.year,
    price: car.suggestedPrice || car.price || 0,
    mileage: car.mileage,
    transmission: getRandom(staticTransmissions),
    fuelType: getRandom(staticFuelTypes),
    location: car.location || getRandom(staticLocations),
  }));

  // Featured: first 3 cars
  const featuredCars = mappedCars.slice(0, 3);

  // Recently Added: last 3 cars (from the fetched 6)
  const recentlyAddedCars = mappedCars.slice(-3);

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
            {loading ? (
              <div className="text-center py-10 text-muted-foreground">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mappedCars.map((car, index) => (
                  <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.05 + 0.1}s`}}>
                    <CarCard {...car} />
                  </div>
                ))}
                {mappedCars.length === 0 && (
                  <p className="col-span-full text-center text-muted-foreground">No cars to show.</p>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="featured">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car, index) => (
                <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.05 + 0.1}s`}}>
                  <CarCard {...car} />
                </div>
              ))}
              {featuredCars.length === 0 && <p className="col-span-full text-center text-muted-foreground">No featured cars at the moment.</p>}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyAddedCars.map((car, index) => ( 
                <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.05 + 0.1}s`}}>
                  <CarCard {...car} />
                </div>
              ))}
               {recentlyAddedCars.length === 0 && <p className="col-span-full text-center text-muted-foreground">No recently added cars to show.</p>}
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