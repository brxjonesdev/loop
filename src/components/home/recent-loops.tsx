import Link from 'next/link';
import React from 'react';

export default function RecentLoops() {
  return (
    <section className="flex-1 gap-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-3xl">Your Recent Loops</h2>
        <Link className="text-blue-500" href="/loop/create">
          View all
        </Link>
      </div>
      <div className="flex-1 flex flex-col gap-2 min-h-96">
        <div className="bg-black/10 flex-1 rounded-xl flex flex-col items-center justify-center">
          <p className="text-lg">No recent loops available</p>
        </div>
      </div>
    </section>
  );
}
