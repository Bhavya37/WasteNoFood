'use client';

import { useState } from 'react';
import type { FoodListing } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, UtensilsCrossed, CheckCircle, Hand, AlertCircle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

export default function FoodListingCard({ listing }: { listing: FoodListing }) {
  const [status, setStatus] = useState(listing.status);
  const { toast } = useToast();

  const handleClaim = () => {
    setStatus('Claimed');
    toast({
      title: "Food Claimed!",
      description: `You have successfully claimed the listing from ${listing.donorName}.`,
      action: <ToastAction altText="OK">OK</ToastAction>,
    });
  };

  const isAvailable = status === 'Available';

  return (
    <Card className={cn("flex flex-col transition-all duration-300", !isAvailable && "opacity-60 bg-secondary")}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="font-headline text-xl flex-1">
            {listing.donorName}
          </CardTitle>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={isAvailable ? 'default' : 'secondary'} className={cn(isAvailable ? 'bg-accent text-accent-foreground' : '')}>
              {isAvailable ? <AlertCircle className="mr-1 h-3 w-3" /> : <CheckCircle className="mr-1 h-3 w-3" />}
              {status}
            </Badge>
            {listing.isHero && (
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                <Award className="mr-1 h-3 w-3" />
                Hero
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
          <MapPin className="h-4 w-4" />
          {listing.location.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            <ul className="flex flex-wrap gap-2">
              {listing.foodItems.map((item) => (
                <li key={item.name}>
                  <Badge variant="outline">{`${item.name} (x${item.quantity})`}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 text-sm text-destructive font-medium">
            <Clock className="h-4 w-4" />
            <span>{listing.expiryTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={handleClaim}
          disabled={!isAvailable}
        >
          <Hand className="mr-2 h-4 w-4" />
          {isAvailable ? 'Claim Food' : 'Claimed'}
        </Button>
      </CardFooter>
    </Card>
  );
}
