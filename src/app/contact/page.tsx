
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message cannot exceed 500 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactUsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    console.log("Contact Form Submitted:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent (Simulated)",
      description: "Thank you for contacting us! We'll get back to you soon.",
    });
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20"> {/* pt-20 for fixed header */}
        {/* Hero Section */}
        <section 
          className="py-20 sm:py-32 bg-cover bg-center text-white relative" 
          style={{ backgroundImage: "url('https://placehold.co/1920x400.png?text=')"}}
          data-ai-hint="contact us banner"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">Get In Touch</h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
              We're here to help and answer any question you might have. We look forward to hearing from you!
            </p>
          </div>
        </section>

        {/* Contact Details & Form Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Our Office</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 mt-1 text-accent flex-shrink-0" />
                      <span>123 Carversal Avenue, Auto Nagar, Mumbai, Maharashtra 400001, India</span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                      <span>+91 22 1234 5678</span>
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                      <span>support@carversal.com</span>
                    </p>
                  </CardContent>
                </Card>

                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="https://placehold.co/600x400.png?text=Map+Placeholder" 
                    alt="Map to Carversal Office" 
                    width={600} 
                    height={400} 
                    className="w-full object-cover"
                    data-ai-hint="office map location"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary">Send Us a Message</CardTitle>
                  <CardDescription>Have questions or feedback? Fill out the form below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" {...register("name")} placeholder="John Doe" />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" {...register("subject")} placeholder="e.g., Inquiry about listing #123" />
                      {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" {...register("message")} rows={5} placeholder="Your message here..." />
                      {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
