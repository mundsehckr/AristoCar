
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function SellYourCarCtaWidget() {
  return (
    <Card className="shadow-lg bg-card/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="p-0 relative h-32">
        <Image
            src="https://placehold.co/400x150.png"
            alt="Sell your car background"
            layout="fill"
            objectFit="cover"
            data-ai-hint="abstract car keys"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
            <CardTitle className="font-headline text-xl text-white text-center">Sell Your Car</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Request a quote and sell your car now!
        </p>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/sell/create-listing">Request a Quote</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
