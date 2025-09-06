import { entryServices } from '@/lib/services'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction
} from '@/components/ui/card'

export default async function UserEntries() {
  const result = await entryServices.getAllEntries()
  if (!result.ok){
    return <div>Error loading entries: {result.error}</div>
  }
  const entries = result.data
  return (
    <Card className='shadow-none gap-2 border-cyan-500/50 border-2 font-nunito '>
      <CardHeader className='space-y-0 gap-0'>
        <CardTitle className='text-2xl'>Your Entries</CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>Your personal journal entries</CardDescription>
      </CardHeader>
      {entries.length === 0 ? (
        <CardContent>
          <p className='text-sm text-muted-foreground'>No entries found</p>
        </CardContent>
      ) : (
        entries.map(entry => (
          <CardContent key={entry.id}>
            <h3 className='text-lg font-semibold'>{entry.createdAt.toLocaleString()}</h3>
            <p className='text-sm text-muted-foreground'>{entry.content}</p>
          </CardContent>
        ))
      )}
    </Card>
  )
}
