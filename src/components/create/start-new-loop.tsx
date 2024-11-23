'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InfinityIcon } from 'lucide-react';
import { Button } from '../ui/button';
import SearchLocation from './search-locations';
import { DateRangePicker } from './dates';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
type Location = {
  lat: string;
  lon: string;
  full_name: string;
  name: string;
};
export default function NewLoopButton() {
  const [selectedLocation, setSelectedLocation] = React.useState<Location>();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create a New Loop <InfinityIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans lg:max-w-2xl max-h-[600px] h-full flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg lg:text-2xl">
            Create a New Loop
          </DialogTitle>
          <DialogDescription>
            Create a new loop to start planning new trips and events with your
            friends and family!
          </DialogDescription>
        </DialogHeader>
        <section className="flex-1 flex flex-col gap-4 overflow-y-scroll border-2 border-cyan-200/50 rounded-xl p-4">
          <SearchLocation onSelect={setSelectedLocation} />
          <DateRangePicker value={date} onChange={setDate} />
        </section>
      </DialogContent>
    </Dialog>
  );
}
