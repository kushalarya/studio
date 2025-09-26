'use client';

import { useState } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

interface ChecklistDisplayProps {
  initialItems: string[];
}

export function ChecklistDisplay({ initialItems }: ChecklistDisplayProps) {
  const [items, setItems] = useState(
    initialItems.map((item, index) => ({ id: `${item}-${index}`, text: item }))
  );

  const handleRemoveItem = (idToRemove: string, reason: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    );
    console.log(`Item removed with ID ${idToRemove}. Reason: ${reason}`);
    // In a real application, you would send this feedback to a backend service.
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold font-headline mb-4">
          Your Travel Checklist
        </h2>
        <motion.ul layout className="space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: -100,
                  transition: { duration: 0.2, ease: 'easeInOut' },
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <ChecklistItem item={item} onRemove={handleRemoveItem} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </CardContent>
    </Card>
  );
}
