'use client';
import { useState, useEffect } from 'react';
import Recommendations from './components/recommendations';
import Interests from './components/interests';
import Itinerary from './components/itinerary';
import Budget from './components/budget';
import { createClient } from '@/utils/supabase/client';
import { useItineraryStore } from '@/stores/itinerary-store-provider';
import Flights from './components/flights';
import Lodging from './components/lodging';
import OtherAttachments from './components/attachment-views/other-attachments';

export default function TravelPlanner({
  params,
}: {
  params: { loopID: string };
}) {
  const { loopID } = params;
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const {
    itinerary,
    setBudget,
    setFlights,
    setItinerary,
    setLocations,
    setLodging,
  } = useItineraryStore((state) => state);

  useEffect(() => {
    const supabase = createClient();
    const fetchData = async () => {
      try {
        const [flights, locations, lodging, budget, itinerary] =
          await Promise.all([
            supabase.from('flights').select().eq('loop_id', loopID),
            supabase.from('locations').select().eq('loop_id', loopID),
            supabase.from('lodging').select().eq('loop_id', loopID),
            supabase
              .from('budgets')
              .select(`*, expenses (*)`)
              .eq('loop_id', loopID)
              .maybeSingle(),
            supabase
              .from('itineraries')
              .select(
                `
            *,
            itinerary_dates (
              id,
              date,
              notes
            )
          `
              )
              .eq('loop_id', loopID)
              .maybeSingle(),
          ]);

        const flightsError = flights.error;
        const lodgingError = lodging.error;
        const budgetError = budget.error;
        const itineraryError = itinerary.error;
        const locationsError = locations.error;

        if (
          flightsError ||
          lodgingError ||
          budgetError ||
          itineraryError ||
          locationsError
        ) {
          console.error('Error fetching data:', {
            flightsError,
            lodgingError,
            budgetError,
            itineraryError,
          });
          return;
        }

        // Handle the fetched data here, e.g., update state
        console.log('Fetched flights:', flights.data);
        console.log('Fetched lodging:', lodging.data);
        console.log('Fetched budget:', budget.data);
        console.log('Fetched itinerary:', itinerary.data);
        console.log('Fetched locations:', locations.data);

        setFlights(flights.data);
        setLodging(lodging.data);
        setLocations(locations.data);
        setItinerary(itinerary.data);

        if (budget.data) {
          setBudget(budget.data);
        } else {
          setBudget({
            total: 0,
            remaining: 0,
            currency: '',
            expenses: [],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingError('Failed to fetch data');
      }
    };

    fetchData();
  }, [loopID, setBudget, setFlights, setItinerary, setLocations, setLodging]);

  if (!itinerary) {
    return (
      <div className="container mx-auto flex flex-col justify-center items-center h-full border-[#1b1b1b]/5 border-2  rounded-xl space-y-4">
        <div className="loader"></div>
        <p className="text-[#1b1b1b] text-lg">Loading your itinerary...</p>
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="container mx-auto flex flex-col justify-center items-center h-full border-[#1b1b1b]/5 border-2  rounded-xl space-y-4">
        <p className="text-[#1b1b1b] text-lg">{loadingError}</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-2 space-y-6">
      <Recommendations/>
      <Budget loopID={loopID} />
      <Flights loopID={loopID} />
      <Lodging loopID={loopID} />
      <Interests loopID={loopID} />
      <OtherAttachments />
      <Itinerary/>
    </div>
  );
}
