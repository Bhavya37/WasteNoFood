import Image from 'next/image';
import type { CommunityHero } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function CommunityHeroCard({ hero }: { hero: CommunityHero }) {
  return (
    <Card className="flex flex-col items-center text-center transition-all hover:shadow-lg">
      <CardHeader>
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src={hero.logoUrl}
            alt={`${hero.name} logo`}
            data-ai-hint="logo"
            fill
            className="rounded-full object-cover border-4 border-primary/20"
          />
        </div>
        <CardTitle className="font-headline text-xl">{hero.name}</CardTitle>
        <CardDescription>{hero.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
          <Award className="h-4 w-4" />
          <span>Community Hero</span>
        </div>
      </CardContent>
    </Card>
  );
}
