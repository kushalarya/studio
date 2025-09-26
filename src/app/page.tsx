import ChecklistGenerator from '@/components/ChecklistGenerator';
import { DestinationList } from '@/components/DestinationList';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-4 sm:p-8 md:p-12">
      <DestinationList />
      <ChecklistGenerator />
    </div>
  );
}
