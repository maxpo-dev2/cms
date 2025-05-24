"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Pencil, Plus, Search, Trash, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function MediaPartnersPage({ params }) {
  const resolvedParams = React.use(params)
  const [mediaPartners, setMediaPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMediaPartner, setEditingMediaPartner] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    website: "",
    type: "",
    priority: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchMediaPartners()
  }, [])

  const fetchMediaPartners = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/media-partners`)
      if (response.ok) {
        const data = await response.json()
        setMediaPartners(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch media partners",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingMediaPartner
        ? `/api/projects/${resolvedParams.id}/media-partners/${editingMediaPartner.id}`
        : `/api/projects/${resolvedParams.id}/media-partners`

      const method = editingMediaPartner ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          priority: Number.parseInt(formData.priority) || 0,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Media partner ${editingMediaPartner ? "updated" : "created"} successfully`,
        })
        setIsDialogOpen(false)
        setEditingMediaPartner(null)
        resetForm()
        fetchMediaPartners()
      } else {
        throw new Error("Failed to save media partner")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (mediaPartner) => {
    setEditingMediaPartner(mediaPartner)
    setFormData({
      name: mediaPartner.name || "",
      image: mediaPartner.image || "",
      website: mediaPartner.website || "",
      type: mediaPartner.type || "",
      priority: mediaPartner.priority || 0,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this media partner?")) return

    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/media-partners/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Media partner deleted successfully",
        })
        fetchMediaPartners()
      } else {
        throw new Error("Failed to delete media partner")
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
      website: "",
      type: "",
      priority: 0,
    })
  }

  const handleAddNew = () => {
    setEditingMediaPartner(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const filteredMediaPartners = mediaPartners.filter((partner) =>
    partner.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="container py-6">Loading...</div>
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Media Partners</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name"
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
                  Add Media Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingMediaPartner ? "Edit Media Partner" : "Add New Media Partner"}</DialogTitle>
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
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Newspaper">Newspaper</SelectItem>
                          <SelectItem value="Magazine">Magazine</SelectItem>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="TV">TV</SelectItem>
                          <SelectItem value="Radio">Radio</SelectItem>
                          <SelectItem value="Blog">Blog</SelectItem>
                          <SelectItem value="Podcast">Podcast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Input
                        id="priority"
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Logo URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingMediaPartner ? "Update" : "Create"} Media Partner</Button>
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
                <TableHead>Website</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMediaPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={partner.image || "/placeholder.svg?height=40&width=40"}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {partner.website}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{partner.type || "N/A"}</TableCell>
                  <TableCell>{partner.priority}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(partner)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(partner.id)} className="text-red-600">
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
