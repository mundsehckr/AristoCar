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

const IndianRupee = ({ amount }: { amount: number }) => <>₹{amount?.toLocaleString('en-IN') ?? '--'}</>;

export default function MyListingsPage() {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();
    const [userListings, setUserListings] = useState<any[]>([]);
    const [fetching, setFetching] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect_url=/sell/my-listings');
        }
    }, [isAuthenticated, loading, router]);

    const fetchListings = async () => {
        setFetching(true);
        try {
            const res = await fetch('/api/listings', { method: 'GET' });
            const data = await res.json();
            if (res.ok && data.listings) {
                setUserListings(data.listings);
            } else {
                setUserListings([]);
            }
        } catch {
            setUserListings([]);
        }
        setFetching(false);
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchListings();
        }
    }, [isAuthenticated, user]);

    // DELETE handler
    const handleDelete = async (listingId: string) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        setActionLoading(listingId);
        try {
            const res = await fetch('/api/listings', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ listingId }),
            });
            if (res.ok) {
                setUserListings(listings => listings.filter(l => l._id !== listingId));
            } else {
                alert('Failed to delete listing.');
            }
        } catch {
            alert('Failed to delete listing.');
        }
        setActionLoading(null);
    };

    // MARK AS SOLD handler
    const handleMarkAsSold = async (listingId: string) => {
        setActionLoading(listingId);
        try {
            const res = await fetch('/api/listings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ listingId, update: { status: "Sold" } }),
            });
            if (res.ok) {
                setUserListings(listings =>
                    listings.map(l =>
                        l._id === listingId ? { ...l, status: "Sold" } : l
                    )
                );
            } else {
                alert('Failed to mark as sold.');
            }
        } catch {
            alert('Failed to mark as sold.');
        }
        setActionLoading(null);
    };

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
                
                {fetching ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-3 text-muted-foreground">Fetching your listings...</span>
                    </div>
                ) : userListings.length > 0 ? (
                    <div className="space-y-6">
                        {userListings.map((listing) => (
                             <Card key={listing._id} className="shadow-lg bg-card/95 backdrop-blur-sm flex flex-col md:flex-row overflow-hidden">
                                <div className="md:w-1/4 relative">
                                    <Image
                                        src={listing.photoUrls?.[0] || 'https://placehold.co/400x300.png'}
                                        alt={listing.title || 'Car Image'}
                                        width={400}
                                        height={300}
                                        className="object-cover w-full h-full"
                                    />
                                    <Badge 
                                        className={`absolute top-2 left-2 text-white ${listing.status === 'Active' ? 'bg-green-600' : listing.status === 'Sold' ? 'bg-slate-600' : 'bg-orange-500'}`}
                                    >
                                        {listing.status || 'Active'}
                                    </Badge>
                                </div>
                                <div className="md:w-3/4 p-4 flex flex-col">
                                    <div className="flex-grow">
                                        <h3 className="font-headline text-xl text-primary hover:text-accent">
                                            <Link href={`/vehicles/${listing._id}`}>{listing.title || `${listing.year} ${listing.make} ${listing.model}`}</Link>
                                        </h3>
                                        <p className="text-lg font-semibold text-accent">
                                            <IndianRupee amount={listing.suggestedPrice || listing.price || 0} />
                                        </p>
                                        <div className="text-sm text-muted-foreground mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                                            <span><strong>Views:</strong> {listing.views ?? '--'}</span>
                                            <span><strong>Messages:</strong> {listing.messages ?? '--'}</span>
                                            <span><strong>Listed On:</strong> {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : '--'}</span>
                                        </div>
                                    </div>
                                    <Separator className="my-4"/>
                                    <div className="flex flex-wrap gap-2 justify-end">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/sell/edit-listing/${listing._id}`}>
                                                <Edit className="mr-1.5 h-3 w-3"/> Edit
                                            </Link>
                                        </Button>
                                        {(!listing.status || listing.status === 'Active') && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 border-red-600/50 hover:bg-red-50 hover:text-red-700"
                                                onClick={() => handleDelete(listing._id)}
                                                disabled={actionLoading === listing._id}
                                            >
                                                {actionLoading === listing._id ? <Loader2 className="mr-1.5 h-3 w-3 animate-spin" /> : <Trash2 className="mr-1.5 h-3 w-3" />}
                                                Delete
                                            </Button>
                                        )}
                                        {(!listing.status || listing.status === 'Active') && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleMarkAsSold(listing._id)}
                                                disabled={actionLoading === listing._id}
                                            >
                                                {actionLoading === listing._id ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <ToggleRight className="mr-1.5 h-4 w-4" />}
                                                Mark as Sold
                                            </Button>
                                        )}
                                        {listing.status && listing.status !== 'Active' && (
                                            <Button variant="outline" size="sm" disabled>
                                                Re-list Vehicle
                                            </Button>
                                        )}
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