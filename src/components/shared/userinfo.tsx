import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/utils/supabase/server';

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
    <Card className="flex items-center p-2 gap-4 shadow-none">
      <Avatar>
        <AvatarImage src={user.user_metadata.avatar_url} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <CardHeader className="p-0">
        <CardTitle>{user.user_metadata.full_name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
    </Card>
  );
}
