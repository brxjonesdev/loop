'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { createClient } from '@/utils/supabase/client';

export default function UsernameChange() {
  const supabase = createClient();
  const [username, setUsername] = React.useState({
    username: '',
    status: '',
  });
  const [initialUsername, setInitialUsername] = React.useState('');

  React.useEffect(() => {
    const fetchUsername = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user data', error);
        return;
      }
      const { data: userData } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', data?.user.id)
        .single();
      if (!userData) {
        console.error('Error fetching username');
        return;
      }
      setUsername((prevState) => ({
        ...prevState,
        username: userData.username,
      }));
      setInitialUsername(userData.username);
    };
    fetchUsername();
  }, []);

  const handleUsernameChange = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user data', error);
      return;
    }
    const { id } = data.user;

    //Check if username is already taken
    const { data: usernameData, error: usernameError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username.username)
      .single();
    if (usernameData) {
      setUsername((prevState) => ({
        ...prevState,
        status: 'Username already taken',
      }));
      return;
    }

    // Update username
    const { data: updateData, error: updateError } = await supabase
      .from('profiles')
      .update({
        username: username.username,
      })
      .eq('user_id', id);
    if (updateError) {
      setUsername((prevState) => ({
        ...prevState,
        status: 'Error updating username',
      }));
      return;
    }

    setUsername((prevState) => ({
      ...prevState,
      status: 'Username updated successfully',
    }));
  };

  const isButtonDisabled =
    !username.username || username.username === initialUsername;

  return (
    <div className="border border-black/20 p-4 rounded-lg ">
      <div className="space-y-2">
        <Label>Change Your Username</Label>
        <div className="grid md:grid-cols-[1fr,.5fr] gap-4">
          <Input
            placeholder="Enter your new username"
            value={username.username}
            onChange={(e) =>
              setUsername((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
          <Button
            className="w-full"
            disabled={isButtonDisabled}
            onClick={handleUsernameChange}
          >
            Save Changes
          </Button>
          <p className="text-cyan-500 text-xs">{username.status}</p>
        </div>
      </div>
    </div>
  );
}
