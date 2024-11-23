import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
  

export default function Settings() {
  return (
    <main className="flex-1 w-full rounded-xl overflow-y-scroll flex items-center justify-center p-4">
        <Card className='shadow-none w-full max-w-2xl h-full font-sans flex flex-col'>
  <CardHeader>
    <CardTitle className='text-3xl'>Settings</CardTitle>
  </CardHeader>
  <CardContent className='flex-1 overflow-y-scroll'>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button className='w-full'>Save Changes</Button>
  </CardFooter>
</Card>

    </main>
  )
}
