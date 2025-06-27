'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { predictWaste, WastePredictionOutput } from '@/ai/flows/waste-prediction';
import { Loader2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  area: z.string().min(2, {
    message: 'Area name must be at least 2 characters.',
  }),
  historicalData: z.string().min(10, {
    message: 'Please provide some historical data to make a prediction.',
  }),
});

export default function WastePredictionPage() {
  const [prediction, setPrediction] = useState<WastePredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: 'Downtown',
      historicalData: 'Last week: 50kg wasted. Two weeks ago: 65kg wasted. Previous month average: 200kg. There is a local festival next week.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    setError(null);
    try {
      const result = await predictWaste(values);
      setPrediction(result);
    } catch (e) {
      setError('Failed to get a prediction. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Predict Food Waste</CardTitle>
          <CardDescription>
            Use historical data to predict potential food waste in an area and get actionable suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area for Prediction</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Downtown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Data & Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide any relevant data..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  'Predict Waste'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="font-headline text-2xl font-semibold">Prediction Result</h3>
        {isLoading && (
           <Card className="flex items-center justify-center p-10">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">AI is analyzing the data...</p>
            </div>
          </Card>
        )}
        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        {prediction && (
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-primary">AI-Powered Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predicted Waste Amount</p>
                <p className="text-2xl font-bold">{prediction.predictedWasteAmount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confidence Level</p>
                <p className="text-lg font-semibold">{prediction.confidenceLevel}</p>
              </div>
            </CardContent>
            <CardFooter>
             <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Suggested Actions</AlertTitle>
                <AlertDescription>
                 {prediction.suggestedActions}
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
