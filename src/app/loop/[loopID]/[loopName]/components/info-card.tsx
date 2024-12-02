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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import AddLooperButton from './utils/add-new-looper';
import { createClient } from '@/utils/supabase/server';
import { formatDate } from '@/utils/converts';
import Image from 'next/image';

export default async function InfoCard({
  userID,
  isOwner,
  loopID,
}: {
  userID: string | undefined;
  isOwner: boolean;
  loopID: string;
}) {
  const supabase = await createClient();

  // Get Loop Info
  const [loopResponse, profileResponse] = await Promise.all([
    supabase
      .from('loops')
      .select()
      .eq('owner_id', userID)
      .eq('loop_id', loopID)
      .single(),
    supabase.from('profiles').select().eq('user_id', userID).single(),
  ]);

  const { data: loopData, error: loopError } = loopResponse;
  const { data: profileData, error: profileError } = profileResponse;

  if (loopError || profileError) {
    console.error(
      'Error fetching loop or profile data:',
      loopError,
      profileError
    );
    return <div>Error fetching loop or profile data</div>;
  }

  // get avatar images for users in the loop
  const fetchAvatars = async () => {
    const avatars: string[] = [profileData?.profile_picture];
    return avatars;
  };

  const avatars = await fetchAvatars();

  return (
    <Card className="w-full lg:max-w-lg flex flex-col font-sans">
      <CardHeader className="min-h-48 max-h-48 rounded-t-xl p-0 bg-black">
        <Image
          src={loopData?.image}
          alt="Loop image"
          width={400}
          height={200}
          className="h-full w-full object-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="flex-1 pt-4 pb-2 flex gap-1">
        <div>
          <CardTitle className="lg:text-3xl">{loopData?.name}</CardTitle>
          <CardDescription className="font-mono">
            {formatDate(loopData?.start_date)} -{' '}
            {formatDate(loopData?.end_date)}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="font-mono flex justify-end w-full gap-4 min-h-[60px]">
        <div className="flex -space-x-3 justify-self-end items-center justify-center">
          <AddLooperButton />

          {avatars.map((avatar) => {
            return (
              <div
                key={avatar}
                className="h-10 w-10 bg-black/20 rounded-full border-2 border-white"
              >
                <Avatar>
                  <AvatarImage src={avatar} className="w-full h-full" />
                  <AvatarFallback className="w-full h-full">CN</AvatarFallback>
                </Avatar>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
