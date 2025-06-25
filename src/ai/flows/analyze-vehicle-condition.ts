// src/ai/flows/analyze-vehicle-condition.ts
'use server';

/**
 * @fileOverview Analyzes the condition of a vehicle from uploaded photos.
 *
 * - analyzeVehicleCondition - A function that analyzes vehicle condition from photos.
 * - AnalyzeVehicleConditionInput - The input type for the analyzeVehicleCondition function.
 * - AnalyzeVehicleConditionOutput - The return type for the analyzeVehicleCondition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeVehicleConditionInputSchema = z.object({
  photoDataUris: z
    .array(z.string())
    .describe(
      "An array of photos of the car, as data URIs that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('Optional description of the vehicle.'),
});
export type AnalyzeVehicleConditionInput = z.infer<
  typeof AnalyzeVehicleConditionInputSchema
>;

const AnalyzeVehicleConditionOutputSchema = z.object({
  overallCondition: z
    .string()
    .describe('Overall condition assessment of the vehicle (e.g., Excellent, Good, Fair, Poor).'),
  damageAssessment: z
    .string()
    .describe('Detailed assessment of any visible damage (e.g., scratches, dents, rust).'),
  recommendations:
    z.string().describe('Recommendations for further inspection or repair.'),
});
export type AnalyzeVehicleConditionOutput = z.infer<
  typeof AnalyzeVehicleConditionOutputSchema
>;

export async function analyzeVehicleCondition(
  input: AnalyzeVehicleConditionInput
): Promise<AnalyzeVehicleConditionOutput> {
  return analyzeVehicleConditionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeVehicleConditionPrompt',
  input: {schema: AnalyzeVehicleConditionInputSchema},
  output: {schema: AnalyzeVehicleConditionOutputSchema},
  prompt: `You are an expert vehicle inspector. Analyze the condition of the vehicle based on the provided photos and description.

Description: {{{description}}}

Photos:
{{#each photoDataUris}}
  {{media url=this}}
{{/each}}

Provide an overall condition assessment, a detailed damage assessment, and recommendations for further inspection or repair. Be as descriptive as possible.
`,
});

const analyzeVehicleConditionFlow = ai.defineFlow(
  {
    name: 'analyzeVehicleConditionFlow',
    inputSchema: AnalyzeVehicleConditionInputSchema,
    outputSchema: AnalyzeVehicleConditionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
