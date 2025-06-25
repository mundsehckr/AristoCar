
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Target, Eye, Award, Handshake, Lightbulb } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  { name: "Alex Johnson", role: "CEO & Founder", avatarUrl: "https://placehold.co/100x100.png", avatarHint: "ceo avatar" },
  { name: "Priya Sharma", role: "Head of Engineering", avatarUrl: "https://placehold.co/100x100.png", avatarHint: "engineer avatar" },
  { name: "Michael Chen", role: "Lead Designer", avatarUrl: "https://placehold.co/100x100.png", avatarHint: "designer avatar" },
  { name: "Aisha Khan", role: "Marketing Director", avatarUrl: "https://placehold.co/100x100.png", avatarHint: "marketing avatar" },
];

const coreValues = [
    { title: "Transparency", description: "We believe in open and honest communication in every transaction.", icon: <Eye className="h-8 w-8 text-accent" /> },
    { title: "Trust", description: "Building trust between buyers and sellers is at the core of what we do.", icon: <Handshake className="h-8 w-8 text-accent" /> },
    { title: "Innovation", description: "Leveraging technology to create a seamless and intelligent car trading experience.", icon: <Lightbulb className="h-8 w-8 text-accent" /> },
    { title: "Customer Focus", description: "Putting our users' needs first and striving for their satisfaction.", icon: <Users className="h-8 w-8 text-accent" /> },
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20"> {/* pt-20 for fixed header */}
        {/* Hero Section */}
        <section 
          className="py-20 sm:py-32 bg-cover bg-center text-white relative" 
          style={{ backgroundImage: "url('https://placehold.co/1920x400.png?text=')"}}
          data-ai-hint="team working office"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">About Carversal Marketplace</h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
              Revolutionizing the way India buys and sells pre-owned cars through trust, technology, and transparency.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
                <CardHeader className="items-center text-center">
                  <Target className="h-12 w-12 text-accent mb-3" />
                  <CardTitle className="font-headline text-3xl text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-lg leading-relaxed">
                    To democratize access to quality used cars in India by providing an AI-powered, transparent, and secure C2C platform that empowers both buyers and sellers.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
                <CardHeader className="items-center text-center">
                  <Eye className="h-12 w-12 text-accent mb-3" />
                  <CardTitle className="font-headline text-3xl text-primary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-lg leading-relaxed">
                    To be India's most trusted and user-friendly marketplace for pre-owned vehicles, setting new benchmarks for customer experience and transaction reliability.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <Image 
                            src="https://placehold.co/600x400.png"
                            alt="Carversal team discussion"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl object-cover"
                            data-ai-hint="team discussion modern"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-6">Our Story</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            Carversal was born from a simple idea: to make the process of buying and selling used cars in India easier, safer, and more enjoyable for everyone. We noticed the challenges faced by individuals in the C2C market – lack of transparency, difficulty in finding fair prices, and concerns about vehicle quality.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Driven by a passion for cars and technology, our founders set out to build a platform that addresses these pain points. By integrating AI for smart assistance, focusing on user verification, and promoting clear communication, Carversal aims to build a community built on trust.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Core Values Section */}
        <section className="py-16 sm:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">Our Core Values</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The principles that guide every decision we make at Carversal.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreValues.map(value => (
                        <Card key={value.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm">
                            <CardHeader className="items-center">
                                <div className="bg-accent/10 p-4 rounded-full w-fit mb-4">
                                    {value.icon}
                                </div>
                                <CardTitle className="font-headline text-xl">{value.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Meet the Team Section (Placeholder) */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">Meet the Team</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                The passionate individuals driving Carversal forward.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-accent">
                      <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.avatarHint} />
                      <AvatarFallback>{member.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl text-primary mb-1">{member.name}</h3>
                    <p className="text-sm text-accent font-medium">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
