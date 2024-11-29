'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import LocationForm from './utils/add-new-location'
import LocationCard  from './utils/location-card'

interface Location {
  id: string
  name: string
  address: string
  notes: string
  category: string
  website: string
}

export default function LocationManagement() {
  const [locations, setLocations] = useState<Location[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const addLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      name: '',
      address: '',
      notes: '',
      category: '',
      website: ''
    }
    setLocations([...locations, newLocation])
    setEditingId(newLocation.id)
  }

  const saveLocation = (updatedLocation: Location) => {
    setLocations(locations.map(location => 
      location.id === updatedLocation.id ? updatedLocation : location
    ))
    setEditingId(null)
  }

  const editLocation = (id: string) => {
    setEditingId(id)
  }

  const deleteLocation = (id: string) => {
    setLocations(locations.filter(location => location.id !== id))
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-xl font-bold mb-4">Location Management</h1>
      <div className="grid ">
        {locations.map(location => (
          editingId === location.id ? (
            <LocationForm
              key={location.id}
              location={location}
              onSave={saveLocation}
              onCancel={() => {
                setEditingId(null)
                setLocations(locations.filter(l => l.id !== location.id))
              }}
            />
          ) : (
            <LocationCard
              key={location.id}
              location={location}
              onEdit={() => editLocation(location.id)}
              onDelete={() => deleteLocation(location.id)}
            />
          )
        ))}
        
      </div>
      <Button onClick={addLocation} className="mt-4 w-full"  variant={"outline"}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Location
      </Button>
    </div>
  )
}

