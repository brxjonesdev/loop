/* eslint-disable @next/next/no-img-element */
import React from 'react';
import map from '@/public/google-maps.png';

export default function Map() {
  return (
    <section className="w-full h-full  bg-gray-200 rounded-xl relative">
      <div className="bg-black/70 absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl font-bold rounded-xl font-mono">
        Feature Coming Soon
      </div>
      <img
        src={map.src}
        alt="map"
        className="w-full h-full object-cover rounded-xl"
      />
    </section>
  );
}
