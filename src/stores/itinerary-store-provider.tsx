// src/providers/counter-store-provider.tsx
'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type ItineraryStore,
  createItineraryStore,
  initItineraryStore,
} from '@/stores/itinerary-store';

export type ItineraryStoreApi = ReturnType<typeof createItineraryStore>;

export const ItineraryStoreContext = createContext<
  ItineraryStoreApi | undefined
>(undefined);

export interface ItineraryStoreProviderProps {
  children: ReactNode;
}

export const ItineraryStoreProvider = ({
  children,
}: ItineraryStoreProviderProps) => {
  const storeRef = useRef<ItineraryStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createItineraryStore(initItineraryStore());
  }

  return (
    <ItineraryStoreContext.Provider value={storeRef.current}>
      {children}
    </ItineraryStoreContext.Provider>
  );
};

export const useItineraryStore = <T,>(
  selector: (store: ItineraryStore) => T
): T => {
  const itineraryStoreContext = useContext(ItineraryStoreContext);

  if (!itineraryStoreContext) {
    throw new Error(
      `useItineraryStore must be used within ItineraryStoreProvider`
    );
  }

  return useStore(itineraryStoreContext, selector);
};
