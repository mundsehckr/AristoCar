'use server';

/**
 * @fileOverview An AI agent that generates a car listing from a photo.
 *
 * - generateListingDetails - A function that generates listing details from a photo.
 * - GenerateListingDetailsInput - The input type for the generateListingDetails function.
 * - GenerateListingDetailsOutput - The return type for the generateListingDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateListingDetailsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a car, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateListingDetailsInput = z.infer<
  typeof GenerateListingDetailsInputSchema
>;

const GenerateListingDetailsOutputSchema = z.object({
  title: z.string().describe('The title of the listing.'),
  description: z.string().describe('The description of the listing.'),
  keyFeatures: z.array(z.string()).describe('The key features of the car.'),
});
export type GenerateListingDetailsOutput = z.infer<
  typeof GenerateListingDetailsOutputSchema
>;

export async function generateListingDetails(
  input: GenerateListingDetailsInput
): Promise<GenerateListingDetailsOutput> {
  return generateListingDetailsFlow(input);
}

const generateListingDetailsPrompt = ai.definePrompt({
  name: 'generateListingDetailsPrompt',
  input: {schema: GenerateListingDetailsInputSchema},
  output: {schema: GenerateListingDetailsOutputSchema},
  prompt: `You are an expert car lister. You will generate a title, description, and key features for a car listing based on the photo provided.

Photo: {{media url=photoDataUri}}

Please generate a title, description, and key features for this car listing.
`,
});

const generateListingDetailsFlow = ai.defineFlow(
  {
    name: 'generateListingDetailsFlow',
    inputSchema: GenerateListingDetailsInputSchema,
    outputSchema: GenerateListingDetailsOutputSchema,
  },
  async input => {
    const {output} = await generateListingDetailsPrompt(input);
    return output!;
  }
);
