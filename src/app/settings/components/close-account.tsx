'use client';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { createClient } from '@/utils/supabase/client';

export default function CloseAccount() {
  const supabase = createClient();

  const cleanHouse = async () => {
    // delete all user data
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user data', error);
      return;
    }
    const { id } = data.user;

    try {
      const [profileData, loopsData] = await Promise.all([
        supabase.from('profiles').delete().eq('user_id', id),
        supabase.from('loops').delete().eq('owner_id', id),
      ]);

      if (profileData.error) {
        console.error('Error deleting profile', profileData.error);
      }

      if (loopsData.error) {
        console.error('Error deleting loops', loopsData.error);
      }
    } catch (error) {
      console.error('Error during deletion process', error);
    }
  };

  return (
    <div className="  p-4 rounded-lg flex justify-between items-center border border-black/20">
      <div>
        <Label>Close Your Account</Label>
        <CardDescription>
          This action is irreversible and will delete all your data
        </CardDescription>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-fit hover:bg-red-400">Erase All Trace!</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={cleanHouse}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
