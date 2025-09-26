'use client';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RemoveItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
}

export function RemoveItemDialog({
  open,
  onOpenChange,
  onConfirm,
}: RemoveItemDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    onOpenChange(false);
    setReason('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setReason('');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove this item?
          </AlertDialogTitle>
          <AlertDialogDescription>
            To help us improve, please let us know why you are removing this
            item. Your feedback is valuable.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full gap-2">
          <Label htmlFor="reason">Reason for removal (optional)</Label>
          <Textarea
            id="reason"
            placeholder="e.g., I don't need this, I have an alternative, etc."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Confirm Removal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
