'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { LodgingForm } from './attachment-views/add-lodging';
import { LodgingCard } from './attachment-views/lodging-card';
import { createClient } from '@/utils/supabase/client';
import { Lodging } from '@/stores/itinerary-store';
import { useItineraryStore } from '@/stores/itinerary-store-provider';
import { nanoid } from 'nanoid';

export default function Lodging({ loopID }: { loopID: string }) {
  const supabase = createClient();
  const [editingId, setEditingId] = useState<string | null | undefined>(null);
  const { lodgings, addLodging, removeLodging, updateLodging, addExpense, updateExpense, budget, deleteExpense } =
    useItineraryStore((state) => state);

  const addNewLodging = () => {
    const newLodging: Lodging = {
      id: `lodging-temporary`,
      type: '',
      address: '',
      check_in: '',
      check_out: '',
      loop_id: loopID,
      booking_reference: '',
      itinerary_date_id: '',
      lodging_id: `lodging-${nanoid(36)}`,
      cost: parseFloat('0').toFixed(2),
      
    };
    addLodging(newLodging);
    setEditingId(newLodging.lodging_id);
  };

  const saveLodging = async (updatedLodging: Lodging) => {
    updateLodging(updatedLodging);
    setEditingId(null);

    const {error} = await supabase.from('lodging').upsert({
      type: updatedLodging.type,
      address: updatedLodging.address,
      check_in: updatedLodging.check_in,
      check_out: updatedLodging.check_out,
      loop_id: updatedLodging.loop_id,
      booking_reference: updatedLodging.booking_reference,
      itinerary_date_id: updatedLodging.itinerary_date_id || null,
      lodging_id: updatedLodging.lodging_id,
      cost: updatedLodging.cost,

    }, {onConflict: 'lodging_id'});

    if (error) {
      console.error('error', error);
    }



    if (budget?.expenses?.find((expense) => expense.id === updatedLodging.lodging_id)) {
      updateExpense({
        id: updatedLodging.lodging_id,
        description: `${updatedLodging.type}`,
        cost: parseFloat(parseFloat(updatedLodging.cost).toFixed(2)),
      });
      const {error} = await supabase.from('expenses').upsert({
        description: `${updatedLodging.type}`,
        cost: parseFloat(parseFloat(updatedLodging.cost).toFixed(2)),
        category: 'Accommodation',
        budget_id: budget?.budget_id ?? '',
      }).eq('attachment', updatedLodging.lodging_id);
      if (error) {
        console.error('error', error);
      }
    }else{
      addExpense({
        id: updatedLodging.lodging_id,
        category: 'Accommodation',
        description: `${updatedLodging.type}`,
        cost: parseFloat(parseFloat(updatedLodging.cost).toFixed(2)),
      });

      const {error} = await supabase.from('expenses').upsert({
        attachment: updatedLodging.lodging_id,
        description: `${updatedLodging.type}`,
        cost: parseFloat(parseFloat(updatedLodging.cost).toFixed(2)),
        budget_id: budget?.budget_id ?? '',
        loopID: loopID,
        category: 'Accommodation',
      }, {onConflict: 'attachment'});

      if (error) {
        console.error('error', error);
      }
    }


  };

  const editLodging = (id: string) => {
    setEditingId(id);
  };

  const deleteLodging = async (id: string) => {
    removeLodging(id);
    setEditingId(null);
    if (budget?.expenses?.find((expense) => expense.id === id)) {
      deleteExpense(id);
    }
    const { error } = await supabase.from('lodging').delete().eq('lodging_id', id);
    if (error) {
      console.error('error', error);
    }

  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Lodging Reservations</h1>
      <div className="space-y-4">
        {lodgings &&
          lodgings.map((lodging) => {
            return editingId === lodging.lodging_id ? (
              <LodgingForm
                key={lodging.id}
                lodging={lodging}
                onSave={saveLodging}
                onCancel={() => {
                  deleteLodging(lodging.lodging_id);
                  setEditingId(null);
                }}
              />
            ) : (
              <LodgingCard
                key={lodging.id}
                lodging={lodging}
                onEdit={() => editLodging(lodging.lodging_id)}
                onDelete={() => deleteLodging(lodging.lodging_id)}
              />
            );
          })}

        {!lodgings ||
          (lodgings.length === 0 && (
            <div className=" h-40 flex justify-center items-center bg-black/10 rounded-xl">
              <p className="font-mono">No Lodging yet</p>
            </div>
          ))}
      </div>
      <Button
        onClick={addNewLodging}
        className="mt-4 w-full"
        variant={'outline'}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Lodging
      </Button>
    </div>
  );
}
