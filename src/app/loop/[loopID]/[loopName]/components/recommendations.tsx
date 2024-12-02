import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Recommendations() {
  return (
    <section className="space-y-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold">Explore</h2>
        <Button variant="outline" size="sm" className="ml-auto" disabled>
          Browse all
        </Button>
      </div>
      <div className="flex items-center justify-center h-36 bg-black/5 rounded-xl">
      <p className='text-center font-mono'>
        This feature is coming soon!<br/> Stay tuned for updates.
      </p>
        
      </div>
    </section>
  );
}
