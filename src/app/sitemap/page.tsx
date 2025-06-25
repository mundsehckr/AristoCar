
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, Info, Mail, Rss, HelpCircle, Search, UploadCloud, MessageSquare, 
  UserCircle, UserCog, LayoutDashboard, LogIn, UserPlus, LifeBuoy, 
  Shield, ShoppingCart, Tag, CreditCard, Wrench, FileText, LockIcon, Map, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const sitemapSections = [
  {
    title: "Main Pages",
    icon: <Home className="h-6 w-6 text-accent" />,
    links: [
      { name: "Home", href: "/", icon: <Home className="mr-2 h-4 w-4" /> },
      { name: "About Us", href: "/about", icon: <Info className="mr-2 h-4 w-4" /> },
      { name: "Contact Us", href: "/contact", icon: <Mail className="mr-2 h-4 w-4" /> },
      { name: "Our Blog", href: "/blog", icon: <Rss className="mr-2 h-4 w-4" /> },
      { name: "FAQ", href: "/faq", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
    ]
  },
  {
    title: "Core Features",
    icon: <Search className="h-6 w-6 text-accent" />,
    links: [
      { name: "Buy Cars (Search)", href: "/search", icon: <Search className="mr-2 h-4 w-4" /> },
      { name: "Sell Your Car", href: "/sell/create-listing", icon: <UploadCloud className="mr-2 h-4 w-4" /> },
      { name: "Community Forum", href: "/forum", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
      { name: "My Messages", href: "/messages", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
    ]
  },
  {
    title: "User Account",
    icon: <UserCircle className="h-6 w-6 text-accent" />,
    links: [
      { name: "My Profile", href: "/profile", icon: <UserCircle className="mr-2 h-4 w-4" /> },
      { name: "Edit Profile", href: "/profile/edit", icon: <UserCog className="mr-2 h-4 w-4" /> },
      { name: "My Dashboard", href: "/seller/dashboard", icon: <LayoutDashboard className="mr-2 h-4 w-4" /> },
      { name: "Login", href: "/login", icon: <LogIn className="mr-2 h-4 w-4" /> },
      { name: "Sign Up", href: "/signup", icon: <UserPlus className="mr-2 h-4 w-4" /> },
    ]
  },
  {
    title: "Support Center",
    icon: <LifeBuoy className="h-6 w-6 text-accent" />,
    links: [
      { name: "Main Support Page", href: "/support", icon: <LifeBuoy className="mr-2 h-4 w-4" /> },
      { name: "Account & Profile", href: "/support/account", icon: <Shield className="mr-2 h-4 w-4" /> },
      { name: "Buying & Searching", href: "/support/buying", icon: <ShoppingCart className="mr-2 h-4 w-4" /> },
      { name: "Listing & Selling", href: "/support/selling", icon: <Tag className="mr-2 h-4 w-4" /> },
      { name: "Payments & Transactions", href: "/support/payments", icon: <CreditCard className="mr-2 h-4 w-4" /> },
      { name: "Technical Support", href: "/support/technical", icon: <Wrench className="mr-2 h-4 w-4" /> },
    ]
  },
  {
    title: "Legal & Information",
    icon: <FileText className="h-6 w-6 text-accent" />,
    links: [
      { name: "Terms & Conditions", href: "/terms", icon: <FileText className="mr-2 h-4 w-4" /> },
      { name: "Privacy Policy", href: "/privacy", icon: <LockIcon className="mr-2 h-4 w-4" /> },
    ]
  },
];

export default function SitemapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="text-center mb-12">
          <Map className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Site Map</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An overview of all pages on the Carversal Marketplace website for easy navigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section) => (
            <Card key={section.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-4">
                {section.icon}
                <CardTitle className="font-headline text-xl text-primary">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Button variant="ghost" asChild className="w-full justify-start text-muted-foreground hover:text-accent hover:bg-accent/10">
                        <Link href={link.href}>
                          {link.icon}
                          {link.name}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
