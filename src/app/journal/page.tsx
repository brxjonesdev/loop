import React from 'react'

import UserGoals from './components/user-goals'
import { UserStreaksMonth } from './components/user-streaks'
import { UserCard } from './components/user-info'
import UserEntries from './components/user-entries'

import { entryServices, goalsServices } from '@/lib/services'
import { createClient } from '@/lib/auth/supabase/server'
import { getSupabaseUserID } from '@/lib/utils'


export default async function JournalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

 
  // Fetch goals
  const goalResult = await goalsServices.getUsersGoals(user?.id || '');
  if (!goalResult.ok) {
    return <div>bruh</div>
  }
  const goals = goalResult.data

  // Fetch entries
  const id = await getSupabaseUserID(supabase)
  
  const entryResult = await entryServices.getAllEntries(id)
  if (!entryResult.ok) {
    return <div>Error loading entries: {entryResult.error}</div>
  }
  const entries = entryResult.data

  // Map goals color to entries
  const entriesWithColor = entries.map((entry) => {
    const goal = goals.find((g) => g.id === entry.goalID)
    return {
      ...entry,
      color: goal?.color || 'gray',
    }
  })
  console.log("Entries with color:", entriesWithColor)

  return (
    <div className='flex-1 grid grid-cols-1 gap-4 py-4 md:grid-cols-[.5fr_1fr_.5fr]'>
      <div className='flex flex-col gap-4'>
        <UserCard user={user} entries={entriesWithColor} />

        <UserGoals data={goals} />
      </div>
      <UserEntries data={entries} goals={goals} />
      <div className='hidden lg:block'>
        <UserStreaksMonth entries={entriesWithColor} />
      </div>
    </div>
  )
}
