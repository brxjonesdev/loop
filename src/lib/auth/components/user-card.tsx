import React from 'react'
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/auth/supabase/server';

export default async function UserCard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <Card className='bg-accent/15 border-0 font-title p-0'>
  <CardHeader className=' flex flex-row justify-between items-center p-3'>
    <div className='flex flex-col space-y-1'>
    <CardTitle>{user?.user_metadata.user_name}</CardTitle>
    </div>
    <CardAction>
        <Avatar className='w-12 h-12'>
            <AvatarFallback>{user?.user_metadata.user_name.charAt(0)}</AvatarFallback>
            <AvatarImage src={user?.user_metadata.avatar_url} />
        </Avatar>
    </CardAction>
  </CardHeader>
</Card>
  )
}
