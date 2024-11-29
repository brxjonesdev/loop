'use client';
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
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function DeleteLoop({ id }: { id: string }) {
  const router = useRouter();
  const supabase = createClient();
  const deleteLoop = async () => {
    const { data, error } = await supabase
      .from('loops')
      .delete()
      .eq('loop_id', id);
    if (error) {
      console.error('Error deleting loop', error);
      return;
    }
    console.log('Loop deleted successfully');
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="ml-auto font-mono text-xs font-semibold"
        asChild
      >
        <Button size={'sm'} className="p-1 px-2 h-fit hover:bg-red-500">
          Delete Loop
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your loop
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:bg-red-500" onClick={deleteLoop}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
