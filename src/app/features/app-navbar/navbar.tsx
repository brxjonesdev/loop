import { Button } from '@/components/ui/button'
import { Settings2, Sun } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AppNavbar() {
  return (
    <div className='font-nunito px-4 py-2 flex items-center justify-between border-b w-full'>
        <Link href={"journal"} className='text-2xl font-bold text-gray-800 hover:text-gray-600'>
            Loop
        </Link>
        <div className='flex items-center gap-2'>
            <Button variant={"outline"} size={"icon"}>
                <Settings2/>
            </Button>
            <Button variant={"outline"} size={"icon"}>
                <Sun/>
            </Button>
        </div>
    </div>
  )
}
