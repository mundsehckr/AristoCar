
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Gauge, Cog, Fuel, MapPin, Star, TrendingUp, Clock, Sparkles as NearlyNewIcon } from 'lucide-react';

interface CarCardProps {
  id: string;
  imageUrl: string;
  imageHint?: string;
  title: string;
  year: number;
  price: number; // Price in INR
  mileage?: number; // Mileage in km
  transmission?: string;
  fuelType?: string;
  location?: string;
  isFeatured?: boolean;
  isSold?: boolean;
  isTrending?: boolean;
  isRecentlyAdded?: boolean;
}
const IndianRupee = ({ amount }: { amount: number }) => <>₹{amount.toLocaleString('en-IN')}</>;

export function CarCard({
  id,
  imageUrl,
  imageHint,
  title,
  year,
  price,
  mileage,
  transmission,
  fuelType,
  location,
  isFeatured,
  isSold,
  isTrending,
  isRecentlyAdded,
}: CarCardProps) {
  const currentYear = new Date().getFullYear();
  const isNearlyNew = !isSold && (currentYear - year <= 1); // Car is from current or previous year

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card/90 backdrop-blur-sm">
      <CardHeader className="p-0 relative">
        <Link href={`/vehicles/${id}`} className="block relative">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={338} // 16:9 aspect ratio
            className="object-cover w-full aspect-[16/9]"
            data-ai-hint={imageHint || "car exterior"}
          />
          {isSold && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 pointer-events-none">
              <Badge className="bg-slate-700 text-white text-xl font-bold px-6 py-2 rounded-md shadow-lg transform -rotate-[7deg] opacity-95">
                SOLD
              </Badge>
            </div>
          )}
        </Link>

        {!isSold && (
          <>
            {/* Top-left tags: Show all that apply */}
            <div className="absolute top-2 left-2 z-[5] flex flex-col items-start gap-y-1">
              {isTrending && (
                <Badge className="bg-orange-500 text-white border-orange-500">
                  <TrendingUp className="w-3 h-3 mr-1" /> Trending
                </Badge>
              )}
              {isRecentlyAdded && (
                <Badge className="bg-blue-500 text-white border-blue-500">
                  <Clock className="w-3 h-3 mr-1" /> Recent
                </Badge>
              )}
              {isNearlyNew && (
                <Badge className="bg-green-600 text-white border-green-600">
                  <NearlyNewIcon className="w-3 h-3 mr-1" /> Nearly New
                </Badge>
              )}
            </div>

            {/* Top-right tag */}
            {isFeatured && (
              <Badge variant="destructive" className="absolute top-2 right-2 bg-red-600 border-red-600 z-[5]">
                <Star className="w-3 h-3 mr-1" /> Featured
              </Badge>
            )}
          </>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1 truncate">
          <Link href={`/vehicles/${id}`} className="hover:text-accent transition-colors">
            {title}
          </Link>
        </CardTitle>
        <p className="text-2xl font-bold text-primary mb-3">
          <IndianRupee amount={price} />
        </p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-muted-foreground mb-2">
          {year !== undefined && (
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5 text-accent" />
              <span>{year}</span>
            </div>
          )}
          {mileage !== undefined && (
            <div className="flex items-center">
              <Gauge className="w-4 h-4 mr-1.5 text-accent" />
              <span>{mileage.toLocaleString('en-IN')} km</span>
            </div>
          )}
          {transmission && (
            <div className="flex items-center">
              <Cog className="w-4 h-4 mr-1.5 text-accent" />
              <span className="truncate">{transmission}</span>
            </div>
          )}
          {fuelType && (
            <div className="flex items-center">
              <Fuel className="w-4 h-4 mr-1.5 text-accent" />
              <span className="truncate">{fuelType}</span>
            </div>
          )}
        </div>
        {location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1.5 text-accent" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <Button asChild variant="outline" className="w-full text-primary border-primary/50 hover:bg-primary/10 hover:text-primary">
          <Link href={`/vehicles/${id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
