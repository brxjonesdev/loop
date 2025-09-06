import React from 'react'
import { goalsServices } from '@/lib/services'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2 } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async function UserGoals() {
  const result = await goalsServices.getUsersGoals()
  if (!result.ok){
    return (
      <div>
        bruh
      </div>
    )
  }
  const goals = result.data
  return (
    <Card className='shadow-none gap-2 border-cyan-500/50 border-2 font-nunito '>
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
              <div key={goal.id} className='border rounded-xl p-4 flex gap-2 flex-col'>
                <div>
                  <h3 className="text-lg font-medium">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground font-nunito-sans">{goal.description}</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <Button variant="outline" size="sm" className='shadow-none'>
                    Filter By
                  </Button>
                  <Button variant="outline" size="sm" className='shadow-none'>
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
