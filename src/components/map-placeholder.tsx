import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { FoodListing } from '@/lib/types';
import { MapPin } from 'lucide-react';

export default function MapPlaceholder({ listings }: { listings: FoodListing[] }) {
  return (
    <Card className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
      <Image
        src="https://placehold.co/1200x600.png"
        alt="Map of food locations"
        data-ai-hint="city map"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
          Live Food Map (Demo)
        </h2>
      </div>
      {listings.filter(l => l.status === 'Available').map((listing, index) => (
         <div
            key={listing.id}
            className="absolute"
            style={{ 
              top: `${(index + 1) * 20}%`, 
              left: `${(index * 25 + 10)}%`
            }}
          >
            <MapPin className="w-8 h-8 text-primary animate-pulse" fill="hsl(var(--primary-foreground))" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card text-card-foreground text-xs font-semibold px-2 py-1 rounded-md shadow-md whitespace-nowrap">
              {listing.donorName}
            </div>
          </div>
      ))}
    </Card>
  );
}
