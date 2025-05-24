"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Plus, Search, Trash, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function ExhibitorsPage({ params }) {
  const resolvedParams = React.use(params)
  const [exhibitors, setExhibitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExhibitor, setEditingExhibitor] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    boothNumber: "",
    category: "",
    status: "",
    size: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchExhibitors()
  }, [])

  const fetchExhibitors = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/exhibitors`)
      if (response.ok) {
        const data = await response.json()
        setExhibitors(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exhibitors",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingExhibitor
        ? `/api/projects/${resolvedParams.id}/exhibitors/${editingExhibitor.id}`
        : `/api/projects/${resolvedParams.id}/exhibitors`

      const method = editingExhibitor ? "PUT" : "POST"

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
          description: `Exhibitor ${editingExhibitor ? "updated" : "created"} successfully`,
        })
        setIsDialogOpen(false)
        setEditingExhibitor(null)
        resetForm()
        fetchExhibitors()
      } else {
        throw new Error("Failed to save exhibitor")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (exhibitor) => {
    setEditingExhibitor(exhibitor)
    setFormData({
      name: exhibitor.name || "",
      image: exhibitor.image || "",
      boothNumber: exhibitor.boothNumber || "",
      category: exhibitor.category || "",
      status: exhibitor.status || "",
      size: exhibitor.size || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this exhibitor?")) return

    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/exhibitors/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Exhibitor deleted successfully",
        })
        fetchExhibitors()
      } else {
        throw new Error("Failed to delete exhibitor")
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
      image: "",
      boothNumber: "",
      category: "",
      status: "",
      size: "",
    })
  }

  const handleAddNew = () => {
    setEditingExhibitor(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const filteredExhibitors = exhibitors.filter(
    (exhibitor) =>
      exhibitor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exhibitor.boothNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exhibitor.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="container py-6">Loading...</div>
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Exhibitors</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or booth"
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
                  Add Exhibitor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingExhibitor ? "Edit Exhibitor" : "Add New Exhibitor"}</DialogTitle>
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
                      <Label htmlFor="boothNumber">Booth Number *</Label>
                      <Input
                        id="boothNumber"
                        value={formData.boothNumber}
                        onChange={(e) => setFormData({ ...formData, boothNumber: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="size">Booth Size</Label>
                      <Select
                        value={formData.size}
                        onValueChange={(value) => setFormData({ ...formData, size: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Small (3x3)">Small (3x3)</SelectItem>
                          <SelectItem value="Medium (6x6)">Medium (6x6)</SelectItem>
                          <SelectItem value="Large (9x9)">Large (9x9)</SelectItem>
                          <SelectItem value="Extra Large (12x12)">Extra Large (12x12)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Logo URL</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingExhibitor ? "Update" : "Create"} Exhibitor</Button>
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
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Booth Number</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booth Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExhibitors.map((exhibitor) => (
                <TableRow key={exhibitor.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={exhibitor.image || "/placeholder.svg?height=40&width=40"}
                        alt={exhibitor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{exhibitor.name}</TableCell>
                  <TableCell>{exhibitor.boothNumber}</TableCell>
                  <TableCell>{exhibitor.category || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        exhibitor.status === "Confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : exhibitor.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {exhibitor.status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>{exhibitor.size || "N/A"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(exhibitor)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(exhibitor.id)} className="text-red-600">
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
