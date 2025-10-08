import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { CheckCheck, Icon, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Tasks() {
  return (
    <Card className='w-full lg:w-4/12 font-title'>
  <CardHeader>
<CardTitle>Your Tasks</CardTitle>
    <CardDescription>Manage your tasks efficiently</CardDescription>
    <CardAction className='text-sm font-body hover:underline'>
      <Link href="/loop/focus">View All</Link>
    </CardAction>
  </CardHeader>
  <CardContent className='flex-1 h-full'>
    <Empty  className='border border-dashed bg-accent/20 h-full'>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <CheckCheck/>
    </EmptyMedia>
    <EmptyTitle>No tasks are set yet.</EmptyTitle>
    <EmptyDescription>No tasks found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add a new Task</Button>
  </EmptyContent>
</Empty>
  </CardContent>
</Card>
  )
}
