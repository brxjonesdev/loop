import React from 'react'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function UserCard() {
  return (
    <Card className='bg-accent/15 border-0 font-title p-0'>
  <CardHeader className=' flex flex-row justify-between items-center p-3'>
    <div className='flex flex-col space-y-1'>
    <CardTitle>Ririka Momobami</CardTitle>
    </div>
    <CardAction>
        <Avatar className='w-12 h-12'>
            <AvatarFallback>RM</AvatarFallback>
            <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCyKieUwA3I9qeRxo7gDdfGISUjE7N9xQnqA&s' />
        </Avatar>
    </CardAction>
  </CardHeader>
</Card>
  )
}
