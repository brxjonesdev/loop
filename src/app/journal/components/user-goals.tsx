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
    <Card className='shadow-none'>
      <CardHeader>
        <CardTitle>Your Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.map(goal => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{goal.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <CardAction>Edit</CardAction>
              <CardAction>Delete</CardAction>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
    )
}
