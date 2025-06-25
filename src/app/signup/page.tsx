"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from "next/link";
import { Chrome, FacebookIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phone: z.string().optional(),
  termsAccepted: z.literal<boolean>(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.2813 10.3156C19.3563 8.58437 18.0313 7.16562 16.2781 7.0875C14.9656 7.025 13.9375 7.80625 13.3719 8.625C12.6375 7.7875 11.5625 7.0875 10.3844 7.10312C8.58437 7.19687 7.25937 8.60937 7.25937 10.4219C7.25937 11.4344 7.65313 13.05 8.56562 14.5156C9.4125 15.8781 10.4844 17.575 11.9844 17.575C13.4844 17.575 13.8406 16.6281 15.1063 16.6281C16.3563 16.6281 16.6281 17.575 18.0313 17.56C19.4188 17.56 20.2344 15.9812 21.0313 14.6281C21.375 14.0109 21.0609 13.4312 20.5672 12.5531C19.9187 11.4062 20.0359 10.4687 19.2813 10.3156ZM15.0047 5.52187C15.5875 4.80312 16.0109 3.825 15.8516 2.89375C14.9047 3.0375 14.1375 3.70312 13.5844 4.40625C13.0781 5.05937 12.5906 6.05312 12.7969 6.95312C13.8406 6.85625 14.4875 6.18437 15.0047 5.52187Z" />
  </svg>
);

export default function SignupPage() {
  const { login: authLogin } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        alert('Signup successful!');
        // Optionally, log in the user or redirect
        const redirectUrl = searchParams.get('redirect_url') || '/login';
        router.push(redirectUrl);
      } else {
        alert(result.error || 'Signup failed');
      }
    } catch (error) {
      alert('Something went wrong');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 pt-28 sm:pt-32">
        <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
            <CardDescription>Join Carversal and start your journey.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" type="text" placeholder="John Doe" {...register("fullName")} />
                  {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                  {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Mobile Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" {...register("phone")} />
                </div>
                <div className="flex items-start space-x-2">
                  <Controller
                    name="termsAccepted"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                      />
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                      I agree to the{" "}
                      <Link href="/terms" className="underline hover:text-accent">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="underline hover:text-accent">
                        Privacy Policy
                      </Link>
                      .
                    </Label>
                    {errors.termsAccepted && <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>}
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" type="button" onClick={() => alert('Social signup not implemented')}>
                  <Chrome className="mr-2 h-4 w-4" /> Google
                </Button>
                <Button variant="outline" type="button" onClick={() => alert('Social signup not implemented')}>
                  <FacebookIcon className="mr-2 h-4 w-4" /> Facebook
                </Button>
                <Button variant="outline" type="button" onClick={() => alert('Social signup not implemented')}>
                  <AppleIcon className="mr-2 h-4 w-4" /> Apple
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href={`/login${searchParams.get('redirect_url') ? '?redirect_url='+searchParams.get('redirect_url') : ''}`} className="font-semibold text-accent hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}