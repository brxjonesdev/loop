'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { ReservationForm } from './add-flight'
import { ReservationCard } from './flight-card'

interface Reservation {
  id: string
  flightNumber: string
  airline: string
  departureTime: string
  arrivalTime: string
  confirmationNumber: string
}

export default function FlightReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const addReservation = () => {
    const newReservation: Reservation = {
      id: Date.now().toString(),
      flightNumber: '',
      airline: '',
      departureTime: '',
      arrivalTime: '',
      confirmationNumber: ''
    }
    setReservations([...reservations, newReservation])
    setEditingId(newReservation.id)
  }

  const saveReservation = (updatedReservation: Reservation) => {
    setReservations(reservations.map(res => 
      res.id === updatedReservation.id ? updatedReservation : res
    ))
    setEditingId(null)
  }

  const editReservation = (id: string) => {
    setEditingId(id)
  }

  const deleteReservation = (id: string) => {
    setReservations(reservations.filter(res => res.id !== id))
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Flight Reservations</h1>
      
      <div className="grid gap-4 ">
        {reservations.map(reservation => (
          editingId === reservation.id ? (
            <ReservationForm
              key={reservation.id}
              reservation={reservation}
              onSave={saveReservation}
              onCancel={() => {
                deleteReservation(reservation.id)
                setEditingId(null)
              }}
            />
          ) : (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onEdit={() => editReservation(reservation.id)}
              onDelete={() => deleteReservation(reservation.id)}
            />
          )
        ))}
      </div>
      <Button onClick={addReservation} className="mt-4 w-full" variant={"outline"}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Reservation
      </Button>
    </div>
  )
}

