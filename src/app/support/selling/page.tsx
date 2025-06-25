
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tag, PencilRuler, Camera, DollarSign, MessageSquare, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sellingFaqs = [
  {
    question: "How do I list my car for sale on Carversal?",
    answer: "It's easy! Click on the 'Sell Your Car' button (usually in the header or on your dashboard). Our platform will guide you through the steps, including uploading photos and providing vehicle details. Our AI tools can even help generate descriptions and suggest prices.",
    href: "/sell/create-listing"
  },
  {
    question: "What information and documents are required to list my car?",
    answer: "You'll need clear photos of your car (interior, exterior, engine), details like make, model, year, mileage, variant, fuel type, and registration number. Having your RC (Registration Certificate) handy is important for accurate information. Disclosing the condition honestly is key.",
  },
  {
    question: "How can Carversal's AI tools help me create a better listing?",
    answer: "Our AI can assist you by: 1. Generating engaging listing titles and descriptions from your photos. 2. Analyzing vehicle photos for condition assessment. 3. Suggesting a competitive market price based on your car's details and Pincode.",
    href: "/sell/create-listing"
  },
  {
    question: "How do I set the right price for my car?",
    answer: "You can use our AI Price Suggestion tool which considers market data for your car model and location (Pincode). Also, research similar listings on Carversal and other platforms. Consider your car's condition, mileage, and any unique features.",
  },
  {
    question: "What are some tips for taking good photos of my car?",
    answer: "Clean your car thoroughly. Take photos in good daylight, avoiding harsh shadows. Capture all angles: front, back, sides, interior (dashboard, seats), engine bay, and boot. Highlight any special features or recent upgrades. Clear, high-quality photos attract more buyers.",
  },
  {
    question: "How should I handle inquiries from potential buyers?",
    answer: "Respond promptly and politely through Carversal's secure messaging system. Be prepared to answer questions honestly and provide additional information if requested. Schedule viewings in a safe, public place.",
  },
  {
    question: "What is the process for transferring ownership (RC transfer) once the car is sold?",
    answer: "The RC transfer involves submitting specific forms (like Form 29 & 30) to your local RTO. Both buyer and seller need to provide documentation (ID, address proof). The exact process can vary by state. It's crucial to complete this to avoid future liabilities.",
  },
  {
    question: "Are there any fees for selling my car on Carversal?",
    answer: "Please refer to our 'Pricing' or 'Fees' section for the most current information on any listing fees or commission structures. We may offer free basic listings with optional paid promotions.",
    // href: "/pricing" // Example if a pricing page exists
  },
  {
    question: "How can I make my listing stand out and attract more buyers?",
    answer: "Provide a detailed and honest description. Upload high-quality photos from multiple angles. Price your car competitively. Respond quickly to inquiries. Consider getting your car professionally cleaned or detailed before listing.",
  },
  {
    question: "What safety precautions should I take when meeting potential buyers for a viewing or test drive?",
    answer: "Meet in a well-lit, public place, preferably during the day. Inform a friend or family member about the meeting. Accompany the buyer on test drives or ensure you have their valid ID if they go alone (though accompanying is safer). Trust your instincts.",
  },
];

export default function ListingSellingSupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="text-center mb-12">
          <Tag className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Listing & Selling Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know to successfully sell your car on Carversal.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto space-y-3">
          {sellingFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card/80 backdrop-blur-sm shadow-md rounded-lg border border-border">
              <AccordionTrigger className="p-4 sm:p-6 text-left font-semibold hover:no-underline hover:text-accent text-base sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 sm:p-6 pt-0 text-muted-foreground leading-relaxed">
                <p>{faq.answer}</p>
                {faq.href && (
                  <Button variant="link" asChild className="p-0 mt-2 text-accent">
                    <Link href={faq.href}>Learn more here &rarr;</Link>
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center max-w-2xl mx-auto">
            <h3 className="font-headline text-2xl text-primary mb-4">Still Need Help?</h3>
            <p className="text-muted-foreground mb-6">
                If you couldn't find the answer to your question, please feel free to reach out to our support team.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Contact Support</Link>
            </Button>
        </div>

      </main>
      <Footer />
    </div>
  );
}
