import InfoCard from '@/components/loop/info-card';
import Map from '@/components/loop/map';
import Navbar from '@/components/loop/navbar';
import React from 'react';

export default function LoopPlan({
  params,
  children,
}: {
  params: { loopID: string; loopName: string };
  children: React.ReactNode;
}) {
  const loopID = params.loopID;
  const loopName = params.loopName;
  console.log(loopID);
  return (
    <section className="flex-1 overflow-y-scroll  pt-6 px-4 lg:px-10 font-sans container flex flex-col mx-auto py-4 space-y-4">
      <section className="flex flex-1 w-full gap-4">
        <div className="flex flex-col gap-4 justify-between w-[450px]">
          <InfoCard loopName={loopName} />
          <Map />
        </div>
        <div className="flex flex-col w-4/6 space-y-4">
          <Navbar />
          {children}
        </div>
      </section>
    </section>
  );
}
