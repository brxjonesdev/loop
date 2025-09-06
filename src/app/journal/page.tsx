
import React from 'react'
import UserGoals from './components/user-goals'
import  { UserStreaksMonth } from './components/user-streaks'
import UserInfo from './components/user-info'
import UserEntries from './components/user-entries'
import UserStreaksWeekly from './components/user-streaks'

export default function JournalPage() {
  return (
    <div className='flex-1 grid grid-cols-1 gap-4 py-4 md:grid-cols-[.5fr_1fr_.5fr]'>
      <div>
        <UserInfo />
        <UserStreaksWeekly />
        <UserGoals />
      </div>
      <UserEntries/>
      <div className='hidden lg:block'>
        <UserStreaksMonth/>
      </div>
    </div>
  )
}
