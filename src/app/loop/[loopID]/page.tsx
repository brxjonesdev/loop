import InfoCard from '@/components/loop/info-card';
import Itinerary from '@/components/loop/itinerary';
import Map from '@/components/loop/map';
import Navbar from '@/components/loop/navbar';
import React from 'react';

export default function LoopPlan({ params }: { params: { loopID: string } }) {
  const loopID = params.loopID;
  console.log(loopID);
  return (
    <section className="h-dvh overflow-y-scroll gap-4 flex flex-col mx-10 pt-6">
      <div className="flex gap-4">
        <InfoCard />
        <Map />
      </div>
      <Navbar />
      <Itinerary />
    </section>
  );
}
