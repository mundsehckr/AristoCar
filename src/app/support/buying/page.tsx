
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Search, Filter, MessageSquare, ShieldCheck, FileText, Users, Car, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const buyingFaqs = [
  {
    question: "How do I search for a car on Carversal?",
    answer: "You can use the main search bar on the homepage or the dedicated Search page. Enter keywords like make, model, location, or features. You can also use our AI-powered Natural Language Search by describing the car you want (e.g., 'used Honda City under 8 lakhs in Mumbai').",
    href: "/search"
  },
  {
    question: "What are the advanced search filters available?",
    answer: "Our advanced search allows you to filter by brand, model, year, price range, fuel type, transmission, body type, mileage, number of owners, location (pincode/city), and specific features like sunroof, airbags, etc. You can access it from the homepage or search results page.",
    href: "/?openAdvancedSearch=true" // Updated link
  },
  {
    question: "How can I use the AI Natural Language Search?",
    answer: "On the Search page, type your query naturally into the AI search bar (e.g., 'Show me automatic SUVs below 10 lakhs in Bangalore with good mileage'). Our AI will attempt to parse this and pre-fill the relevant filters for you.",
    href: "/search"
  },
  {
    question: "What should I look for in a vehicle listing?",
    answer: "Pay attention to clear photos from all angles (interior, exterior, engine), detailed description, mileage, year, number of owners, service history mentions, and location. Check for information on RC (Registration Certificate), insurance validity, and PUC.",
  },
  {
    question: "How do I contact a seller?",
    answer: "On each vehicle detail page, there's a 'Contact Seller' button or a messaging option. This allows you to communicate securely with the seller through our platform to ask questions or arrange a viewing.",
  },
  {
    question: "What is a pre-purchase inspection (PPI) and should I get one?",
    answer: "A PPI is an inspection done by a trusted mechanic before you buy a used car. It can reveal potential mechanical or cosmetic issues. We highly recommend getting a PPI for any used car, especially if it's not certified by a third party.",
  },
  {
    question: "How does the 'Make an Offer' feature work?",
    answer: "Some listings may allow you to make an offer. This sends your proposed price to the seller. They can then accept, reject, or counter your offer through the platform's messaging system.",
  },
  {
    question: "What are some tips for negotiating the price?",
    answer: "Research the car's market value in your area. Be polite and respectful. Point out any discrepancies or issues found during inspection to support your negotiation. Be prepared to walk away if you can't agree on a fair price.",
  },
  {
    question: "What should I check during a vehicle viewing?",
    answer: "Inspect the car in daylight. Check the exterior for rust/dents, interior for wear/tear, engine bay for leaks, and test all electronics. Take a test drive covering different road conditions. Verify documents like RC, insurance, and service records.",
  },
  {
    question: "How do I ensure the vehicle documents (RC, Insurance, PUC) are genuine?",
    answer: "Carefully examine the original documents. Cross-verify the chassis number and engine number on the RC with the actual vehicle. You can also use online RTO portals (like Parivahan) to verify vehicle details using the registration number.",
  },
  {
    question: "What is the process for RC transfer?",
    answer: "The RC transfer process involves submitting forms (like Form 29 & 30) to the RTO, along with necessary documents from both buyer and seller (ID proofs, address proofs, NOC if applicable). The specific process can vary slightly by state. Both buyer and seller usually need to be present or provide authorized signatures.",
  },
];

export default function BuyingSearchingSupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="text-center mb-12">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Buying & Searching Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your guide to finding and purchasing your next car on Carversal.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto space-y-3">
          {buyingFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card/80 backdrop-blur-sm shadow-md rounded-lg border border-border">
              <AccordionTrigger className="p-4 sm:p-6 text-left font-semibold hover:no-underline hover:text-accent text-base sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 sm:p-6 pt-0 text-muted-foreground leading-relaxed">
                <p>{faq.answer}</p>
                {faq.href && (
                  <Button variant="link" asChild className="p-0 mt-2 text-accent">
                    <Link href={faq.href}>Go to relevant page &rarr;</Link>
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
