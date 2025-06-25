
"use client"; 

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquarePlus, ThumbsUp, ThumbsDown, Edit, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { summarizeReviews, SummarizeReviewsInput, SummarizeReviewsOutput } from '@/ai/flows/summarize-reviews';

// Dummy data for reviews
const reviewsData = [
  {
    id: '1',
    author: 'Alice Wonderland',
    avatar: 'https://placehold.co/40x40.png?text=AW',
    rating: 5,
    date: 'July 15, 2024',
    comment: 'Excellent seller! The car was exactly as described, and the transaction was smooth. Highly recommended!',
    isVerifiedPurchase: true,
  },
  {
    id: '2',
    author: 'Bob The Builder',
    avatar: 'https://placehold.co/40x40.png?text=BB',
    rating: 4,
    date: 'July 10, 2024',
    comment: 'Good car, fair price. A few minor scratches not mentioned, but overall happy with the purchase.',
    isVerifiedPurchase: true,
  },
  {
    id: '3',
    author: 'Charlie Chaplin',
    avatar: 'https://placehold.co/40x40.png?text=CC',
    rating: 3,
    date: 'July 5, 2024',
    comment: 'Average experience. Communication could have been better.',
    isVerifiedPurchase: false,
  },
];

// StarRating component for display
const StarRatingDisplay = ({ rating, size = "h-5 w-5" }: { rating: number; size?: string; }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${size} ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))}
  </div>
);

// Zod schema for review form validation
const reviewSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating." }).max(5),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }).max(500, {message: "Comment must be 500 characters or less."}),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function EntityReviewsPage({ params }: { params: { entityType: 'car' | 'seller'; entityId: string } }) {
  const entityName = params.entityType === 'car' ? 'Vehicle Title Placeholder' : 'Seller Name Placeholder';
  const overallRating = reviewsData.length > 0 ? reviewsData.reduce((acc, r) => acc + r.rating, 0) / reviewsData.length : 0;

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // State for AI Summary
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
        rating: 0,
        comment: "",
    }
  });

  useEffect(() => {
    setValue('rating', selectedRating, { shouldValidate: true });
  }, [selectedRating, setValue]);

  const onReviewSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect_url=${pathname}`);
      return;
    }
    
    setIsSubmittingReview(true);
    console.log("Review Data:", data);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({ title: "Review Submitted (Simulated)", description: "Your review has been submitted for moderation." });
    
    reset(); 
    setSelectedRating(0); 
    setIsSubmittingReview(false);
  };

  const handleSummarizeReviews = async () => {
    if (reviewsData.length === 0) {
      toast({ title: "No Reviews", description: "There are no reviews to summarize.", variant: "default" });
      return;
    }
    setIsSummarizing(true);
    setSummary(null);
    setSummaryError(null);
    try {
      const reviewTexts = reviewsData.map(r => r.comment);
      const input: SummarizeReviewsInput = {
        entityType: params.entityType,
        entityId: params.entityId,
        reviews: reviewTexts,
      };
      const result = await summarizeReviews(input);
      setSummary(result.summary);
      toast({ title: "Summary Generated!", description: "AI has summarized the reviews." });
    } catch (error) {
      console.error("Error summarizing reviews:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to summarize reviews.";
      setSummaryError(errorMessage);
      toast({ title: "Summarization Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSummarizing(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 sm:pt-32">
        <Card className="max-w-3xl mx-auto shadow-xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl text-primary">Reviews for {entityName}</CardTitle>
            <div className="flex items-center justify-center mt-2">
              <StarRatingDisplay rating={overallRating} size="h-7 w-7"/>
              <span className="ml-2 text-xl font-semibold">{overallRating.toFixed(1)}</span>
              <span className="ml-1 text-muted-foreground">({reviewsData.length} reviews)</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-8">
            {/* AI Summary Section */}
            <div className="text-center">
                <Button 
                    onClick={handleSummarizeReviews} 
                    disabled={isSummarizing || reviewsData.length === 0}
                    variant="outline"
                    className="bg-accent/10 hover:bg-accent/20 text-accent border-accent/30"
                >
                    {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Summarize Reviews with AI
                </Button>
            </div>

            {isSummarizing && (
                <div className="flex items-center justify-center my-4 p-4 bg-secondary/50 rounded-md">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mr-3" />
                    <p className="text-muted-foreground">AI is generating summary...</p>
                </div>
            )}

            {summaryError && (
                <Alert variant="destructive" className="my-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Summarization Error</AlertTitle>
                    <AlertDescription>{summaryError}</AlertDescription>
                </Alert>
            )}

            {summary && (
                <Alert className="my-4 bg-primary/5 border-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-headline text-primary">AI Review Summary</AlertTitle>
                    <AlertDescription className="text-primary/80 leading-relaxed">{summary}</AlertDescription>
                </Alert>
            )}
            
            <Separator />

            {/* Write a Review Section */}
            <Card className="bg-secondary/50 p-4">
                <CardTitle className="text-xl font-headline mb-3 flex items-center">
                    <MessageSquarePlus className="mr-2 text-accent h-6 w-6"/> Write a Review
                </CardTitle>
                <form className="space-y-4" onSubmit={handleSubmit(onReviewSubmit)}>
                    <div>
                        <Label className="font-semibold mb-1 block">Your Rating:</Label>
                        <div className="flex space-x-1">
                            {[1,2,3,4,5].map(starValue => (
                                <Button 
                                    key={starValue} 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setSelectedRating(starValue)}
                                    className="text-gray-400 hover:text-yellow-400"
                                    aria-label={`Rate ${starValue} out of 5 stars`}
                                >
                                    <Star className={`h-6 w-6 ${starValue <= selectedRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}/>
                                </Button>
                            ))}
                        </div>
                        {errors.rating && <p className="text-sm text-destructive mt-1">{errors.rating.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="reviewComment" className="font-semibold">Your Comment:</Label>
                        <Textarea 
                            id="reviewComment" 
                            placeholder={`Share your experience with ${entityName}...`} 
                            rows={4}
                            {...register("comment")}
                        />
                        {errors.comment && <p className="text-sm text-destructive mt-1">{errors.comment.message}</p>}
                    </div>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmittingReview}>
                        {isSubmittingReview && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Review
                    </Button>
                </form>
            </Card>
            
            <Separator />

            {/* Existing Reviews */}
            <div>
              <h3 className="font-headline text-2xl mb-4 text-primary">All Reviews</h3>
              {reviewsData.length > 0 ? (
                <div className="space-y-6">
                  {reviewsData.map(review => (
                    <Card key={review.id} className="p-4 shadow-sm">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} alt={review.author} data-ai-hint="user avatar"/>
                          <AvatarFallback>{review.author.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-foreground">{review.author}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <StarRatingDisplay rating={review.rating} />
                          </div>
                          {review.isVerifiedPurchase && <p className="text-xs text-green-600 mt-1">Verified Purchase</p>}
                          <p className="mt-2 text-sm text-foreground/80">{review.comment}</p>
                          <div className="mt-3 flex items-center space-x-4 text-sm text-muted-foreground">
                              <Button variant="ghost" size="sm" className="p-1 h-auto"><ThumbsUp className="mr-1 h-4 w-4"/> Helpful (12)</Button>
                              <Button variant="ghost" size="sm" className="p-1 h-auto"><ThumbsDown className="mr-1 h-4 w-4"/> Not Helpful (1)</Button>
                              <Button variant="ghost" size="sm" className="p-1 h-auto">Report</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                 <p className="text-muted-foreground text-center">No reviews yet for {entityName}. Be the first to write one!</p>
              )}
            </div>
            
            {reviewsData.length > 3 && (
                <div className="mt-8 flex justify-center">
                    <Button variant="outline">Load More Reviews</Button>
                </div>
            )}

          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}


    