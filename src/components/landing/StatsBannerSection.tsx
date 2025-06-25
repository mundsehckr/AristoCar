
import { Card, CardContent } from "@/components/ui/card";
import { Users, KeyRound, Car, MessageSquareText } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    value: "10,000+",
    label: "Happy Users",
    delay: "0.1s",
  },
  {
    icon: <Car className="h-10 w-10 text-accent" />,
    value: "5,000+",
    label: "Cars Listed",
    delay: "0.2s",
  },
  {
    icon: <KeyRound className="h-10 w-10 text-accent" />,
    value: "2,000+",
    label: "Successful Deals",
    delay: "0.3s",
  },
  {
    icon: <MessageSquareText className="h-10 w-10 text-accent" />,
    value: "1,500+",
    label: "Verified Reviews",
    delay: "0.4s",
  },
];

export function StatsBannerSection() {
  return (
    <section className="bg-primary text-primary-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="bg-cover bg-center relative overflow-hidden" 
          style={{ backgroundImage: "url('https://placehold.co/1920x400.png?text=')"}}
          data-ai-hint="abstract technology background"
        >
          {/* This is the dark blurred panel that holds the cards, sitting on top of the placeholder image */}
          <div
            className="relative bg-black/40 backdrop-blur-md py-16 px-6 md:px-10 lg:px-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="text-center bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 p-6 animate-slide-in-up transition-transform duration-300 hover:scale-105" // Removed rounded-lg
                  style={{ animationDelay: stat.delay }}
                >
                  <CardContent className="p-0 flex flex-col items-center">
                    <div className="p-3 rounded-full bg-accent/20 mb-4 w-fit"> {/* Icon circle remains rounded */}
                      {stat.icon}
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold mb-1 text-primary-foreground">{stat.value}</p>
                    <p className="text-sm font-medium text-primary-foreground/80">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

