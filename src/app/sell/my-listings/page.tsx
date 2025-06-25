
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle, List, Edit, Trash2, ToggleRight, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const IndianRupee = ({ amount }: { amount: number }) => <>₹{amount.toLocaleString('en-IN')}</>;

const sampleUserListings = [
    { id: '1', title: '2021 Maruti Swift VXI', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'hatchback red side', price: 650000, status: 'Active', views: 1254, messages: 12, dateListed: '2024-07-15' },
    { id: '2', title: '2019 Honda Amaze Diesel', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'sedan silver elegant', price: 780000, status: 'Sold', views: 2500, messages: 35, dateListed: '2024-06-01' },
    { id: '3', title: '2022 Hyundai Creta SX', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'suv white modern', price: 1500000, status: 'Active', views: 890, messages: 5, dateListed: '2024-07-22' },
    { id: '4', title: '2020 Tata Nexon EV', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'ev teal compact', price: 1400000, status: 'Inactive', views: 500, messages: 2, dateListed: '2024-05-10' },
];

export default function MyListingsPage() {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect_url=/sell/my-listings');
        }
    }, [isAuthenticated, loading, router]);


    if (loading || !isAuthenticated || !user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="ml-4 text-lg text-muted-foreground">Loading My Listings...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <h1 className="font-headline text-3xl sm:text-4xl text-primary">My Listings</h1>
                        <p className="text-muted-foreground mt-1">Manage your active, inactive, and sold car listings.</p>
                    </div>
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4 md:mt-0">
                        <Link href="/sell/create-listing"><PlusCircle className="mr-2 h-4 w-4" /> Create New Listing</Link>
                    </Button>
                </div>
                
                {sampleUserListings.length > 0 ? (
                    <div className="space-y-6">
                        {sampleUserListings.map((listing) => (
                             <Card key={listing.id} className="shadow-lg bg-card/95 backdrop-blur-sm flex flex-col md:flex-row overflow-hidden">
                                <div className="md:w-1/4 relative">
                                    <Image src={listing.imageUrl} alt={listing.title} width={400} height={300} className="object-cover w-full h-full" data-ai-hint={listing.imageHint} />
                                    <Badge 
                                        className={`absolute top-2 left-2 text-white ${listing.status === 'Active' ? 'bg-green-600' : listing.status === 'Sold' ? 'bg-slate-600' : 'bg-orange-500'}`}
                                    >
                                        {listing.status}
                                    </Badge>
                                </div>
                                <div className="md:w-3/4 p-4 flex flex-col">
                                    <div className="flex-grow">
                                        <h3 className="font-headline text-xl text-primary hover:text-accent"><Link href={`/vehicles/${listing.id}`}>{listing.title}</Link></h3>
                                        <p className="text-lg font-semibold text-accent"><IndianRupee amount={listing.price} /></p>
                                        <div className="text-sm text-muted-foreground mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                                            <span><strong>Views:</strong> {listing.views}</span>
                                            <span><strong>Messages:</strong> {listing.messages}</span>
                                            <span><strong>Listed On:</strong> {new Date(listing.dateListed).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <Separator className="my-4"/>
                                    <div className="flex flex-wrap gap-2 justify-end">
                                        <Button variant="outline" size="sm"><Edit className="mr-1.5 h-3 w-3"/> Edit</Button>
                                        {listing.status === 'Active' && <Button variant="outline" size="sm" className="text-red-600 border-red-600/50 hover:bg-red-50 hover:text-red-700"><Trash2 className="mr-1.5 h-3 w-3"/> Delete</Button>}
                                        {listing.status === 'Active' && <Button variant="secondary" size="sm"><ToggleRight className="mr-1.5 h-4 w-4"/> Mark as Sold</Button>}
                                        {listing.status !== 'Active' && <Button variant="outline" size="sm">Re-list Vehicle</Button>}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Alert className="max-w-xl mx-auto">
                        <Info className="h-4 w-4" />
                        <AlertTitle>No Listings Yet!</AlertTitle>
                        <AlertDescription>
                            You haven't listed any cars for sale. Click the button below to get started and reach thousands of potential buyers.
                        </AlertDescription>
                        <Button asChild size="sm" className="mt-4">
                             <Link href="/sell/create-listing">Create Your First Listing</Link>
                        </Button>
                    </Alert>
                )}
            </main>
            <Footer />
        </div>
    );
}

