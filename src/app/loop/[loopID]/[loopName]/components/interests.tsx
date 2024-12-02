'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import LocationForm from './utils/add-new-location';
import LocationCard from './utils/location-card';
import { Location } from '@/stores/itinerary-store';
import { nanoid } from 'nanoid';
import { useItineraryStore } from '@/stores/itinerary-store-provider';
import { createClient } from '@/utils/supabase/client';

export default function Interests({ loopID }: { loopID: string }) {
  const supabase = createClient();
  const { locations, addLocation, updateLocation, removeLocation } = useItineraryStore((state) => state);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNewLocation = () => {
    const newLocation: Location = {
      id: 'location-temporary',
      name: '',
      address: '',
      notes: '',
      category: '',
      website: '',
      loop_id: loopID,
      time: '',
      location_id: `location-${nanoid(36)}`,
      itinerary_date_id: ' ',
      cost: "0",
      added_by: '',
    };
    addLocation(newLocation);
    setEditingId(newLocation.location_id);
  };

  const saveLocation = async (updatedLocation: Location) => {
    console.log(updatedLocation);
    updateLocation(updatedLocation);
    setEditingId(null);

    const { error } = await supabase.from('locations').upsert({
      name: updatedLocation.name,
      address: updatedLocation.address,
      notes: updatedLocation.notes,
      category: updatedLocation.category,
      website: updatedLocation.website,
      time: updatedLocation.time,
      location_id: updatedLocation.location_id,
      cost: updatedLocation.cost,
    }, {onConflict: 'location_id'});




   
  };

  const editLocation = (id: string) => {
    setEditingId(id);
  };

  const deleteLocation = async (id: string) => {
    removeLocation(id);
    setEditingId(null);

    const { error } = await supabase.from('locations').delete().eq('location_id', id);
  };

  return (
    <div className="container mx-a  uto ">
      <h1 className="text-xl font-bold mb-4">Location Management</h1>
      <div className="grid ">
        {locations && locations.map((location) =>
          editingId === location.location_id ? (
            <LocationForm
              key={location.id}
              location={location}
              onSave={saveLocation}
              onCancel={() => {
                setEditingId(null);
                removeLocation(location.location_id);
              }}
            />
          ) : (
            <LocationCard
              key={location.id}
              location={location}
              onEdit={() => editLocation(location.location_id)}
              onDelete={() => deleteLocation(location.location_id)}
            />
          )
        )}
        {!locations ||
          (locations.length === 0 && (
            <div className=" h-40 flex justify-center items-center bg-black/10 rounded-xl">
              <p className="font-mono">No Locations yet</p>
            </div>
          ))}
      </div>
      <Button onClick={addNewLocation} className="mt-4 w-full" variant={'outline'}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Location
      </Button>
    </div>
  );
}
