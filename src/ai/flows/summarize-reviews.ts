'use server';

/**
 * @fileOverview Summarizes reviews for a car or seller.
 *
 * - summarizeReviews - A function that summarizes reviews.
 * - SummarizeReviewsInput - The input type for the summarizeReviews function.
 * - SummarizeReviewsOutput - The return type for the summarizeReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReviewsInputSchema = z.object({
  entityType: z.enum(['car', 'seller']).describe('The type of entity to summarize reviews for.'),
  entityId: z.string().describe('The ID of the car or seller.'),
  reviews: z.array(z.string()).describe('The reviews to summarize.'),
});
export type SummarizeReviewsInput = z.infer<typeof SummarizeReviewsInputSchema>;

const SummarizeReviewsOutputSchema = z.object({
  summary: z.string().describe('The summary of the reviews.'),
});
export type SummarizeReviewsOutput = z.infer<typeof SummarizeReviewsOutputSchema>;

export async function summarizeReviews(input: SummarizeReviewsInput): Promise<SummarizeReviewsOutput> {
  return summarizeReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReviewsPrompt',
  input: {schema: SummarizeReviewsInputSchema},
  output: {schema: SummarizeReviewsOutputSchema},
  prompt: `You are an expert summarizer of reviews.

You will be given a list of reviews for a {{entityType}} with ID {{entityId}}.

Your task is to summarize the reviews into a single paragraph that captures the main points, common opinions, and concerns.  Focus on providing a balanced view.

Reviews:
{{#each reviews}}
- {{{this}}}
{{/each}}
`,
});

const summarizeReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeReviewsFlow',
    inputSchema: SummarizeReviewsInputSchema,
    outputSchema: SummarizeReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
