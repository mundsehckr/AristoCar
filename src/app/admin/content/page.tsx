
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, ArrowLeft, ListChecks } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminSubPageHeader = ({ title }: { title: string }) => {
  const { logout: authLogout, user } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2 hover:bg-primary-foreground/10">
            <Link href="/admin"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <Link href="/admin" className="font-headline text-xl sm:text-2xl">{title}</Link>
        </div>
        {user && <span className="text-sm hidden sm:inline">({user.email} - {user.role})</span>}
        <Button variant="ghost" className="hover:bg-primary-foreground/10" onClick={() => {
            if (authLogout) authLogout();
          }}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default function AdminContentModerationPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login?redirect_url=/admin/content');
      } else if (user?.role !== 'admin') {
        router.push('/'); 
      } else {
        setIsAuthorized(true);
      }
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading || !isAuthorized) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/30">
        <AdminSubPageHeader title="Content Moderation" />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          {loading && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-2 text-lg text-muted-foreground">Loading Content Moderation...</p>
            </>
          )}
          {!loading && !isAuthenticated && (
             <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Required</AlertTitle>
                <AlertDescription>
                 You need to be logged in to access this page. Redirecting to login...
                </AlertDescription>
              </Alert>
          )}
          {!loading && isAuthenticated && user?.role !== 'admin' && (
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Unauthorized Access</AlertTitle>
              <AlertDescription>
                You do not have permission to view this page. Redirecting to homepage...
              </AlertDescription>
            </Alert>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <AdminSubPageHeader title="Content Moderation" />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-xl bg-card/95 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <ListChecks className="h-8 w-8 text-accent" />
                    <div>
                        <CardTitle className="font-headline text-3xl text-primary">Content Moderation</CardTitle>
                        <CardDescription>Review and manage listings, reviews, and forum posts.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                    <ListChecks className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">Content Moderation Tools Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                        This section will provide tools to moderate user-generated content on the platform.
                    </p>
                    <Button variant="outline" className="mt-6" asChild>
                        <Link href="/admin">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Admin Dashboard
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
