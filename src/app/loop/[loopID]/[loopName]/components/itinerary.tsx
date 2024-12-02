'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { convertDateToString } from '@/utils/converts';
import { useItineraryStore } from '@/stores/itinerary-store-provider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
export default function Itinerary() {
  const { itinerary } = useItineraryStore((state) => state);
  // console.log(itinerary);

  return (
    <section className="pb-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Itinerary</h2>
        </div>
        {itinerary &&
          itinerary.itinerary_dates.map((date: any) => (
            <Card key={date.id} className="font-sans" id={date.id}>
              <CardHeader>
                <CardTitle className="text-xl">
                  {convertDateToString(new Date(date.date))}
                </CardTitle>
                <CardDescription className="font-mono">
                  {date.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
              <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent hover:underline">
                  <Plus className="h-4 w-4" />
                  Add activity
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-xl font-mono p-0 gap-2 flex">
                <Button variant="ghost" size="sm" className="">
                  <Plus className="h-4 w-4" />
                  Add Note
                </Button>
                <Button variant="ghost" size="sm" className="">
                  <Plus className="h-4 w-4" />
                  Add Checklist
                </Button>
                <Button variant="ghost" size="sm" className="">
                  <Plus className="h-4 w-4" />
                  Add Destination
                </Button>
              </PopoverContent>
            </Popover> 
              </CardContent>
                {date.notes && (
                  <CardFooter>
                  <CardDescription className="font-mono">
                    {date.notes}
                  </CardDescription>
                </CardFooter>
                )}
              
            </Card>
          ))}
      </div>
    </section>
  );
}


