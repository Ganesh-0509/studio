"use server";

import {
  getPersonalizedRecommendations,
  type PersonalizedRecommendationsInput,
} from '@/ai/flows/personalized-event-recommendations';

export async function fetchPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
) {
  try {
    const result = await getPersonalizedRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in fetchPersonalizedRecommendations action:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}
