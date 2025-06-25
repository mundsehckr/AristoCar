
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, SearchCheck, ShieldCheck, Sparkles, Handshake } from "lucide-react"; // Added Handshake

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-accent" />,
    title: "AI-Powered Listings",
    description: "Create detailed listings in minutes with our smart image recognition and VIN decoder.",
    delay: "0.1s",
  },
  {
    icon: <SearchCheck className="h-10 w-10 text-accent" />,
    title: "Dynamic Search",
    description: "Find your perfect vehicle with natural language search and over 25 advanced filters.",
    delay: "0.2s",
  },
  {
    icon: <Handshake className="h-10 w-10 text-accent" />, // Changed Icon
    title: "Facilitating Trust", // Changed Title
    description: "Connect and communicate securely. We encourage user verification and provide guidance for safe C2C deals.", // Changed Description
    delay: "0.3s",
  },
   {
    icon: <Bot className="h-10 w-10 text-accent" />,
    title: "Market Intelligence",
    description: "Get real-time pricing suggestions and market insights powered by AI.",
    delay: "0.4s",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4 text-primary">
            How Carversal Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We leverage cutting-edge technology to make buying and selling cars seamless and trustworthy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm animate-slide-in-up" style={{animationDelay: feature.delay}}>
              <CardHeader>
                <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
