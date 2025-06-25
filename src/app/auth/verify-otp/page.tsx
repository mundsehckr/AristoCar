import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from "next/link";

export default function VerifyOtpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 pt-28 sm:pt-32">
        <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Verify OTP</CardTitle>
            <CardDescription>Enter the OTP sent to your mobile number or email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="otp">OTP Code</Label>
              <Input id="otp" type="text" placeholder="123456" maxLength={6} />
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Verify OTP</Button>
            <div className="text-center text-sm">
              <button className="underline text-muted-foreground hover:text-accent">
                Resend OTP
              </button>
            </div>
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
