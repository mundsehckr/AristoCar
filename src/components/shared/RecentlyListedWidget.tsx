
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react'; // Assuming this component or similar exists for ₹

const IndianRupeeSymbol = ({ amount }: { amount: number }) => <>₹{amount.toLocaleString('en-IN')}</>;


const recentlyListedCars = [
  { id: 'r1', title: 'Ford Shelby GT350', price: 4500000, imageUrl: 'https://placehold.co/100x75.png', imageHint: 'sportscar orange' },
  { id: 'r2', title: 'BMW X3M', price: 8200000, imageUrl: 'https://placehold.co/100x75.png', imageHint: 'suv blue luxury' },
  { id: 'r3', title: 'Mazda CX-5 SX', price: 2800000, imageUrl: 'https://placehold.co/100x75.png', imageHint: 'suv red compact' },
  { id: 'r4', title: 'Toyota Camry Hybrid', price: 4200000, imageUrl: 'https://placehold.co/100x75.png', imageHint: 'sedan white hybrid' },
];

export function RecentlyListedWidget() {
  return (
    <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-lg text-primary">Recently Listed Cars</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentlyListedCars.map(car => (
          <Link key={car.id} href={`/vehicles/${car.id}`} className="flex items-center space-x-3 group p-2 rounded-md hover:bg-secondary/50 transition-colors">
            <div className="w-16 h-12 relative rounded overflow-hidden shrink-0">
                <Image
                    src={car.imageUrl}
                    alt={car.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={car.imageHint}
                />
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="text-sm font-semibold text-foreground group-hover:text-accent truncate transition-colors">{car.title}</p>
              <p className="text-xs text-muted-foreground font-bold"><IndianRupeeSymbol amount={car.price} /></p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
