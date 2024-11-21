'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function LoginButton() {
  const router = useRouter();
  const supabase = createClient();
  const provider = 'google';
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();

    if (error) {
      console.error('Error logging out:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      if (userData?.user) {
        console.log('Authenticated user:', userData.user); // Log user details
        setUser(userData.user);

        // After verifying the user object, you can upsert it into the database
        try {
          const { error } = await supabase.from('users').upsert({
            id: userData.user.id,
            email: userData.user.email,
          });

          if (error) {
            console.error(
              'Error inserting/updating user in database:',
              error.message
            );
          }
        } catch (err) {
          console.error('Error adding user to the database:', err);
        }
      } else {
        setUser(null);
      }
    };

    fetchData();
  }, [supabase]);

  return (
    <div className="w-full">
      {user ? (
        <Button className="font-onest text w-full" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button className="font-onest text w-full" onClick={handleLogin}>
          Login to DayZero
        </Button>
      )}
    </div>
  );
}
