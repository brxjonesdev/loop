"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Itinerary() {

  return (
    <section>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Itinerary</h2>
        </div>

        {/* Day sections */}
        {[].map((day) => (
          <div key={day} className="space-y-2">
            <h3 className="font-medium">{day}</h3>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="">
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
          </div>
        ))}
      </div>
    </section>
  );
}
