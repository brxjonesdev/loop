import React from 'react';

export default function LocalRecommendations() {
  const recommendations = [];
  return (
    <section className="flex-1 gap-4 flex flex-col font-sans px-4 lg:px-10">
      <h2 className="font-semibold text-2xl">Local Recommendations</h2>
      {recommendations.length === 0 ? (
        <div className="bg-black/10 flex-1 rounded-xl flex flex-col items-center justify-center min-h-96">
          <p className="text-lg">No recommendations available</p>
        </div>
      ) : null}
    </section>
  );
}
