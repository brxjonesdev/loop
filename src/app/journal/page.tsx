
import React from 'react'
import UserGoals from './components/user-goals'
import  { UserStreaksMonth, UserStreaksWeekly } from './components/user-streaks'
import UserInfo from './components/user-info'
import UserEntries from './components/user-entries'
import { entryServices, goalsServices } from '@/lib/services'

export default async function JournalPage() {
  const goalResult = await goalsServices.getUsersGoals()
    if (!goalResult.ok){
      return (
        <div>
          bruh
        </div>
      )
    }
    const goals = goalResult.data
    
      const entryResult = await entryServices.getAllEntries()
      if (!entryResult.ok){
        return <div>Error loading entries: {entryResult.error}</div>
      }
      const entries = entryResult.data
      // map goals color to entries
      const entriesWithColor = entries.map(entry => {
        const goal = goals.find(g => g.id === entry.goalID)
        return {
          ...entry,
          color: goal?.color || 'gray'
        }
      })
  return (
    <div className='flex-1 grid grid-cols-1 gap-4 py-4 md:grid-cols-[.5fr_1fr_.5fr]'>
      <div>
        <UserInfo />
        <UserStreaksWeekly entries={entriesWithColor} />
        <UserGoals data={goals} />
      </div>
      <UserEntries data={entries} />
      <div className='hidden lg:block'>
        <UserStreaksMonth entries={entriesWithColor} />
      </div>
    </div>
  )
}
