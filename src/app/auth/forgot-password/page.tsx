import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 pt-28 sm:pt-32">
        <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Forgot Password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Reset Link</Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm font-semibold text-accent hover:underline">
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
