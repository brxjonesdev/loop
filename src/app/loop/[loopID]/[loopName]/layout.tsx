import InfoCard from './components/info-card';
import Map from './components/map';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { ItineraryStoreProvider } from '@/stores/itinerary-store-provider';

export default async function LoopPlan({
  params,
  children,
}: {
  params: { loopID: string; loopName: string };
  children: React.ReactNode;
}) {
  const loopID = params.loopID;
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const fetchLoopDetails = async () => {
    const { data, error } = await supabase
      .from('loops')
      .select()
      .eq('loop_id', loopID)
      .single();
    if (error) {
      return { fetchError: 'Failed to get details from database', data: null };
    }
    return { fetchError: null, data };
  };

  const { fetchError, data } = await fetchLoopDetails();

  const isOwner = user.user?.id === data?.owner_id;

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  return (
    <section className="flex-1 pt-6 px-4 lg:px-10 font-sans container flex flex-col mx-auto py-4 space-y-4 overflow-y-scroll">
      <section className="flex flex-1 w-full gap-4 lg:overflow-y-scroll flex-col lg:flex-row mb-36 lg:mb-4">
        {/* Left column */}
        <div className="flex flex-col gap-4 w-full lg:w-[450px] flex-shrink-0">
          <InfoCard userID={user.user?.id} isOwner={isOwner} loopID={loopID} />
          <Map />
        </div>

        {/* Right column */}
        <div className="flex flex-col w-full space-y-2 lg:overflow-y-auto flex-1 max-h-full">
          <div className="flex-1 overflow-y-auto">
            <ItineraryStoreProvider>{children}</ItineraryStoreProvider>
          </div>
        </div>
      </section>
    </section>
  );
}
