

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Filter, RotateCcw, AlertCircle } from 'lucide-react';

// Simulated dynamic price range based on sample data across the app
const MIN_LISTED_PRICE = 650000;
const MAX_LISTED_PRICE = 3500000;
const PRICE_STEP = 25000;

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

interface AdvancedSearchDialogProps {
  children: React.ReactNode;
  initialOpen?: boolean;
}

const ANY_VALUE = "any";

// Updated FilterState
interface FilterState {
    typeOfCar: string;
    location: string;
    brand: string;
    model: string;
    ageRange: string;
    fuelType: string;
    mileage: string;
    seatCapacity: string;
    transmission: string;
    owners: string;
    priceRange: [number, number];
    serviceRecords: boolean;
    insuranceValid: boolean;
    pucAvailable: boolean;
    warrantyAvailable: boolean;
    rcVerified: boolean;
}

// Updated initialFilters
const initialFilters: FilterState = {
    typeOfCar: ANY_VALUE,
    location: '',
    brand: ANY_VALUE,
    model: ANY_VALUE,
    ageRange: ANY_VALUE,
    fuelType: ANY_VALUE,
    mileage: ANY_VALUE,
    seatCapacity: ANY_VALUE,
    transmission: ANY_VALUE,
    owners: ANY_VALUE,
    priceRange: [MIN_LISTED_PRICE, MAX_LISTED_PRICE],
    serviceRecords: false,
    insuranceValid: false,
    pucAvailable: false,
    warrantyAvailable: false,
    rcVerified: false,
};

export function AdvancedSearchDialog({ children, initialOpen = false }: AdvancedSearchDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const ALL_CAPACITIES = [ANY_VALUE, '2', '4', '5', '7'];
  const [availableSeatCapacities, setAvailableSeatCapacities] = useState<string[]>(ALL_CAPACITIES);
  
  const [minPriceText, setMinPriceText] = useState<string>(filters.priceRange[0].toString());
  const [maxPriceText, setMaxPriceText] = useState<string>(filters.priceRange[1].toString());

  // Derived states for disabling inputs
  const isModelSelected = filters.model !== ANY_VALUE;
  const isBodyTypeSelected = filters.typeOfCar !== ANY_VALUE;
  const isSeatCapacitySelected = filters.seatCapacity !== ANY_VALUE;

  useEffect(() => {
    if (initialOpen) setIsOpen(true);
  }, [initialOpen]);
  
  useEffect(() => {
    if (filters.brand && filters.brand !== ANY_VALUE && brandModels[filters.brand]) {
        setAvailableModels(brandModels[filters.brand]);
    } else {
        setAvailableModels([]);
    }
  }, [filters.brand]);

  useEffect(() => {
    setMinPriceText(filters.priceRange[0].toString());
    setMaxPriceText(filters.priceRange[1].toString());
  }, [filters.priceRange]);

  const handleFilterChange = (key: keyof Omit<FilterState, 'priceRange' | 'serviceRecords' | 'insuranceValid' | 'pucAvailable' | 'warrantyAvailable' | 'rcVerified'>, value: string) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [key]: value };

      // Apply reset logic based on what just changed
      if (key === 'model' && value !== ANY_VALUE) {
        newFilters.typeOfCar = ANY_VALUE;
        newFilters.seatCapacity = ANY_VALUE;
      }
      if (key === 'typeOfCar' && value !== ANY_VALUE) {
        newFilters.model = ANY_VALUE;
        // Seat capacity restriction will be handled by the useEffect below
      }
      if (key === 'seatCapacity' && value !== ANY_VALUE) {
        newFilters.model = ANY_VALUE;
        newFilters.typeOfCar = ANY_VALUE;
      }
      if (key === 'brand' && value === ANY_VALUE) {
        newFilters.model = ANY_VALUE;
      }
      
      return newFilters;
    });
  };

  // Effect to handle Body Type -> Seat Capacity restriction
  useEffect(() => {
    if (isBodyTypeSelected) {
        let capacities = [ANY_VALUE];
        if (filters.typeOfCar === 'suv') capacities.push('5', '7');
        else if (filters.typeOfCar === 'sedan') capacities.push('5');
        else if (filters.typeOfCar === 'hatchback') capacities.push('4', '5');
        else if (filters.typeOfCar === 'muv-mpv') capacities.push('7');
        setAvailableSeatCapacities(capacities);

        // Rule 3.3: if current seat capacity is now invalid, reset it.
        if (!capacities.includes(filters.seatCapacity)) {
            setFilters(f => ({ ...f, seatCapacity: ANY_VALUE }));
        }
    } else if (!isSeatCapacitySelected) {
      // If neither body type nor seat capacity is selected, show all capacities
      setAvailableSeatCapacities(ALL_CAPACITIES);
    }
  }, [filters.typeOfCar, isBodyTypeSelected, filters.seatCapacity, isSeatCapacitySelected]);


  const handleCheckboxChange = (key: keyof Pick<FilterState, 'serviceRecords' | 'insuranceValid' | 'pucAvailable' | 'warrantyAvailable' | 'rcVerified'>, checked: boolean) => {
    setFilters(prev => ({
        ...prev,
        [key]: checked
    }));
  };

  const handleSliderChange = (newRange: [number, number]) => {
    setFilters(prev => ({...prev, priceRange: newRange}));
  };

  const commitMinPrice = () => {
    const num = parseInt(minPriceText.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      const newMin = Math.max(MIN_LISTED_PRICE, Math.min(num, filters.priceRange[1] - PRICE_STEP));
      handleSliderChange([newMin, filters.priceRange[1]]);
    } else {
        setMinPriceText(filters.priceRange[0].toString());
    }
  };

  const commitMaxPrice = () => {
    const num = parseInt(maxPriceText.replace(/[^0-9]/g, ''), 10);
     if (!isNaN(num)) {
      const newMax = Math.min(MAX_LISTED_PRICE, Math.max(num, filters.priceRange[0] + PRICE_STEP));
      handleSliderChange([filters.priceRange[0], newMax]);
    } else {
        setMaxPriceText(filters.priceRange[1].toString());
    }
  };
  
  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (key === 'priceRange' && Array.isArray(value)) {
            if (value[0] > MIN_LISTED_PRICE) queryParams.set('minPrice', value[0].toString());
            if (value[1] < MAX_LISTED_PRICE) queryParams.set('maxPrice', value[1].toString());
        } else if (typeof value === 'boolean' && value) {
            queryParams.set(key, 'true');
        } else if (typeof value === 'string' && value && value !== ANY_VALUE) {
            queryParams.set(key.toLowerCase().replace(' ', '-'), value);
        }
    });
    router.push(`/search?${queryParams.toString()}`);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setAvailableModels([]);
    setAvailableSeatCapacities(ALL_CAPACITIES);
  };
  
  const formatPriceDisplay = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const trustFilters = [
      { id: 'serviceRecords', label: 'Service Record'},
      { id: 'insuranceValid', label: 'Valid Insurance'},
      { id: 'pucAvailable', label: 'PUC Available'},
      { id: 'warrantyAvailable', label: 'Warranty'},
      { id: 'rcVerified', label: 'RC Verified'},
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-sm max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary flex items-center">
            <Filter className="mr-2 h-6 w-6 text-accent" /> Find Your Car Features (Advanced Search)
          </DialogTitle>
          <DialogDescription>
            Use detailed filters to find the perfect vehicle.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto px-4 space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Row 1 */}
            <div className="space-y-1">
              <Label htmlFor="adv-brand" className="font-semibold">Select Brand</Label>
              <Select value={filters.brand} onValueChange={val => handleFilterChange('brand', val)}>
                <SelectTrigger id="adv-brand"><SelectValue placeholder="Select Brand" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any Brand</SelectItem>
                  {Object.keys(brandModels).map(brandKey => (
                      <SelectItem key={brandKey} value={brandKey}>{brandKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-1">
              <Label htmlFor="adv-model" className="font-semibold">Select Model</Label>
              <Select id="adv-model" value={filters.model} onValueChange={val => handleFilterChange('model', val)} disabled={filters.brand === ANY_VALUE || isBodyTypeSelected || isSeatCapacitySelected}>
                <SelectTrigger className="disabled:opacity-50"><SelectValue placeholder="Select Model" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any Model</SelectItem>
                  {availableModels.map(model => (
                    <SelectItem key={model} value={model.toLowerCase()}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="adv-location" className="font-semibold">Location</Label>
              <Input id="adv-location" type="text" placeholder="Pincode or City" value={filters.location} onChange={e => handleFilterChange('location', e.target.value)} />
            </div>

            {/* Row 2 */}
            <div className="space-y-1">
              <Label htmlFor="adv-type-of-car" className="font-semibold">Type of Car</Label>
              <Select value={filters.typeOfCar} onValueChange={val => handleFilterChange('typeOfCar', val)} disabled={isModelSelected || isSeatCapacitySelected}>
                <SelectTrigger id="adv-type-of-car" className="disabled:opacity-50"><SelectValue placeholder="Select Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any Type</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="muv-mpv">MUV/MPV</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-1">
              <Label htmlFor="adv-seat-capacity" className="font-semibold">Seat Capacity</Label>
              <Select value={filters.seatCapacity} onValueChange={val => handleFilterChange('seatCapacity', val)}>
                <SelectTrigger id="adv-seat-capacity"><SelectValue placeholder="Select Seats" /></SelectTrigger>
                <SelectContent>
                  {availableSeatCapacities.map(capacity => (
                     <SelectItem key={capacity} value={capacity}>{capacity === ANY_VALUE ? 'Any' : `${capacity} Seater`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="adv-age-range" className="font-semibold">Age Range (in Years)</Label>
              <Select value={filters.ageRange} onValueChange={val => handleFilterChange('ageRange', val)}>
                <SelectTrigger id="adv-age-range"><SelectValue placeholder="Any Age" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any Age</SelectItem>
                  <SelectItem value="0-2">0 - 2 years</SelectItem>
                  <SelectItem value="3-5">3 - 5 years</SelectItem>
                  <SelectItem value="6-10">6 - 10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 3 */}
            <div className="space-y-1">
              <Label htmlFor="adv-transmission" className="font-semibold">Transmission Type</Label>
              <Select value={filters.transmission} onValueChange={val => handleFilterChange('transmission', val)}>
                <SelectTrigger id="adv-transmission"><SelectValue placeholder="Select Transmission" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="AMT">AMT</SelectItem>
                  <SelectItem value="CVT">CVT</SelectItem>
                  <SelectItem value="DCT">DCT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="adv-fuel-type" className="font-semibold">Vehicle Fuel Type</Label>
              <Select value={filters.fuelType} onValueChange={val => handleFilterChange('fuelType', val)}>
                <SelectTrigger id="adv-fuel-type"><SelectValue placeholder="Select Fuel Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any Fuel Type</SelectItem>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="CNG">CNG</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-1">
              <Label htmlFor="adv-owners" className="font-semibold">No. of Owners</Label>
              <Select value={filters.owners} onValueChange={val => handleFilterChange('owners', val)}>
                <SelectTrigger id="adv-owners"><SelectValue placeholder="Select Owners" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any</SelectItem>
                  <SelectItem value="1">First Owner</SelectItem>
                  <SelectItem value="2">Second Owner</SelectItem>
                  <SelectItem value="3+">Third or More</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="adv-mileage" className="font-semibold">Kms Driven</Label>
              <Select value={filters.mileage} onValueChange={val => handleFilterChange('mileage', val)}>
                <SelectTrigger id="adv-mileage"><SelectValue placeholder="Select Range" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY_VALUE}>Any</SelectItem>
                  <SelectItem value="0-10000">Below 10,000 km</SelectItem>
                  <SelectItem value="10000-25000">10,000 - 25,000 km</SelectItem>
                  <SelectItem value="25000-50000">25,000 - 50,000 km</SelectItem>
                  <SelectItem value="50000-75000">50,000 - 75,000 km</SelectItem>
                  <SelectItem value="75000-100000">75,000 - 100,000 km</SelectItem>
                  <SelectItem value="100001">Above 100,000 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="font-semibold text-foreground">
              Price Range: {formatPriceDisplay(filters.priceRange[0])} - {formatPriceDisplay(filters.priceRange[1])}
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={handleSliderChange}
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
          <Separator/>
          <div className="space-y-2">
            <Label className="font-semibold text-foreground">Trusted Listings</Label>
            <div className="flex items-center justify-between mb-2">
                 <span className="flex items-center text-xs text-orange-600 italic">
                    <AlertCircle className="h-3.5 w-3.5 mr-1"/>
                    verify these separately
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 bg-secondary/30 rounded-md border">
              {trustFilters.map(filter => (
                <div key={filter.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`adv-feat-${filter.id}`}
                    checked={filters[filter.id]}
                    onCheckedChange={checked => handleCheckboxChange(filter.id, !!checked)}
                  />
                  <Label htmlFor={`adv-feat-${filter.id}`} className="font-normal text-sm">{filter.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t mt-auto">
          <Button variant="outline" onClick={handleResetFilters} className="text-muted-foreground">
            <RotateCcw className="mr-2 h-4 w-4" /> Clear All
          </Button>
          <Button onClick={handleApplyFilters} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Filter className="mr-2 h-4 w-4" /> Search Cars
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
