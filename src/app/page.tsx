
import * as React from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { HomepageSearchFilterSection } from '@/components/landing/HomepageSearchFilterSection';
import { LookingToSection } from '@/components/landing/LookingToSection';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components that are below the fold
const FeaturedListingsSection = dynamic(() => import('@/components/landing/FeaturedListingsSection').then(mod => mod.FeaturedListingsSection), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
});
const StatsBannerSection = dynamic(() => import('@/components/landing/StatsBannerSection').then(mod => mod.StatsBannerSection), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
});
const TrendingCarsSection = dynamic(() => import('@/components/landing/TrendingCarsSection').then(mod => mod.TrendingCarsSection), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
});
const TestimonialsSection = dynamic(() => import('@/components/landing/TestimonialsSection').then(mod => mod.TestimonialsSection), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
});
const LatestBlogPostsSection = dynamic(() => import('@/components/landing/LatestBlogPostsSection').then(mod => mod.LatestBlogPostsSection), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
});
const BrandsCarouselSection = dynamic(() => import('@/components/landing/BrandsCarouselSection').then(mod => mod.BrandsCarouselSection), {
  loading: () => <Skeleton className="h-[100px] w-full" />,
});
const CTABannerSection = dynamic(() => import('@/components/landing/CTABannerSection').then(mod => mod.CTABannerSection), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
});


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20"> {/* pt-20 for fixed header */}
        <HeroSection />
        <HomepageSearchFilterSection />
        <LookingToSection />
        <FeaturedListingsSection />
        <StatsBannerSection />
        <TrendingCarsSection />
        <TestimonialsSection />
        <LatestBlogPostsSection />
        <BrandsCarouselSection />
        <CTABannerSection />
      </main>
      <Footer />
    </div>
  );
}
