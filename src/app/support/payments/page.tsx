
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, CreditCard, MessageCircle, Banknote, ReceiptIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const paymentFaqs = [
  {
    question: "What payment methods are accepted on Carversal?",
    answer: "Carversal is a C2C platform where buyers and sellers transact directly. You should agree on a payment method with the other party. Common methods in India include bank transfers (NEFT/IMPS/RTGS), UPI, and demand drafts. We strongly recommend using secure and traceable payment methods.",
  },
  {
    question: "Are there any platform fees or commissions for transactions?",
    answer: "Please refer to our 'Fees & Charges' page (if available) or the information provided during the listing creation process for the most up-to-date details on any platform fees. Carversal may charge a nominal fee for listings or value-added services, which will be clearly communicated. We do not charge commission on the transaction value itself as payments are direct between users.",
    // href: "/fees" // Example if a fees page exists
  },
  {
    question: "How does Carversal contribute to payment security if it doesn't process payments?",
    answer: "While Carversal does not process payments directly, we promote a secure environment by: 1. Encouraging user verification. 2. Providing secure on-platform messaging to discuss terms. 3. Offering guidance on safe transaction practices. 4. Allowing users to report suspicious activity. The ultimate responsibility for payment security lies with the transacting users.",
  },
  {
    question: "Does Carversal offer an escrow service?",
    answer: "Currently, Carversal does not offer an in-built escrow service. Transactions and payments are conducted directly between buyers and sellers. Users interested in escrow services may explore third-party providers at their own discretion and risk. We may provide information on such services in the future.",
  },
  {
    question: "What should I do if a buyer/seller asks for advance payment or unusual payment methods?",
    answer: "Exercise extreme caution. Avoid making large advance payments before thoroughly inspecting the vehicle and verifying all documents. Be wary of requests for payment through untraceable methods or to accounts not directly belonging to the seller. If something feels suspicious, do not proceed and consider reporting it to Carversal support.",
  },
  {
    question: "How are refunds handled if a deal falls through after payment?",
    answer: "Since payments are made directly between users, any refunds must also be handled directly between the buyer and seller based on their mutual agreement and the terms they decided upon. Carversal does not mediate refund disputes for these C2C payments.",
  },
  {
    question: "What information should I get from the seller before making a payment?",
    answer: "Ensure you have the seller's full name, verified contact details, and ideally a copy of their government-issued ID. Confirm the vehicle's registration details match the seller's identity. Always get a written agreement or sale receipt detailing the car's specifics, agreed price, and payment terms before transferring funds.",
  },
  {
    question: "What if I suspect a fraudulent payment request or scam?",
    answer: "Do not proceed with any payment. Report the user and the listing to Carversal support immediately through the platform's reporting tools or our contact page. Provide as much detail as possible, including screenshots of communication if available. We take such reports seriously.",
    href: "/contact"
  },
];

export default function PaymentsTransactionsSupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="text-center mb-12">
          <CreditCard className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Payments & Transactions Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guidance on secure C2C payments and managing transactions on Carversal. Remember, Carversal does not process payments directly.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto space-y-3">
          {paymentFaqs.map((faq, index) => (
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
                If your payment or transaction query isn't covered, please contact our support team for guidance.
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
