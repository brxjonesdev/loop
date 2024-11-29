'use client';
import React from 'react';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

export default function EditLoop({
  loopName,
  startDate,
  endDate,
}: {
  loopName: string;
  startDate: string;
  endDate: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(
    startDate && endDate
      ? {
          from: new Date(startDate),
          to: new Date(endDate),
        }
      : undefined
  );
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Edit className="h-4 cursor-pointer text-black/5 hover:text-black/80" />
        </DialogTrigger>
        <DialogContent className="font-sans">
          <DialogHeader>
            <DialogTitle>Edit {loopName}</DialogTitle>
            <DialogDescription>Edit details of your loop.</DialogDescription>
            <div>
              <Label>Loop Name</Label>
              <Input
                placeholder="Loop Name"
                value={loopName}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className={cn('grid gap-2 w-full text-left space-y-2')}>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !startDate && !endDate && 'text-muted-foreground'
                    )}
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      endDate ? (
                        <>
                          {format(new Date(startDate), 'LLL dd, y')} -{' '}
                          {format(new Date(endDate), 'LLL dd, y')}
                        </>
                      ) : (
                        format(new Date(startDate), 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={startDate ? new Date(startDate) : undefined}
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate?.from && newDate?.to) {
                        setOpen(false);
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
