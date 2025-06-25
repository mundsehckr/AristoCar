

"use client"; 

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, ListFilter, LayoutGrid, MapPin, ChevronRight, Search as SearchIcon, Sparkles, Brain, Loader2, AlertCircle, Info, RotateCcw, Tag, SlidersHorizontal, Frown, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HorizontalCarCard } from '@/components/shared/HorizontalCarCard';
import { SellYourCarCtaWidget } from '@/components/shared/SellYourCarCtaWidget';
import { RecentlyListedWidget } from '@/components/shared/RecentlyListedWidget';
import Link from 'next/link';
import { naturalLanguageSearch, NaturalLanguageSearchInput, NaturalLanguageSearchOutput } from '@/ai/flows/natural-language-search';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const currentYear = new Date().getFullYear();

const sampleCarsData = [
  { id: 'h1', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'hatchback blue', title: 'Maruti Baleno Alpha CVT', year: 2022, price: 820000, mileage: 12000, fuelType: 'Petrol', location: 'Mumbai, MH', seats: 5, power: '66 kW', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Excellent', isFeatured: true, isTrending: false, isRecentlyAdded: true, isSold: false, serviceRecordsAvailable: true, insuranceValid: true, pucAvailable: true, owners: 1, warrantyAvailable: true, rcVerified: true },
  { id: 'h2', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'suv red', title: 'Kia Seltos HTX IVT', year: 2021, price: 1450000, mileage: 35000, fuelType: 'Petrol', location: 'Delhi, DL', seats: 5, power: '103 kW', transmission: 'Automatic', bodyType: 'SUV', condition: 'Good', isFeatured: false, isTrending: true, isRecentlyAdded: false, isSold: false, serviceRecordsAvailable: true, insuranceValid: false, pucAvailable: true, owners: 2, warrantyAvailable: false, rcVerified: true },
  { id: 'h3', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'sedan silver', title: 'Honda Amaze VX MT Diesel', year: 2023, price: 780000, mileage: 25000, fuelType: 'Diesel', location: 'Bangalore, KA', seats: 5, power: '73.5 kW', transmission: 'Manual', bodyType: 'Sedan', condition: 'Excellent', isFeatured: false, isTrending: false, isRecentlyAdded: true, isSold: false, serviceRecordsAvailable: false, insuranceValid: true, pucAvailable: true, owners: 1, warrantyAvailable: true, rcVerified: false },
  { id: 'h4', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'compact suv yellow', title: 'Renault Kiger RXZ AMT', year: currentYear, price: 930000, mileage: 3000, fuelType: 'Petrol', location: 'Pune, MH', seats: 5, power: '73 kW', transmission: 'AMT', bodyType: 'SUV', condition: 'Excellent', isFeatured: true, isTrending: true, isRecentlyAdded: true, isSold: false, serviceRecordsAvailable: true, insuranceValid: true, pucAvailable: true, owners: 1, warrantyAvailable: true, rcVerified: true },
  { id: 'h5', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'mpv gray', title: 'Maruti Ertiga ZXI AT', year: 2021, price: 1050000, mileage: 33000, fuelType: 'Petrol', location: 'Chennai, TN', seats: 7, power: '77 kW', transmission: 'Automatic', bodyType: 'MUV/MPV', condition: 'Good', isFeatured: false, isTrending: false, isRecentlyAdded: false, isSold: false, serviceRecordsAvailable: true, insuranceValid: true, pucAvailable: false, owners: 3, warrantyAvailable: false, rcVerified: true },
  { id: 'h6', imageUrl: 'https://placehold.co/400x300.png', imageHint: 'suv white', title: 'Hyundai Creta SX (O) AT', year: 2022, price: 1750000, mileage: 18000, fuelType: 'Diesel', location: 'Hyderabad, TS', seats: 5, power: '84 kW', transmission: 'Automatic', bodyType: 'SUV', condition: 'Good', isFeatured: false, isTrending: true, isRecentlyAdded: false, isSold: true, serviceRecordsAvailable: true, insuranceValid: true, pucAvailable: true, owners: 1, warrantyAvailable: true, rcVerified: true }, // SOLD example
];

const sampleCars = sampleCarsData.map(car => ({
    ...car,
    isNearlyNew: !car.isSold && (currentYear - car.year <= 1),
}));

// Dynamically calculate price range from sample data
const prices = sampleCarsData.map(car => car.price);
const MIN_LISTED_PRICE = Math.min(...prices);
const MAX_LISTED_PRICE = Math.max(...prices);

const brandModels: Record<string, string[]> = {
  'maruti-suzuki': ['Swift', 'Baleno', 'Vitara Brezza', 'Ertiga', 'Dzire', 'Alto', 'Wagon R'],
  'hyundai': ['Creta', 'i20', 'Venue', 'Verna', 'Grand i10', 'Santro'],
  'honda': ['City', 'Amaze'],
  'tata': ['Nexon', 'Altroz', 'Harrier', 'Safari', 'Tiago', 'Punch'],
  'mahindra': ['XUV700', 'Thar', 'Scorpio-N', 'Bolero', 'XUV300'],
  'kia': ['Seltos', 'Sonet', 'Carnival', 'Carens'],
  'toyota': ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser'],
  'renault': ['Kiger', 'Triber', 'Kwid'],
};

const ANY_VALUE = "any";
const ALL_TYPES_VALUE = ANY_VALUE;
const ALL_BRANDS_VALUE = ANY_VALUE;
const ALL_MODELS_VALUE = ANY_VALUE;

export default function SearchPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  const [naturalQuery, setNaturalQuery] = React.useState('');
  const [isLoadingNLQuery, setIsLoadingNLQuery] = React.useState(false);
  const [nlQueryError, setNlQueryError] = React.useState<string | null>(null);
  const [parsedNLParams, setParsedNLParams] = React.useState<NaturalLanguageSearchOutput | null>(null);

  // Core Filters
  const [selectedTypeOfCar, setSelectedTypeOfCar] = React.useState<string>(ALL_TYPES_VALUE);
  const [locationQuery, setLocationQuery] = React.useState<string>('');
  const [selectedBrand, setSelectedBrand] = React.useState<string>(ALL_BRANDS_VALUE);
  const [selectedModel, setSelectedModel] = React.useState<string>(ALL_MODELS_VALUE);
  const [availableModels, setAvailableModels] = React.useState<string[]>([]);
  const [selectedAgeRange, setSelectedAgeRange] = React.useState<string>(ANY_VALUE);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([MIN_LISTED_PRICE, MAX_LISTED_PRICE]);
  
  // Status & Tags
  const [filterFeatured, setFilterFeatured] = React.useState(false);
  const [filterTrending, setFilterTrending] = React.useState(false);
  const [filterRecentlyAdded, setFilterRecentlyAdded] = React.useState(false);
  const [filterNearlyNew, setFilterNearlyNew] = React.useState(false);

  // Advanced Filters
  const [selectedCondition, setSelectedCondition] = React.useState<string>(ANY_VALUE);
  const [selectedTransmission, setSelectedTransmission] = React.useState<string>(ANY_VALUE);
  const [selectedFuelType, setSelectedFuelType] = React.useState<string>(ANY_VALUE);
  const [selectedOwners, setSelectedOwners] = React.useState<string>(ANY_VALUE);
  const [filterServiceRecords, setFilterServiceRecords] = React.useState(false);
  const [filterInsuranceValid, setFilterInsuranceValid] = React.useState(false);
  const [filterPucAvailable, setFilterPucAvailable] = React.useState(false);
  const [filterWarrantyAvailable, setFilterWarrantyAvailable] = React.useState(false);
  const [filterRcVerified, setFilterRcVerified] = React.useState(false);

  const [displayedCars, setDisplayedCars] = React.useState(sampleCars.filter(car => !car.isSold));

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    // Rule 1.3: Changing Brand resets the Model selection
    setSelectedModel(ALL_MODELS_VALUE);
    if (brand !== ALL_BRANDS_VALUE && brandModels[brand]) {
      setAvailableModels(brandModels[brand]);
    } else {
      setAvailableModels([]);
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    // Rule 2.1: If Model is selected, reset Body Type
    if (model !== ALL_MODELS_VALUE) {
      setSelectedTypeOfCar(ALL_TYPES_VALUE);
    }
  };

  const handleTypeOfCarChange = (type: string) => {
    setSelectedTypeOfCar(type);
    // Rule 2.2: If Body Type is selected, reset Model
    if (type !== ALL_TYPES_VALUE) {
      setSelectedModel(ALL_MODELS_VALUE);
    }
  };


  const applyFilters = React.useCallback(() => {
    let filtered = sampleCars.filter(car => !car.isSold);

    // Core Filters
    if (selectedTypeOfCar && selectedTypeOfCar !== ALL_TYPES_VALUE) {
      filtered = filtered.filter(car => car.bodyType && car.bodyType.toLowerCase() === selectedTypeOfCar.toLowerCase());
    }
    if (locationQuery) {
      filtered = filtered.filter(car => car.location.toLowerCase().includes(locationQuery.toLowerCase()));
    }
    if (selectedBrand && selectedBrand !== ALL_BRANDS_VALUE) {
      filtered = filtered.filter(car => car.title.toLowerCase().includes(selectedBrand.replace('-', ' ').toLowerCase()));
    }
    if (selectedModel && selectedModel !== ALL_MODELS_VALUE) {
      filtered = filtered.filter(car => car.title.toLowerCase().includes(selectedModel.toLowerCase()));
    }
    if (selectedAgeRange && selectedAgeRange !== ANY_VALUE) {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter(car => {
          const carAge = currentYear - car.year;
          if (selectedAgeRange === '0-2') return carAge >= 0 && carAge <= 2;
          if (selectedAgeRange === '3-5') return carAge >= 3 && carAge <= 5;
          if (selectedAgeRange === '6-10') return carAge >= 6 && carAge <= 10;
          if (selectedAgeRange === '10+') return carAge > 10;
          return true;
      });
    }
    if (priceRange) {
        filtered = filtered.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);
    }
    
    // Status & Tags
    if (filterFeatured) filtered = filtered.filter(car => car.isFeatured);
    if (filterTrending) filtered = filtered.filter(car => car.isTrending);
    if (filterRecentlyAdded) filtered = filtered.filter(car => car.isRecentlyAdded);
    if (filterNearlyNew) filtered = filtered.filter(car => car.isNearlyNew);

    // Advanced Filters
    if (selectedCondition && selectedCondition !== ANY_VALUE) {
        filtered = filtered.filter(car => car.condition && car.condition.toLowerCase() === selectedCondition.toLowerCase());
    }
    if (selectedTransmission && selectedTransmission !== ANY_VALUE) {
      filtered = filtered.filter(car => car.transmission && car.transmission.toLowerCase().includes(selectedTransmission.toLowerCase()));
    }
    if (selectedFuelType && selectedFuelType !== ANY_VALUE) {
      filtered = filtered.filter(car => car.fuelType && car.fuelType.toLowerCase() === selectedFuelType.toLowerCase());
    }
    if (selectedOwners && selectedOwners !== ANY_VALUE) {
      if (selectedOwners === '3+') {
          filtered = filtered.filter(car => car.owners >= 3);
      } else {
          filtered = filtered.filter(car => car.owners === parseInt(selectedOwners));
      }
    }
    if (filterServiceRecords) filtered = filtered.filter(car => car.serviceRecordsAvailable);
    if (filterInsuranceValid) filtered = filtered.filter(car => car.insuranceValid);
    if (filterPucAvailable) filtered = filtered.filter(car => car.pucAvailable);
    if (filterWarrantyAvailable) filtered = filtered.filter(car => car.warrantyAvailable);
    if (filterRcVerified) filtered = filtered.filter(car => car.rcVerified);

    setDisplayedCars(filtered);
    toast({ title: "Filters Applied", description: `Showing ${filtered.length} cars.` });
  }, [
    selectedTypeOfCar, locationQuery, selectedBrand, selectedModel, selectedAgeRange, priceRange, 
    filterFeatured, filterTrending, filterRecentlyAdded, filterNearlyNew,
    selectedCondition, selectedTransmission, selectedFuelType, selectedOwners,
    filterServiceRecords, filterInsuranceValid, filterPucAvailable, filterWarrantyAvailable, filterRcVerified,
    toast
  ]);

  // Load filters from URL on initial page load
  React.useEffect(() => {
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');
    const condition = searchParams.get('condition');
    const bodyType = searchParams.get('bodytype');
    const ageRange = searchParams.get('agerange');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    if (brand) setSelectedBrand(brand);
    if (model) setSelectedModel(model);
    if (condition) setSelectedCondition(condition);
    if (bodyType) setSelectedTypeOfCar(bodyType);
    if (ageRange) setSelectedAgeRange(ageRange);
    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice, 10), parseInt(maxPrice, 10)]);
    } else {
      setPriceRange([MIN_LISTED_PRICE, MAX_LISTED_PRICE]); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // This separate useEffect applies filters only when the page initially loads with params from URL
  React.useEffect(() => {
     applyFilters();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const formatPriceLabel = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const handleNaturalLanguageSearch = async () => {
    if (!naturalQuery.trim()) {
      toast({ title: "Empty Query", description: "Please enter your search query.", variant: "default" });
      return;
    }
    setIsLoadingNLQuery(true);
    setNlQueryError(null);
    setParsedNLParams(null); 
    try {
      const input: NaturalLanguageSearchInput = { query: naturalQuery };
      const result = await naturalLanguageSearch(input);
      setParsedNLParams(result);

      setSelectedBrand(result.make?.toLowerCase().replace(' ', '-') || ALL_BRANDS_VALUE);
      setSelectedModel(result.model || ALL_MODELS_VALUE);
      
      if (result.yearMin) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - result.yearMin;
        if (age <= 2) setSelectedAgeRange('0-2');
        else if (age <= 5) setSelectedAgeRange('3-5');
        else if (age <= 10) setSelectedAgeRange('6-10');
        else setSelectedAgeRange('10+');
      } else {
        setSelectedAgeRange(ANY_VALUE);
      }
      
      const newPriceRange: [number, number] = [MIN_LISTED_PRICE, MAX_LISTED_PRICE];
      if (result.priceMinInLakhs) newPriceRange[0] = Math.max(MIN_LISTED_PRICE, result.priceMinInLakhs * 100000);
      if (result.priceMaxInLakhs) newPriceRange[1] = Math.min(MAX_LISTED_PRICE, result.priceMaxInLakhs * 100000);
      if (newPriceRange[0] > newPriceRange[1] && result.priceMaxInLakhs) newPriceRange[0] = newPriceRange[1];
      else if (newPriceRange[0] > newPriceRange[1] && result.priceMinInLakhs) newPriceRange[1] = newPriceRange[0];
      setPriceRange(newPriceRange);

      setLocationQuery(result.location || '');
      setSelectedFuelType(result.fuelType?.toLowerCase() || ANY_VALUE);
      setSelectedTransmission(result.transmission?.toLowerCase() || ANY_VALUE);
      
      toast({ title: "AI Parsed Your Query!", description: "Filters have been populated. Click 'Apply Filters' to see results." });

    } catch (error) {
      console.error("Natural language search error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to parse query with AI.";
      setNlQueryError(errorMessage);
      toast({ title: "AI Search Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoadingNLQuery(false);
    }
  };

  const resetAllFilters = () => {
    setNaturalQuery('');
    setParsedNLParams(null);
    setNlQueryError(null);
    
    setSelectedTypeOfCar(ALL_TYPES_VALUE);
    setLocationQuery('');
    setSelectedBrand(ALL_BRANDS_VALUE);
    setSelectedModel(ALL_MODELS_VALUE);
    setAvailableModels([]);
    setSelectedAgeRange(ANY_VALUE);
    setPriceRange([MIN_LISTED_PRICE, MAX_LISTED_PRICE]);
    
    setFilterFeatured(false);
    setFilterTrending(false);
    setFilterRecentlyAdded(false);
    setFilterNearlyNew(false);

    setSelectedCondition(ANY_VALUE);
    setSelectedTransmission(ANY_VALUE);
    setSelectedFuelType(ANY_VALUE);
    setSelectedOwners(ANY_VALUE);
    setFilterServiceRecords(false);
    setFilterInsuranceValid(false);
    setFilterPucAvailable(false);
    setFilterWarrantyAvailable(false);
    setFilterRcVerified(false);
    
    // Apply reset immediately to show all cars
    setDisplayedCars(sampleCars.filter(car => !car.isSold));
    toast({ title: "Filters Reset", description: "Showing all available cars." });
  };
  
  const isAnyFilterActive = React.useMemo(() => {
    const areCoreFiltersActive =
      selectedTypeOfCar !== ALL_TYPES_VALUE ||
      locationQuery !== '' ||
      selectedBrand !== ALL_BRANDS_VALUE ||
      selectedModel !== ALL_MODELS_VALUE ||
      selectedAgeRange !== ANY_VALUE ||
      (priceRange && (priceRange[0] > MIN_LISTED_PRICE || priceRange[1] < MAX_LISTED_PRICE));

    const areTagFiltersActive =
      filterFeatured || filterTrending || filterRecentlyAdded || filterNearlyNew;

    const areAdvancedFiltersActive =
      selectedCondition !== ANY_VALUE ||
      selectedTransmission !== ANY_VALUE ||
      selectedFuelType !== ANY_VALUE ||
      selectedOwners !== ANY_VALUE ||
      filterServiceRecords || filterInsuranceValid || filterPucAvailable || filterWarrantyAvailable || filterRcVerified;

    return (
      naturalQuery ||
      areCoreFiltersActive ||
      areTagFiltersActive ||
      areAdvancedFiltersActive
    );
  }, [
    naturalQuery, selectedTypeOfCar, locationQuery, selectedBrand, selectedModel, selectedAgeRange, priceRange,
    filterFeatured, filterTrending, filterRecentlyAdded, filterNearlyNew,
    selectedCondition, selectedTransmission, selectedFuelType, selectedOwners,
    filterServiceRecords, filterInsuranceValid, filterPucAvailable, filterWarrantyAvailable, filterRcVerified
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />

      <section
        className="py-12 sm:py-16 bg-cover bg-center text-white relative"
        style={{ backgroundImage: "url('https://placehold.co/1920x300.png?text=')"}}
        data-ai-hint="blurred cars background"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-headline font-bold mb-2">Car Listing</h1>
          <nav aria-label="breadcrumb">
            <ol className="flex items-center text-sm space-x-1.5">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><ChevronRight className="h-3.5 w-3.5"/></li>
              <li className="text-accent font-medium" aria-current="page">Listing</li>
            </ol>
          </nav>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8 shadow-md bg-card p-4 sm:p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="font-headline text-xl text-primary flex items-center">
              <Brain className="h-6 w-6 mr-2 text-accent" /> Tell Us What You're Looking For
            </CardTitle>
            <CardDescription>
              Describe your ideal car (e.g., "used Honda City under 8 lakhs in Mumbai with sunroof"). Our AI will help set the filters!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="e.g., Red Maruti Swift automatic below 6 lakhs..."
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNaturalLanguageSearch()}
                className="flex-grow h-11 text-base"
                disabled={isLoadingNLQuery}
              />
              <Button 
                onClick={handleNaturalLanguageSearch} 
                disabled={isLoadingNLQuery}
                className="bg-accent hover:bg-accent/90 text-accent-foreground h-11 w-full sm:w-auto"
              >
                {isLoadingNLQuery ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                AI Assist Filters
              </Button>
            </div>
            {isLoadingNLQuery && <p className="text-sm text-muted-foreground flex items-center"><Loader2 className="h-4 w-4 animate-spin mr-1"/>AI is thinking...</p>}
            {nlQueryError && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>AI Search Error</AlertTitle>
                <AlertDescription>{nlQueryError}</AlertDescription>
              </Alert>
            )}
            {parsedNLParams && (
              <Alert className="mt-2 bg-primary/5 border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle className="font-headline text-primary">AI Understood & Populated Filters With:</AlertTitle>
                <AlertDescription className="text-primary/80 text-xs space-y-0.5">
                  {Object.entries(parsedNLParams).map(([key, value]) => {
                    if (value === undefined || (Array.isArray(value) && value.length === 0)) return null;
                    const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
                    return <div key={key}><strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {displayValue}</div>;
                  })}
                   {parsedNLParams.unparsedQuery && <div className="mt-1 pt-1 border-t border-primary/10"><strong className="capitalize">AI Could Not Parse:</strong> {parsedNLParams.unparsedQuery}</div>}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 space-y-6">
            <Card className="shadow-md bg-card">
              <CardHeader className="border-b">
                <CardTitle className="font-headline text-xl text-primary flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-accent" /> Find Your Dream Car
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Core Filters */}
                <div>
                  <Label className="font-semibold">Type of Car</Label>
                  <Select value={selectedTypeOfCar} onValueChange={handleTypeOfCarChange} disabled={selectedModel !== ALL_MODELS_VALUE}>
                    <SelectTrigger><SelectValue placeholder="Any Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL_TYPES_VALUE}>Any Type</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="muv/mpv">MUV/MPV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="font-semibold">Location</Label>
                  <Input type="text" placeholder="Pincode or City" value={locationQuery} onChange={e => setLocationQuery(e.target.value)}/>
                </div>
                
                <div>
                  <Label className="font-semibold">Brand</Label>
                  <Select value={selectedBrand} onValueChange={handleBrandChange}>
                    <SelectTrigger><SelectValue placeholder="Any Brand" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL_BRANDS_VALUE}>Any Brand</SelectItem>
                      {Object.keys(brandModels).map(brandKey => (
                        <SelectItem key={brandKey} value={brandKey}>{brandKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                 <div>
                  <Label className="font-semibold">Model</Label>
                  <Select value={selectedModel} onValueChange={handleModelChange} disabled={selectedBrand === ALL_BRANDS_VALUE || selectedTypeOfCar !== ALL_TYPES_VALUE}>
                    <SelectTrigger className="disabled:opacity-50"><SelectValue placeholder="Select Model" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL_MODELS_VALUE}>Any Model</SelectItem>
                      {availableModels.map(model => (
                        <SelectItem key={model} value={model.toLowerCase()}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="font-semibold">Age Range (in Years)</Label>
                  <Select value={selectedAgeRange} onValueChange={setSelectedAgeRange}>
                    <SelectTrigger><SelectValue placeholder="Any Age" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ANY_VALUE}>Any Age</SelectItem>
                        <SelectItem value="0-2">0 - 2 years</SelectItem>
                        <SelectItem value="3-5">3 - 5 years</SelectItem>
                        <SelectItem value="6-10">6 - 10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="font-semibold">Price Range: {formatPriceLabel(priceRange[0])} - {formatPriceLabel(priceRange[1])}</Label>
                  <Slider value={priceRange} onValueChange={(value) => setPriceRange(value as [number, number])} min={MIN_LISTED_PRICE} max={MAX_LISTED_PRICE} step={25000} className="my-3" />
                </div>
                
                <Separator />
                <div>
                  <Label className="font-semibold flex items-center"><Tag className="h-4 w-4 mr-1.5 text-accent" />Status & Tags</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filterFeatured" checked={filterFeatured} onCheckedChange={(checked) => setFilterFeatured(Boolean(checked))} />
                      <Label htmlFor="filterFeatured" className="font-normal text-sm">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filterTrending" checked={filterTrending} onCheckedChange={(checked) => setFilterTrending(Boolean(checked))} />
                      <Label htmlFor="filterTrending" className="font-normal text-sm">Trending</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filterRecentlyAdded" checked={filterRecentlyAdded} onCheckedChange={(checked) => setFilterRecentlyAdded(Boolean(checked))} />
                      <Label htmlFor="filterRecentlyAdded" className="font-normal text-sm">Recently Added</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filterNearlyNew" checked={filterNearlyNew} onCheckedChange={(checked) => setFilterNearlyNew(Boolean(checked))} />
                      <Label htmlFor="filterNearlyNew" className="font-normal text-sm">Nearly New</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                
                {/* Advanced Filters Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-filters" className="border-b-0">
                    <AccordionTrigger className="text-base hover:no-underline -ml-2 -mr-2 px-2 py-1.5 rounded-md hover:bg-secondary">
                        <div className="flex items-center font-semibold">
                          <SlidersHorizontal className="mr-2 h-4 w-4"/> Advanced Filters
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                      <div>
                        <Label className="font-semibold">Condition</Label>
                        <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                          <SelectTrigger><SelectValue placeholder="Any Condition" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ANY_VALUE}>Any Condition</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                       <div>
                        <Label className="font-semibold">Transmission</Label>
                        <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                          <SelectTrigger><SelectValue placeholder="Any Transmission" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ANY_VALUE}>Any</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="amt">AMT</SelectItem>
                            <SelectItem value="cvt">CVT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="font-semibold">Fuel Type</Label>
                        <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                          <SelectTrigger><SelectValue placeholder="Any Fuel Type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ANY_VALUE}>Any</SelectItem>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="cng">CNG</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                       <div>
                        <Label className="font-semibold">No. of Owners</Label>
                        <Select value={selectedOwners} onValueChange={setSelectedOwners}>
                          <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ANY_VALUE}>Any</SelectItem>
                            <SelectItem value="1">First</SelectItem>
                            <SelectItem value="2">Second</SelectItem>
                            <SelectItem value="3+">Third or More</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold text-foreground">Trusted Listings</Label>
                        <div className="flex items-center justify-between mb-2">
                           <span className="flex items-center text-xs text-orange-600 italic">
                                <AlertCircle className="h-3.5 w-3.5 mr-1"/>
                                verify these separately
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 p-3 bg-secondary/30 rounded-md border">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filterServiceRecords" checked={filterServiceRecords} onCheckedChange={(checked) => setFilterServiceRecords(Boolean(checked))} />
                                <Label htmlFor="filterServiceRecords" className="font-normal text-sm">Service Record</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filterInsuranceValid" checked={filterInsuranceValid} onCheckedChange={(checked) => setFilterInsuranceValid(Boolean(checked))} />
                                <Label htmlFor="filterInsuranceValid" className="font-normal text-sm">Valid Insurance</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filterPucAvailable" checked={filterPucAvailable} onCheckedChange={(checked) => setFilterPucAvailable(Boolean(checked))} />
                                <Label htmlFor="filterPucAvailable" className="font-normal text-sm">PUC Available</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filterWarrantyAvailable" checked={filterWarrantyAvailable} onCheckedChange={(checked) => setFilterWarrantyAvailable(Boolean(checked))} />
                                <Label htmlFor="filterWarrantyAvailable" className="font-normal text-sm">Warranty</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filterRcVerified" checked={filterRcVerified} onCheckedChange={(checked) => setFilterRcVerified(Boolean(checked))} />
                                <Label htmlFor="filterRcVerified" className="font-normal text-sm">RC Verified</Label>
                            </div>
                          </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Separator />
                
                <div className="flex flex-col space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={applyFilters}>
                        <Filter className="mr-2 h-4 w-4" /> Apply Filters
                    </Button>
                    <Button variant="outline" className="w-full" onClick={resetAllFilters}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset All Filters
                    </Button>
                </div>
              </CardContent>
            </Card>
            <SellYourCarCtaWidget />
            <RecentlyListedWidget />
          </aside>

          <section className="w-full lg:w-3/4 space-y-6">
            <Card className="bg-card p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">1-{displayedCars.length > 0 ? Math.min(6, displayedCars.length) : 0}</span> of <span className="font-semibold text-foreground">{displayedCars.length}</span> results</p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px] h-9 text-xs"><SelectValue placeholder="Sort by" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest Listings</SelectItem>
                        <SelectItem value="mileage_asc">Mileage: Low to High</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </Card>
            
            {displayedCars.length > 0 ? (
                <div className="space-y-4">
                {displayedCars.slice(0, 6).map(car => ( 
                    <HorizontalCarCard key={car.id} {...car} />
                ))}
                </div>
            ) : (
                <Card className="bg-card p-8 shadow-sm text-center flex flex-col items-center">
                    {isAnyFilterActive ? (
                        <>
                            <Frown className="h-16 w-16 text-destructive mb-4" />
                            <h3 className="text-2xl font-semibold text-primary mb-2">No Results Found</h3>
                            <p className="text-muted-foreground max-w-sm mb-4">
                                We couldn’t find any cars matching your current filters.
                            </p>
                            <div className="mt-2 p-3 bg-green-50 rounded-md flex items-center border border-green-200 dark:bg-green-900/20 dark:border-green-800/50">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                                <p className="text-sm text-green-800 dark:text-green-400">Try adjusting your search or resetting the filters.</p>
                            </div>
                            <Button variant="outline" className="mt-6" onClick={resetAllFilters}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset All Filters
                            </Button>
                        </>
                    ) : (
                         <>
                            <Info className="h-16 w-16 text-primary mb-4" />
                            <h3 className="text-2xl font-semibold text-primary mb-2">No Cars Listed Yet</h3>
                            <p className="text-muted-foreground max-w-sm">
                                It looks a bit empty in here. Be the first to list a car and reach thousands of buyers!
                            </p>
                            <Button className="mt-6" asChild>
                                <Link href="/sell/create-listing">
                                    Sell Your Car
                                </Link>
                            </Button>
                        </>
                    )}
                </Card>
            )}
            
            {displayedCars.length > 6 && ( 
                <div className="mt-8 flex justify-center items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                {[1, 2, 3].map(page => (
                    <Button key={page} variant={page === 1 ? "default" : "outline"} size="sm" className="h-8 w-8 p-0">
                    {page}
                    </Button>
                ))}
                <Button variant="outline" size="sm">...</Button>
                <Button variant="outline" size="sm">Next</Button>
                </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
