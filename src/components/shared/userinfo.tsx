import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function UserInfo() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user for display:', error.message);
  }
  if (!user) {
    return null;
  }
  return (
    <Card className="flex items-center py-0.5 px-4 gap-4 shadow-none border-none">
      <Avatar>
        <AvatarImage src={user.user_metadata.avatar_url} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <CardHeader className="p-0 space-y-1 text-sm">
        <CardTitle>{user.user_metadata.full_name}</CardTitle>
        <CardDescription className="text-xs">
          <Link href="/home/profile">Settings</Link>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
