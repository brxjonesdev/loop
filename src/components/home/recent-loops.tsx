import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { InfinityIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <div className="flex-1 flex  gap-6 min-h-96 overflow-x-scroll bg-black/10 p-4 rounded-xl">
        {loops && loops.length > 0 ? (
          loops.map((loop) => (
              <Card className='h-full max-w-80 flex flex-col' key={loop.id}>
                <CardHeader className='p-0'>
                  <img
                    src={loop.image}
                    alt="Loop image" 
                    className="h-full w-full object-cover rounded-t-xl"
                  />
                </CardHeader>
                <CardContent className='flex-1 py-4'>
                <CardTitle className='text-xl'>{loop.name}</CardTitle>
                <CardDescription className='font-mono'>{loop.start_date} - {loop.end_date}</CardDescription>
                </CardContent>
                <CardFooter>
                <Link href={`/loop/${loop.loop_id}/${loop.slug}`} key={loop.id} className='w-full h-full'>
                  <Button className='w-full'>View Loop</Button>
                </Link>
                </CardFooter>
              </Card>
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
