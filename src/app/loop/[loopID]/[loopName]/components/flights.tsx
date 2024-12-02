'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ReservationForm } from './attachment-views/add-flight';
import { ReservationCard } from './attachment-views/flight-card';
import { createClient } from '@/utils/supabase/client';
import { useItineraryStore } from '@/stores/itinerary-store-provider';
import { nanoid } from 'nanoid';
import { set } from 'date-fns';
import { Flight } from '@/stores/itinerary-store';

export default function FlightReservation({ loopID }: { loopID: string }) {
  const supabase = createClient();
  const [editingId, setEditingId] = useState<string | null | undefined>(null);
  const { flights, addFlight, removeFlight, updateFlight, addExpense, deleteExpense, budget, updateExpense} =
    useItineraryStore((state) => state);

  const addReservation = async () => {
    const newFlight: Flight= {
      id: `flight-temporary`,
      number: '',
      airline: '',
      departure: '',
      arrival: '',
      confirmation: '',
      departureDate: '',
      departureTime: '',
      arrivalDate: '',
      arrivalTime: '',
      flight_id: `flight-${nanoid(36)}`,
      cost: parseFloat('0').toFixed(2),
      loop_id: loopID,
      itinerary_date_id: null,
    };
    addFlight(newFlight);
    setEditingId(newFlight.flight_id);
  };

  const saveReservation = async (flightData: Flight) => { 
    updateFlight(flightData)

    const {error } = await supabase.from('flights').upsert({
      number: flightData.number,
      airline: flightData.airline,
      departure: flightData.departure,
      arrival: flightData.arrival,
      confirmation: flightData.confirmation,
      departureDate: flightData.departureDate,
      departureTime: flightData.departureTime,
      arrivalDate: flightData.arrivalDate,
      arrivalTime: flightData.arrivalTime,
      flight_id: flightData.flight_id,
      cost: flightData.cost,
      loop_id: flightData.loop_id,
      itinerary_date_id: flightData.itinerary_date_id,
    }, { onConflict: 'flight_id' });

    if (error) {
      console.error('error', error);
    }


    if (budget?.expenses?.find((expense) => expense.id === flightData.flight_id)) {
      updateExpense({
        attachment: flightData.flight_id,
        description: `${flightData.airline} ${flightData.number}`,
        cost: parseFloat(parseFloat(flightData.cost).toFixed(2)),
      })
      const {error} = await supabase.from('expenses').upsert({
        description: `${flightData.airline} ${flightData.number}`,
        cost: parseFloat(parseFloat(flightData.cost).toFixed(2)),
        category: 'Transportation',
        budget_id: budget?.budget_id ?? '',
      }).eq('attachment', flightData.flight_id);

      if (error) {
        console.error('error', error);
      }
    } else {
      addExpense({
        attachment: flightData.flight_id,
        category: 'Transportation',
        description: `${flightData.airline} ${flightData.number}`,
        cost: parseFloat(parseFloat(flightData.cost).toFixed(2)),
      })

      const {error} = await supabase.from('expenses').upsert({
        attachment: flightData.flight_id,
        description: `${flightData.airline} ${flightData.number}`,
        cost: parseFloat(parseFloat(flightData.cost).toFixed(2)),
        budget_id: budget.budget_id ?? '',
        category: 'Transportation',
      }, {onConflict: 'attachment'});

      console.error('error', error);
    }
    

    setEditingId(null);

  

    
  };

  const editReservation = (id: string | null | undefined) => {
    setEditingId(id);
  };

  const deleteReservation = async (id: string) => {
    removeFlight(id);
    deleteExpense(id);
    const { error } = await supabase.from('flights').delete().eq('flight_id', id);
    if (error) {
      console.error('error', error);
    }

  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Flight Reservations</h1>

      <div className="grid gap-4 ">
        {flights &&
          flights.map((reservation) =>
            editingId === reservation.flight_id ? (
              <ReservationForm
                key={reservation.id}
                reservation={reservation}
                onSave={saveReservation}
                onCancel={() => {
                  // Delete the latest reservation if it's a temporary one
                  if (reservation.id === 'flight-temporary') {
                    deleteReservation(reservation.flight_id);
                  }
                  setEditingId(null);
                }}
              />
            ) : (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onEdit={() => editReservation(reservation.flight_id)}
                onDelete={() => deleteReservation(reservation.flight_id)}
              />
            )
          )}
        {!flights ||
          (flights.length === 0 && (
            <div className=" h-40 flex justify-center items-center bg-black/10 rounded-xl">
              <p className="font-mono">No reservations yet</p>
            </div>
          ))}
      </div>
      <Button
        onClick={addReservation}
        className="mt-4 w-full"
        variant={'outline'}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Reservation
      </Button>
    </div>
  );
}
