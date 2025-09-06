import React from 'react'
import AppNavbar from '../features/app-navbar/navbar'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className="max-w-7xl mx-auto px-4  w-full flex flex-col flex-1">
       <AppNavbar/> 
      {children}
    </main>
  )
}
