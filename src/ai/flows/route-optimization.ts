// route-optimization.ts
'use server';

/**
 * @fileOverview A route optimization AI agent.
 *
 * - optimizeRoute - A function that handles the route optimization process.
 * - RouteOptimizationInput - The input type for the optimizeRoute function.
 * - RouteOptimizationOutput - The return type for the optimizeRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocationSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});

const FoodItemSchema = z.object({
  name: z.string().describe('The name of the food item.'),
  quantity: z.number().describe('The quantity of the food item.'),
});

const PickupLocationSchema = z.object({
  location: LocationSchema.describe('The location of the pickup.'),
  foodItems: z.array(FoodItemSchema).describe('The food items available at the pickup location.'),
  expiryTime: z.string().describe('The expiry time of the food items (e.g., "4 hours").'),
});

const RouteOptimizationInputSchema = z.object({
  startLocation: LocationSchema.describe('The starting location for the route.'),
  pickupLocations: z.array(PickupLocationSchema).describe('The available pickup locations with food details and expiry times.'),
});
export type RouteOptimizationInput = z.infer<typeof RouteOptimizationInputSchema>;

const RouteOptimizationOutputSchema = z.object({
  optimizedRoute: z.array(
    z.object({
      location: LocationSchema.describe('The location in the optimized route.'),
      foodItems: z.array(FoodItemSchema).describe('The food items to pick up at this location.'),
      estimatedTravelTime: z.string().describe('Estimated travel time to this location.'),
    })
  ).describe('The optimized route with locations, food items, and estimated travel times.'),
  totalEstimatedTime: z.string().describe('The total estimated time to complete the route.'),
});
export type RouteOptimizationOutput = z.infer<typeof RouteOptimizationOutputSchema>;

export async function optimizeRoute(input: RouteOptimizationInput): Promise<RouteOptimizationOutput> {
  return optimizeRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeOptimizationPrompt',
  input: {schema: RouteOptimizationInputSchema},
  output: {schema: RouteOptimizationOutputSchema},
  prompt: `You are an expert route optimization specialist for food rescue operations.

Given a starting location and a list of pickup locations with available food items and their expiry times, you will determine the optimal route that minimizes travel time and maximizes food distribution efficiency.

Consider the quantity of food items, the expiry times, and the distances between locations to create the most efficient route.

Starting Location: {{{startLocation}}}
Pickup Locations: {{#each pickupLocations}}{{{this}}}{{/each}}

Output the optimized route, including the order of locations, the food items to pick up at each location, and the estimated travel time to each location. Also, provide the total estimated time to complete the entire route.

Ensure the output is valid JSON matching the RouteOptimizationOutputSchema. The food items field should only list the items being picked up at a given location; do not include all available items at the location if only some are to be collected.
`,
});

const optimizeRouteFlow = ai.defineFlow(
  {
    name: 'optimizeRouteFlow',
    inputSchema: RouteOptimizationInputSchema,
    outputSchema: RouteOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
