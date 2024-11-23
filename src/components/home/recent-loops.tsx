import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { InfinityIcon } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RecentLoops({ loops }: { loops: any[] | null }) {
  return (
    <section className="flex-1 gap-4 flex flex-col font-sans px-4 lg:px-10">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-3xl text-xl">Your Recent Loops</h2>
        <Link href={'/loop/create'}>
          <Button>
            Create a New Loop <InfinityIcon />
          </Button>
        </Link>
      </div>
      <div className="flex-1 flex flex-col gap-2 min-h-96">
        {loops && loops.length > 0 ? (
          loops.map((loop) => (
            <Link href={`/loop/${loop.id}`} key={loop.id}>
              <a className="bg-black/10 rounded-xl p-4 flex items-center gap-4">
                <div className="h-16 w-16 bg-black/20 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="font-semibold">{loop.name}</h3>
                  <p>{loop.description}</p>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <div className="bg-black/10 flex-1 rounded-xl flex flex-col items-center justify-center">
            <p className="text-lg">No recent loops available</p>
          </div>
        )}
      </div>
    </section>
  );
}
