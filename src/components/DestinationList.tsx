'use client';

import { useState } from 'react';
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
import { Input } from '@/components/ui/input';

export function DestinationList() {
  const [searchTerm, setSearchTerm] = useState('');

  const sortedDestinations = [...destinations].sort(
    (a, b) => b.visitCount - a.visitCount
  );

  const filteredDestinations = sortedDestinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Popular Destinations</CardTitle>
          <CardDescription>
            Explore some of the most visited places in the world.
          </CardDescription>
          <div className="pt-4">
            <Input
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => {
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
