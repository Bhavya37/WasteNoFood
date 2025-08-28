import FoodListingCard from '@/components/food-listing-card';
import MapPlaceholder from '@/components/map-placeholder';
import { foodListings, communityHeroes } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import CommunityHeroCard from '@/components/community-hero-card';
import { Award, Utensils } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h2 className="text-3xl font-headline font-bold tracking-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          Live Food Map
        </h2>
        <p className="text-muted-foreground mt-2">
          Available food donations in your area. Click on a pin for details.
        </p>
      </div>
      <MapPlaceholder listings={foodListings} />
      <Separator />
      <div>
        <h2 className="text-2xl font-headline font-semibold tracking-tight flex items-center gap-2">
          <Utensils className="w-6 h-6 text-primary" />
          Nearby Food Listings
        </h2>
        <p className="text-muted-foreground">
          Claim available food to distribute to those in need.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foodListings.map((listing) => (
          <FoodListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      <Separator />
       <div>
        <h2 className="text-2xl font-headline font-semibold tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          Our Community Heroes
        </h2>
        <p className="text-muted-foreground">
          A special thanks to our partners for their commitment to fighting food waste.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {communityHeroes.map((hero) => (
          <CommunityHeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
}
