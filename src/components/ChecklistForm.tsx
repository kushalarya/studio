'use client';

import { useForm } from 'react-hook-form';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { addDays, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  destination: z
    .string()
    .min(2, { message: 'Destination must be at least 2 characters.' }),
  purpose: z.enum(['business', 'vacation', 'other']),
  gender: z.enum(['male', 'female', 'other']),
  travelDates: z.object({
    from: z.date({ required_error: 'A start date is required.' }),
    to: z.date().optional(),
  }),
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
      gender: 'other',
      travelDates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4 pt-2"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Checklist
        </Button>
      </form>
    </Form>
  );
}
