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
import { Goal } from '@/lib/models'

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

  function getCardClass(color: Goal["color"]) {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-500/10 border-red-500/50",
      blue: "bg-blue-500/10 border-blue-500/50",
      green: "bg-green-500/10 border-green-500/50",
      yellow: "bg-yellow-500/10 border-yellow-500/50",
      orange: "bg-orange-500/10 border-orange-500/50",
      purple: "bg-purple-500/10 border-purple-500/50",
      pink: "bg-pink-500/10 border-pink-500/50",
    };
    return colorMap[color] || "";
  }

  function getButtonClass(color: Goal["color"]) {
    const colorMap: { [key: string]: string } = {
      red: "text-red-500 border-red-500 hover:bg-red-500/10",
      blue: "text-blue-500 border-blue-500 hover:bg-blue-500/10",
      green: "text-green-500 border-green-500 hover:bg-green-500/10",
      yellow: "text-yellow-500 border-yellow-500 hover:bg-yellow-500/10",
      orange: "text-orange-500 border-orange-500 hover:bg-orange-500/10",
      purple: "text-purple-500 border-purple-500 hover:bg-purple-500/10",
      pink: "text-pink-500 border-pink-500 hover:bg-pink-500/10",
    };
    return colorMap[color] || "";
  }

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
