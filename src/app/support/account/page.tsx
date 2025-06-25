
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, ShieldCheck, Edit3, Lock, Bell, KeyRound, Mail, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const accountFaqs = [
  {
    question: "How do I update my personal information (name, email, phone)?",
    answer: "You can update your personal information by navigating to your Profile page and clicking the 'Edit Profile' button. From there, you can modify your name, email address, phone number, and other profile details.",
    href: "/profile/edit"
  },
  {
    question: "How do I change my profile picture?",
    answer: "To change your profile picture, go to your 'Edit Profile' page. You'll find an option to upload a new avatar image.",
    href: "/profile/edit"
  },
  {
    question: "Where can I see my listings and activity?",
    answer: "Your active listings, past sales, and other account activity can be found in your 'My Dashboard' or 'Seller Dashboard'. You can typically access this from your profile menu.",
    href: "/seller/dashboard" // Assuming dashboard link
  },
  {
    question: "How do I change my password?",
    answer: "To change your password, go to your Account Settings or Profile page. Look for a 'Change Password' or 'Security Settings' option. You'll usually need to enter your current password and then your new password.",
    href: "/profile/edit" // Or a dedicated change password page if it exists
  },
  {
    question: "What should I do if I forget my password?",
    answer: "If you've forgotten your password, click on the 'Forgot Password?' link on the login page. You'll be prompted to enter your registered email address, and we'll send you a link to reset your password.",
    href: "/login"
  },
  {
    question: "How can I make my account more secure?",
    answer: "Use a strong, unique password for your Carversal account. Be cautious of phishing emails or messages asking for your login details. We may offer two-factor authentication (2FA) in the future for added security.",
  },
  {
    question: "How do I verify my account (KYC)?",
    answer: "Account verification or KYC (Know Your Customer) helps build trust on the platform. Look for a 'Verification' or 'KYC' section in your profile or account settings. You may need to submit government-issued ID and address proof.",
    href: "/profile"
  },
  {
    question: "Why is verification important?",
    answer: "Verification helps confirm your identity, making transactions safer and building trust between buyers and sellers. Verified users often get higher visibility or access to more features.",
  },
  {
    question: "How can I manage my notification preferences?",
    answer: "You can typically manage your email and platform notification preferences in your Account Settings or Profile page under a 'Notifications' or 'Preferences' section.",
    href: "/profile"
  },
  {
    question: "How do I deactivate or delete my account?",
    answer: "If you wish to deactivate or delete your account, please contact our support team through the Contact Us page. Note that some information may be retained for legal or security reasons as outlined in our Privacy Policy.",
    href: "/contact"
  },
];

export default function AccountProfileSupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <div className="text-center mb-12">
          <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="font-headline text-4xl sm:text-5xl text-primary mb-4">Account & Profile Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find help with managing your Carversal account, updating your profile, and ensuring your account security.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto space-y-3">
          {accountFaqs.map((faq, index) => (
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
