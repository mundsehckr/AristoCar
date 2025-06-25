'use server';
/**
 * @fileOverview Parses a natural language query into structured search parameters for cars.
 *
 * - naturalLanguageSearch - A function that parses a natural language query.
 * - NaturalLanguageSearchInput - The input type for the naturalLanguageSearch function.
 * - NaturalLanguageSearchOutput - The return type for the naturalLanguageSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageSearchInputSchema = z.object({
  query: z.string().describe('The natural language search query for a car.'),
});
export type NaturalLanguageSearchInput = z.infer<typeof NaturalLanguageSearchInputSchema>;

const NaturalLanguageSearchOutputSchema = z.object({
  make: z.string().optional().describe('The extracted make of the vehicle (e.g., Maruti Suzuki, Honda).'),
  model: z.string().optional().describe('The extracted model of the vehicle (e.g., Swift, City).'),
  yearMin: z.number().optional().describe('The minimum manufacturing year.'),
  yearMax: z.number().optional().describe('The maximum manufacturing year.'),
  priceMinInLakhs: z.number().optional().describe('The minimum price in Lakhs INR (e.g., for 5 lakhs, use 5).'),
  priceMaxInLakhs: z.number().optional().describe('The maximum price in Lakhs INR (e.g., for 10 lakhs, use 10).'),
  location: z.string().optional().describe('The extracted location, like a city or pincode (e.g., Mumbai, 400001).'),
  color: z.string().optional().describe('The extracted color of the car (e.g., red, blue).'),
  fuelType: z.enum(['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']).optional().describe('The type of fuel.'),
  transmission: z.enum(['Manual', 'Automatic', 'AMT', 'CVT', 'DCT']).optional().describe('The type of transmission.'),
  keywords: z.array(z.string()).optional().describe('Other relevant keywords or features extracted (e.g., sunroof, 7 seater).'),
  unparsedQuery: z.string().optional().describe('Any part of the query that could not be confidently parsed into structured fields.')
});
export type NaturalLanguageSearchOutput = z.infer<typeof NaturalLanguageSearchOutputSchema>;

export async function naturalLanguageSearch(
  input: NaturalLanguageSearchInput
): Promise<NaturalLanguageSearchOutput> {
  return naturalLanguageSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageSearchPrompt',
  input: {schema: NaturalLanguageSearchInputSchema},
  output: {schema: NaturalLanguageSearchOutputSchema},
  prompt: `You are an expert car search query parser for an Indian C2C marketplace. Your task is to extract structured information from a user's natural language query. Focus on details relevant to the Indian car market.

User Query: "{{{query}}}"

Parse the query and provide the following details if present. If a detail is not present, omit the field or leave it empty.
- Make: (e.g., Maruti Suzuki, Hyundai, Tata, Honda, Mahindra, Kia, Toyota)
- Model: (e.g., Swift, Creta, Nexon, City, XUV700)
- Year Range: (e.g., "2020 model" implies yearMin: 2020, yearMax: 2020; "between 2018 and 2020" implies yearMin: 2018, yearMax: 2020)
- Price Range in Lakhs INR: (e.g., "under 5 lakhs" implies priceMaxInLakhs: 5; "around 10 lakhs" could imply priceMinInLakhs: 9, priceMaxInLakhs: 11; "10 to 12 lakhs" implies priceMinInLakhs: 10, priceMaxInLakhs: 12). Always convert amounts to Lakhs.
- Location: (e.g., Mumbai, Bangalore, Delhi, 400001). If a state is mentioned (e.g., Maharashtra), try to infer a major city or just pass the state.
- Color: (e.g., red, white, blue)
- Fuel Type: (One of: Petrol, Diesel, CNG, Electric, Hybrid)
- Transmission: (One of: Manual, Automatic, AMT, CVT, DCT)
- Keywords: Extract any other specific features or terms mentioned (e.g., sunroof, 7 seater, automatic, mileage, new, used, certified).
- Unparsed Query: Include any part of the original query that you couldn't confidently map to the structured fields.

Prioritize common Indian car makes and models. If a brand is ambiguous (e.g., "Maruti"), assume "Maruti Suzuki".
If user mentions "new car" or "brand new", this could be a keyword.
If a year is mentioned like "2020", assume it means cars manufactured in that year (yearMin: 2020, yearMax: 2020).
If a range like "5-10 lakhs" is mentioned, interpret it as priceMinInLakhs: 5 and priceMaxInLakhs: 10.
"Below 10 lakhs" means priceMaxInLakhs: 10. "Above 5 lakhs" means priceMinInLakhs: 5.
Return ONLY the JSON output.
`,
});

const naturalLanguageSearchFlow = ai.defineFlow(
  {
    name: 'naturalLanguageSearchFlow',
    inputSchema: NaturalLanguageSearchInputSchema,
    outputSchema: NaturalLanguageSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
