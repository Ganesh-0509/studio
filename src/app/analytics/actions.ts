"use server";

import {
  calculateAndGenerateReport,
  type WasteAndCarbonAnalyticsInput,
} from '@/ai/flows/waste-and-carbon-analytics';

export async function getAnalyticsReport(input: WasteAndCarbonAnalyticsInput) {
  try {
    const result = await calculateAndGenerateReport(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getAnalyticsReport action:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}
