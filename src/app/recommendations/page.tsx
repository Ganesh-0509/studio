'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { fetchPersonalizedRecommendations } from './actions';
import { useToast } from '@/hooks/use-toast';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-event-recommendations';

const formSchema = z.object({
  pastEvents: z.string().min(1, 'Please list at least one past event.'),
  preferences: z.string().min(1, 'Please list your preferences.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RecommendationsPage() {
  const [result, setResult] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pastEvents: 'Green Tech Summit, Future of Food Conference',
      preferences: 'Interested in renewable energy, plant-based food, and networking with innovators.',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    const response = await fetchPersonalizedRecommendations({
      attendeeId: 'user-123', // Static ID for demonstration
      pastEvents: values.pastEvents,
      preferences: values.preferences,
    });

    setIsLoading(false);
    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: 'Recommendations Ready!',
        description: 'We\'ve found some personalized suggestions for you.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Getting Recommendations',
        description: response.error,
      });
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">AI-Powered Recommendations</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
            <CardDescription>
              Tell us what you like, and our AI will find the best activities and vendors for you.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="pastEvents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Past Events You've Attended</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Eco Innovators 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Interests & Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., interested in solar power, zero-waste products..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Get Recommendations
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Suggestions</CardTitle>
            <CardDescription>
              Based on your preferences, here are some recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {isLoading && (
              <div className="flex flex-col items-center justify-center text-center h-64 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Finding recommendations...</p>
              </div>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center text-center h-64 gap-4 rounded-lg border-2 border-dashed">
                <Sparkles className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Your AI recommendations will appear here.</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Recommended Activities</h3>
                  <div className="p-4 bg-muted rounded-lg text-sm prose prose-sm max-w-none">
                     <pre className="bg-transparent p-0 m-0 font-body whitespace-pre-wrap">{result.recommendedActivities}</pre>
                  </div>
                </div>
                 <div>
                  <h3 className="font-semibold mb-2">Recommended Vendors</h3>
                  <div className="p-4 bg-muted rounded-lg text-sm prose prose-sm max-w-none">
                    <pre className="bg-transparent p-0 m-0 font-body whitespace-pre-wrap">{result.recommendedVendors}</pre>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
