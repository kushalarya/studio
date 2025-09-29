'use client';
import { useState } from 'react';
import type { GenerateTravelChecklistInput } from '@/ai/flows/generate-travel-checklist';
import { getChecklist } from '@/app/actions';
import { ChecklistForm } from '@/components/ChecklistForm';
import { ChecklistDisplay } from '@/components/ChecklistDisplay';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, X } from 'lucide-react';
import { Button } from './ui/button';

interface ChecklistGeneratorProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ChecklistGenerator({
  onCancel,
  onSuccess,
}: ChecklistGeneratorProps) {
  const [checklist, setChecklist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: GenerateTravelChecklistInput) => {
    setIsLoading(true);
    setChecklist([]);
    try {
      const result = await getChecklist(data);
      if (result.checklist && result.checklist.length > 0) {
        setChecklist(result.checklist);
        onSuccess();
      } else {
        toast({
          variant: 'destructive',
          title: 'No items returned',
          description:
            'The checklist came back empty. Try adjusting your inputs.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Checklist',
        description:
          (error as Error).message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="absolute top-4 right-4 h-8 w-8 z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold font-headline mb-4">
            Plan my trip
          </h2>
          <ChecklistForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-16 rounded-lg bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">
            Generating your personalized checklist...
          </p>
        </div>
      )}

      {checklist.length > 0 && <ChecklistDisplay initialItems={checklist} />}
    </div>
  );
}
