'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Package, Trash2 } from 'lucide-react';
import { RemoveItemDialog } from './RemoveItemDialog';
import { cn } from '@/lib/utils';

interface ChecklistItemProps {
  item: { id: string; text: string };
  onRemove: (id: string, reason: string) => void;
}

export function ChecklistItem({ item, onRemove }: ChecklistItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [id] = useState(() => `checkbox-${item.id}`);

  const handleRemove = () => {
    setIsRemoveDialogOpen(true);
  };

  const handleConfirmRemove = (reason: string) => {
    onRemove(item.id, reason);
  };

  return (
    <>
      <Card
        className={cn(
          'transition-all duration-300',
          isChecked ? 'bg-muted/50 border-dashed' : 'bg-card'
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(Boolean(checked))}
              aria-labelledby={`${id}-label`}
            />
            <Package
              className={cn(
                'h-6 w-6 shrink-0',
                isChecked ? 'text-muted-foreground' : 'text-primary'
              )}
            />
            <label
              id={`${id}-label`}
              className={cn(
                'font-medium break-words',
                isChecked
                  ? 'line-through text-muted-foreground'
                  : 'text-card-foreground'
              )}
            >
              {item.text}
            </label>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options for {item.text}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={handleRemove}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      <RemoveItemDialog
        open={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
}
