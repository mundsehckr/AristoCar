
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "Top 5 Tips for Buying a Used Car in India",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "car inspection checklist",
    author: "Carversal Experts",
    date: "July 28, 2024",
    excerpt: "Navigating the pre-owned car market? Here are essential tips to ensure you make a smart purchase and get the best value...",
    href: "/blog/top-5-tips-buying-used-car",
    delay: "0.1s",
  },
  {
    id: "2",
    title: "How to Price Your Used Car Competitively",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "calculating car price",
    author: "Market Analysts",
    date: "July 25, 2024",
    excerpt: "Setting the right price is crucial for a quick sale. Learn about factors influencing car valuation and how to use online tools effectively.",
    href: "/blog/how-to-price-your-used-car",
    delay: "0.2s",
  },
  {
    id: "3",
    title: "Understanding RC Transfer Process in India",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "document transfer hands",
    author: "Legal Advisors",
    date: "July 22, 2024",
    excerpt: "The Registration Certificate (RC) transfer is a vital step. We break down the process, required documents, and state-wise nuances.",
    href: "/blog/rc-transfer-process-india",
    delay: "0.3s",
  },
];

export function LatestBlogPostsSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary">
            Latest Updates In Automobile Industry
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-2">
            Stay informed with our expert insights, tips, and news from the automotive world.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up bg-card/90 backdrop-blur-sm"
              style={{animationDelay: post.delay}}
            >
              <CardHeader className="p-0">
                <Link href={post.href} className="block">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400} // 3:2 aspect ratio
                    className="object-cover w-full aspect-[3/2]"
                    data-ai-hint={post.imageHint}
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-headline mb-2">
                  <Link href={post.href} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-3">
                  <span className="flex items-center"><UserCircle className="w-3.5 h-3.5 mr-1"/> {post.author}</span>
                  <span className="flex items-center"><CalendarDays className="w-3.5 h-3.5 mr-1"/> {post.date}</span>
                </div>
                <p className="text-sm text-foreground/80 line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 border-t mt-auto">
                <Button asChild variant="link" className="p-0 text-accent hover:text-accent/80">
                  <Link href={post.href}>
                    Read More <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button variant="outline" asChild className="text-primary hover:text-primary hover:bg-primary/10 border-primary">
                <Link href="/blog">
                Visit Our Blog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
