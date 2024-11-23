'use client';
import { DateRangePicker } from '@/components/create/dates';
import LoopStatusToggle from '@/components/create/loop-status-toggle';
import LocationSearch from '@/components/create/search-locations';
import UsernameSearch from '@/components/create/username-search';
import React from 'react';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';

export default function CreateLoopPage() {
  const [isPrivate, setIsPrivate] = React.useState(false);
  // const [location, setLocation] = React.useState({})
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [selectedUsers, setSelectedUsers] = React.useState<
    {
      id: number;
      username: string;
      name: string;
      email: string;
      avatar: string;
    }[]
  >([]);

  const handleCreateLoop = () => {
    console.log('Creating loop with:', {
      // location,
      date,
      isPrivate,
      selectedUsers,
    });
  };
  return (
    <main className="flex-1 flex flex-col gap-4 font-sans px-4 lg:px-10 items-center mt-4">
      <section className="flex-1 mb-4 w-full flex flex-col items-center justify-center max-w-2xl gap-6 border px-8 rounded-xl ">
        <h3 className="text-3xl font-semibold">Create a new Loop</h3>
        <LocationSearch />
        <DateRangePicker date={date} setDate={setDate} />
        <UsernameSearch
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <LoopStatusToggle
          isPrivate={isPrivate}
          onToggle={() => setIsPrivate(!isPrivate)}
        />
        <Button className="w-full" onClick={handleCreateLoop}>
          Create Loop
        </Button>
      </section>
    </main>
  );
}
