'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { addDays, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const travelerSchema = z.object({
  name: z.string().min(1, { message: "Name can't be empty." }),
  relationship: z.string().min(1, { message: "Relationship can't be empty." }),
});

const formSchema = z.object({
  destination: z
    .string()
    .min(2, { message: 'Destination must be at least 2 characters.' }),
  purpose: z.enum(['business', 'vacation', 'other']),
  travelDates: z.object({
    from: z.date({ required_error: 'A start date is required.' }),
    to: z.date().optional(),
  }),
  travelers: z.array(travelerSchema).min(1, 'Please add at least one traveler.'),
});

type FormValues = z.infer<typeof formSchema>;

interface ChecklistFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function ChecklistForm({ onSubmit, isLoading }: ChecklistFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      purpose: 'vacation',
      travelDates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
      travelers: [{ name: '', relationship: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'travelers',
  });

  function handleFormSubmit(values: FormValues) {
    const formattedData = {
      ...values,
      travelDates: `from ${format(values.travelDates.from, 'yyyy-MM-dd')} to ${
        values.travelDates.to
          ? format(values.travelDates.to, 'yyyy-MM-dd')
          : 'N/A'
      }`,
    };
    onSubmit(formattedData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Paris, France" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="travelDates"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Travel Dates</FormLabel>
                <DateRangePicker
                  date={field.value as DateRange}
                  onDateChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of Travel</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the purpose of your trip" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Who is going?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-4">
                <FormField
                  control={form.control}
                  name={`travelers.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`travelers.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Spouse, Child" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className='sr-only'>Remove traveler</span>
                </Button>
              </div>
            ))}
             <FormMessage>{form.formState.errors.travelers?.message}</FormMessage>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: '', relationship: '' })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Traveler
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex gap-2 justify-end">
            <Button
                type="submit"
                disabled={isLoading}
                className="bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Checklist
            </Button>
        </div>
      </form>
    </Form>
  );
}
