/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function InfoCard({
  loopName,
  image,
}: {
  loopName: string;
  image: string;
}) {
  return (
    <Card className="w-full lg:max-w-lg flex flex-col font-sans">
      <CardHeader className="min-h-48 max-h-48 rounded-t-xl p-0 bg-black">
        <img
          src={image}
          alt="Loop image"
          className="h-full w-full object-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="flex-1 pt-4 pb-2">
        <CardTitle className="lg:text-3xl">{loopName}</CardTitle>
        <CardDescription className="font-mono">
          {' '}
          9/12-2024 - 12/20/2024
        </CardDescription>
      </CardContent>
      <CardFooter className="font-mono flex justify-between w-full gap-4">
        <div>
          <p className="text-sm">
            Irene proposed we go to{' '}
            <span className="text-cyan-400">Cafe Loop</span>.
          </p>
          <p className="text-xs">5 minutes ago</p>
        </div>
        <div className="flex -space-x-3 justify-self-end">
          <div className="h-10 w-10 bg-black/20 rounded-full border-2 border-white"></div>
          <div className="h-10 w-10 bg-blue-300 rounded-full border-2 border-white"></div>
          <div className="h-10 w-10 bg-red-300 rounded-full border-2 border-white"></div>
        </div>
      </CardFooter>
    </Card>
  );
}
