'use client';
import { DateRangePicker } from '@/components/create/dates';
import LoopStatusToggle from '@/components/create/loop-status-toggle';
import LocationSearch from '@/components/create/search-locations';
import UsernameSearch from '@/components/create/username-search';
import React from 'react';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { set } from 'date-fns';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

export default function CreateLoopPage() {
  const supabase = createClient();
  const router = useRouter();
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [locationError, setLocationError] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [loopInitStep, setLoopInitStep] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<
    {
      id: number;
      username: string;
      name: string;
      email: string;
      avatar: string;
    }[]
  >([]);

  React.useEffect(() => {
    if (location) {
      setLocationError(null);
    }
  }, [location]);

  const handleCreateLoop = async () => {
    console.log('Creating loop with:', {
      location,
      date,
      isPrivate,
      selectedUsers,
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      setLoopInitStep('Failed to fetch user');
      return;
    }

    if (!location) {
      setLocationError('Please select a location');
      return;
    }

    const fetchImage = async (location: string) => {
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY; // Replace with your Unsplash Access Key
      const url = `https://api.unsplash.com/search/photos?query=${location}&client_id=${accessKey}&per_page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          return { imageError: null, imageUrl: data.results[0].urls.full }; // Return the image URL
        } else {
          return { imageError: null, imageUrl: null };
        }
      } catch (error) {
        return { imageError: 'Failed to fetch image', imageUrl: null };
      }
    };

    const initNameSlugTitle = (location: string) => {
      const name = `Trip to ${location}`;
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      return { name, slug };
    };

    const { imageError, imageUrl } = await fetchImage(location);
    if (imageError) {
      setLoopInitStep(imageError);
      return;
    }

    const { name, slug } = initNameSlugTitle(location);

    // Get Dates for the loop if available
    const startDate = date?.from ? set(date.from, { hours: 12 }) : new Date();
    const endDate = date?.to ? set(date.to, { hours: 12 }) : new Date();

    const loopID = `loop_${nanoid(12)}`;

    const { error } = await supabase.from('loops').insert([
      {
        name,
        slug,
        image: imageUrl,
        location,
        start_date: startDate ?? null, // If startDate is undefined or null, set to null
        end_date: endDate ?? null, // If endDate is undefined or null, set to null
        is_private: isPrivate,
        loop_id: loopID,
        owner_id: user?.id ?? '',
      },
    ]);
    if (error) {
      setLoopInitStep('Failed to create loop');
      return;
    } else {
      setLoopInitStep('Loop created successfully');
      router.push(`/loop/${loopID}/${slug}`);
    }

    // Space for saving collaborators functionality

    // Space for saving the loop to the database
    // image, location name, dates, is Private, slug, loop
  };
  return (
    <main className="flex-1 flex flex-col gap-4 font-sans px-4 lg:px-10 items-center mt-4">
      <section className="flex-1 mb-4 w-full flex flex-col items-center justify-center max-w-2xl gap-6 border px-8 rounded-xl ">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-semibold">Create a new Loop</h3>
          {loopInitStep && (
            <p className="text-sm text-gray-600">{loopInitStep}</p>
          )}
        </div>
        <LocationSearch setLocation={setLocation} />
        <DateRangePicker date={date} setDate={setDate} />
        <UsernameSearch
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <LoopStatusToggle
          isPrivate={isPrivate}
          onToggle={() => setIsPrivate(!isPrivate)}
        />
        <Button
          className={`w-full ${locationError ? 'bg-red-500 hover:bg-red-300' : ''}`}
          onClick={handleCreateLoop}
        >
          {locationError ? locationError : 'Create Loop'}
        </Button>
      </section>
    </main>
  );
}
