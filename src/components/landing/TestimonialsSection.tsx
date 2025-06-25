
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// Updated testimonial data to match the new card design
const testimonialsData = [
  {
    name: "Fatima Khoury",
    username: "dilatory_curtains_98",
    avatarUrl: "https://placehold.co/80x80.png?text=FK", avatarHint: "woman face",
    testimonial: "The progress tracker is fantastic. It's motivating to see how much I've improved over time. The app has a great mix of common and challenging words, making learning both effective and engaging. I highly recommend it to anyone looking to expand their vocabulary.",
  },
  {
    name: "Hassan Ali",
    username: "turbulent_unicorn_29",
    avatarUrl: "https://placehold.co/80x80.png?text=HA", avatarHint: "man sunglasses",
    testimonial: "I've tried many vocabulary apps, but this one stands out. The user interface is clean and intuitive, and the variety of exercises keeps me engaged. The spaced repetition system really helps with retention.",
  },
  {
    name: "Jorge Martínez",
    username: "nefarious_jellybeans_91",
    avatarUrl: "https://placehold.co/80x80.png?text=JM", avatarHint: "man smiling",
    testimonial: "A truly exceptional tool for language learners. The definitions are clear, and the example sentences provide great context. I've seen a noticeable improvement in my vocabulary since I started using it.",
  },
  {
    name: "Nicolás Sánchez",
    username: "pervasive_inker_83",
    avatarUrl: "https://placehold.co/80x80.png?text=NS", avatarHint: "man outdoors",
    testimonial: "The daily challenges are a fun way to learn new words. I appreciate the offline mode, which allows me to study even without an internet connection. Customer support is also very responsive.",
  },
  {
    name: "Noel Jensen",
    username: "nefarious_shop_47",
    avatarUrl: "https://placehold.co/80x80.png?text=NJ", avatarHint: "man thoughtful",
    testimonial: "As a student preparing for exams, this app has been invaluable. The ability to create custom word lists and track my learning progress is exactly what I needed. It's well worth the subscription.",
  },
  {
    name: "Ahmad Khan",
    username: "antic_circus_76",
    avatarUrl: "https://placehold.co/80x80.png?text=AK", avatarHint: "man simple background",
    testimonial: "This platform made selling my car a breeze! The AI-generated listing details were incredibly helpful, and I connected with a buyer quickly. The whole process was much smoother than I anticipated.",
  },
   {
    name: "Priya Patel",
    username: "vivid_star_12",
    avatarUrl: "https://placehold.co/80x80.png?text=PP", avatarHint: "woman professional",
    testimonial: "Carversal made selling my car incredibly easy! The AI suggestions for the listing were spot on, and I got a great price. I was able to list my car in minutes, and the response was almost immediate. This is the best platform for C2C car sales in India by far.",
  },
  {
    name: "Rajesh Kumar",
    username: "swift_rider_55",
    avatarUrl: "https://placehold.co/80x80.png?text=RK", avatarHint: "man casual",
    testimonial: "Found the perfect family car here. The search filters are very detailed, and the platform feels trustworthy. The seller was genuine, and the transaction was transparent. Will definitely use Carversal again for my next purchase!",
  },
];


interface TestimonialCardProps {
  name: string;
  username: string;
  avatarUrl: string;
  avatarHint?: string;
  testimonial: string;
}

const TestimonialCard = ({ name, username, avatarUrl, avatarHint, testimonial }: TestimonialCardProps) => (
  <div
    className={cn(
      "flex-none w-[300px] sm:w-[340px] bg-card rounded-xl p-8",
      "shadow-card-smooth border border-border",
      "hover:shadow-card-smooth-hover hover:border-border/80 hover:-translate-y-1",
      "transition-all duration-300 ease-in-out",
      "h-full flex flex-col justify-between"
    )}
  >
    <div>
      <Quote className="h-7 w-7 text-accent mb-5" />
      <p className="text-card-foreground/80 text-sm leading-relaxed mb-6 line-clamp-5">
        {testimonial}
      </p>
    </div>
    <div className="border-t border-border pt-5 mt-auto">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={avatarUrl} alt={name} data-ai-hint={avatarHint} />
          <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-card-foreground text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">@{username}</p>
        </div>
      </div>
    </div>
  </div>
);

interface MarqueeRowProps {
  testimonials: TestimonialCardProps[];
  direction?: 'ltr' | 'rtl';
  duration?: string;
}

const MarqueeRow = ({ testimonials, direction = 'ltr', duration = '120s' }: MarqueeRowProps) => (
  <div className="relative overflow-hidden w-full group select-none">
    <div
      className={cn(
        "flex items-stretch gap-6 py-4 group-hover:[animation-play-state:paused]",
        direction === 'ltr' ? 'animate-scroll-ltr' : 'animate-scroll-rtl'
      )}
      style={{ animationDuration: duration } as React.CSSProperties}
    >
      {[...testimonials, ...testimonials].map((testimonial, index) => ( // Duplicated for seamless loop
        <TestimonialCard
            key={`${testimonial.username}-${direction}-${index}`}
            {...testimonial}
        />
      ))}
    </div>
    {/* Fades */}
    <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-40 lg:w-48 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
    <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-40 lg:w-48 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
  </div>
);

export function TestimonialsSection() {
  const topRowTestimonials = testimonialsData.slice(0, Math.ceil(testimonialsData.length / 2));
  const bottomRowTestimonials = testimonialsData.slice(Math.ceil(testimonialsData.length / 2)).reverse();

  return (
    <section className="bg-background py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Words of praise from others<br className="hidden sm:block" /> about our presence.
          </h2>
        </div>
      
        <div className="space-y-6">
          <MarqueeRow testimonials={topRowTestimonials} direction="ltr" duration="120s" />
          <MarqueeRow testimonials={bottomRowTestimonials} direction="rtl" duration="120s" />
        </div>
      </div>
    </section>
  );
}
