'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';

type Profile = {
  id: number;
  created_at: string;
  user_id: string;
  username: string;
  profile_picture: string;
  name: string;
};

export default function UserSearch({
  selectedUsers,
  setSelectedUsers,
  userID,
}: {
  selectedUsers: Profile[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<Profile[]>>;
  userID: string | null;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);

    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .ilike('username', `%${searchTerm}%`);

      if (error) {
        console.error('Error searching for users:', error);
        return;
      }

      // Filter out the current user and users already in selectedUsers
      const filteredResults = (data || []).filter(
        (user) =>
          user.user_id !== userID && // Ensure current user is not shown
          !selectedUsers.some((selectedUser) => selectedUser.id === user.id) // Ensure user isn't already added
      );

      setSearchResults(filteredResults); // Only show users who haven't been added
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const addUser = (user: Profile) => {
    setSelectedUsers((prev) => {
      if (!prev.some((u) => u.id === user.id)) {
        return [...prev, user];
      }
      return prev;
    });
    setIsSearching(false);
  };

  const removeUser = (userId: number) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="w-full space-y-3">
      <Label htmlFor="search" className="text-muted-foreground">
        Search for users to add to your loop (optional)
      </Label>
      <div className="relative" ref={searchRef}>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Enter username"
            className="text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Render search results only when there are results */}
        {isSearching && searchResults.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto">
            <CardContent className="p-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => addUser(user)}
                >
                  <div className="flex items-center gap-2">
                    {/* Show profile image if available */}
                    {user.profile_picture ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.profile_picture}
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <h2 className="font-semibold">{user.name}</h2>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected users section */}
      {selectedUsers.length > 0 && (
        <div className="mb-4 flex items-center gap-4">
          <p className="text-sm font-mono">
            {selectedUsers.length}{' '}
            {selectedUsers.length === 1 ? 'person' : 'people'} added to this
            loop -
          </p>
          <div className="flex flex-wrap -space-x-4">
            {selectedUsers.map((user, index) => (
              <div key={user.id} className="relative group">
                <Avatar
                  className="border-2 border-background cursor-pointer transition-transform group-hover:scale-110"
                  style={{ zIndex: selectedUsers.length - index }}
                >
                  <AvatarImage src={user.profile_picture} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => removeUser(user.id)}
                  className="absolute top-0 bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 -right-2"
                  aria-label={`Remove ${user.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
