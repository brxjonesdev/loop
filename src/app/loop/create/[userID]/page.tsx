'use client';

import { DateRangePicker } from '@/app/loop/create/[userID]/components/dates';
import LoopStatusToggle from '@/app/loop/create/[userID]/components/loop-status-toggle';
import LocationSearch from '@/app/loop/create/[userID]/components/search-locations';
import UsernameSearch from '@/app/loop/create/[userID]/components/username-search';
import React from 'react';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { set } from 'date-fns';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import { nanoid } from 'nanoid';
import AvatarLoopLoading from '@/app/loop/create/[userID]/components/creating-animation';

export default function CreateLoopPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams<{ userID: string }>();

  const [isPrivate, setIsPrivate] = React.useState(false);
  const [locationError, setLocationError] = React.useState<string | null>(null);
  const [location, setLocation] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [isCreatingLoop, setIsCreatingLoop] = React.useState({
    inProgress: false,
    percentage: 0,
    currentAction: 'Creating Loop...',
  });
  const [selectedUsers, setSelectedUsers] = React.useState<
    {
      id: number;
      created_at: string;
      user_id: string;
      username: string;
      profile_picture: string;
      name: string;
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

    const updateProgress = (currentAction: string, percentage: number) =>
      setIsCreatingLoop((prevState) => ({
        ...prevState,
        currentAction,
        percentage,
        inProgress: true,
      }));

    updateProgress('Starting loop creation...', 10);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      updateProgress('Failed to get your user profile', 0);
      return;
    }

    updateProgress('Got your user profile! Creating loop...', 30);

    const fetchImage = async (location: string) => {
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      const url = `https://api.unsplash.com/search/photos?query=${location}&client_id=${accessKey}&per_page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results?.[0]?.urls.full || null;
      } catch {
        return null;
      }
    };

    const imageUrl = await fetchImage(location);
    if (!imageUrl) {
      updateProgress('Failed to fetch image', 50);
      return;
    }

    const { name, slug } = {
      name: `Trip to ${location}`,
      slug: `trip-to-${location.toLowerCase().replace(/\s+/g, '-')}`,
    };

    const startDate = date?.from ? set(date.from, { hours: 12 }) : null;
    const endDate = date?.to ? set(date.to, { hours: 12 }) : null;

    if (!startDate || !endDate) {
      updateProgress('Invalid start or end date', 0);
      return;
    }

    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days <= 0) {
      updateProgress('End date must be after start date', 0);
      return;
    }

    const loopID = `loop_${nanoid(12)}`;

    // Step 1: Create the loop
    const { error: loopError } = await supabase.from('loops').insert([
      {
        name,
        slug,
        image: imageUrl,
        location,
        start_date: startDate,
        end_date: endDate,
        is_private: isPrivate,
        loop_id: loopID,
        owner_id: user?.id || '',
      },
    ]);

    if (loopError) {
      updateProgress('Failed to create loop', 0);
      return;
    }

    updateProgress('Loop created successfully!', 40);

    // Step 2: Create itinerary and itinerary dates
    const createItinerary = async () => {
      const itineraryID = `itinerary_${nanoid(12)}`;
    
      const numberOfDays = days + 1;
    
      const itineraryDates = Array.from({ length: numberOfDays }, (_, i) => ({
        itinerary_id: itineraryID,
        date: set(startDate, { date: startDate.getDate() + i }),
        date_id: `date_${nanoid(64)}`,
      }));
    
      const { error: itineraryError } = await supabase
        .from('itineraries')
        .insert([{ itinerary_id: itineraryID, loop_id: loopID }]);
    
      if (itineraryError) {
        return itineraryError;
      }
    
      const { error: itineraryDateError } = await supabase
        .from('itinerary_dates')
        .insert(itineraryDates);
    
      return itineraryDateError;
    };
    




    const itineraryError = await createItinerary();
    if (itineraryError) {
      updateProgress('Failed to create itinerary or itinerary dates', 70);
      return;
    }

    updateProgress('Itinerary created successfully!', 60);

    // Step 3: Add loop members
    const loopMembers = selectedUsers.map((user) => ({
      loop_id: loopID,
      user_id: user.user_id,
      role: 'member',
      is_active: true,
    }));

    const { error: memberError } = await supabase
      .from('loop_members')
      .insert(loopMembers);

    if (memberError) {
      updateProgress('Failed to add loop members', 70);
      return;
    }

    updateProgress('Loop members added successfully!', 80);

    // Step 4: Send invitations
    const sendInvites = async () => {
      for (const selectedUser of selectedUsers) {
        const { error: inviteError } = await supabase
          .from('invitations')
          .insert([
            {
              loop_id: loopID,
              invitee_id: selectedUser.user_id,
              inviter_id: user?.id,
            },
          ]);
        if (inviteError) return inviteError;
      }
      return null;
    };

    const inviteError = await sendInvites();
    if (inviteError) {
      updateProgress('Failed to send invites', 90);
      return;
    }


    // Step 5: Initialize budget
    const { error: budgetError } = await supabase.from('budgets').insert([
      {
        loop_id: loopID,
        total: "0",
        currency: "$",
        remaining: "0",
        budget_id: `budget_${nanoid(36)}`,
      },
    ]);

    if (budgetError) {
      updateProgress('Failed to initialize budget', 90);
      return;
    }else{
      updateProgress('Budget initialized successfully!', 92);
    }

    updateProgress('Loop created successfully!', 100);
    router.push(`/loop/${loopID}/${slug}`);
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
      <section className="flex-1 mb-4 w-full flex flex-col items-center justify-center max-w-2xl gap-6 border px-8 rounded-xl">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-semibold">Create a new Loop</h3>
        </div>
        <LocationSearch setLocation={setLocation} />
        <DateRangePicker date={date} setDate={setDate} />
        <UsernameSearch
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          userID={params.userID}
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
