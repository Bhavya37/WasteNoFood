'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const formSchema = z.object({
  donorName: z.string().min(2, {
    message: 'Restaurant/Donor name must be at least 2 characters.',
  }),
  foodItems: z.string().min(10, {
    message: 'Please describe the food items available (e.g., 20 plates of rice, 10 curries).',
  }),
  expiryWindow: z.string().min(1, {
    message: 'Please provide an expiry window (e.g., "Best before 4 hours").',
  }),
  pickupLocation: z.string().min(5, {
    message: 'Please provide a valid pickup location.',
  }),
});

export default function AddFoodPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorName: '',
      foodItems: '',
      expiryWindow: '',
      pickupLocation: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('New food listing:', values);
    toast({
      title: 'Listing Submitted!',
      description: 'Thank you for your donation. Your listing is now live.',
      action: <ToastAction altText="OK">OK</ToastAction>,
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Create a New Food Listing</CardTitle>
        <CardDescription>
          Fill out the form below to make your surplus food available for pickup.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="donorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant / Hotel / Caterer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Grand Eatery" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodItems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Food Items</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the items and quantities (e.g., 20 plates of rice, 10 curries, etc.)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be as specific as possible to help volunteers understand the donation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryWindow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Window</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Best before 4 hours" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123 Main St, Downtown" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a clear address for volunteers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Submit Listing
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
