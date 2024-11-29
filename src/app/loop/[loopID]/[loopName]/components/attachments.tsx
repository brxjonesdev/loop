'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plane, Hotel, Car, Paperclip } from 'lucide-react';
import { DatePickerWithRange } from '@/components/shared/date-range';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Flights from './attachment-views/flights';
import Lodging from './attachment-views/lodging';
import OtherAttachments from './attachment-views/other-attachments';


export default function ReservationsSection() {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  return (
    <section className=" mx-auto">
      <div className="space-y-4">
      <Flights />
      <Lodging/>
      <OtherAttachments/>

 
      </div>
    </section>
  );
}

function ReservationButton({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex-1 h-10 w-full flex  items-center justify-center transition-all hover:bg-primary hover:text-primary-foreground font-sans"
        >
          {icon}
          <span className="text-xs">{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-sans rounded-lg">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
