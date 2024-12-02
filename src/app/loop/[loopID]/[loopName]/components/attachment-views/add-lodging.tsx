'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Lodging } from '@/stores/itinerary-store';

interface LodgingFormProps {
  lodging: Lodging;
  onSave: (lodging: Lodging) => void;
  onCancel: () => void;
}

const lodgingTypes = [
  'Hotel',
  'Motel',
  'Hostel',
  'Resort',
  'Inn',
  'Guest house',
  'Bed and breakfast',
  'Vacation rental',
  'Apartment',
  'House',
  'Cabin',
  'Villa',
  'Condo',
  'Cottage',
  'Bungalow',
  'Other',
];

export function LodgingForm({ lodging, onSave, onCancel }: LodgingFormProps) {
  const [formData, setFormData] = useState(lodging);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (
    date: Date | undefined,
    field: 'check_in' | 'check_out'
  ) => {
    if (date) {
      setFormData({ ...formData, [field]: date });
    }
  };

  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lodging.id ? 'Edit Lodging' : 'New Lodging'}</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="space-y-4">
          <Label>Import Lodging from URL</Label>
          <div className="flex gap-4">
            <Input placeholder="Feature Coming Soon" disabled />
            <Button variant="outline" disabled>
              Import
            </Button>
          </div>
        </section>
      </CardContent>
      <Separator />
      <form onSubmit={handleSubmit}>
        <CardContent className="grid md:grid-cols-2 gap-4 pt-3">
          <div className="space-y-2">
            <Label htmlFor="type">Lodging Type</Label>
            <Select onValueChange={handleTypeChange} value={formData.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select lodging type" />
              </SelectTrigger>
              <SelectContent className="font-mono text-xs">
                {lodgingTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="check_in">Check In</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !formData.check_in && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.check_in ? (
                    format(formData.check_in, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.check_in}
                  onSelect={(date) => handleDateChange(date, 'check_in')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="check_out">Check Out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !formData.check_out && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.check_out ? (
                    format(formData.check_out, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.check_out}
                  onSelect={(date) => handleDateChange(date, 'check_out')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingReference">Booking Reference</Label>
            <Input
              id="bookingReference"
              name="booking_reference"
              value={formData.booking_reference}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              name="cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex w-full justify-end gap-4">
          <Button type="submit">Save</Button>
          <Button onClick={onCancel} variant={'outline'}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
