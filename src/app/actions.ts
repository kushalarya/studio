'use server';

import {
  generateTravelChecklist,
  type GenerateTravelChecklistInput,
  type GenerateTravelChecklistOutput,
} from '@/ai/flows/generate-travel-checklist';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function getChecklist(
  data: GenerateTravelChecklistInput
): Promise<GenerateTravelChecklistOutput> {
  try {
    const output = await generateTravelChecklist(data);

    // Save the checklist to Firestore
    if (output.checklist && output.checklist.length > 0) {
      await addDoc(collection(db, 'checklists'), {
        ...data,
        checklist: output.checklist,
        createdAt: new Date(),
      });
    }

    return output;
  } catch (e) {
    console.error(e);
    throw new Error(
      'Failed to generate checklist. The AI model may be temporarily unavailable.'
    );
  }
}
