import FoodListingCard from '@/components/food-listing-card';
import MapPlaceholder from '@/components/map-placeholder';
import { foodListings } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-headline font-semibold tracking-tight">
          Live Food Map
        </h2>
        <p className="text-muted-foreground">
          Available food donations in your area. Click on a pin for details.
        </p>
      </div>
      <MapPlaceholder listings={foodListings} />
      <Separator />
      <div>
        <h2 className="text-2xl font-headline font-semibold tracking-tight">
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
    </div>
  );
}
