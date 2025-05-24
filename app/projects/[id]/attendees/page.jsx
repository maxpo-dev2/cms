"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Plus, Search, Trash, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function AttendeesPage({ params }) {
  const resolvedParams = React.use(params)
  const [attendees, setAttendees] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAttendee, setEditingAttendee] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    checkedIn: false,
    checkinTime: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchAttendees()
  }, [])

  const fetchAttendees = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/attendees`)
      if (response.ok) {
        const data = await response.json()
        setAttendees(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch attendees",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingAttendee
        ? `/api/projects/${resolvedParams.id}/attendees/${editingAttendee.id}`
        : `/api/projects/${resolvedParams.id}/attendees`

      const method = editingAttendee ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Attendee ${editingAttendee ? "updated" : "created"} successfully`,
        })
        setIsDialogOpen(false)
        setEditingAttendee(null)
        resetForm()
        fetchAttendees()
      } else {
        throw new Error("Failed to save attendee")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (attendee) => {
    setEditingAttendee(attendee)
    setFormData({
      name: attendee.name || "",
      email: attendee.email || "",
      phone: attendee.phone || "",
      company: attendee.company || "",
      jobTitle: attendee.jobTitle || "",
      checkedIn: attendee.checkedIn || false,
      checkinTime: attendee.checkinTime ? new Date(attendee.checkinTime).toISOString().slice(0, 16) : "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this attendee?")) return

    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/attendees/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Attendee deleted successfully",
        })
        fetchAttendees()
      } else {
        throw new Error("Failed to delete attendee")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      checkedIn: false,
      checkinTime: "",
    })
  }

  const handleAddNew = () => {
    setEditingAttendee(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalAttendees = attendees.length
  const totalCheckins = attendees.filter((a) => a.checkedIn).length

  if (loading) {
    return <div className="container py-6">Loading...</div>
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Attendees</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Attendees</h3>
                <p className="text-3xl font-bold">{totalAttendees}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Checkins</h3>
                <p className="text-3xl font-bold">{totalCheckins}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Checkins</h3>
                <p className="text-3xl font-bold">{totalAttendees - totalCheckins}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Check-in Rate</h3>
                <p className="text-3xl font-bold">
                  {totalAttendees > 0 ? Math.round((totalCheckins / totalAttendees) * 100) : 0}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, company, or email"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Attendee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingAttendee ? "Edit Attendee" : "Add New Attendee"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkedIn"
                        checked={formData.checkedIn}
                        onChange={(e) => setFormData({ ...formData, checkedIn: e.target.checked })}
                      />
                      <Label htmlFor="checkedIn">Checked In</Label>
                    </div>
                    {formData.checkedIn && (
                      <div className="space-y-2">
                        <Label htmlFor="checkinTime">Check-in Time</Label>
                        <Input
                          id="checkinTime"
                          type="datetime-local"
                          value={formData.checkinTime}
                          onChange={(e) => setFormData({ ...formData, checkinTime: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingAttendee ? "Update" : "Create"} Attendee</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell className="font-medium">{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>{attendee.company || "N/A"}</TableCell>
                  <TableCell>{attendee.jobTitle || "N/A"}</TableCell>
                  <TableCell>{attendee.phone || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={attendee.checkedIn ? "default" : "secondary"}>
                      {attendee.checkedIn ? "Checked In" : "Not Checked In"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {attendee.checkinTime ? new Date(attendee.checkinTime).toLocaleString() : "N/A"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(attendee)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(attendee.id)} className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
