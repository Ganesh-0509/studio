'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BarChart, FileText, Loader2, Minus, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAnalyticsReport } from './actions';
import type { WasteAndCarbonAnalyticsOutput } from '@/ai/flows/waste-and-carbon-analytics';
import { useToast } from '@/hooks/use-toast';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';

const formSchema = z.object({
  attendees: z.coerce.number().min(1, 'At least one attendee is required.'),
  wasteGeneratedKg: z.coerce.number().min(0, 'Cannot be negative.'),
  wasteDivertedKg: z.coerce.number().min(0, 'Cannot be negative.'),
  energyConsumptionKwh: z.coerce.number().min(0, 'Cannot be negative.'),
  transportationEmissionsKgCO2: z.coerce.number().min(0, 'Cannot be negative.'),
  vendorSustainabilityScore: z.coerce.number().min(0).max(100),
  includeInfographics: z.boolean().default(true),
  reportFormat: z.enum(['PDF', 'Markdown']).default('PDF'),
}).refine(data => data.wasteDivertedKg <= data.wasteGeneratedKg, {
  message: "Diverted waste cannot exceed generated waste.",
  path: ["wasteDivertedKg"],
});

type FormValues = z.infer<typeof formSchema>;

export default function AnalyticsPage() {
  const [result, setResult] = useState<WasteAndCarbonAnalyticsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendees: 1000,
      wasteGeneratedKg: 500,
      wasteDivertedKg: 250,
      energyConsumptionKwh: 2000,
      transportationEmissionsKgCO2: 1500,
      vendorSustainabilityScore: 75,
      includeInfographics: true,
      reportFormat: 'PDF',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    const response = await getAnalyticsReport({
      eventData: {
        attendees: values.attendees,
        wasteGeneratedKg: values.wasteGeneratedKg,
        wasteDivertedKg: values.wasteDivertedKg,
        energyConsumptionKwh: values.energyConsumptionKwh,
        transportationEmissionsKgCO2: values.transportationEmissionsKgCO2,
        vendorSustainabilityScore: values.vendorSustainabilityScore,
      },
      reportPreferences: {
        includeInfographics: values.includeInfographics,
        reportFormat: values.reportFormat,
      },
    });

    setIsLoading(false);
    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: 'Report Generated',
        description: 'Your waste and carbon analytics report is ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Report',
        description: response.error,
      });
    }
  }

  const wasteData = result ? [
    { name: 'Waste to Landfill', value: result.wasteDiversionRate < 100 ? 100 - result.wasteDiversionRate : 0, fill: 'hsl(var(--destructive))' },
    { name: 'Waste Diverted', value: result.wasteDiversionRate, fill: 'hsl(var(--primary))' },
  ] : [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Waste & Carbon Analytics</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Data Input</CardTitle>
            <CardDescription>
              Enter your event data to generate a sustainability report.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="attendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Attendees</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="wasteGeneratedKg" render={({ field }) => (<FormItem><FormLabel>Waste Generated (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="wasteDivertedKg" render={({ field }) => (<FormItem><FormLabel>Waste Diverted (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="energyConsumptionKwh" render={({ field }) => (<FormItem><FormLabel>Energy (kWh)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="transportationEmissionsKgCO2" render={({ field }) => (<FormItem><FormLabel>Transport (kg CO2)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField
                  control={form.control}
                  name="vendorSustainabilityScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor Sustainability Score: {field.value}</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Button type="button" variant="outline" size="icon" onClick={() => field.onChange(Math.max(0, field.value - 5))}><Minus className="h-4 w-4" /></Button>
                          <Input type="range" min="0" max="100" {...field} />
                          <Button type="button" variant="outline" size="icon" onClick={() => field.onChange(Math.min(100, field.value + 5))}><Plus className="h-4 w-4" /></Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex-col items-start gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <BarChart className="mr-2 h-4 w-4" />
                  )}
                  Calculate & Generate Report
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Report</CardTitle>
            <CardDescription>
              Your generated sustainability results will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-center h-64 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your report...</p>
              </div>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center text-center h-64 gap-4 rounded-lg border-2 border-dashed">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Your report will be shown here.</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">Waste Diversion</p>
                        <p className="text-2xl font-bold text-primary">{result.wasteDiversionRate.toFixed(1)}%</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">Carbon Emissions</p>
                        <p className="text-2xl font-bold">{result.carbonEmissionsKgCO2.toFixed(1)} kg CO₂e</p>
                    </div>
                 </div>
                 <ChartContainer config={{}} className="h-[200px] w-full">
                  <PieChart accessibilityLayer>
                    <Pie data={wasteData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {wasteData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  </PieChart>
                 </ChartContainer>
                <div className="p-4 bg-muted rounded-lg font-code text-sm">
                    <pre>{result.report}</pre>
                </div>
              </div>
            )}
          </CardContent>
          {result && <CardFooter>
            <Button variant="outline" onClick={() => setResult(null)}><RefreshCw className="mr-2 h-4 w-4" /> Generate New Report</Button>
          </CardFooter>}
        </Card>
      </div>
    </div>
  );
}
