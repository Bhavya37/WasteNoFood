'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { optimizeRoute, RouteOptimizationOutput } from '@/ai/flows/route-optimization';
import { foodListings } from '@/lib/data';
import { Loader2, Route, Clock, Utensils, MapPin } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';

export default function RouteOptimizationPage() {
  const [route, setRoute] = useState<RouteOptimizationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimizeRoute = async () => {
    setIsLoading(true);
    setRoute(null);
    setError(null);
    try {
      const pickupLocations = foodListings
        .filter(l => l.status === 'Available')
        .map(listing => ({
          location: {
            latitude: listing.location.latitude,
            longitude: listing.location.longitude,
          },
          foodItems: listing.foodItems,
          expiryTime: listing.expiryTime,
        }));

      const input = {
        startLocation: { latitude: 34.0422, longitude: -118.2337 }, // Demo start location
        pickupLocations,
      };

      const result = await optimizeRoute(input);
      setRoute(result);
    } catch (e) {
      setError('Failed to optimize route. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Optimize Pickup Route</CardTitle>
          <CardDescription>
            Generate the most efficient route to pick up all available food donations.
            This demo uses available listings and a fixed starting point.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOptimizeRoute} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
              <Route className="mr-2 h-4 w-4" />
              Generate Optimal Route
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      
      {isLoading && (
        <Card className="flex items-center justify-center p-10">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">AI is calculating the best route...</p>
          </div>
        </Card>
      )}

      {route && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary">Your Optimized Route</CardTitle>
            <div className="text-muted-foreground flex items-center gap-2 pt-2">
                <Clock className="h-4 w-4" />
                <span>Total Estimated Time: <strong>{route.totalEstimatedTime}</strong></span>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Stop</TableHead>
                  <TableHead><MapPin className="inline-block h-4 w-4 mr-1"/>Location (Lat/Lon)</TableHead>
                  <TableHead><Utensils className="inline-block h-4 w-4 mr-1"/>Items to Pick Up</TableHead>
                  <TableHead><Clock className="inline-block h-4 w-4 mr-1"/>Est. Travel Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {route.optimizedRoute.map((stop, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold text-lg">{index + 1}</TableCell>
                    <TableCell>{`${stop.location.latitude}, ${stop.location.longitude}`}</TableCell>
                    <TableCell>
                      {stop.foodItems.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                    </TableCell>
                    <TableCell>{stop.estimatedTravelTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
