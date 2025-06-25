import Link from 'next/link';
import { Car } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
      <Car className="h-8 w-8" />
      <span className="font-headline text-2xl font-bold">
        Carversal
      </span>
    </Link>
  );
}
