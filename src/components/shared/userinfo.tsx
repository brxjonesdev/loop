/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

interface Profile {
  profile_picture: string;
  name: string;
  username: string;
}

export default function UserInfo() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user for display:', error.message);
        setError(error);
        return;
      }
      setUser(user);

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('user_id', user.id)
          .single();
        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
          setError(profileError);
          return;
        }
        setProfile(profile);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error loading user information</div>;
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <Card className="flex items-center py-0.5 px-4 gap-4 shadow-none border-none">
      <Avatar>
        <AvatarImage src={profile.profile_picture} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <CardHeader className="p-0 space-y-1 text-sm">
        <CardTitle className="opacity-100 hover:opacity-0 transition-opacity">
          {profile.name}
        </CardTitle>
        <span title={profile.username} className="text-xs">
          @{profile.username}
        </span>
        <CardDescription className="text-xs">
          <Link href="/settings">Settings</Link>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
