'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      return;
    }
    router.push('/');
  };
  return (
    <div className="  p-4 rounded-lg flex justify-between items-center border border-black/20">
      <Label>Logout from your account</Label>
      <Button className="w-fit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
