import { destinations } from '@/lib/destinations';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function DestinationList() {
  const sortedDestinations = [...destinations].sort(
    (a, b) => b.visitCount - a.visitCount
  );

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Popular Destinations</CardTitle>
          <CardDescription>
            Explore some of the most visited places in the world.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDestinations.map((destination) => {
            const image = PlaceHolderImages.find(
              (p) => p.id === destination.id
            );
            return (
              <Card key={destination.id} className="overflow-hidden">
                {image && (
                  <div className="relative w-full h-40">
                    <Image
                      src={image.imageUrl}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {destination.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
