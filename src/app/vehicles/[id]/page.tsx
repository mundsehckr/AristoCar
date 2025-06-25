
"use client";

import * as React from 'react';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarDays, Gauge, Palette, ShieldCheck, Wrench, FileText, MessageSquare, TrendingUp, Star, 
  Heart, User, Car, Briefcase, Zap, MapPin, Maximize, Minimize, Thermometer, Weight,
  GitMerge, Fuel, AlignLeft, Columns, ChevronsUpDown, Cog, Users as UsersIcon, AirVent, Radio,
  Wind, Sun, Volume2, Key, Lock, ParkingCircle, Camera, Navigation, CheckCircle2, XCircle, CircleDotDashed, UsersRound,
  Clock, Sparkles
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


const IndianRupee = ({ amount }: { amount: number }) => <>₹{amount.toLocaleString('en-IN')}</>;

const vehicle = {
  id: '123',
  price: 650000,
  images: [
    { url: 'https://placehold.co/800x450.png', hint: 'hatchback red front' },
    { url: 'https://placehold.co/600x400.png', hint: 'hatchback red side' },
    { url: 'https://placehold.co/600x400.png', hint: 'hatchback red rear' },
    { url: 'https://placehold.co/600x400.png', hint: 'car interior dashboard' },
    { url: 'https://placehold.co/600x400.png', hint: 'car engine bay' },
    { url: 'https://placehold.co/600x400.png', hint: 'car trunk space' },
    { url: 'https://placehold.co/600x400.png', hint: 'alloy wheel detail' },
  ],
  make: 'Maruti Suzuki',
  model: 'Swift',
  variant: 'VXI',
  year: 2023, // Updated to be nearly new
  isFeatured: true,
  isTrending: true,
  isRecentlyAdded: true,
  isSold: false,
  mileage: 22000,
  color: 'Solid Fire Red',
  bodyType: 'Hatchback',
  transmission: 'Manual',
  fuelType: 'Petrol',
  engineName: '1.2L K-Series Petrol Engine',
  engineDisplacement: '1197 cc',
  maxPower: '88.50 bhp @ 6000 rpm',
  maxTorque: '113 Nm @ 4400 rpm',
  drivetrain: 'FWD (Front-Wheel Drive)',
  fuelEconomyCity: '18 kmpl',
  fuelEconomyHighway: '23 kmpl',
  vin: 'MA3EXXXXXXXXXXXX',
  registrationNo: 'MH01AB1234',
  insuranceValidity: 'Jan 2025',
  numOwners: 1,
  location: 'Mumbai, Maharashtra',
  pincode: '400001',
  description: 'This 2021 Maruti Suzuki Swift VXI is in excellent condition, regularly serviced, and single-owner driven. Perfect city car with great mileage. Comes with company-fitted music system and all standard features. Selling to upgrade to a new vehicle. All papers are clear. Price slightly negotiable for serious buyers.',
  keyFeaturesHighlight: [ 
    { name: 'Company Fitted Music System', icon: <Radio/>, group: 'Entertainment' },
    { name: 'Power Windows (All)', icon: <Maximize/>, group: 'Comfort' },
    { name: 'Central Locking', icon: <Lock/>, group: 'Safety' },
    { name: 'Remote Keyless Entry', icon: <Key/>, group: 'Comfort' },
    { name: 'ABS with EBD', icon: <ShieldCheck/>, group: 'Safety' },
    { name: 'Dual Airbags', icon: <AirVent/>, group: 'Safety' },
  ],
  dimensions: { length: '3845 mm', width: '1735 mm', height: '1530 mm', wheelbase: '2450 mm', groundClearance: '163 mm' },
  capacities: { fuelTank: '37 Litres', bootSpace: '268 Litres', seating: '5 Persons' },
  condition: { assessment: 'Excellent', reportUrl: '#', summary: 'No major dents or scratches, clean interior, tires in good condition.' },
  serviceHistory: { summary: 'All services up-to-date, performed at authorized Maruti Suzuki service center. Records available.', recordsUrl: '#' },
  documentation: { status: 'Clean Title (RC Available), Valid Insurance till Jan 2025, PUC valid.', docsUrl: '#' },
  modifications: 'None, completely stock.',
  financialInfo: { lien: 'None / Clear Title' },
  seller: { name: 'Rohan Sharma', rating: 4.8, reviewsCount: 15, verified: true, memberSince: 'Oct 2022', profileUrl: '/profile/rohan-sharma', avatar: 'https://placehold.co/80x80.png' },
  accessoriesChecklist: [
    // Comfort & Convenience
    { name: 'Air Conditioning (Manual)', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Heater', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Power Steering', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Power Windows (Front)', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Power Windows (Rear)', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Adjustable Steering Column (Tilt)', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Remote Keyless Entry', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Low Fuel Warning Light', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Vanity Mirror (Co-Driver)', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Cup Holders (Front)', isWorking: true, group: 'Comfort & Convenience' },
    { name: 'Rear Parking Sensors', isWorking: true, group: 'Comfort & Convenience' },
    // Safety
    { name: 'Central Locking', isWorking: true, group: 'Safety' },
    { name: 'Anti-Lock Braking System (ABS)', isWorking: true, group: 'Safety' },
    { name: 'Electronic Brake-force Distribution (EBD)', isWorking: true, group: 'Safety' },
    { name: 'Brake Assist (BA)', isWorking: true, group: 'Safety' },
    { name: 'Driver Airbag', isWorking: true, group: 'Safety' },
    { name: 'Passenger Airbag', isWorking: true, group: 'Safety' },
    { name: 'Seat Belt Warning', isWorking: true, group: 'Safety' },
    { name: 'Child Safety Locks', isWorking: true, group: 'Safety' },
    { name: 'ISOFIX Child Seat Mounts', isWorking: true, group: 'Safety' },
    { name: 'Engine Immobilizer', isWorking: true, group: 'Safety' },
    { name: 'Speed Alert', isWorking: true, group: 'Safety' },
    // Interior
    { name: 'Upholstery (Fabric)', isWorking: true, group: 'Interior' },
    { name: 'Tachometer (Analog)', isWorking: true, group: 'Interior' },
    { name: 'Electronic Multi-Tripmeter', isWorking: true, group: 'Interior' },
    { name: 'Digital Clock', isWorking: true, group: 'Interior' },
    { name: 'Digital Odometer', isWorking: true, group: 'Interior' },
    { name: 'Glove Compartment', isWorking: true, group: 'Interior' },
    { name: 'Adjustable Headrests (Front & Rear)', isWorking: true, group: 'Interior' },
    // Exterior
    { name: 'Halogen Headlamps', isWorking: true, group: 'Exterior' },
    { name: 'Body Coloured Bumpers', isWorking: true, group: 'Exterior' },
    { name: 'Power Adjustable ORVMs (Manual Fold)', isWorking: true, group: 'Exterior' },
    { name: 'Turn Indicators on ORVM', isWorking: false, group: 'Exterior' }, // Example: Feature not present/working
    { name: 'Steel Wheels with Wheel Covers', isWorking: true, group: 'Exterior' },
    // Entertainment & Communication
    { name: 'Audio System (Company Fitted)', isWorking: true, group: 'Entertainment & Communication' },
    { name: 'Speakers (Front)', isWorking: true, group: 'Entertainment & Communication' },
    { name: 'Speakers (Rear)', isWorking: true, group: 'Entertainment & Communication' },
    { name: 'USB & Auxiliary input', isWorking: true, group: 'Entertainment & Communication' },
    { name: 'Bluetooth Connectivity (Phone & Audio Streaming)', isWorking: true, group: 'Entertainment & Communication' },
    { name: 'Steering Mounted Audio Controls', isWorking: true, group: 'Entertainment & Communication' },
  ],
};

const keyFeatureGroups = Array.from(new Set(vehicle.keyFeaturesHighlight.map(f => f.group)));
const accessoriesGroups = Array.from(new Set(vehicle.accessoriesChecklist.map(f => f.group)));


export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(vehicle.images[0]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleAction = (action: () => void, requiresAuth: boolean = true) => {
    if (requiresAuth && !isAuthenticated) {
      router.push(`/login?redirect_url=${pathname}`);
    } else {
      action();
    }
  };

  const currentYear = new Date().getFullYear();
  const isNearlyNew = !vehicle.isSold && (currentYear - vehicle.year <= 1);


  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery & Main Info (Left/Center Column) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl bg-card/95 backdrop-blur-sm">
              <CardHeader>
                 <div className="flex items-baseline gap-x-2">
                    <CardTitle className="font-headline text-3xl md:text-4xl text-primary">
                        {`${vehicle.make} ${vehicle.model} - ${vehicle.variant}`}
                    </CardTitle>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {vehicle.isFeatured && (
                    <Badge className="bg-red-600 text-white border-red-600 text-xs">
                      <Star className="w-3 h-3 mr-1" /> Featured
                    </Badge>
                  )}
                  {vehicle.isTrending && (
                    <Badge className="bg-orange-500 text-white border-orange-500 text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" /> Trending
                    </Badge>
                  )}
                  {vehicle.isRecentlyAdded && (
                    <Badge className="bg-blue-500 text-white border-blue-500 text-xs">
                      <Clock className="w-3 h-3 mr-1" /> Recent
                    </Badge>
                  )}
                  {isNearlyNew && (
                    <Badge className="bg-green-600 text-white border-green-600 text-xs">
                      <Sparkles className="w-3 h-3 mr-1" /> Nearly New
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground mt-2">
                  <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5 text-accent" /> {vehicle.year}</span>
                  <span className="flex items-center"><Gauge className="h-4 w-4 mr-1.5 text-accent" /> {vehicle.mileage.toLocaleString('en-IN')} km</span>
                  <span className="flex items-center"><Palette className="h-4 w-4 mr-1.5 text-accent" /> {vehicle.color}</span>
                  <span className="flex items-center"><Cog className="h-4 w-4 mr-1.5 text-accent" /> {vehicle.transmission}</span>
                  <span className="flex items-center"><Fuel className="h-4 w-4 mr-1.5 text-accent" /> {vehicle.fuelType}</span>
                  <span className="flex items-center"><Car className="h-4 w-4 mr-1.5 text-accent" /> {vehicle.bodyType}</span>
                </div>
                 <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1.5 text-accent" /> <span className="text-sm text-muted-foreground">{vehicle.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Image
                    src={selectedImage.url}
                    alt={`${vehicle.make} ${vehicle.model} - ${selectedImage.hint}`}
                    width={800}
                    height={450}
                    className="rounded-lg object-cover w-full aspect-[16/9] shadow-md border"
                    data-ai-hint={selectedImage.hint}
                    priority
                  />
                </div>
                
                <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-secondary/50">
                  <div className="flex space-x-3 p-3">
                    {vehicle.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={cn(
                          "focus:outline-none rounded-md overflow-hidden shrink-0",
                          selectedImage.url === img.url ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                        )}
                        aria-label={`View image ${index + 1}`}
                      >
                        <Image
                          src={img.url}
                          alt={`${vehicle.make} ${vehicle.model} - thumbnail ${index + 1}`}
                          width={100}
                          height={75}
                          className="object-cover w-24 h-[72px] sm:w-28 sm:h-[84px] transition-transform duration-200 ease-in-out hover:scale-105"
                          data-ai-hint={img.hint}
                        />
                      </button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                
                <Separator className="my-6"/>

                <h3 className="font-headline text-2xl text-primary mb-3">Vehicle Description</h3>
                <p className="text-foreground/80 leading-relaxed mb-6">{vehicle.description}</p>

                <Separator className="my-6"/>

                <h3 className="font-headline text-2xl text-primary mb-4">Key Features (Highlights)</h3>
                <div className="space-y-4">
                  {keyFeatureGroups.map(group => (
                    <div key={group}>
                      <h4 className="font-semibold text-primary/80 mb-2">{group}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {vehicle.keyFeaturesHighlight.filter(f => f.group === group).map(feature => (
                          <div key={feature.name} className="flex items-center text-sm text-foreground/80">
                            {React.cloneElement(feature.icon, { className: "h-5 w-5 mr-2 text-accent" })}
                            {feature.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
              </CardContent>
            </Card>
            
            <Card className="shadow-lg bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center">
                  <AlignLeft className="mr-2 text-accent"/>Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-headline text-xl text-primary/90 mb-3">Basic Information</h4>
                <Table>
                  <TableBody>
                    <TableRow><TableHead className="w-1/3 font-medium">Make</TableHead><TableCell>{vehicle.make}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Model</TableHead><TableCell>{vehicle.model}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Variant</TableHead><TableCell>{vehicle.variant}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Year</TableHead><TableCell>{vehicle.year}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Mileage</TableHead><TableCell>{vehicle.mileage.toLocaleString('en-IN')} km</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Fuel Type</TableHead><TableCell>{vehicle.fuelType}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Transmission</TableHead><TableCell>{vehicle.transmission}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Color</TableHead><TableCell>{vehicle.color}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Body Type</TableHead><TableCell>{vehicle.bodyType}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Registration No.</TableHead><TableCell>{vehicle.registrationNo}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">VIN</TableHead><TableCell>{vehicle.vin}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">No. of Owners</TableHead><TableCell>{vehicle.numOwners}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Insurance Valid Till</TableHead><TableCell>{vehicle.insuranceValidity}</TableCell></TableRow>
                  </TableBody>
                </Table>

                <Separator className="my-6"/>
                <h4 className="font-headline text-xl text-primary/90 mb-3">Technical Specifications</h4>
                <Table>
                  <TableBody>
                    <TableRow><TableHead className="w-1/3 font-medium">Engine Name</TableHead><TableCell>{vehicle.engineName}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Engine Displacement</TableHead><TableCell>{vehicle.engineDisplacement}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Max Power</TableHead><TableCell>{vehicle.maxPower}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Max Torque</TableHead><TableCell>{vehicle.maxTorque}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Drivetrain</TableHead><TableCell>{vehicle.drivetrain}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Fuel Economy (City)</TableHead><TableCell>{vehicle.fuelEconomyCity}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Fuel Economy (Highway)</TableHead><TableCell>{vehicle.fuelEconomyHighway}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Fuel Tank Capacity</TableHead><TableCell>{vehicle.capacities.fuelTank}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Boot Space</TableHead><TableCell>{vehicle.capacities.bootSpace}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Seating Capacity</TableHead><TableCell>{vehicle.capacities.seating}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Length</TableHead><TableCell>{vehicle.dimensions.length}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Width</TableHead><TableCell>{vehicle.dimensions.width}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Height</TableHead><TableCell>{vehicle.dimensions.height}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Wheelbase</TableHead><TableCell>{vehicle.dimensions.wheelbase}</TableCell></TableRow>
                    <TableRow><TableHead className="w-1/3 font-medium">Ground Clearance</TableHead><TableCell>{vehicle.dimensions.groundClearance}</TableCell></TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center">
                  <CheckCircle2 className="mr-2 text-accent" /> Features & Accessories Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accessoriesGroups.map(group => (
                  <div key={group}>
                    <h4 className="font-headline text-lg text-primary/80 mb-2 border-b pb-1">{group}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {vehicle.accessoriesChecklist.filter(acc => acc.group === group).map(accessory => (
                        <div key={accessory.name} className="flex items-center text-sm">
                          {accessory.isWorking ? (
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0" />
                          )}
                          <span className={cn(accessory.isWorking ? "text-foreground/80" : "text-red-500 line-through")}>{accessory.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>


            {/* Other Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-lg bg-card/95 backdrop-blur-sm">
                <CardHeader><CardTitle className="font-headline text-xl text-primary flex items-center"><ShieldCheck className="mr-2 text-accent"/>Condition Assessment</CardTitle></CardHeader>
                <CardContent>
                    <p>Overall: <Badge variant={vehicle.condition.assessment === 'Excellent' ? 'default' : 'secondary'} className={vehicle.condition.assessment === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>{vehicle.condition.assessment}</Badge></p>
                    <p className="text-sm text-muted-foreground mt-1">{vehicle.condition.summary}</p>
                    <Button variant="link" asChild className="p-0 h-auto mt-1 text-accent"><a href={vehicle.condition.reportUrl}>View Full Report</a></Button>
                </CardContent>
                </Card>
                <Card className="shadow-lg bg-card/95 backdrop-blur-sm">
                <CardHeader><CardTitle className="font-headline text-xl text-primary flex items-center"><Wrench className="mr-2 text-accent"/>Service History</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{vehicle.serviceHistory.summary}</p>
                    <Button variant="link" asChild className="p-0 h-auto mt-1 text-accent"><a href={vehicle.serviceHistory.recordsUrl}>View Service Records</a></Button>
                </CardContent>
                </Card>
                <Card className="shadow-lg bg-card/95 backdrop-blur-sm">
                <CardHeader><CardTitle className="font-headline text-xl text-primary flex items-center"><FileText className="mr-2 text-accent"/>Documentation</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{vehicle.documentation.status}</p>
                    <Button variant="link" asChild className="p-0 h-auto mt-1 text-accent"><a href={vehicle.documentation.docsUrl}>View Documents</a></Button>
                </CardContent>
                </Card>
                <Card className="shadow-lg bg-card/95 backdrop-blur-sm">
                    <CardHeader><CardTitle className="font-headline text-xl text-primary flex items-center"><GitMerge className="mr-2 text-accent"/>Modifications</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{vehicle.modifications}</p>
                    </CardContent>
                </Card>
            </div>
             <Card className="shadow-lg bg-card/95 backdrop-blur-sm">
                <CardHeader><CardTitle className="font-headline text-xl text-primary">Financial Information</CardTitle></CardHeader>
                <CardContent>
                    <p><strong className="text-primary">Lien Status:</strong> {vehicle.financialInfo.lien}</p>
                </CardContent>
            </Card>
          </div>

          {/* Sidebar: Price, Seller Info, Actions (Right Column) */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-xl sticky top-28 bg-card/95 backdrop-blur-sm p-2">
              <CardHeader className="pb-4">
                <p className="text-4xl font-bold text-accent mb-2"><IndianRupee amount={vehicle.price} /></p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Price Negotiable</Badge>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base"
                  onClick={() => handleAction(() => {
                    toast({ title: "Starting Conversation...", description: "Redirecting to your messages." });
                    router.push('/messages');
                  })}
                >
                  <MessageSquare className="mr-2 h-5 w-5" /> Contact User
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full text-base border-primary/60 text-primary hover:bg-primary/10"
                  onClick={() => handleAction(() => {
                    toast({ title: "Offer Placed (Simulated)", description: "Your offer has been sent to the seller." });
                  })}
                >
                  Make an Offer
                </Button>
                 <Button 
                    size="lg" 
                    variant="ghost" 
                    className="w-full text-base text-muted-foreground hover:bg-secondary/70"
                    onClick={() => handleAction(() => {
                       toast({ title: "Saved to Wishlist (Simulated)", description: "This vehicle has been added to your wishlist." });
                    })}
                  >
                  <Heart className="mr-2 h-5 w-5" /> Save to Wishlist
                </Button>
              </CardContent>
              <Separator className="my-4"/>
              <CardContent>
                <h4 className="font-headline text-xl text-primary mb-3">User Information</h4>
                <div className="flex items-center space-x-3 mb-3">
                  <Image src={vehicle.seller.avatar} alt={vehicle.seller.name} width={60} height={60} className="rounded-full border-2 border-accent" data-ai-hint="user avatar"/>
                  <div>
                    <Link href={vehicle.seller.profileUrl} className="font-semibold text-lg hover:text-accent transition-colors">{vehicle.seller.name}</Link>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1"/> {vehicle.seller.rating} ({vehicle.seller.reviewsCount} reviews)
                    </div>
                    <p className="text-xs text-muted-foreground">Member since {vehicle.seller.memberSince}</p>
                  </div>
                </div>
                {vehicle.seller.verified && <Badge variant="secondary" className="bg-green-100 text-green-700 mb-3"><ShieldCheck className="h-4 w-4 mr-1"/>Verified User</Badge>}
                <Button variant="outline" className="w-full text-sm" asChild>
                    <Link href={vehicle.seller.profileUrl}>View User Profile</Link>
                </Button>
              </CardContent>
                <Separator className="my-4"/>
                 <CardContent>
                    <h4 className="font-headline text-lg text-primary mb-2">Price Analysis</h4>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <TrendingUp className="h-4 w-4 mr-1.5 text-green-500"/> Market Average: <IndianRupee amount={620000} />
                    </div>
                    <Badge variant={vehicle.price > 620000 ? "destructive" : "default"} className={vehicle.price > 620000 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}>
                        {vehicle.price > 620000 ? 'Slightly Above Average' : 'Good Deal'}
                    </Badge>
                    <Button variant="link" className="p-0 h-auto text-sm mt-2 text-accent">View Detailed Price Report</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
