import React from 'react';

export default function NewLoop() {
  return (
    <section className="flex-1 gap-4 flex flex-col">
      <h2 className="font-semibold text-2xl">Start a New Loop</h2>
      <div className="bg-black/10 flex-1 rounded-xl flex flex-col items-center justify-center h-72">
        <p className="text-lg">No new loops available</p>
      </div>
    </section>
  );
}
