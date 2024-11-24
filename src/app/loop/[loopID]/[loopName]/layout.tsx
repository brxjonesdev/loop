import InfoCard from '@/components/loop/info-card';
import Map from '@/components/loop/map';
import Navbar from '@/components/loop/navbar';
import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function LoopPlan({
  params,
  children,
}: {
  params: { loopID: string; loopName: string };
  children: React.ReactNode;
}) {
  const loopID = params.loopID;
  const supabase = await createClient();

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

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  console.log(data, 'data');

  return (
    <section className="flex-1 pt-6 px-4 lg:px-10 font-sans container flex flex-col mx-auto py-4 space-y-4 overflow-y-scroll">
      <section className="flex flex-1 w-full gap-4 overflow-y-scroll">
        {/* Left column */}
        <div className="flex flex-col gap-4 w-[450px] flex-shrink-0">
          <InfoCard loopName={data.name} image={data.image} />
          <Map />
        </div>

        {/* Right column */}
        <div className="flex flex-col w-full space-y-2 overflow-y-auto flex-1 max-h-full">
          <Navbar />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </section>
    </section>
  );
}
