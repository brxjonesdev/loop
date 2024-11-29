'use client';
import { DateRangePicker } from '@/app/loop/create/components/dates';
import LoopStatusToggle from '@/app/loop/create/components/loop-status-toggle';
import LocationSearch from '@/app/loop/create/components/search-locations';
import UsernameSearch from '@/app/loop/create/components/username-search';
import React from 'react';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { set } from 'date-fns';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import AvatarLoopLoading from '@/app/loop/create/components/creating-animation';

export default function CreateLoopPage() {
  const supabase = createClient();
  const router = useRouter();
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [locationError, setLocationError] = React.useState<string | null>(null);
  const [location, setLocation] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [loopInitStep, setLoopInitStep] = React.useState('');
  const [isCreatingLoop, setIsCreatingLoop] = React.useState({
    inProgress: false,
    percentage: 0,
    currentAction: 'Creating Loop...',
  });
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
    if (!location) {
      setLocationError('Please select a location');
      return;
    }

    setIsCreatingLoop((prevState) => ({
      ...prevState,
      inProgress: true,
      currentAction: 'Starting loop creation...',
      percentage: 10,
    }));

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      setIsCreatingLoop((prevState) => ({
        ...prevState,
        currentAction: 'Failed to get your user profile',
      }));
      return;
    }

    setIsCreatingLoop((prevState) => ({
      ...prevState,
      currentAction: 'Got your user profile! Creating loop...',
      percentage: 30,
    }));

    const fetchImage = async (location: string) => {
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      const url = `https://api.unsplash.com/search/photos?query=${location}&client_id=${accessKey}&per_page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          return { imageError: null, imageUrl: data.results[0].urls.full };
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
      setIsCreatingLoop((prevState) => ({
        ...prevState,
        currentAction: imageError,
        percentage: 50,
      }));
      return;
    }

    const { name, slug } = initNameSlugTitle(location);

    const startDate = date?.from ? set(date.from, { hours: 12 }) : new Date();
    const endDate = date?.to ? set(date.to, { hours: 12 }) : new Date();

    const loopID = `loop_${nanoid(12)}`;

    const { error } = await supabase.from('loops').insert([
      {
        name,
        slug,
        image: imageUrl,
        location,
        start_date: startDate ?? null,
        end_date: endDate ?? null,
        is_private: isPrivate,
        loop_id: loopID,
        owner_id: user?.id ?? '',
      },
    ]);

    if (error) {
      setIsCreatingLoop((prevState) => ({
        ...prevState,
        currentAction: 'Failed to create loop',
        percentage: 70,
      }));
      return;
    } else {
      setIsCreatingLoop((prevState) => ({
        ...prevState,
        currentAction: 'Loop created successfully!',
        percentage: 100,
      }));
      router.push(`/loop/${loopID}/${slug}`);
    }
  };

  if (isCreatingLoop.inProgress) {
    return (
      <AvatarLoopLoading
        value={isCreatingLoop.percentage}
        message={isCreatingLoop.currentAction}
      />
    );
  }
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
