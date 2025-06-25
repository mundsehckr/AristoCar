
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CalendarDays, Cog, Fuel, Gauge, MapPin, Power, Users, Car, Sparkles, Star, TrendingUp, Clock } from 'lucide-react'; 

interface HorizontalCarCardProps {
  id: string;
  imageUrl: string;
  imageHint?: string;
  title: string;
  year: number;
  price: number; 
  mileage?: number; 
  fuelType?: string;
  location?: string;
  seats?: number;
  power?: string; 
  isNearlyNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isRecentlyAdded?: boolean;
  isSold?: boolean;
}

const IndianRupee = ({ amount }: { amount: number }) => <>₹{amount.toLocaleString('en-IN')}</>;

export function HorizontalCarCard({
  id,
  imageUrl,
  imageHint,
  title,
  year,
  price,
  mileage,
  fuelType,
  location,
  seats,
  power,
  isNearlyNew,
  isFeatured,
  isTrending,
  isRecentlyAdded,
  isSold,
}: HorizontalCarCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow duration-200">
      <div className="sm:w-1/3 relative">
        <Link href={`/vehicles/${id}`} className="block aspect-[4/3] sm:aspect-auto sm:h-full">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="sm:rounded-l-lg sm:rounded-tr-none rounded-t-lg"
            data-ai-hint={imageHint || "car side view"}
          />
        </Link>
        {isSold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 pointer-events-none">
            <Badge className="bg-slate-700 text-white text-lg font-semibold px-4 py-1 rounded-md shadow-md transform -rotate-[5deg] opacity-90">
              SOLD
            </Badge>
          </div>
        )}
        {!isSold && (
          <div className="absolute top-2 left-2 flex flex-col items-start gap-y-1 z-[5]">
            {isTrending && (
              <Badge className="bg-orange-500 text-white border-orange-500 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" /> Trending
              </Badge>
            )}
            {isRecentlyAdded && (
              <Badge className="bg-blue-500 text-white border-blue-500 text-xs">
                <Clock className="w-3 h-3 mr-1" /> Recent
              </Badge>
            )}
            {isNearlyNew && (
              <Badge className="bg-green-600 text-white border-green-600 text-xs">
                <Sparkles className="w-3 h-3 mr-1" /> Nearly New
              </Badge>
            )}
          </div>
        )}
         {!isSold && isFeatured && (
            <Badge variant="destructive" className="absolute top-2 right-2 bg-red-600 border-red-600 text-xs z-[5]">
                <Star className="w-3 h-3 mr-1" /> Featured
            </Badge>
        )}
        <div className="absolute bottom-2 right-2 bg-card/80 p-1.5 rounded flex items-center z-[5]">
            <Checkbox id={`compare-${id}`} className="h-3.5 w-3.5"/>
            <label htmlFor={`compare-${id}`} className="ml-1.5 text-xs font-medium text-muted-foreground">Compare</label>
        </div>
      </div>

      <div className="sm:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-headline text-primary hover:text-accent transition-colors mb-1 truncate">
            <Link href={`/vehicles/${id}`}>{title}</Link>
          </h3>
          <p className="text-xl font-bold text-accent mb-2">
            <IndianRupee amount={price} />
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-1.5 text-xs text-muted-foreground mb-3">
            {mileage !== undefined && (
              <div className="flex items-center"><Gauge className="w-3.5 h-3.5 mr-1 text-primary/70" /> {mileage.toLocaleString('en-IN')} km</div>
            )}
            {year !== undefined && (
                <div className="flex items-center"><CalendarDays className="w-3.5 h-3.5 mr-1 text-primary/70" /> {year} model</div>
            )}
            {fuelType && (
              <div className="flex items-center"><Fuel className="w-3.5 h-3.5 mr-1 text-primary/70" /> {fuelType}</div>
            )}
            {seats !== undefined && (
                <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-1 text-primary/70" /> {seats} seats</div>
            )}
            {power && (
                <div className="flex items-center"><Power className="w-3.5 h-3.5 mr-1 text-primary/70" /> {power}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto pt-2">
          {location && (
            <div className="flex items-center text-xs text-muted-foreground mb-2 sm:mb-0">
              <MapPin className="w-3.5 h-3.5 mr-1 text-primary/70" /> {location}
            </div>
          )}
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground sm:ml-auto">
            <Link href={`/vehicles/${id}`}>
              View Details <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
