'use server';

import {
  generateTravelChecklist,
  type GenerateTravelChecklistInput,
  type GenerateTravelChecklistOutput,
} from '@/ai/flows/generate-travel-checklist';

export async function getChecklist(
  data: GenerateTravelChecklistInput
): Promise<GenerateTravelChecklistOutput> {
  try {
    const output = await generateTravelChecklist(data);
    return output;
  } catch (e) {
    console.error(e);
    throw new Error(
      'Failed to generate checklist. The AI model may be temporarily unavailable.'
    );
  }
}
