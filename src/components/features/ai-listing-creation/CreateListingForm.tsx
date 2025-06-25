"use client";

import * as z from 'zod';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { generateListingDetails, GenerateListingDetailsInput, GenerateListingDetailsOutput } from '@/ai/flows/generate-listing-details';
import { analyzeVehicleCondition, AnalyzeVehicleConditionInput, AnalyzeVehicleConditionOutput } from '@/ai/flows/analyze-vehicle-condition';
import { suggestListingPrice, SuggestListingPriceInput, SuggestListingPriceOutput } from '@/ai/flows/suggest-listing-price';
import { useToast } from '@/hooks/use-toast';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dipxp0wz5";
const CLOUDINARY_UPLOAD_PRESET = "car-listings";

const listingSchema = z.object({
  photos: z
    .custom<File[]>((val) => Array.isArray(val) && val.length > 0, 'At least one photo is required')
    .refine((files) => files.every(file => file.size <= 5 * 1024 * 1024), 'Each file must be 5MB or less.')
    .refine((files) => files.length <= 5, 'Maximum 5 photos allowed.'),
  vin: z.string().optional(),
  make: z.string().min(2, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(1900, 'Invalid year').max(new Date().getFullYear() + 1, 'Invalid year')
  ),
  mileage: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(0, 'Mileage (in km) must be positive')
  ),
  conditionDescription: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid Pincode (must be 6 digits)'),
  title: z.string().optional(),
  description: z.string().optional(),
  keyFeatures: z.array(z.string()).optional(),
  overallCondition: z.string().optional(),
  damageAssessment: z.string().optional(),
  suggestedPrice: z.number().optional(),
  marketAnalysis: z.string().optional(),
});

type ListingFormData = z.infer<typeof listingSchema>;

export function CreateListingForm() {
  const { toast } = useToast();
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResults, setAiResults] = useState<{
    listingDetails?: GenerateListingDetailsOutput;
    conditionAnalysis?: AnalyzeVehicleConditionOutput;
    priceSuggestion?: SuggestListingPriceOutput;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { control, register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      keyFeatures: [],
      photos: [],
    }
  });

  // Handle photo preview and deletion
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles(files);
    setPhotoPreviews(files.map(file => URL.createObjectURL(file)));
    setValue('photos', files, { shouldValidate: true });
  };

  const handlePhotoDelete = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
    setValue('photos', newFiles, { shouldValidate: true });
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // AI Assist and Price Suggestion logic (unchanged)
  const handleAIAssist = async () => {
    setIsLoadingAI(true);
    setProgress(10);
    const files = getValues('photos');
    if (!files || files.length === 0) {
      toast({ title: "Error", description: "Please upload at least one photo.", variant: "destructive" });
      setIsLoadingAI(false);
      return;
    }

    try {
      const primaryPhotoFile = files[0];
      const primaryPhotoDataUri = await readFileAsDataURL(primaryPhotoFile);
      setProgress(30);

      const listingDetailsInput: GenerateListingDetailsInput = { photoDataUri: primaryPhotoFile.type.startsWith('image/') ? primaryPhotoDataUri : 'data:image/jpeg;base64,'+primaryPhotoDataUri.split(',')[1] };
      const listingDetails = await generateListingDetails(listingDetailsInput);
      setValue('title', listingDetails.title);
      setValue('description', listingDetails.description);
      setValue('keyFeatures', listingDetails.keyFeatures);
      if (!getValues('make') && listingDetails.title.split(' ').length > 2) setValue('make', listingDetails.title.split(' ')[1]);
      if (!getValues('model') && listingDetails.title.split(' ').length > 2) setValue('model', listingDetails.title.split(' ')[2]);
      if (!getValues('year') && listingDetails.title.match(/\d{4}/)) setValue('year', parseInt(listingDetails.title.match(/\d{4}/)![0]));

      setAiResults(prev => ({ ...prev, listingDetails }));
      setProgress(60);

      const photoDataUris = await Promise.all(files.map(file => readFileAsDataURL(file).then(uri => file.type.startsWith('image/') ? uri : 'data:image/jpeg;base64,'+uri.split(',')[1] )));
      const conditionInput: AnalyzeVehicleConditionInput = { 
        photoDataUris, 
        description: getValues('conditionDescription') || listingDetails.description 
      };
      const conditionAnalysis = await analyzeVehicleCondition(conditionInput);
      setValue('overallCondition', conditionAnalysis.overallCondition);
      setValue('damageAssessment', conditionAnalysis.damageAssessment);
      setAiResults(prev => ({ ...prev, conditionAnalysis }));
      setProgress(80);
      
      toast({ title: "AI Assistance Complete", description: "Vehicle details and condition analyzed.", variant: "default" });

    } catch (error) {
      console.error("AI Assistance Error:", error);
      toast({ title: "AI Error", description: "Could not process vehicle with AI. Please fill details manually.", variant: "destructive" });
    } finally {
      setIsLoadingAI(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    }
  };
  
  const handlePriceSuggest = async () => {
    setIsLoadingAI(true);
    setProgress(10);
    const formData = getValues();
    if (!formData.make || !formData.model || !formData.year || !formData.mileage || !formData.pincode) {
         toast({ title: "Missing Info", description: "Please fill Make, Model, Year, Mileage, and Pincode to suggest price.", variant: "destructive" });
         setIsLoadingAI(false);
         return;
    }
    try {
        const priceInput: SuggestListingPriceInput = {
            make: formData.make,
            model: formData.model,
            year: formData.year,
            mileage: formData.mileage,
            condition: formData.overallCondition || 'Good',
            zipCode: formData.pincode,
        };
        setProgress(50);
        const priceSuggestion = await suggestListingPrice(priceInput);
        setValue('suggestedPrice', priceSuggestion.suggestedPrice);
        setValue('marketAnalysis', priceSuggestion.marketAnalysis);
        setAiResults(prev => ({ ...prev, priceSuggestion }));
        toast({ title: "Price Suggested", description: `Suggested price: ₹${priceSuggestion.suggestedPrice.toLocaleString('en-IN')}`, variant: "default" });
        setProgress(100);
    } catch (error) {
        console.error("Price Suggestion Error:", error);
        toast({ title: "Pricing Error", description: "Could not suggest price. Please try again.", variant: "destructive" });
         setProgress(0);
    } finally {
        setIsLoadingAI(false);
        setTimeout(() => setProgress(0), 1000);
    }
  }

  // CLOUDINARY UPLOAD
  const uploadToCloudinary = async (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload image");
    const data = await res.json();
    return data.secure_url as string;
  };

  // SUBMIT HANDLER
  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);
    try {
      // 1. Upload images to Cloudinary
      const photoFiles = selectedFiles;
      const photoUrls: string[] = [];
      for (const file of photoFiles) {
        const url = await uploadToCloudinary(file);
        photoUrls.push(url);
      }

      // 2. Prepare listing data with Cloudinary URLs
      const { photos, ...rest } = data;
      const listingPayload = {
        ...rest,
        photoUrls,
      };

      // 3. Send listing data to backend
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingPayload),
      });

      const result = await res.json();

      if (res.ok) {
        toast({
          title: "Listing Submitted!",
          description: "Your car listing has been successfully submitted for review.",
          action: <CheckCircle className="text-green-500" />,
        });
        reset();
        setPhotoPreviews([]);
        setSelectedFiles([]);
        setAiResults(null);
      } else {
        toast({
          title: "Submission Error",
          description: result.error || "There was a problem submitting your listing. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Create New Listing</CardTitle>
        <CardDescription>Fill in the details of your vehicle. Use AI Assist for faster completion!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photos" className="text-lg font-semibold">Vehicle Photos (Max 5, up to 5MB each)</Label>
            <Controller
              control={control}
              name="photos"
              defaultValue={[]}
              render={() => (
                <Input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              )}
            />
            {errors.photos && <p className="text-sm text-destructive">{errors.photos.message as string}</p>}
            {photoPreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {photoPreviews.map((src, index) => (
                  <div key={index} className="relative group">
                    <Image src={src} alt={`Preview ${index + 1}`} width={100} height={100} className="rounded-md object-cover aspect-square" />
                    <button
                      type="button"
                      onClick={() => handlePhotoDelete(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="button" onClick={handleAIAssist} disabled={isLoadingAI || photoPreviews.length === 0} className="w-full bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-500/90 text-accent-foreground">
            {isLoadingAI && progress < 80 && !(progress === 100) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            AI Assist - Generate Details & Condition
          </Button>
          
          {isLoadingAI && progress > 0 && progress <= 100 && <Progress value={progress} className="w-full h-2 mt-2" />}

          {aiResults?.listingDetails && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle className="font-headline">AI Generated Details</AlertTitle>
              <AlertDescription className="space-y-1">
                <p><strong>Title:</strong> {aiResults.listingDetails.title}</p>
                <p><strong>Description:</strong> {aiResults.listingDetails.description}</p>
                <p><strong>Key Features:</strong> {aiResults.listingDetails.keyFeatures.join(', ')}</p>
              </AlertDescription>
            </Alert>
          )}

          {aiResults?.conditionAnalysis && (
            <Alert variant={aiResults.conditionAnalysis.overallCondition?.toLowerCase() === 'poor' ? 'destructive' : 'default'}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-headline">AI Condition Analysis</AlertTitle>
              <AlertDescription className="space-y-1">
                <p><strong>Overall Condition:</strong> {aiResults.conditionAnalysis.overallCondition}</p>
                <p><strong>Damage Assessment:</strong> {aiResults.conditionAnalysis.damageAssessment}</p>
                <p><strong>Recommendations:</strong> {aiResults.conditionAnalysis.recommendations}</p>
              </AlertDescription>
            </Alert>
          )}
          
          <Separator />

          {/* Manual Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Listing Title</Label>
              <Input id="title" {...register('title')} placeholder="e.g., 2020 Honda City V" />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">VIN (Optional)</Label>
              <Input id="vin" {...register('vin')} placeholder="Vehicle Identification Number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" {...register('make')} placeholder="e.g., Maruti Suzuki" />
              {errors.make && <p className="text-sm text-destructive">{errors.make.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" {...register('model')} placeholder="e.g., Swift" />
              {errors.model && <p className="text-sm text-destructive">{errors.model.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" {...register('year')} placeholder="e.g., 2020" />
              {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage (km)</Label>
              <Input id="mileage" type="number" {...register('mileage')} placeholder="e.g., 25000" />
              {errors.mileage && <p className="text-sm text-destructive">{errors.mileage.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} placeholder="Detailed description of your vehicle..." rows={5} />
             {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditionDescription">Your Condition Notes (Optional)</Label>
            <Textarea id="conditionDescription" {...register('conditionDescription')} placeholder="Any specific notes about the vehicle's condition..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode (For Market Analysis)</Label> 
            <Input id="pincode" {...register('pincode')} placeholder="e.g., 400001" />
            {errors.pincode && <p className="text-sm text-destructive">{errors.pincode.message}</p>}
          </div>

          <Button 
            type="button" 
            onClick={handlePriceSuggest} 
            disabled={isLoadingAI || isSubmitting} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoadingAI && progress > 0 && progress <= 100 && !isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Suggest Price (AI)
          </Button>

          {aiResults?.priceSuggestion && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle className="font-headline">AI Price Suggestion</AlertTitle>
              <AlertDescription className="space-y-1">
                <p><strong>Suggested Price:</strong> ₹{aiResults.priceSuggestion.suggestedPrice.toLocaleString('en-IN')}</p>
                <p><strong>Market Analysis:</strong> {aiResults.priceSuggestion.marketAnalysis}</p>
              </AlertDescription>
            </Alert>
          )}

          <Separator />

          <Button type="submit" disabled={isSubmitting || isLoadingAI} className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {isSubmitting ? 'Submitting...' : 'Submit Listing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}