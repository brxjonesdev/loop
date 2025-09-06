"use client"
import React from 'react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Goal } from '@/lib/models'
import { getButtonClass, getCardClass } from '@/lib/utils'

export default function UserGoals({data}: {data: Goal[]}) {
  const [goals, setGoals] = useState<Goal[]>(data);



  return (
    <Card className='shadow-none gap-2 border-2 font-nunito '>
      <CardHeader className='space-y-0 gap-0'>
        <CardTitle className='text-2xl'>Goals</CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>Your personal goals and objectives</CardDescription>
      </CardHeader>
      {goals.length === 0 ? (
        <CardContent>
          <CardDescription>You have no goals set. Set one to start tracking!</CardDescription>
        </CardContent>
      ) : (
        <>
          <CardContent className='flex-col gap-4 hidden lg:flex'>
            {goals.map(goal => (
              <div key={goal.id} className={`border rounded-xl p-4 flex gap-2 flex-col ${getCardClass(goal.color)}`}>
                <div>
                  <h3 className="text-lg font-medium">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground font-nunito-sans">{goal.description}</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <Button variant="outline" size="sm" className={`shadow-none ${getButtonClass(goal.color)}`}>
                    Filter By
                  </Button>
                  <Button variant="outline" size="sm" className={`shadow-none ${getButtonClass(goal.color)}`}>
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardContent className='flex-col gap-4 lg:hidden flex'>
            <Accordion type="single" collapsible className="w-full">
              {goals.map(goal => (
                <AccordionItem key={goal.id} value={goal.id}>
                  <AccordionTrigger>{goal.title}</AccordionTrigger>
                  <AccordionContent>
                    <p>{goal.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>  
          </CardContent>
        </>
      )}
    </Card>
    )
}
