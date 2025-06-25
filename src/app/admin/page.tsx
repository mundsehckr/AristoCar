
"use client";

import { useEffect, useState } from 'react'; // Added useState here
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
// import { Header } from '@/components/layout/Header'; // Assuming admin has a different header or layout
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ListChecks, ShieldAlert, BarChart3, Settings, LogOut, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


// Simplified Admin Header for this placeholder
const AdminHeader = () => {
  const { logout: authLogout, user } = useAuth(); // Get user to display name or role if needed

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/admin" className="font-headline text-2xl">Admin Control Center</Link>
        {user && <span className="text-sm hidden sm:inline">({user.email} - {user.role})</span>}
        <Button variant="ghost" className="hover:bg-primary-foreground/10" onClick={() => {
            if (authLogout) authLogout();
          }}>
          <LogOut className="mr-2 h-4 w-4"/> Logout
        </Button>
      </div>
    </header>
  );
};


const adminSections = [
  { title: "User Management", icon: <Users className="h-8 w-8 text-accent" />, href: "/admin/users", description: "Manage users, roles, and permissions." },
  { title: "Content Moderation", icon: <ListChecks className="h-8 w-8 text-accent" />, href: "/admin/content", description: "Review and moderate listings and forum posts." },
  { title: "Financial Management", icon: <BarChart3 className="h-8 w-8 text-accent" />, href: "/admin/financials", description: "Oversee transactions, payouts, and financial reports." },
  { title: "Analytics Dashboard", icon: <BarChart3 className="h-8 w-8 text-accent" />, href: "/admin/analytics", description: "View platform performance and user behavior." },
  { title: "System Health", icon: <Settings className="h-8 w-8 text-accent" />, href: "/admin/system", description: "Monitor system status and configure settings." },
  { title: "Dispute Resolution", icon: <ShieldAlert className="h-8 w-8 text-accent" />, href: "/admin/disputes", description: "Handle and resolve user disputes." },
];

export default function AdminDashboardPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login?redirect_url=/admin');
      } else if (user?.role !== 'admin') {
        router.push('/'); // Redirect non-admins to homepage
      } else {
        setIsAuthorized(true);
      }
    }
  }, [isAuthenticated, loading, user, router]);


  if (loading || !isAuthorized) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/30">
         {/* Show AdminHeader only if loading for an admin or already authorized.
             Otherwise, a generic header might be better or no header if redirection is quick.
             For simplicity, we show it, but in a real app, you might hide it during the auth check.
         */}
        <AdminHeader />
        <main className="flex-grow flex flex-col items-center justify-center">
          {loading && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg text-muted-foreground">Loading Admin Dashboard...</p>
            </>
          )}
          {!loading && !isAuthenticated && ( // Should be caught by redirect, but as a fallback UI
             <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Required</AlertTitle>
                <AlertDescription>
                 You need to be logged in to access this page. Redirecting to login...
                </AlertDescription>
              </Alert>
          )}
          {!loading && isAuthenticated && user?.role !== 'admin' && ( // User is logged in but not admin
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
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-headline text-4xl text-primary mb-10 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminSections.map(section => (
            <Link key={section.title} href={section.href} className="block">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-accent h-full bg-card/90 backdrop-blur-sm">
                <CardHeader className="items-center text-center">
                  {section.icon}
                  <CardTitle className="font-headline text-2xl mt-3">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
