"use client"

import React, { useState, useEffect } from "react"
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

export default function PartnersPage({ params }) {
  const resolvedParams = React.use(params)
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    type: "",
    website: "",
    status: "",
    contribution: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/partners`)
      if (response.ok) {
        const data = await response.json()
        setPartners(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch partners",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingPartner
        ? `/api/projects/${resolvedParams.id}/partners/${editingPartner.id}`
        : `/api/projects/${resolvedParams.id}/partners`

      const method = editingPartner ? "PUT" : "POST"

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
          description: `Partner ${editingPartner ? "updated" : "created"} successfully`,
        })
        setIsDialogOpen(false)
        setEditingPartner(null)
        resetForm()
        fetchPartners()
      } else {
        throw new Error("Failed to save partner")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (partner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name || "",
      image: partner.image || "",
      type: partner.type || "",
      website: partner.website || "",
      status: partner.status || "",
      contribution: partner.contribution || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this partner?")) return

    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/partners/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Partner deleted successfully",
        })
        fetchPartners()
      } else {
        throw new Error("Failed to delete partner")
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
      type: "",
      website: "",
      status: "",
      contribution: "",
    })
  }

  const handleAddNew = () => {
    setEditingPartner(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.type?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="container py-6">Loading...</div>
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Partners</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or type"
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
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingPartner ? "Edit Partner" : "Add New Partner"}</DialogTitle>
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
                          <SelectItem value="Strategic">Strategic</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Venue">Venue</SelectItem>
                          <SelectItem value="Catering">Catering</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Logo URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contribution">Contribution</Label>
                    <Textarea
                      id="contribution"
                      value={formData.contribution}
                      onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                      rows={3}
                      placeholder="Describe what this partner contributes to the event..."
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingPartner ? "Update" : "Create"} Partner</Button>
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
                <TableHead>Type</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contribution</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
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
                  <TableCell>{partner.type || "N/A"}</TableCell>
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
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        partner.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : partner.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {partner.status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={partner.contribution}>
                    {partner.contribution || "N/A"}
                  </TableCell>
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
