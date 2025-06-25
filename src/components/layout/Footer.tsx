
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Logo & About */}
          <div>
            <Logo /> {/* Assuming Logo component adapts or is styled for dark bg */}
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Carversal is India's emerging C2C marketplace for buying and selling pre-owned cars, offering transparency and AI-powered assistance.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-accent transition-colors"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-accent transition-colors"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-accent transition-colors"><Instagram size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-accent transition-colors"><Linkedin size={20} /></Link>
              <Link href="#" aria-label="YouTube" className="text-gray-400 hover:text-accent transition-colors"><Youtube size={20} /></Link>
            </div>
          </div>

          {/* Column 2: Our Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-white mb-4">Our Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/search" className="hover:text-accent transition-colors">Inventory</Link></li> {/* Mapped from image */}
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/sell/create-listing" className="hover:text-accent transition-colors">Sell Your Car</Link></li>
            </ul>
          </div>

          {/* Column 3: Other Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-white mb-4">Other Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/support" className="hover:text-accent transition-colors">Support</Link></li> {/* Added */}
              <li><Link href="/sitemap" className="hover:text-accent transition-colors">Sitemap</Link></li> {/* Added */}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-white mb-4">Subscribe Newsletter</h3>
            <p className="text-sm text-gray-400 mb-3">Get latest updates, offers, and automotive news delivered to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500 focus:ring-accent focus:border-accent h-11 flex-grow" 
              />
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground h-11">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Carversal Marketplace. All Rights Reserved. Designed by Carversal Team.</p>
        </div>
      </div>
    </footer>
  );
}
    
