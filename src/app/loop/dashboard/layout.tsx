import React from 'react'
import Navbar from '../../../lib/auth/components/navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='max-w-6xl mx-auto px-4 space-y-10 w-full'>
      <Navbar />
      {children}
    </main>
  )
}
