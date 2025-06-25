
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wrench, ShieldAlert, Smartphone, WifiOff, Bug, FileText, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const technicalFaqs = [
  {
    question: "The website is loading slowly. What can I do?",
    answer: "First, check your internet connection. Try clearing your browser's cache and cookies. If the issue persists, it might be a temporary problem on our end. You can check our (hypothetical) System Status page or contact support.",
    // href: "/status" // Example if a status page exists
  },
  {
    question: "I'm encountering an error message. What does it mean?",
    answer: "Please take a screenshot or note down the exact error message. Try to remember the steps you took before the error occurred. This information will be very helpful if you need to contact support.",
  },
  {
    question: "Features on a page are not working correctly (e.g., buttons, forms).",
    answer: "Try refreshing the page. Ensure your browser is up to date. Sometimes, browser extensions can interfere; try disabling them temporarily. If the problem continues, please report it to us.",
  },
  {
    question: "I'm having trouble uploading photos for my listing.",
    answer: "Ensure your photos meet the specified requirements (e.g., file type JPG/PNG, size limits usually 2-5MB per photo). Check your internet connection, as large uploads can be sensitive to network stability. Try uploading one photo at a time.",
  },
  {
    question: "The mobile app (if applicable) is crashing or not working.",
    answer: "Make sure your app is updated to the latest version from the app store. Try restarting the app, and then your phone. If the issue persists, please report the bug with details about your device and operating system version.",
  },
  {
    question: "How do I report a bug or technical issue?",
    answer: "You can report bugs or technical issues through our Contact Us page. Please provide as much detail as possible: what you were doing, what happened, any error messages, your browser/device, and screenshots if possible. This helps us diagnose and fix the problem faster.",
    href: "/contact"
  },
  {
    question: "Where can I check for known platform outages or maintenance updates?",
    answer: "We aim to announce scheduled maintenance in advance. For unexpected outages, we would typically post updates on a (hypothetical) System Status page or our social media channels. For now, please contact support if you suspect an outage.",
    // href: "/status"
  },
];

export default function TechnicalSupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="text-center mb-12">
          <Wrench className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Technical Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find solutions to common technical issues and learn how to report problems on Carversal.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto space-y-3">
          {technicalFaqs.map((faq, index) => (
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
            <h3 className="font-headline text-2xl text-primary mb-4">Still Experiencing Issues?</h3>
            <p className="text-muted-foreground mb-6">
                If our FAQ doesn't resolve your technical problem, our support team is ready to assist you.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Contact Technical Support</Link>
            </Button>
        </div>

      </main>
      <Footer />
    </div>
  );
}
