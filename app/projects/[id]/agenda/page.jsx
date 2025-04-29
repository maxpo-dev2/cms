"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Pencil, Plus, Trash, Users, Clock } from 'lucide-react'

export default function AgendaPage() {
  const params = useParams()
  const projectId = params.id

  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState([])
  const [activeDay, setActiveDay] = useState(null)
  const [speakers, setSpeakers] = useState([])

  // Dialog states
  const [addDayOpen, setAddDayOpen] = useState(false)
  const [addSessionOpen, setAddSessionOpen] = useState(false)
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [editItemOpen, setEditItemOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  // Form states
  const [dayForm, setDayForm] = useState({
    name: "",
    date: "",
    dayNumber: 1,
  })

  const [sessionForm, setSessionForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    color: "#0047AB",
    venue: "",
    dayId: "",
  })

  const [itemForm, setItemForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    type: "Presentation",
    description: "",
    sessionId: "",
    speakers: [],
  })

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch agenda days
        const daysRes = await fetch(`/api/projects/${projectId}/agenda/days`)
        if (!daysRes.ok) {
          const errorData = await daysRes.json()
          console.error("Failed to fetch agenda days:", errorData)
          throw new Error(`Failed to fetch agenda days: ${errorData.error || daysRes.statusText}`)
        }
        const daysData = await daysRes.json()
        setDays(daysData)

        if (daysData.length > 0) {
          setActiveDay(daysData[0].id)
        }

        // Fetch speakers
        const speakersRes = await fetch(`/api/projects/${projectId}/speakers`)
        if (!speakersRes.ok) {
          const errorData = await speakersRes.json()
          console.error("Failed to fetch speakers:", errorData)
          throw new Error(`Failed to fetch speakers: ${errorData.error || speakersRes.statusText}`)
        }
        const speakersData = await speakersRes.json()
        setSpeakers(speakersData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to load agenda data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  // Handle form submissions
  const handleAddDay = async (e) => {
    e.preventDefault()
    try {
      // Format the date to include time for ISO DateTime
      const formattedData = { ...dayForm }

      // Ensure we're sending a valid date format
      if (formattedData.date) {
        // The date input gives us YYYY-MM-DD, but we need to ensure it's a valid ISO string
        // We'll add the time component to make it a full ISO DateTime
        formattedData.date = new Date(`${formattedData.date}T00:00:00.000Z`).toISOString()
      }

      const res = await fetch(`/api/projects/${projectId}/agenda/days`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(`Failed to add day: ${errorData.error || res.statusText}`)
      }

      const newDay = await res.json()
      setDays([...days, newDay])
      setAddDayOpen(false)
      setDayForm({
        name: "",
        date: "",
        dayNumber: days.length + 1,
      })

      toast({
        title: "Success",
        description: "Day added successfully",
      })
    } catch (error) {
      console.error("Error adding day:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add day",
        variant: "destructive",
      })
    }
  }

  const handleAddSession = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/projects/${projectId}/agenda/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sessionForm,
          dayId: activeDay,
        }),
      })

      if (!res.ok) throw new Error("Failed to add session")

      const newSession = await res.json()

      // Update the days state with the new session
      setDays(
        days.map((day) => {
          if (day.id === activeDay) {
            return {
              ...day,
              sessions: [...(day.sessions || []), newSession],
            }
          }
          return day
        }),
      )

      setAddSessionOpen(false)
      setSessionForm({
        title: "",
        startTime: "",
        endTime: "",
        color: "#0047AB",
        venue: "",
        dayId: activeDay,
      })

      toast({
        title: "Success",
        description: "Session added successfully",
      })
    } catch (error) {
      console.error("Error adding session:", error)
      toast({
        title: "Error",
        description: "Failed to add session",
        variant: "destructive",
      })
    }
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/projects/${projectId}/agenda/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemForm),
      })

      if (!res.ok) throw new Error("Failed to add item")

      const newItem = await res.json()

      // Update the days state with the new item
      setDays(
        days.map((day) => {
          if (day.id === activeDay) {
            return {
              ...day,
              sessions: (day.sessions || []).map((session) => {
                if (session.id === itemForm.sessionId) {
                  return {
                    ...session,
                    items: [...(session.items || []), newItem],
                  }
                }
                return session
              }),
            }
          }
          return day
        }),
      )

      setAddItemOpen(false)
      setItemForm({
        title: "",
        startTime: "",
        endTime: "",
        type: "Presentation",
        description: "",
        sessionId: "",
        speakers: [],
      })

      toast({
        title: "Success",
        description: "Item added successfully",
      })
    } catch (error) {
      console.error("Error adding item:", error)
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      })
    }
  }

  const handleEditItem = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/projects/${projectId}/agenda/items/${currentItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemForm),
      })

      if (!res.ok) throw new Error("Failed to update item")

      const updatedItem = await res.json()

      // Update the days state with the updated item
      setDays(
        days.map((day) => {
          if (day.id === activeDay) {
            return {
              ...day,
              sessions: (day.sessions || []).map((session) => {
                if (session.id === itemForm.sessionId) {
                  return {
                    ...session,
                    items: (session.items || []).map((item) => (item.id === currentItem.id ? updatedItem : item)),
                  }
                }
                return session
              }),
            }
          }
          return day
        }),
      )

      setEditItemOpen(false)
      setCurrentItem(null)
      setItemForm({
        title: "",
        startTime: "",
        endTime: "",
        type: "Presentation",
        description: "",
        sessionId: "",
        speakers: [],
      })

      toast({
        title: "Success",
        description: "Item updated successfully",
      })
    } catch (error) {
      console.error("Error updating item:", error)
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      })
    }
  }

  const handleDeleteItem = async (itemId, sessionId) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const res = await fetch(`/api/projects/${projectId}/agenda/items/${itemId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete item")

      // Update the days state by removing the deleted item
      setDays(
        days.map((day) => {
          if (day.id === activeDay) {
            return {
              ...day,
              sessions: (day.sessions || []).map((session) => {
                if (session.id === sessionId) {
                  return {
                    ...session,
                    items: (session.items || []).filter((item) => item.id !== itemId),
                  }
                }
                return session
              }),
            }
          }
          return day
        }),
      )

      toast({
        title: "Success",
        description: "Item deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting item:", error)
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSession = async (sessionId) => {
    if (!confirm("Are you sure you want to delete this session? All items in this session will also be deleted."))
      return

    try {
      const res = await fetch(`/api/projects/${projectId}/agenda/sessions/${sessionId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete session")

      // Update the days state by removing the deleted session
      setDays(
        days.map((day) => {
          if (day.id === activeDay) {
            return {
              ...day,
              sessions: (day.sessions || []).filter((session) => session.id !== sessionId),
            }
          }
          return day
        }),
      )

      toast({
        title: "Success",
        description: "Session deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting session:", error)
      toast({
        title: "Error",
        description: "Failed to delete session",
        variant: "destructive",
      })
    }
  }

  const handleDeleteDay = async (dayId) => {
    if (!confirm("Are you sure you want to delete this day? All sessions and items in this day will also be deleted."))
      return

    try {
      const res = await fetch(`/api/projects/${projectId}/agenda/days/${dayId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete day")

      // Remove the deleted day from state
      const updatedDays = days.filter((day) => day.id !== dayId)
      setDays(updatedDays)

      // If the active day was deleted, set a new active day
      if (dayId === activeDay && updatedDays.length > 0) {
        setActiveDay(updatedDays[0].id)
      } else if (updatedDays.length === 0) {
        setActiveDay(null)
      }

      toast({
        title: "Success",
        description: "Day deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting day:", error)
      toast({
        title: "Error",
        description: "Failed to delete day",
        variant: "destructive",
      })
    }
  }

  // Helper function to edit an item
  const openEditItem = (item) => {
    setCurrentItem(item)
    setItemForm({
      title: item.title,
      startTime: item.startTime,
      endTime: item.endTime,
      type: item.type,
      description: item.description || "",
      sessionId: item.sessionId,
      speakers: item.speakers ? item.speakers.map((s) => s.speakerId) : [],
    })
    setEditItemOpen(true)
  }

  // Render loading state
  if (loading) {
    return (
      <div className="container py-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Conference Agenda</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <p>Loading agenda...</p>
        </div>
      </div>
    )
  }

  // Render empty state
  if (days.length === 0) {
    return (
      <div className="container py-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Conference Agenda</h1>
          <Dialog open={addDayOpen} onOpenChange={setAddDayOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Day
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Day</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddDay} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Day Name</Label>
                  <Input
                    id="name"
                    value={dayForm.name}
                    onChange={(e) => setDayForm({ ...dayForm, name: e.target.value })}
                    placeholder="e.g. Day One 1st Oct"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={dayForm.date}
                    onChange={(e) => setDayForm({ ...dayForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dayNumber">Day Number</Label>
                  <Input
                    id="dayNumber"
                    type="number"
                    value={dayForm.dayNumber}
                    onChange={(e) => setDayForm({ ...dayForm, dayNumber: Number.parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setAddDayOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Day</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-8">
          <p className="text-muted-foreground mb-4">No agenda days have been created yet.</p>
          <Button onClick={() => setAddDayOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Day
          </Button>
        </div>
      </div>
    )
  }

  // Find the active day object
  const activeDayObj = days.find((day) => day.id === activeDay)

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Conference Agenda</h1>
        <div className="flex gap-2">
          <Dialog open={addDayOpen} onOpenChange={setAddDayOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Day
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Day</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddDay} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Day Name</Label>
                  <Input
                    id="name"
                    value={dayForm.name}
                    onChange={(e) => setDayForm({ ...dayForm, name: e.target.value })}
                    placeholder="e.g. Day One 1st Oct"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={dayForm.date}
                    onChange={(e) => setDayForm({ ...dayForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dayNumber">Day Number</Label>
                  <Input
                    id="dayNumber"
                    type="number"
                    value={dayForm.dayNumber}
                    onChange={(e) => setDayForm({ ...dayForm, dayNumber: Number.parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setAddDayOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Day</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={addSessionOpen} onOpenChange={setAddSessionOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Session</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSession} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    value={sessionForm.title}
                    onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                    placeholder="e.g. Official Opening & Keynotes"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      value={sessionForm.startTime}
                      onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })}
                      placeholder="e.g. 10:00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      value={sessionForm.endTime}
                      onChange={(e) => setSessionForm({ ...sessionForm, endTime: e.target.value })}
                      placeholder="e.g. 10:15"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={sessionForm.venue}
                    onChange={(e) => setSessionForm({ ...sessionForm, venue: e.target.value })}
                    placeholder="e.g. Main Hall"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={sessionForm.color}
                    onChange={(e) => setSessionForm({ ...sessionForm, color: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setAddSessionOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Session</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Day tabs */}
      <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}>
            {days.map((day) => (
              <div key={day.id} className="relative group">
                <TabsTrigger value={day.id}>{day.name}</TabsTrigger>
                <div className="absolute right-0 top-0 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteDay(day.id)
                    }}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsList>
        </div>

        {days.map((day) => (
          <TabsContent key={day.id} value={day.id} className="space-y-8">
            {!day.sessions || day.sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-8">
                <p className="text-muted-foreground mb-4">No sessions have been created for this day yet.</p>
                <Button onClick={() => setAddSessionOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Session
                </Button>
              </div>
            ) : (
              day.sessions.map((session) => (
                <div key={session.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: session.color || "#0047AB" }}
                      ></div>
                      <h2 className="text-xl font-semibold">{session.title}</h2>
                      <span className="text-sm text-muted-foreground">
                        {session.startTime} - {session.endTime}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={addItemOpen} onOpenChange={setAddItemOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => setItemForm({ ...itemForm, sessionId: session.id })}
                          >
                            <Plus className="h-4 w-4" />
                            Add Item
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Agenda Item</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAddItem} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={itemForm.title}
                                onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                                placeholder="e.g. Opening Address"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="startTime">Start Time</Label>
                                <Input
                                  id="startTime"
                                  value={itemForm.startTime}
                                  onChange={(e) => setItemForm({ ...itemForm, startTime: e.target.value })}
                                  placeholder="e.g. 10:00"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="endTime">End Time</Label>
                                <Input
                                  id="endTime"
                                  value={itemForm.endTime}
                                  onChange={(e) => setItemForm({ ...itemForm, endTime: e.target.value })}
                                  placeholder="e.g. 10:05"
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="type">Type</Label>
                              <Select
                                value={itemForm.type}
                                onValueChange={(value) => setItemForm({ ...itemForm, type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Keynote">Keynote</SelectItem>
                                  <SelectItem value="Presentation">Presentation</SelectItem>
                                  <SelectItem value="Panel Discussion">Panel Discussion</SelectItem>
                                  <SelectItem value="Q&A">Q&A</SelectItem>
                                  <SelectItem value="Workshop">Workshop</SelectItem>
                                  <SelectItem value="Networking">Networking</SelectItem>
                                  <SelectItem value="Break">Break</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                value={itemForm.description}
                                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                                placeholder="Optional description"
                              />
                            </div>
                            {/* <div className="space-y-2">
                              <Label htmlFor="speakers">Speakers</Label>
                              <Select
                                value={itemForm.speakers}
                                onValueChange={(value) => {
                                  const currentSpeakers = [...itemForm.speakers]
                                  if (!currentSpeakers.includes(value)) {
                                    currentSpeakers.push(value)
                                  }
                                  setItemForm({ ...itemForm, speakers: currentSpeakers })
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Add speakers" />
                                </SelectTrigger>
                                <SelectContent>
                                  {speakers.map((speaker) => (
                                    <SelectItem key={speaker.id} value={speaker.id}>
                                      {speaker.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {/* {itemForm.speakers.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {itemForm.speakers.map((speakerId) => {
                                    const speaker = speakers.find((s) => s.id === speakerId)
                                    return (
                                      <div
                                        key={speakerId}
                                        className="flex items-center justify-between bg-muted p-2 rounded-md"
                                      >
                                        <span>{speaker?.name}</span>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => {
                                            setItemForm({
                                              ...itemForm,
                                              speakers: itemForm.speakers.filter((id) => id !== speakerId),
                                            })
                                          }}
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )
                                  })}
                                </div>
                              )} 
                            </div> */}
                            <div className="flex justify-end gap-2">
                              <Button type="button" variant="outline" onClick={() => setAddItemOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit">Add Item</Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        <Trash className="h-4 w-4" />
                        Delete Session
                      </Button>
                    </div>
                  </div>

                  {!session.items || session.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-lg p-4">
                      <p className="text-muted-foreground mb-2">No items in this session yet.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setItemForm({ ...itemForm, sessionId: session.id })
                          setAddItemOpen(true)
                        }}
                      >
                        Add Item
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {session.items.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                      {item.startTime} - {item.endTime}
                                    </span>
                                  </div>
                                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                                </div>
                                <div className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                                  {item.type}
                                </div>
                              </div>

                              {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}

                              {item.speakers && item.speakers.length > 0 && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>Speakers:</span>
                                  </div>
                                  <div className="space-y-2">
                                    {item.speakers.map((speakerRel) => {
                                      const speaker = speakerRel.speaker
                                      return (
                                        <div key={speakerRel.id} className="flex items-center gap-2">
                                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                            {speaker.image ? (
                                              <img
                                                src={speaker.image || "/placeholder.svg"}
                                                alt={speaker.name}
                                                className="w-full h-full object-cover"
                                              />
                                            ) : (
                                              <Users className="h-4 w-4" />
                                            )}
                                          </div>
                                          {/* <div>
                                            <p className="text-sm font-medium">{speaker.name}</p>
                                            {speaker.position && (
                                              <p className="text-xs text-muted-foreground">{speaker.position}</p>
                                            )}
                                          </div> */}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              <div className="flex justify-end gap-2 pt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => openEditItem(item)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1 text-red-500 hover:text-red-600"
                                  onClick={() => handleDeleteItem(item.id, session.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Item Dialog */}
      <Dialog open={editItemOpen} onOpenChange={setEditItemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Agenda Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={itemForm.title}
                onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  value={itemForm.startTime}
                  onChange={(e) => setItemForm({ ...itemForm, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  value={itemForm.endTime}
                  onChange={(e) => setItemForm({ ...itemForm, endTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Type</Label>
              <Select value={itemForm.type} onValueChange={(value) => setItemForm({ ...itemForm, type: value })}>
                <SelectTrigger id="edit-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Keynote">Keynote</SelectItem>
                  <SelectItem value="Presentation">Presentation</SelectItem>
                  <SelectItem value="Panel Discussion">Panel Discussion</SelectItem>
                  <SelectItem value="Q&A">Q&A</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Break">Break</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={itemForm.description}
                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-speakers">Speakers</Label>
              <Select
                onValueChange={(value) => {
                  const currentSpeakers = [...itemForm.speakers]
                  if (!currentSpeakers.includes(value)) {
                    currentSpeakers.push(value)
                  }
                  setItemForm({ ...itemForm, speakers: currentSpeakers })
                }}
              >
                <SelectTrigger id="edit-speakers">
                  <SelectValue placeholder="Add speakers" />
                </SelectTrigger>
                <SelectContent>
                  {speakers.map((speaker) => (
                    <SelectItem key={speaker.id} value={speaker.id}>
                      {speaker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {itemForm.speakers.length > 0 && (
                <div className="mt-2 space-y-2">
                  {itemForm.speakers.map((speakerId) => {
                    const speaker = speakers.find((s) => s.id === speakerId)
                    return (
                      <div key={speakerId} className="flex items-center justify-between bg-muted p-2 rounded-md">
                        <span>{speaker?.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setItemForm({
                              ...itemForm,
                              speakers: itemForm.speakers.filter((id) => id !== speakerId),
                            })
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditItemOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Item</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
