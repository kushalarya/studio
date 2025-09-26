'use server';

/**
 * @fileOverview Generates a personalized travel checklist based on user inputs.
 *
 * - generateTravelChecklist - A function that generates the travel checklist.
 * - GenerateTravelChecklistInput - The input type for the generateTravelChecklist function.
 * - GenerateTravelChecklistOutput - The return type for the generateTravelChecklist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTravelChecklistInputSchema = z.object({
  destination: z.string().describe('The destination of the travel.'),
  purpose: z.string().describe('The purpose of the travel (e.g., business, vacation).'),
  gender: z.enum(['male', 'female', 'other']).describe('The gender of the traveler.'),
  travelDates: z.string().describe('The dates of travel (e.g., 2024-01-01 to 2024-01-10).'),
});
export type GenerateTravelChecklistInput = z.infer<
  typeof GenerateTravelChecklistInputSchema
>;

const GenerateTravelChecklistOutputSchema = z.object({
  checklist: z.array(z.string()).describe('A list of items for the travel checklist.'),
});
export type GenerateTravelChecklistOutput = z.infer<
  typeof GenerateTravelChecklistOutputSchema
>;

export async function generateTravelChecklist(
  input: GenerateTravelChecklistInput
): Promise<GenerateTravelChecklistOutput> {
  return generateTravelChecklistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTravelChecklistPrompt',
  input: {schema: GenerateTravelChecklistInputSchema},
  output: {schema: GenerateTravelChecklistOutputSchema},
  prompt: `You are a helpful travel assistant. Generate a travel checklist based on the following information:

Destination: {{{destination}}}
Purpose: {{{purpose}}}
Gender: {{{gender}}}
Travel Dates: {{{travelDates}}}

Generate a list of essential items for this trip.
`,
});

const generateTravelChecklistFlow = ai.defineFlow(
  {
    name: 'generateTravelChecklistFlow',
    inputSchema: GenerateTravelChecklistInputSchema,
    outputSchema: GenerateTravelChecklistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
