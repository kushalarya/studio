'use server';

import {
  generateTravelChecklist,
  type GenerateTravelChecklistInput,
  type GenerateTravelChecklistOutput,
} from '@/ai/flows/generate-travel-checklist';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';

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

export async function getPublicChecklists(): Promise<any[]> {
  try {
    const checklistsRef = collection(db, 'checklists');
    const q = query(checklistsRef, orderBy('createdAt', 'desc'), limit(6));
    const querySnapshot = await getDocs(q);
    const checklists = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        destination: data.destination,
        purpose: data.purpose,
        createdAt: data.createdAt.toDate().toLocaleDateString(),
      };
    });
    return checklists;
  } catch (error) {
    console.error('Error fetching public checklists:', error);
    return [];
  }
}
