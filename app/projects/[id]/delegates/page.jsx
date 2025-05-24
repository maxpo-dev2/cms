"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Plus, Search, Trash, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function DelegatesPage({ params }) {
  const resolvedParams = React.use(params)
  const [delegates, setDelegates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDelegate, setEditingDelegate] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    address: "",
    booth: "",
    status: "",
    description: "",
    priority: 0,
    featured: false,
    type: "",
    image: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchDelegates()
  }, [])

  const fetchDelegates = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/delegates`)
      if (response.ok) {
        const data = await response.json()
        setDelegates(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch delegates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingDelegate
        ? `/api/projects/${resolvedParams.id}/delegates/${editingDelegate.id}`
        : `/api/projects/${resolvedParams.id}/delegates`

      const method = editingDelegate ? "PUT" : "POST"

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
          description: `Delegate ${editingDelegate ? "updated" : "created"} successfully`,
        })
        setIsDialogOpen(false)
        setEditingDelegate(null)
        resetForm()
        fetchDelegates()
      } else {
        throw new Error("Failed to save delegate")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (delegate) => {
    setEditingDelegate(delegate)
    setFormData({
      name: delegate.name || "",
      email: delegate.email || "",
      phone: delegate.phone || "",
      company: delegate.company || "",
      jobTitle: delegate.jobTitle || "",
      address: delegate.address || "",
      booth: delegate.booth || "",
      status: delegate.status || "",
      description: delegate.description || "",
      priority: delegate.priority || 0,
      featured: delegate.featured || false,
      type: delegate.type || "",
      image: delegate.image || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this delegate?")) return

    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/delegates/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Delegate deleted successfully",
        })
        fetchDelegates()
      } else {
        throw new Error("Failed to delete delegate")
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
      address: "",
      booth: "",
      status: "",
      description: "",
      priority: 0,
      featured: false,
      type: "",
      image: "",
    })
  }

  const handleAddNew = () => {
    setEditingDelegate(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const filteredDelegates = delegates.filter(
    (delegate) =>
      delegate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="container py-6">Loading...</div>
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Delegates</h1>

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
                  Add Delegate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingDelegate ? "Edit Delegate" : "Add New Delegate"}</DialogTitle>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booth">Booth</Label>
                      <Input
                        id="booth"
                        value={formData.booth}
                        onChange={(e) => setFormData({ ...formData, booth: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VIP">VIP</SelectItem>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Speaker">Speaker</SelectItem>
                          <SelectItem value="Sponsor">Sponsor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Input
                        id="priority"
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingDelegate ? "Update" : "Create"} Delegate</Button>
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

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Total records: {filteredDelegates.length}</p>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Booth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDelegates.map((delegate) => (
                <TableRow key={delegate.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={delegate.image || "/placeholder.svg?height=40&width=40"}
                        alt={delegate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{delegate.name}</TableCell>
                  <TableCell>{delegate.email}</TableCell>
                  <TableCell>{delegate.company || "N/A"}</TableCell>
                  <TableCell>{delegate.booth || "N/A"}</TableCell>
                  <TableCell>{delegate.status && <Badge variant="outline">{delegate.status}</Badge>}</TableCell>
                  <TableCell>{delegate.type || "N/A"}</TableCell>
                  <TableCell>
                    {delegate.featured ? (
                      <Badge variant="default">Featured</Badge>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(delegate)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(delegate.id)} className="text-red-600">
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
