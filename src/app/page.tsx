import ChecklistGenerator from '@/components/ChecklistGenerator';
import { DestinationList } from '@/components/DestinationList';
import { Card } from '@/components/ui/card';

export default function Home() {
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

        <DestinationList />

        <ChecklistGenerator />
      </div>
    </main>
  );
}
