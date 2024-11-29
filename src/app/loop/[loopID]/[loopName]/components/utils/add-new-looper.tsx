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
import UserSearch from '@/app/loop/create/components/username-search';

export default function AddLooperButton() {
  const [selectedUsers, setSelectedUsers] = React.useState<
    {
      id: number;
      username: string;
      name: string;
      email: string;
      avatar: string;
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
        <DialogHeader>
          <DialogTitle>Add User to this Loop</DialogTitle>
          <DialogDescription>
            Send an invite to a user to join this loop
          </DialogDescription>
        </DialogHeader>
        <UserSearch
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </DialogContent>
    </Dialog>
  );
}
