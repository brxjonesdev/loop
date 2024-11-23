'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';

// Dummy user data
const dummyUsers = [
  {
    id: 1,
    username: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    username: 'jane_smith',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    username: 'bob_johnson',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    username: 'alice_williams',
    name: 'Alice Williams',
    email: 'alice@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 5,
    username: 'charlie_brown',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

export default function UserSearch({
  selectedUsers,
  setSelectedUsers,
}: {
  selectedUsers: typeof dummyUsers;
  setSelectedUsers: React.Dispatch<React.SetStateAction<typeof dummyUsers>>;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof dummyUsers>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  const handleSearch = () => {
    const results = dummyUsers.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(true);
  };

  const addUser = (user: (typeof dummyUsers)[0]) => {
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

        {isSearching && searchResults.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto">
            <CardContent className="p-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => addUser(user)}
                >
                  <h2 className="font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {selectedUsers.length > 0 && (
        <div className="mb-4 flex items-center gap-4">
          <p className="text-sm font-mono">
            {selectedUsers.length}
            {selectedUsers.length === 1 ? ' person' : ' people'} added to this
            loop -
          </p>
          <div className="flex flex-wrap -space-x-4">
            {selectedUsers.map((user, index) => (
              <div key={user.id} className="relative group">
                <Avatar
                  className="border-2 border-background cursor-pointer transition-transform group-hover:scale-110"
                  style={{ zIndex: selectedUsers.length - index }}
                >
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => removeUser(user.id)}
                  className="absolute top-0  bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 -right-2"
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
