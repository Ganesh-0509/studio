'use server';
/**
 * @fileOverview Flow for calculating waste diversion and carbon emissions based on event data, and generating PDF reports with infographics.
 *
 * - calculateAndGenerateReport - A function that handles the calculation and report generation process.
 * - WasteAndCarbonAnalyticsInput - The input type for the calculateAndGenerateReport function.
 * - WasteAndCarbonAnalyticsOutput - The return type for the calculateAndGenerateReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WasteAndCarbonAnalyticsInputSchema = z.object({
  eventData: z.object({
    attendees: z.number().describe('The number of attendees at the event.'),
    wasteGeneratedKg: z.number().describe('The total waste generated in kilograms.'),
    wasteDivertedKg: z.number().describe('The total waste diverted from landfill in kilograms.'),
    energyConsumptionKwh: z.number().describe('The total energy consumption in kilowatt-hours.'),
    transportationEmissionsKgCO2: z.number().describe('The total transportation emissions in kilograms of CO2.'),
    vendorSustainabilityScore: z.number().describe('The average sustainability score of vendors (0-100).'),
  }).describe('Event data for calculating waste and carbon analytics.'),
  reportPreferences: z.object({
    includeInfographics: z.boolean().default(true).describe('Whether to include infographics in the report.'),
    reportFormat: z.enum(['PDF', 'Markdown']).default('PDF').describe('The format of the report.'),
  }).describe('Preferences for the generated report.'),
});
export type WasteAndCarbonAnalyticsInput = z.infer<typeof WasteAndCarbonAnalyticsInputSchema>;

const WasteAndCarbonAnalyticsOutputSchema = z.object({
  report: z.string().describe('The generated report in the specified format (PDF or Markdown).'),
  wasteDiversionRate: z.number().describe('The calculated waste diversion rate as a percentage.'),
  carbonEmissionsKgCO2: z.number().describe('The calculated total carbon emissions in kilograms of CO2.'),
});
export type WasteAndCarbonAnalyticsOutput = z.infer<typeof WasteAndCarbonAnalyticsOutputSchema>;

export async function calculateAndGenerateReport(input: WasteAndCarbonAnalyticsInput): Promise<WasteAndCarbonAnalyticsOutput> {
  return calculateAndGenerateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wasteAndCarbonAnalyticsPrompt',
  input: {schema: WasteAndCarbonAnalyticsInputSchema},
  output: {schema: WasteAndCarbonAnalyticsOutputSchema},
  prompt: `You are an environmental sustainability expert specializing in event analytics.

You will receive event data and preferences for a report.  Based on the data, you will generate a report that summarizes the waste diversion and carbon emissions of the event.  The report must be in the specified format.

Event Data:
Attendees: {{{eventData.attendees}}}
Waste Generated (kg): {{{eventData.wasteGeneratedKg}}}
Waste Diverted (kg): {{{eventData.wasteDivertedKg}}}
Energy Consumption (kWh): {{{eventData.energyConsumptionKwh}}}
Transportation Emissions (kg CO2): {{{eventData.transportationEmissionsKgCO2}}}
Vendor Sustainability Score: {{{eventData.vendorSustainabilityScore}}}

Report Preferences:
Include Infographics: {{{reportPreferences.includeInfographics}}}
Report Format: {{{reportPreferences.reportFormat}}}

Calculate the waste diversion rate as a percentage.  Calculate the total carbon emissions in kilograms of CO2.  If the report format is PDF, include instructions for generating PDF infographics.

Ensure the report is well-formatted and easy to understand for sponsors and attendees.

Waste Diversion Rate: {{wasteDiversionRate}}
Carbon Emissions (kg CO2): {{carbonEmissionsKgCO2}}
Report: {{report}}`,
});

const calculateAndGenerateReportFlow = ai.defineFlow(
  {
    name: 'calculateAndGenerateReportFlow',
    inputSchema: WasteAndCarbonAnalyticsInputSchema,
    outputSchema: WasteAndCarbonAnalyticsOutputSchema,
  },
  async input => {
    // Perform calculations
    const wasteDiversionRate = (input.eventData.wasteDivertedKg / input.eventData.wasteGeneratedKg) * 100;
    // In a real implementation, more sophisticated carbon emission calculations would be performed.
    const carbonEmissionsKgCO2 = input.eventData.transportationEmissionsKgCO2 + (input.eventData.energyConsumptionKwh * 0.5); // Example calculation

    const {output} = await prompt({
      ...input,
      wasteDiversionRate,
      carbonEmissionsKgCO2,
      // The report content could be more elaborate depending on requirements.
      report: `Waste Diversion Rate: ${wasteDiversionRate.toFixed(2)}%\nCarbon Emissions: ${carbonEmissionsKgCO2.toFixed(2)} kg CO2`,
    });
    return output!;
  }
);
