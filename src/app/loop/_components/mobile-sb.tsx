import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function MobileSidebar() {
  return (
    <section className="lg:hidden w-full border-b font-title">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Loop</h2>
        <SidebarTrigger className="p-2 rounded-md hover:bg-muted transition"/>
      </div>
    </section>
  )
}
