
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle, Settings, PlusCircle, List, Loader2 } from 'lucide-react'; // Removed BarChart, LineChart, DollarSign
import Link from 'next/link';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Line, LineChart } from 'recharts'; // Re-added BarChart, LineChart for usage
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const IndianRupee = ({ amount }: { amount: number }) => <>₹{amount.toLocaleString('en-IN')}</>;

const chartData = [
  { month: "Jan", views: 186, earnings: 80000 },
  { month: "Feb", views: 305, earnings: 200000 },
  { month: "Mar", views: 237, earnings: 120000 },
  { month: "Apr", views: 273, earnings: 190000 },
  { month: "May", views: 209, earnings: 130000 },
  { month: "Jun", views: 214, earnings: 140000 },
];

const chartConfig = {
  views: { label: "Views", color: "hsl(var(--accent))" },
  earnings: { label: "Earnings (₹)", color: "hsl(var(--primary))" },
} satisfies import("@/components/ui/chart").ChartConfig;


export default function SellerDashboardPage() {
  const { isAuthenticated, user, loading } = useAuth(); // Added user
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect_url=/seller/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated || !user) { // Added !user check
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">Loading Dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="font-headline text-3xl sm:text-4xl text-primary mb-4 md:mb-0">
            Welcome, {user.name}!
          </h1>
          <div className="flex gap-3">
            <Button asChild variant="outline">
                <Link href="/sell/my-listings"><List className="mr-2 h-4 w-4"/> My Listings</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/sell/create-listing"><PlusCircle className="mr-2 h-4 w-4"/> Create New Listing</Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Total Listing Views", value: "12,345", icon: <Eye className="h-6 w-6 text-accent" />, change: "+12%" },
            { title: "Active Listings", value: "3", icon: <List className="h-6 w-6 text-accent" /> },
            { title: "Messages Received", value: "28", icon: <MessageCircle className="h-6 w-6 text-accent" />, change: "+5 new" },
            { title: "Total Earnings", value: <IndianRupee amount={458000} />, icon: <span className="font-bold text-accent text-xl">₹</span>, change: <>+ <IndianRupee amount={25000}/> this month</> },
          ].map(metric => (
            <Card key={metric.title} className="shadow-lg bg-card/90 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.change && <p className="text-xs text-muted-foreground">{metric.change}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline">Listing Performance (Last 6 Months)</CardTitle>
                    <CardDescription>Views and Earnings Trends</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}> {/* Changed to LineChart for this example to use 'Line' component */}
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" stroke="hsl(var(--accent))" />
                                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--primary))" />
                                <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => (name === 'earnings' ? `₹${Number(value).toLocaleString('en-IN')}` : value)}/>} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Line yAxisId="left" type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} dot={false} />
                                <Line yAxisId="right" type="monotone" dataKey="earnings" stroke="var(--color-earnings)" strokeWidth={2} dot={false} name="Earnings (₹)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline">Market Insights</CardTitle>
                    <CardDescription>Average selling price for similar vehicles in your area.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-muted-foreground">Your average listing price: <span className="text-foreground font-semibold"><IndianRupee amount={750000} /></span></p>
                   <p className="text-muted-foreground">Market average for similar models: <span className="text-foreground font-semibold"><IndianRupee amount={720000} /></span></p>
                   <Alert>
                       <Settings className="h-4 w-4"/> {/* Using Settings as a generic icon */}
                       <AlertTitle>Optimization Tip</AlertTitle>
                       <AlertDescription>Consider listing competitively. Check detailed market reports for insights.</AlertDescription>
                   </Alert>
                   <Button variant="outline">View Market Reports</Button>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
