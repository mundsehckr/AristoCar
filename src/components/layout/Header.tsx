
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, Briefcase, MessageCircle, UserCircle, LogOut, ShieldAlert, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, loading, hasUnreadMessages } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = isAuthenticated && user?.role === 'admin';

  const navLinks = [
    { href: '/search', label: 'Buy Cars', icon: <Search className="h-4 w-4" /> },
    { href: '/sell/create-listing', label: 'Sell Car', icon: <Briefcase className="h-4 w-4" /> },
    { href: '/forum', label: 'Forum', icon: <MessageCircle className="h-4 w-4" /> },
    ...(isAuthenticated ? [{ href: '/messages', label: 'Messages', icon: <Mail className="h-4 w-4" />, hasNotification: hasUnreadMessages }] : [])
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-background/60 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <Button key={link.label} variant="ghost" asChild className="text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 relative">
                <Link href={link.href}>
                  {link.icon}
                  <span className="ml-1">{link.label}</span>
                  {link.hasNotification && (
                    <span className="absolute top-2 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />
                  )}
                </Link>
              </Button>
            ))}
            {isAdmin && (
              <Button variant="ghost" asChild className="text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10">
                <Link href="/admin">
                  <ShieldAlert className="h-4 w-4" />
                  <span className="ml-1">Admin</span>
                </Link>
              </Button>
            )}
          </nav>
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <>
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
              </>
            ) : isAuthenticated && user ? (
              <>
                <Button variant="ghost" asChild className="text-sm text-foreground hover:text-accent hover:bg-accent/10">
                  <Link href="/profile">
                    <UserCircle className="h-5 w-5 mr-1" /> {user.name}
                  </Link>
                </Button>
                <Button onClick={logout} variant="outline" className="text-sm border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="text-sm border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="text-sm bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <Logo />
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-foreground">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4 mb-8">
                    {navLinks.map((link) => (
                      <Button key={link.label} variant="ghost" asChild className="justify-start text-lg relative" onClick={() => setMobileMenuOpen(false)}>
                        <Link href={link.href}>
                          {link.icon}
                          <span className="ml-2">{link.label}</span>
                           {link.hasNotification && (
                            <span className="absolute left-6 top-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />
                          )}
                        </Link>
                      </Button>
                    ))}
                    {isAdmin && (
                      <Button variant="ghost" asChild className="justify-start text-lg" onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/admin">
                          <ShieldAlert className="h-5 w-5 mr-2" />
                          <span className="ml-0.5">Admin</span>
                        </Link>
                      </Button>
                    )}
                    {!loading && isAuthenticated && user && (
                       <Button variant="ghost" asChild className="justify-start text-lg" onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/profile">
                          <UserCircle className="h-5 w-5 mr-2" /> {user.name}
                        </Link>
                      </Button>
                    )}
                  </nav>
                  <div className="mt-auto flex flex-col space-y-3">
                    {loading ? (
                       <Skeleton className="h-10 w-full" />
                    ) : isAuthenticated ? (
                      <Button onClick={() => { logout(); setMobileMenuOpen(false); }} variant="outline" className="w-full text-lg">
                         <LogOut className="h-5 w-5 mr-2" /> Logout
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" asChild className="w-full text-lg" onClick={() => setMobileMenuOpen(false)}>
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="w-full text-lg" onClick={() => setMobileMenuOpen(false)}>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
