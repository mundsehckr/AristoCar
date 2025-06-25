
"use client";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ListFilter, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AdvancedSearchDialog } from '@/components/shared/AdvancedSearchDialog';
import { useSearchParams, useRouter } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';


const brandModels: Record<string, string[]> = {
  'maruti-suzuki': ['Swift', 'Baleno', 'Vitara Brezza', 'Ertiga', 'Dzire'],
  'hyundai': ['Creta', 'i20', 'Venue', 'Verna', 'Grand i10'],
  'tata': ['Nexon', 'Altroz', 'Harrier', 'Safari', 'Tiago'],
  'mahindra': ['XUV700', 'Thar', 'Scorpio-N', 'Bolero'],
  'honda': ['City', 'Amaze'],
  'toyota': ['Fortuner', 'Innova Crysta', 'Glanza'],
  'kia': ['Seltos', 'Sonet', 'Carnival'],
};

const ALL_BRANDS_VALUE = "all_brands";
const ALL_MODELS_VALUE = "all_models";
const ALL_CONDITIONS_VALUE = "all_conditions";

// Simulated dynamic price range based on sample data across the app
const MIN_LISTED_PRICE = 650000;
const MAX_LISTED_PRICE = 3500000;
const PRICE_STEP = 25000;

export function HomepageSearchFilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldOpenAdvancedDialog, setShouldOpenAdvancedDialog] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(ALL_BRANDS_VALUE);
  const [selectedModel, setSelectedModel] = useState(ALL_MODELS_VALUE);
  const [selectedCondition, setSelectedCondition] = useState(ALL_CONDITIONS_VALUE);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_LISTED_PRICE, MAX_LISTED_PRICE]);
  const [minPriceText, setMinPriceText] = useState<string>(MIN_LISTED_PRICE.toString());
  const [maxPriceText, setMaxPriceText] = useState<string>(MAX_LISTED_PRICE.toString());

  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  useEffect(() => {
    if (searchParams.get('openAdvancedSearch') === 'true') {
      setShouldOpenAdvancedDialog(true);
      const newUrl = window.location.pathname;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedBrand !== ALL_BRANDS_VALUE && brandModels[selectedBrand]) {
      setAvailableModels(brandModels[selectedBrand]);
    } else {
      setAvailableModels([]);
    }
    // Rule 1.3: Changing Brand at any time resets the Model selection
    setSelectedModel(ALL_MODELS_VALUE);
  }, [selectedBrand]);

  useEffect(() => {
    setMinPriceText(priceRange[0].toString());
    setMaxPriceText(priceRange[1].toString());
  }, [priceRange]);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (selectedBrand !== ALL_BRANDS_VALUE) queryParams.set('brand', selectedBrand);
    if (selectedModel !== ALL_MODELS_VALUE) queryParams.set('model', selectedModel);
    if (selectedCondition !== ALL_CONDITIONS_VALUE) queryParams.set('condition', selectedCondition);
    if (priceRange[0] > MIN_LISTED_PRICE) queryParams.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < MAX_LISTED_PRICE) queryParams.set('maxPrice', priceRange[1].toString());
    
    router.push(`/search?${queryParams.toString()}`);
  };

  const handleResetFilters = () => {
    setSelectedBrand(ALL_BRANDS_VALUE);
    setSelectedModel(ALL_MODELS_VALUE);
    setSelectedCondition(ALL_CONDITIONS_VALUE);
    setPriceRange([MIN_LISTED_PRICE, MAX_LISTED_PRICE]);
    setAvailableModels([]);
  };

  const formatPriceDisplay = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const commitMinPrice = () => {
    const num = parseInt(minPriceText.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      const newMin = Math.max(MIN_LISTED_PRICE, Math.min(num, priceRange[1] - PRICE_STEP));
      setPriceRange([newMin, priceRange[1]]);
    } else {
        setMinPriceText(priceRange[0].toString());
    }
  };

  const commitMaxPrice = () => {
    const num = parseInt(maxPriceText.replace(/[^0-9]/g, ''), 10);
     if (!isNaN(num)) {
      const newMax = Math.min(MAX_LISTED_PRICE, Math.max(num, priceRange[0] + PRICE_STEP));
      setPriceRange([priceRange[0], newMax]);
    } else {
        setMaxPriceText(priceRange[1].toString());
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl p-6 sm:p-8 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-0">
            <h2 className="text-2xl sm:text-3xl font-headline text-primary mb-2 text-center">Find Your Dream Car</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-lg mx-auto">
              Use our intelligent filters to narrow down your search. Start with any option.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 items-end">
              <div>
                <Label className="block text-sm font-medium text-muted-foreground mb-1">Brand</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Any Brand" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_BRANDS_VALUE}>Any Brand</SelectItem>
                    {Object.keys(brandModels).map(brandKey => (
                      <SelectItem key={brandKey} value={brandKey}>{brandKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div>
                <Label className="block text-sm font-medium text-muted-foreground mb-1">Model</Label>
                 {/* Rule 1.1: Model dropdown is disabled until Brand is selected. */}
                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={selectedBrand === ALL_BRANDS_VALUE}>
                  <SelectTrigger className="h-12 text-base disabled:opacity-50"><SelectValue placeholder="Select Model" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_MODELS_VALUE}>Any Model</SelectItem>
                    {/* Rule 1.2: Model is populated only with that brand’s lineup. */}
                    {availableModels.map(model => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-muted-foreground mb-1">Condition</Label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Any Condition" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_CONDITIONS_VALUE}>Any Condition</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <div className="space-y-2 pt-4">
                    <Label className="font-semibold text-foreground">
                        Price Range: {formatPriceDisplay(priceRange[0])} - {formatPriceDisplay(priceRange[1])}
                    </Label>
                    <Slider
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        min={MIN_LISTED_PRICE}
                        max={MAX_LISTED_PRICE}
                        step={PRICE_STEP}
                        className="my-4"
                    />
                    <div className="flex justify-between gap-4">
                        <div className="w-1/2 space-y-1">
                            <Label htmlFor="min-price-input" className="text-xs text-muted-foreground">Min Price (₹)</Label>
                            <Input
                            id="min-price-input"
                            type="text" 
                            value={minPriceText}
                            onChange={e => setMinPriceText(e.target.value)}
                            onBlur={commitMinPrice}
                            onKeyDown={e => e.key === 'Enter' && commitMinPrice()}
                            className="h-9 text-sm"
                            />
                        </div>
                        <div className="w-1/2 space-y-1">
                            <Label htmlFor="max-price-input" className="text-xs text-muted-foreground">Max Price (₹)</Label>
                            <Input
                            id="max-price-input"
                            type="text"
                            value={maxPriceText}
                            onChange={e => setMaxPriceText(e.target.value)}
                            onBlur={commitMaxPrice}
                            onKeyDown={e => e.key === 'Enter' && commitMaxPrice()}
                            className="h-9 text-sm"
                            />
                        </div>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8" onClick={handleSearch}>
                <Search className="mr-2 h-5 w-5" /> Search Now
              </Button>
              <AdvancedSearchDialog initialOpen={shouldOpenAdvancedDialog}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                    <ListFilter className="mr-2 h-5 w-5" /> Advanced Search
                </Button>
              </AdvancedSearchDialog>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-base px-8" onClick={handleResetFilters}>
                 <RotateCcw className="mr-2 h-5 w-5" /> Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
