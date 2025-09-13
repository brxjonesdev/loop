"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Entry } from "@/lib/models"

interface StreakCalendarProps {
  entries: Entry[]
  goalId?: string // Optional: filter by specific goal
  className?: string
  mode?: "monthly" | "weekly"
}

export function StreakCalendar({ entries, goalId, className, mode }: StreakCalendarProps) {
  


  const [currentDate, setCurrentDate] = useState(new Date())

  // Filter entries by goal if specified
  const filteredEntries = useMemo(() => {
    return goalId ? entries.filter((entry) => entry.goalID === goalId) : entries
  }, [entries, goalId])

  // Create a map of dates with entries for quick lookup
  const entryDates = useMemo(() => {
    const dateMap = new Map<string, Entry[]>()
    filteredEntries.forEach((entry) => {
      // Ensure entry.createdAt is a Date object
      const createdAt =
        entry.createdAt instanceof Date
          ? entry.createdAt
          : new Date(entry.createdAt)
      const dateKey = createdAt.toISOString().split("T")[0]
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, [])
      }
      dateMap.get(dateKey)!.push(entry)
    })
    return dateMap
  }, [filteredEntries])

  // Get calendar days for month view
  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  // Get calendar days for week view
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }

    return days
  }

  const days = mode === "monthly" ? getMonthDays() : getWeekDays()
  const currentMonth = currentDate.getMonth()

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (mode === "monthly") {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    }
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const hasEntry = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0]
    return entryDates.has(dateKey)
  }

  const getEntryCount = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0]
    return entryDates.get(dateKey)?.length || 0
  }



  const formatDateHeader = () => {
    if (mode === "monthly") {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    } else {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`
    }
  }

  

  return (
    <Card className={cn("w-full shadow-none border-2", className)}>
      <CardContent>
        <div className="flex items-center justify-between mb-6 text-sm">
          <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-sm font-semibold">{formatDateHeader()}</h3>
          <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className={cn("grid gap-2", mode === "monthly" ? "grid-cols-7" : "grid-cols-7")}>
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="flex items-center justify-center text-sm font-medium text-muted-foreground h-8">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((date, index) => {
            const isCurrentMonth = mode === "weekly" || date.getMonth() === currentMonth
            const hasEntryToday = hasEntry(date)
            const entryCount = getEntryCount(date)
            return (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col items-center justify-start h-15 p-1 text-center border rounded-lg transition-colors",
                  isCurrentMonth ? "bg-background" : "bg-muted/30 text-muted-foreground",
                  isToday(date) && "ring-2 ring-primary",
                  hasEntryToday && "bg-black/40 border-gray-200 dark:border-gray-800 text-white",
                  "hover:bg-accent cursor-pointer",
                )}
              >
                <div className="text-sm font-medium mt-1">{date.getDate()}</div>

                {hasEntryToday && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
                    {entryCount > 0 && (
                      <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                        {entryCount}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function UserStreaksMonth({ entries, goalId }: StreakCalendarProps) {
  return (
    <div className="hidden md:block">
      <StreakCalendar entries={entries} goalId={goalId} className="w-full" mode="monthly" />
    </div>
  )
}


export function UserStreaksWeekly({ entries, goalId }: StreakCalendarProps) {
  console.log("Rendering UserStreaksWeekly with entries:", entries)
  return (
    <div className="md:hidden">
      <StreakCalendar entries={entries} goalId={goalId} className="w-full border bg-black/5" mode="weekly" />
    </div>
  )
}
