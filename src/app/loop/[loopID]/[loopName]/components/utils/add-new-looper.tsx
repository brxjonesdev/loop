'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UserSearch from '@/app/loop/create/[userID]/components/username-search';

export default function AddLooperButton() {
  const [selectedUsers, setSelectedUsers] = React.useState<
    {
      id: number;
      created_at: string;
      user_id: string;
      username: string;
      profile_picture: string;
      name: string;
    }[]
  >([]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 w-11 bg-black/20 rounded-full border-2 border-white">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* <DialogHeader>
          <DialogTitle>Add User to this Loop</DialogTitle>
          <DialogDescription>
            Send an invite to a user to join this loop
          </DialogDescription>
        </DialogHeader>
        <UserSearch
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          userID={null}
        /> */}

        <section className="flex flex-col space-y-4 items-center justify-center bg-black/10 py-1 font-mono rounded-xl">
          <p>Feature Coming Soon</p>
        </section>
      </DialogContent>
    </Dialog>
  );
}
