import React from 'react';

export default function Notifications() {
  return (
    <section className="flex-1 gap-4 flex flex-col">
      <h2 className="font-semibold text-2xl">Notifications</h2>
      <div className="bg-black/10 flex-1 rounded-xl flex flex-col items-center justify-center min-h-72">
        <p className="text-lg">No notifications available</p>
      </div>
    </section>
  );
}
