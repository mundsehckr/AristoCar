
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LifeBuoy, Search, MessageCircle, Users, ShoppingCart, Tag, HelpCircle, ShieldCheck, Settings, ArrowRight, CreditCard, Wrench } from 'lucide-react';
import Link from 'next/link';

const supportTopics = [
  { title: "Account & Profile", description: "Manage your account settings, password, and profile information.", icon: <Users className="h-8 w-8 text-accent" />, href: "/support/account" },
  { title: "Buying & Searching", description: "Help with finding cars, understanding listings, and making offers.", icon: <ShoppingCart className="h-8 w-8 text-accent" />, href: "/support/buying" },
  { title: "Listing & Selling", description: "Assistance with creating listings, managing sales, and pricing.", icon: <Tag className="h-8 w-8 text-accent" />, href: "/support/selling" },
  { title: "Payments & Transactions", description: "Information on payment methods, and transaction security guidance.", icon: <CreditCard className="h-8 w-8 text-accent" />, href: "/support/payments" },
  { title: "Technical Issues", description: "Troubleshooting platform errors, bugs, or performance problems.", icon: <Wrench className="h-8 w-8 text-accent" />, href: "/support/technical" },
  { title: "Platform Policies", description: "Understand our terms, privacy, and community guidelines.", icon: <HelpCircle className="h-8 w-8 text-accent" />, href: "/terms" },
];

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 bg-secondary/30"> {/* pt-20 for fixed header */}
        {/* Hero Section */}
        <section
          className="py-20 sm:py-32 bg-cover bg-center text-white relative"
          style={{ backgroundImage: "url('https://placehold.co/1920x400.png?text=')"}}
          data-ai-hint="support team helpdesk"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <LifeBuoy className="h-16 w-16 mx-auto mb-4 text-accent" />
            <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">Carversal Support Center</h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
              We're here to help you with any questions or issues you may have.
            </p>
          </div>
        </section>

        {/* Search FAQ & Quick Links Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <Card className="shadow-lg bg-card/90 backdrop-blur-sm p-6 text-center">
                <CardTitle className="font-headline text-2xl text-primary mb-3">Search Our Knowledge Base</CardTitle>
                <CardDescription className="mb-4 text-muted-foreground">Find quick answers to common questions in our FAQ.</CardDescription>
                <div className="relative mb-4">
                  <Input type="search" placeholder="e.g., How to reset password?" className="pl-10 h-11 text-base" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/faq">Go to FAQ <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
              </Card>
              <Card className="shadow-lg bg-card/90 backdrop-blur-sm p-6">
                <CardTitle className="font-headline text-2xl text-primary mb-3 text-center">Contact Support</CardTitle>
                <CardDescription className="mb-4 text-muted-foreground text-center">Can't find an answer? Reach out to our team.</CardDescription>
                <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-base h-12" asChild>
                        <Link href="/contact"><MessageCircle className="mr-3 h-5 w-5 text-accent"/> Send Us a Message</Link>
                    </Button>
                     <p className="text-sm text-muted-foreground text-center">Email: support@carversal.com</p>
                     <p className="text-sm text-muted-foreground text-center">Phone: +91 22 1234 5678 (Mon-Fri, 9am-6pm IST)</p>
                </div>
              </Card>
            </div>

            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">Browse Support Topics</h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Explore common areas where you might need assistance.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportTopics.map(topic => (
                <Card key={topic.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm text-center">
                  <CardHeader className="items-center">
                    <div className="bg-accent/10 p-4 rounded-full w-fit mb-4">
                        {topic.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{topic.description}</p>
                    <Button variant="link" asChild className="p-0 text-accent hover:text-accent/80">
                        <Link href={topic.href}>Learn More <ArrowRight className="ml-1.5 h-4 w-4"/></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
