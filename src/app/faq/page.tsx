
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ShoppingCart, Tag, ShieldCheck } from 'lucide-react';

const faqSections = [
  {
    title: "General Questions",
    icon: <HelpCircle className="h-6 w-6 mr-2 text-accent" />,
    faqs: [
      {
        question: "What is Carversal Marketplace?",
        answer: "Carversal Marketplace is a C2C (consumer-to-consumer) platform designed for individuals in India to buy and sell used cars. We aim to provide a secure, transparent, and user-friendly experience, enhanced with AI-powered tools.",
      },
      {
        question: "How is Carversal different from other used car platforms?",
        answer: "We focus on direct C2C transactions, empowering individual buyers and sellers. Our platform integrates AI for listing assistance, price suggestions, and more. We also prioritize user verification and transparent communication.",
      },
      {
        question: "Is Carversal available all over India?",
        answer: "We are launching progressively. Currently, our services are focused on major metropolitan areas, but we plan to expand nationwide. Please check our platform for service availability in your pincode.",
      },
    ],
  },
  {
    title: "For Buyers",
    icon: <ShoppingCart className="h-6 w-6 mr-2 text-accent" />,
    faqs: [
      {
        question: "How do I search for a car?",
        answer: "You can use our search bar with keywords or our advanced filters to narrow down by make, model, year, price, location (pincode), and more. Our AI-powered natural language search also helps you find cars by describing what you're looking for.",
      },
      {
        question: "How can I contact a seller?",
        answer: "Once you find a car you're interested in, you can use the secure messaging system on our platform to contact the seller directly to ask questions or arrange a viewing.",
      },
      {
        question: "Are the cars inspected?",
        answer: "As a C2C platform, Carversal does not directly inspect vehicles. However, sellers are encouraged to provide detailed information and photos. Some sellers may offer third-party inspection reports. We recommend buyers conduct their own due diligence, including a pre-purchase inspection if possible.",
      },
      {
        question: "How does payment work?",
        answer: "Payment terms and methods are decided and handled directly between the buyer and the seller. Carversal does not process payments for user-to-user transactions. We advise using secure and traceable payment methods that both parties agree upon. Always ensure you are comfortable with the payment arrangement before proceeding.",
      }
    ],
  },
  {
    title: "For Sellers",
    icon: <Tag className="h-6 w-6 mr-2 text-accent" />,
    faqs: [
      {
        question: "How do I list my car for sale?",
        answer: "Register on Carversal, click on 'Sell Your Car', and follow the guided steps. Our AI tools can help you generate listing details from photos and suggest a competitive price based on market data for your pincode.",
      },
      {
        question: "What information do I need to provide?",
        answer: "You'll need to provide details like make, model, year, mileage, condition, clear photos, and your expected price. Accurate information about the car's history and RC (Registration Certificate) is crucial.",
      },
      {
        question: "How much does it cost to list my car?",
        answer: "Please refer to our 'Pricing' or 'Fees' section for the most up-to-date information on listing fees, if any. We may offer free basic listings with options for premium promotion.",
      },
      {
        question: "How do I handle RC transfer?",
        answer: "The RC transfer process is the responsibility of the buyer and seller, as per RTO guidelines in your state. Carversal provides information and resources, but does not handle the physical transfer process.",
      }
    ],
  },
  {
    title: "Account & Safety",
    icon: <ShieldCheck className="h-6 w-6 mr-2 text-accent" />, // Corrected icon usage
    faqs: [
      {
        question: "Is my personal information safe?",
        answer: "We take your privacy seriously. Please review our Privacy Policy for details on how we collect, use, and protect your information. We use secure servers and encryption where appropriate.",
      },
      {
        question: "How do I verify my account?",
        answer: "We may offer account verification (KYC) to enhance trust. This typically involves submitting government-issued ID and address proof. Look for verification options in your profile settings.",
      },
      {
        question: "What if I encounter a fraudulent user or listing?",
        answer: "Please report any suspicious activity or listings to us immediately through the 'Report' feature or by contacting our support team. We investigate all reports seriously.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Carversal Marketplace. If you don't find your answer here, feel free to <a href="/contact" className="text-accent hover:underline">contact us</a>.
          </p>
        </div>

        {faqSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-10">
            <h2 className="font-headline text-2xl sm:text-3xl text-primary mb-6 flex items-center">
              {section.icon} {section.title}
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {section.faqs.map((faq, index) => (
                <AccordionItem key={`${sectionIndex}-${index}`} value={`item-${sectionIndex}-${index}`} className="bg-card/80 backdrop-blur-sm shadow-md rounded-lg border border-border">
                  <AccordionTrigger className="p-4 sm:p-6 text-left font-semibold hover:no-underline hover:text-accent text-base sm:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 sm:p-6 pt-0 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
