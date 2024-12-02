import React from 'react';
import { Progress } from '@/components/ui/progress';

export default function AvatarLoopLoading({
  value,
  message,
}: {
  value: number;
  message: string;
}) {
  return (
    <div className="flex items-center justify-center flex-1 font-sans">
      <div className="bg-black/10 max-h-[40rem] max-w-4xl w-full h-full rounded-xl flex flex-col justify-center items-center gap-4">
        <p className="text-5xl  font-bold">Creating Loop</p>
        <Progress value={value} className="max-w-md" />
        <p>{message}</p>
      </div>
    </div>
  );
}
