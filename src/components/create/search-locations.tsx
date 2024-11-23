'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { useRef, useCallback } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
  name: string;
}

export default function LocationSearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isResultsVisible, setIsResultsVisible] = React.useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(search, 300);

  React.useEffect(() => {
    async function fetchLocations() {
      if (debouncedSearch.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: debouncedSearch,
          format: 'json',
          limit: '5',
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        console.log('Fetched locations:', data);
        setResults(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, [debouncedSearch]);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLocationClick = (result: SearchResult) => {
    const formattedLocation = {
      lat: result.lat,
      lon: result.lon,
      full_name: result.display_name,
      name: result.name,
    };
    console.log('Formatted location:', formattedLocation);
    setSearch(formattedLocation.name);
    setIsResultsVisible(false);
  };

  return (
    <div className="w-full mx-auto space-y-2 text-left" ref={searchRef}>
      <Label htmlFor="search" className="text-sm text-muted-foreground">
        Search for a location
      </Label>
      <div className="relative">
        <Input
          type="text"
          id="search"
          placeholder="Search locations..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsResultsVisible(true);
          }}
          className="pl-8 text-sm"
        />
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="relative h-0">
        {isResultsVisible && (
          <>
            {loading && (
              <Card className="absolute top-0 left-0 right-0 z-10">
                <CardContent className="p-4">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && results.length > 0 && (
              <Card className="absolute top-0 left-0 right-0 z-10 max-h-[300px] overflow-y-auto">
                <CardContent className="p-2">
                  <div className="space-y-2">
                    {results.map((result) => (
                      <Button
                        key={result.place_id}
                        variant="ghost"
                        className="w-full justify-start text-left font-normal overflow-x-hidden py-4 flex flex-col items-start"
                        onClick={() => handleLocationClick(result)}
                      >
                        <CardTitle className="text-sm">{result.name}</CardTitle>
                        <CardDescription className="text-xs truncate w-full">
                          {result.display_name}
                        </CardDescription>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && search.length >= 3 && results.length === 0 && (
              <Card className="absolute top-0 left-0 right-0 z-10">
                <CardContent className="p-4 text-center text-sm text-muted-foreground">
                  No locations found
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
