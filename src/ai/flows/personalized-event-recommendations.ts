// src/ai/flows/personalized-event-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized event and vendor recommendations based on user preferences.
 *
 * - getPersonalizedRecommendations - A function that generates personalized event and vendor recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  attendeeId: z.string().describe('Unique identifier for the attendee.'),
  pastEvents: z.string().describe('List of past events the attendee participated in.'),
  preferences: z.string().describe('Attendee preferences, e.g., interests, sustainability focus.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedActivities: z.string().describe('Personalized event activities recommendations.'),
  recommendedVendors: z.string().describe('Personalized eco-friendly vendor recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized event and vendor recommendations to event attendees based on their past behavior and preferences.

  Attendee ID: {{{attendeeId}}}
  Past Events: {{{pastEvents}}}
  Preferences: {{{preferences}}}

  Based on the attendee's past events and stated preferences, provide a list of recommended event activities and eco-friendly vendors that align with their interests. Max of three suggestions per category.

  Format output as JSON.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);

