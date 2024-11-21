import LocalRecommendations from '@/components/home/local-recommendations';
import RecentLoops from '@/components/home/recent-loops';
import React from 'react';

export default function Homepage() {
  return (
    <section className="flex-1 mx-10 flex flex-col gap-12">
      <RecentLoops />
      <LocalRecommendations />
    </section>
  );
}
