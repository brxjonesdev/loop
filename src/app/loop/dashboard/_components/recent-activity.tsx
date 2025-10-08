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

export default function RecentActivity() {
  return (
      <Card>
      <CardHeader>
    <CardTitle>Your Tasks</CardTitle>
        <CardDescription>Manage your tasks efficiently</CardDescription>
        <CardAction>View All Tasks</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
