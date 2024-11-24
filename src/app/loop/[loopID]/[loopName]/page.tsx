import React from 'react';
import Interests from './components/interests';
import Recommendations from './components/recommendations';
import Attachments from './components/attachments';
import Itinerary from './components/itinerary';
import Budget from './components/budget';

export default function Home() {
  return (
    <div className=" flex-1 w-full rounded-xl overflow-y-scroll  border space-y-4 p-6">
      <Recommendations/>
      <Interests/>
      <Attachments/>
      <Itinerary/>
      <Budget/>
    </div>
  );
}
