import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { InfinityIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/utils/converts';
import DeleteLoop from './utils/delete-loop';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RecentLoops({
  loops,
  userID,
}: {
  loops: any[] | null;
  userID: string;
}) {
  return (
    <section className="flex-1 gap-4 flex flex-col font-sans px-5 lg:px-2 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-3xl text-xl">Your Recent Loops</h2>
        <Link href={`/loop/create/${userID}`}>
          <Button>
            Create a New Loop <InfinityIcon />
          </Button>
        </Link>
      </div>
      <div className=" flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 min-h-96 bg-black/10 p-4 rounded-xl">
        {loops && loops.length > 0 ? (
          loops.map((loop) => (
            <Card
              className="h-fit w-full lg:max-w-xs flex flex-col"
              key={loop.id}
            >
              <CardHeader className="p-0">
                <img
                  src={loop.image}
                  alt="Loop image"
                  className="h-[175px] w-[240px] object-cover rounded-t-xl  "
                />
              </CardHeader>
              <CardContent className="flex-1 py-4 px-2">
                <CardTitle className="text-xl">{loop.name}</CardTitle>
                <CardDescription className="font-mono text-xs">
                  {formatDate(loop.start_date)} - {formatDate(loop.end_date)}
                </CardDescription>
              </CardContent>
              <CardFooter className="px-2 flex flex-col gap-2">
                <Link
                  href={`/loop/${loop.loop_id}/${loop.slug}`}
                  key={loop.id}
                  className="w-full h-full"
                >
                  <Button className="w-full">View Loop</Button>
                </Link>
                <DeleteLoop id={loop.loop_id} />
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="bg-black/10 flex-1 rounded-xl flex flex-col items-center justify-center col-span-8">
            <p className="text-lg">No recent loops available</p>
          </div>
        )}
      </div>
    </section>
  );
}
