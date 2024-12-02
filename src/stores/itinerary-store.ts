// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla';

export type Flight = {
  id: string | null;
  number: string; // e.g., "UN 123"
  airline: string; // e.g., "United Airlines"
  departure: string; // ISO date string
  arrival: string; // ISO date string
  confirmation: string; // e.g., confirmation number
  cost: string; // e.g., "3000" as a string
  loop_id?: string; // e.g., loop reference
  itinerary_date_id: string | null; // nullable ID
  departureDate: string; // ISO date string
  flight_id: string; // e.g., "flight-123"
  departureTime: string; // e.g., "12:30"
  arrivalDate: string; // ISO date string
  arrivalTime: string; // e.g., "18:20"
};

export type Lodging = {
  id?: string | null;
  type: string;
  address: string;
  loop_id: string;
  check_in: string;
  check_out: string;
  lodging_id: string;
  booking_reference: string;
  itinerary_date_id: string;
  cost: string;
};

type ChecklistItem = {
  title: string;
  description: string;
  is_complete: boolean;
  checklist_id: string;
};

type Checklist = {
  title: string;
  description: string;
  loop_id: string;
  itinerary_date_id: string;
  checklist_id: string;
  items: ChecklistItem[];
};

export type Location = {
  id?: string | null;
  name: string;
  address: string;
  loop_id: string;
  itinerary_date_id: string;
  time: string;
  location_id: string;
  cost: string;
  added_by: string;
  notes: string;
  category: string;
  website?: string;
};

type Note = {
  title: string;
  description: string;
  loop_id: string;
  itinerary_date_id: string;
};

type Budget = {
  total: number;
  remaining: number;
  currency: string;
  budget_id?: string;
  expenses: {
    id?: string;
    cost: number;
    category: string;
    description: string;
    attachment?: string;
  }[];
};

type ItineraryDate = {
  date: string;
  itinerary_id: string;
  date_id: string;
  notes: Note[];
  locations: Location[];
  checklists: Checklist[];
  flights: Flight[];
  lodging: Lodging[];
  budget: Budget;
};

type Itinerary = {
  loop_id: string;
  itinerary_dates: ItineraryDate[];
};

export type ItineraryState = {
  itinerary: Itinerary | null;
  flights: Flight[] | null;
  lodgings: Lodging[] | null;
  locations: Location[] | null;
  budget: Budget | null;
};

// Actions
export type ItineraryActions = {
  setItinerary: (newItinerary: Itinerary) => void;
  updateItinerary: (updatedItinerary: Partial<Itinerary>) => void;
  clearItinerary: () => void;

  setFlights: (newFlights: Flight[]) => void;
  addFlight: (newFlight: Flight) => void;
  updateFlight: (updatedFlight: Partial<Flight>) => void;
  removeFlight: (flightID: string) => void;

  setLodging: (newLodging: Lodging[]) => void;
  addLodging: (newLodging: Lodging) => void;
  updateLodging: (updatedLodging: Partial<Lodging>) => void;
  removeLodging: (lodgingID: string) => void;

  setLocations: (newLocations: Location[]) => void;
  addLocation: (newLocation: Location) => void;
  updateLocation: (updatedLocation: Partial<Location>) => void;
  removeLocation: (locationID: string) => void;

  addChecklist: (newChecklist: Checklist) => void;
  updateChecklist: (updatedChecklist: Partial<Checklist>) => void;
  removeChecklist: (checklistID: string) => void;
  addItemToChecklist: (checklistID: string, newItem: ChecklistItem) => void;
  updateChecklistItem: (
    checklistID: string,
    updatedItem: Partial<ChecklistItem>
  ) => void;
  removeChecklistItem: (checklistID: string, itemID: string) => void;

  addNote: (newNote: Note) => void;
  updateNote: (updatedNote: Partial<Note>) => void;
  removeNote: (noteID: string) => void;

  setBudget: (newBudget: Budget) => void;
  updateBudget: (updatedBudget: Partial<Budget>) => void;
  addExpense: (newExpense: Budget['expenses'][0]) => void;
  updateExpense: (updatedExpense: Partial<Budget['expenses'][0]>) => void;
  deleteExpense: (expenseID: string) => void;
};

// Combine State and Actions
export type ItineraryStore = ItineraryState & ItineraryActions;

export const initItineraryStore = (): ItineraryState => {
  return {
    itinerary: null,
    flights: null,
    lodgings: null,
    locations: null,
    budget: {
      total: 0,
      remaining: 0,
      currency: '',
      expenses: [],
    },
  };
};

// Initial State
export const defaultInitState: ItineraryState = {
  itinerary: null,
  flights: null,
  lodgings: null,
  locations: null,
  budget: {
    total: 0,
    remaining: 0,
    currency: '',
    expenses: [],
  },
};

// Store Creation
export const createItineraryStore = (
  initState: ItineraryState = defaultInitState
) => {
  return createStore<ItineraryStore>()((set) => ({
    ...initState,

    // Set a new itinerary
    setItinerary: (newItinerary) =>
      set(() => ({
        itinerary: newItinerary,
      })),

    // Update fields in the existing itinerary
    updateItinerary: (updatedItinerary) =>
      set((state) => ({
        itinerary: state.itinerary
          ? { ...state.itinerary, ...updatedItinerary }
          : null, // If no itinerary exists, do nothing
      })),

    // Clear the itinerary
    clearItinerary: () =>
      set(() => ({
        itinerary: null,
      })),

    // Flights
    setFlights: (newFlights) =>
      set(() => ({
        flights: newFlights,
      })),

    addFlight: (newFlight) =>
      set((state) => ({
        flights: state.flights ? [...state.flights, newFlight] : [newFlight],
      })),

    updateFlight: (updatedFlight) => {
      set((state) => ({
        flights: state.flights
          ? state.flights.map((flight) =>
              flight.flight_id === updatedFlight.flight_id ? { ...flight, ...updatedFlight } : flight
            )
          : null,
      }));
    },

    removeFlight: (flightID) =>
      set((state) => ({
        flights: state.flights
          ? state.flights.filter((flight) => flight.flight_id !== flightID)
          : null,
      })),

    // Lodging
    setLodging: (newLodging) =>
      set(() => ({
        lodgings: newLodging,
      })),

    addLodging: (newLodging) =>
      set((state) => ({
        lodgings: state.lodgings
          ? [...state.lodgings, newLodging]
          : [newLodging],
      })),

    updateLodging: (updatedLodging) =>
      set((state) => ({
        lodgings: state.lodgings
          ? state.lodgings.map((lodging) =>
              lodging.lodging_id === updatedLodging.lodging_id
                ? { ...lodging, ...updatedLodging }
                : lodging
            )
          : null,
      })),

    removeLodging: (lodgingID) =>
      set((state) => ({
        lodgings: state.lodgings
          ? state.lodgings.filter(
              (lodging) => lodging.lodging_id !== lodgingID
            )
          : null,
      })),

    // Locations
    setLocations: (newLocations) =>
      set(() => ({
        locations: newLocations,
      })),

    addLocation: (newLocation) =>
      set((state) => ({
        locations: state.locations
          ? [...state.locations, newLocation]
          : [newLocation],
      })),

    updateLocation: (updatedLocation) =>
      set((state) => ({
        locations: state.locations
          ? state.locations.map((location) =>
              location.location_id === updatedLocation.location_id
                ? { ...location, ...updatedLocation }
                : location
            )
          : null,
      })),

    removeLocation: (locationID) =>
      set((state) => ({
        locations: state.locations
          ? state.locations.filter((location) => location.location_id !== locationID)
          : null,
      })),

    // Checklists
    addChecklist: (newChecklist) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) =>
                date.date_id === newChecklist.itinerary_date_id
                  ? {
                      ...date,
                      checklists: [...date.checklists, newChecklist],
                    }
                  : date
              ),
            }
          : null,
      })),

    updateChecklist: (updatedChecklist) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) =>
                date.date_id === updatedChecklist.itinerary_date_id
                  ? {
                      ...date,
                      checklists: date.checklists.map((checklist) =>
                        checklist.checklist_id === updatedChecklist.checklist_id
                          ? { ...checklist, ...updatedChecklist }
                          : checklist
                      ),
                    }
                  : date
              ),
            }
          : null,
      })),

    removeChecklist: (checklistID) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) => ({
                ...date,
                checklists: date.checklists.filter(
                  (checklist) => checklist.checklist_id !== checklistID
                ),
              })),
            }
          : null,
      })),

    addItemToChecklist: (checklistID, newItem) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) => ({
                ...date,
                checklists: date.checklists.map((checklist) =>
                  checklist.checklist_id === checklistID
                    ? {
                        ...checklist,
                        items: [...checklist.items, newItem],
                      }
                    : checklist
                ),
              })),
            }
          : null,
      })),

    updateChecklistItem: (checklistID, updatedItem) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) => ({
                ...date,
                checklists: date.checklists.map((checklist) =>
                  checklist.checklist_id === checklistID
                    ? {
                        ...checklist,
                        items: checklist.items.map((item) =>
                          item.title === updatedItem.title
                            ? { ...item, ...updatedItem }
                            : item
                        ),
                      }
                    : checklist
                ),
              })),
            }
          : null,
      })),

    removeChecklistItem: (checklistID, itemID) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) => ({
                ...date,
                checklists: date.checklists.map((checklist) =>
                  checklist.checklist_id === checklistID
                    ? {
                        ...checklist,
                        items: checklist.items.filter(
                          (item) => item.title !== itemID
                        ),
                      }
                    : checklist
                ),
              })),
            }
          : null,
      })),

    // Notes
    addNote: (newNote) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) =>
                date.date_id === newNote.itinerary_date_id
                  ? {
                      ...date,
                      notes: [...date.notes, newNote],
                    }
                  : date
              ),
            }
          : null,
      })),

    updateNote: (updatedNote) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) =>
                date.date_id === updatedNote.itinerary_date_id
                  ? {
                      ...date,
                      notes: date.notes.map((note) =>
                        note.title === updatedNote.title
                          ? { ...note, ...updatedNote }
                          : note
                      ),
                    }
                  : date
              ),
            }
          : null,
      })),

    removeNote: (noteID) =>
      set((state) => ({
        itinerary: state.itinerary
          ? {
              ...state.itinerary,
              itinerary_dates: state.itinerary.itinerary_dates.map((date) => ({
                ...date,
                notes: date.notes.filter((note) => note.title !== noteID),
              })),
            }
          : null,
      })),

    // Budget
    setBudget: (newBudget) => set(() => ({ budget: newBudget })),

    updateBudget: (updatedBudget) =>
      set((state) => ({
        budget: state.budget ? { ...state.budget, ...updatedBudget } : null,
      })),

    addExpense: (newExpense) =>
      set((state) => ({
        budget: state.budget
          ? {
              ...state.budget,
              expenses: state.budget.expenses
                ? [...state.budget.expenses, newExpense]
                : [newExpense],
            }
          : null,
      })),

    updateExpense: (updatedExpense) => {
      set((state) => ({
        budget: state.budget
          ? {
              ...state.budget,
              expenses: state.budget.expenses.map((expense) =>
                expense.id === updatedExpense.id
                  ? { ...expense, ...updatedExpense }
                  : expense
              ),
            }
          : null,
      }));
    },

    deleteExpense: (expenseID) => {
      set((state) => ({
        budget: state.budget
          ? {
              ...state.budget,
              expenses: state.budget.expenses.filter(
                (expense) => expense.id !== expenseID
              ),
            }
          : null,
      }));
      
    }
  }));
};
