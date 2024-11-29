'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, MapPin, Plus, Settings } from 'lucide-react';
import Attachments from './components/attachments';
import Recommendations from './components/recommendations';
import Notes from './components/notes';
import Interests from './components/interests';
import Itinerary from './components/itinerary';
import Budget from './components/budget';

export default function TravelPlanner({params}) {
  const [budget, setBudget] = useState('300.00');
  const { loopID } = params;

  return (
    <div className=" mx-auto px-2 space-y-6">
      {/* <Recommendations/> */}
      {/* <Budget/> */}
      <Attachments />
      <Notes loopID={loopID}/>
      <Interests />
      <Itinerary />
    </div>
  );
}
