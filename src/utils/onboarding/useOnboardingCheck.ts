'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { nanoid } from 'nanoid';

export const useOnboardingCheck = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkOnboarding = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        throw new Error(userError?.message || 'No authenticated user found');
      }

      const userId = userData.user.id;
      // Check if the profile already exists
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (profileError) {
        throw new Error(profileError.message);
      }

      // If no profile exists, create one
      if (!profiles || profiles.length === 0) {
        const { error: insertError } = await supabase.from('profiles').insert({
          user_id: userId, // Use the authenticated user's ID
          name: userData.user.user_metadata.full_name || 'Anonymous', // Default to 'Anonymous' if no name
          profile_picture: userData.user.user_metadata.avatar_url || '', // Default to empty string if no image
          username: `user-${nanoid(8)}-${userData.user.user_metadata.full_name.replace(/\s+/g, '')}`, // Generate a random username
        });

        if (insertError) {
          throw new Error(insertError.message);
        }
      }

      console.log('Profile checked/created successfully');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding profile:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return { checkOnboarding, loading, error };
};
