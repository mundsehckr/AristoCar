
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, UploadCloud } from "lucide-react";

const offers = [
  {
    title: "Looking For A Car?",
    description: "Find your perfect match from thousands of verified listings. Explore diverse makes, models, and price ranges with detailed information and user reviews.",
    buttonText: "Find Car",
    buttonIcon: <ShoppingCart className="mr-2 h-5 w-5" />,
    href: "/search",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "person car shopping",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  {
    title: "Looking To Sell A Car?",
    description: "List your car easily and reach thousands of potential buyers. Our AI tools help you create attractive listings and suggest competitive prices.",
    buttonText: "Sell Your Car",
    buttonIcon: <UploadCloud className="mr-2 h-5 w-5" />,
    href: "/sell/create-listing",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "person selling car",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    buttonClass: "bg-green-600 hover:bg-green-700 text-white"
  },
];

export function LookingToSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            Welcome to Carversal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Your trusted partner in buying and selling pre-owned cars in India. We make the process simple, transparent, and efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <Card 
              key={offer.title} 
              className={`shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden ${offer.borderColor}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative h-64 sm:h-72 md:h-60">
                <Image
                  src={offer.imageUrl}
                  alt={offer.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={offer.imageHint}
                />
              </div>
              <CardHeader className={`p-6 ${offer.bgColor}`}>
                <CardTitle className={`font-headline text-2xl ${offer.textColor}`}>{offer.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col bg-card">
                <p className="text-muted-foreground mb-6 flex-grow">{offer.description}</p>
                <Button size="lg" asChild className={`${offer.buttonClass} w-full text-base`}>
                  <Link href={offer.href}>
                    {offer.buttonIcon}
                    {offer.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
