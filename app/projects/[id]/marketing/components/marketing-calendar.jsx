"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns"

export default function MarketingCalendar({ projectId }) {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState("month")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/marketing/calendar`)
        if (!response.ok) throw new Error("Failed to fetch calendar data")
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching calendar data:", error)
        toast({
          title: "Error",
          description: "Failed to load marketing calendar",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Mock data for demonstration
  const mockEvents = [
    { id: 1, title: "Email Campaign Launch", date: new Date(2025, 4, 10), type: "email" },
    { id: 2, title: "Social Media Contest", date: new Date(2025, 4, 15), type: "social" },
    { id: 3, title: "PPC Campaign Start", date: new Date(2025, 4, 18), type: "ppc" },
    { id: 4, title: "Content Publication", date: new Date(2025, 4, 22), type: "content" },
    { id: 5, title: "Webinar", date: new Date(2025, 4, 25), type: "event" },
    { id: 6, title: "PR Release", date: new Date(2025, 4, 28), type: "pr" },
  ]

  const calendarEvents = events.length ? events : mockEvents

  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get events for the current month
  const monthEvents = calendarEvents.filter((event) => isSameMonth(new Date(event.date), currentMonth))

  const getEventTypeColor = (type) => {
    const colors = {
      email: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      social: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      ppc: "bg-green-100 text-green-800 hover:bg-green-200",
      content: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      event: "bg-pink-100 text-pink-800 hover:bg-pink-200",
      pr: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      partner: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      other: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    }
    return colors[type] || colors.other
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Marketing Calendar</CardTitle>
        <div className="flex items-center gap-4">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-medium">{format(currentMonth, "MMMM yyyy")}</span>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-start-${index}`} className="h-24 p-1 border border-gray-100 bg-gray-50"></div>
          ))}

          {days.map((day) => {
            const dayEvents = monthEvents.filter((event) => new Date(event.date).getDate() === day.getDate())

            return (
              <div
                key={day.toString()}
                className={`h-24 p-1 border border-gray-100 ${isToday(day) ? "bg-blue-50" : ""}`}
              >
                <div className="text-right mb-1">
                  <span
                    className={`text-sm inline-block rounded-full w-6 h-6 text-center leading-6 ${
                      isToday(day) ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <Badge
                      key={event.id}
                      className={`text-xs w-full justify-start font-normal truncate ${getEventTypeColor(event.type)}`}
                    >
                      {event.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}

          {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
            <div key={`empty-end-${index}`} className="h-24 p-1 border border-gray-100 bg-gray-50"></div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
