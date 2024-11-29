'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { LodgingForm } from './add-lodging'
import { LodgingCard } from './lodging-card'

interface Lodging {
  id: string
  name: string
  type: string
  address: string
  checkIn: Date
  checkOut: Date
  guestCount: number
  amenities: string[]
  cost: number
  bookingReference: string
}

export default function Lodging() {
  const [lodgings, setLodgings] = useState<Lodging[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const addLodging = () => {
    const newLodging: Lodging = {
      id: Date.now().toString(),
      name: '',
      type: '',
      address: '',
      checkIn: new Date(),
      checkOut: new Date(),
      guestCount: 1,
      amenities: [],
      cost: 0,
      bookingReference: ''
    }
    setLodgings([...lodgings, newLodging])
    setEditingId(newLodging.id)
  }

  const saveLodging = (updatedLodging: Lodging) => {
    setLodgings(lodgings.map(lodging => 
      lodging.id === updatedLodging.id ? updatedLodging : lodging
    ))
    setEditingId(null)
  }

  const editLodging = (id: string) => {
    setEditingId(id)
  }

  const deleteLodging = (id: string) => {
    setLodgings(lodgings.filter(lodging => lodging.id !== id))
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-xl font-bold mb-4">Lodging Reservations</h1>
      <div className=" space-y-4">
        {lodgings.map(lodging => (
          editingId === lodging.id ? (
            <LodgingForm
              key={lodging.id}
              lodging={lodging}
              onSave={saveLodging}
              onCancel={() => {
                deleteLodging(lodging.id)
                setEditingId(null)
              }}
            />
          ) : (
            <LodgingCard
              key={lodging.id}
              lodging={lodging}
              onEdit={() => editLodging(lodging.id)}
              onDelete={() => deleteLodging(lodging.id)}
            />
          )
        ))}
      </div>
      <Button onClick={addLodging} className="mt-4 w-full" variant={"outline"}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Lodging
      </Button>
    </div>
  )
}

