
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Globe } from 'lucide-react';
import ChecklistGenerator from './ChecklistGenerator';
import { getPublicChecklists } from '@/app/actions';
import { AnimatePresence, motion } from 'framer-motion';

interface PublicChecklist {
    id: string;
    destination: string;
    purpose: string;
    createdAt: string;
}

export function MyChecklistPage() {
  const [showForm, setShowForm] = useState(false);
  const [publicChecklists, setPublicChecklists] = useState<PublicChecklist[]>([]);
  const [key, setKey] = useState(0); // Used to re-trigger fetch

  const fetchChecklists = useCallback(async () => {
    const checklists = await getPublicChecklists();
    setPublicChecklists(checklists);
  }, []);

  useEffect(() => {
    fetchChecklists();
  }, [fetchChecklists, key]);

  const handleSuccess = () => {
      setShowForm(false);
      setKey(prev => prev + 1); // Re-fetch checklists on success
  }

  return (
    <div className="container mx-auto py-8">
      <AnimatePresence>
        {showForm && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <ChecklistGenerator onCancel={() => setShowForm(false)} onSuccess={handleSuccess} />
            </motion.div>
        )}
      </AnimatePresence>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">My saved trip</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              className="flex flex-col items-center justify-center text-center p-6 border-dashed border-2 hover:border-primary hover:text-primary transition-colors cursor-pointer"
              onClick={() => setShowForm(true)}
            >
              <PlusCircle className="h-12 w-12 mb-2" />
              <h3 className="font-bold text-lg">Create New Checklist</h3>
              <p className="text-sm text-muted-foreground">
                Plan your next adventure.
              </p>
            </Card>
            {/* Saved trips will be mapped here in the future */}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What people are creating</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicChecklists.map((checklist) => (
                <Card key={checklist.id}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            {checklist.destination}
                        </CardTitle>
                        <CardDescription>
                            For {checklist.purpose} on {checklist.createdAt}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
