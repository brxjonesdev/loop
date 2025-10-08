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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Stick } from 'next/font/google'
import { StickyNote } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Projects() {
  return (
    <Card className='flex-1 font-title'>
  <CardHeader>
<CardTitle>Current Projects</CardTitle>
<CardDescription className='font-body'>Overview of your projects</CardDescription>
  </CardHeader>
  <CardContent  className='flex-1'>
    <Empty  className='border border-dashed bg-accent/20 h-full'>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <StickyNote/>
    </EmptyMedia>
    <EmptyTitle>No tasks are set yet.</EmptyTitle>
    <EmptyDescription>No tasks found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add a new Project</Button>
  </EmptyContent>
</Empty>
  </CardContent>
</Card>
  )
}
