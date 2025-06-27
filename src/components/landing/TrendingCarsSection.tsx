"use client";
import { useEffect, useState } from "react";
import { CarCard } from '@/components/shared/CarCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

export function TrendingCarsSection() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/listings", { method: "GET" });
        const data = await res.json();
        if (res.ok && data.listings) {
          // Randomly pick 3 trending cars from the database
          const shuffled = [...data.listings].sort(() => 0.5 - Math.random());
          setListings(shuffled.slice(0, 3));
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
    isTrending: true,
  }));

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
          {loading ? (
            <div className="col-span-full text-center text-muted-foreground py-10">Loading...</div>
          ) : mappedCars.length > 0 ? (
            mappedCars.map((car, index) => (
              <div key={car.id} className="animate-slide-in-up" style={{animationDelay: `${index * 0.1 + 0.1}s`}}>
                <CarCard {...car} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-10">No trending cars to show.</div>
          )}
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