
"use client"; // Add this for client-side hooks

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Users, Search, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const forumCategories = [
  { id: '1', name: 'General Discussion', description: 'Talk about anything car-related.', threads: 125, posts: 1502, icon: <MessageSquare className="h-6 w-6 text-accent" /> },
  { id: '2', name: 'Model-Specific: Sedans', description: 'Discussions about specific sedan models.', threads: 88, posts: 975, icon: <Users className="h-6 w-6 text-accent" /> },
  { id: '3', name: 'Model-Specific: SUVs & Trucks', description: 'Everything about SUVs and trucks.', threads: 102, posts: 1230, icon: <Users className="h-6 w-6 text-accent" /> },
  { id: '4', name: 'Buying & Selling Advice', description: 'Tips and tricks for buyers and sellers.', threads: 67, posts: 750, icon: <MessageSquare className="h-6 w-6 text-accent" /> },
  { id: '5', name: 'Technical Support & DIY', description: 'Get help with repairs and modifications.', threads: 150, posts: 2001, icon: <Users className="h-6 w-6 text-accent" /> },
];

export default function ForumPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleNewPost = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect_url=${pathname}`); // Or specific create post page if different
    } else {
      // Logic to navigate to new post creation page or open modal
      toast({ title: "New Post (Simulated)", description: "Redirecting to create new post page (simulated)." });
      // router.push('/forum/create-post'); // Example
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="mb-10 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Carversal Forums</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow car enthusiasts, share knowledge, and discuss everything automotive.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:max-w-md">
            <Input type="search" placeholder="Search forums..." className="pl-10 text-base" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto"
            onClick={handleNewPost}
          >
            <PlusCircle className="mr-2 h-5 w-5" /> New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forumCategories.map(category => (
            <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-4">
                {category.icon}
                <div>
                  <CardTitle className="font-headline text-xl">
                    <Link href={`/forum/${category.id}`} className="hover:text-accent transition-colors">
                      {category.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Threads: {category.threads}</span>
                  <span>Posts: {category.posts}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

    