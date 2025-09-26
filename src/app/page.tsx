import ChecklistGenerator from '@/components/ChecklistGenerator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            TripEase Checklist
          </h1>
          <p className="text-lg text-muted-foreground">
            Your smart travel companion for packing perfectly.
          </p>
        </header>

        <Card className="overflow-hidden shadow-lg">
          {heroImage && (
            <div className="relative w-full h-48 sm:h-64">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
        </Card>

        <ChecklistGenerator />
      </div>
    </main>
  );
}
