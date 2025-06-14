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

export default function SponsorsPage({ params }) {
  const resolvedParams = React.use(params)
  const [sponsors, setSponsors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSponsor, setEditingSponsor] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    level: "",
    amount: "",
    status: "",
    benefits: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/sponsors`)
      if (response.ok) {
        const data = await response.json()
        setSponsors(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sponsors",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingSponsor
        ? `/api/projects/${resolvedParams.id}/sponsors/${editingSponsor.id}`
        : `/api/projects/${resolvedParams.id}/sponsors`

      const method = editingSponsor ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: formData.amount ? Number.parseFloat(formData.amount) : 0,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Sponsor ${editingSponsor ? "updated" : "created"} successfully`,
        })
        setIsDialogOpen(false)
        setEditingSponsor(null)
        resetForm()
        fetchSponsors()
      } else {
        throw new Error("Failed to save sponsor")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor)
    setFormData({
      name: sponsor.name || "",
      image: sponsor.image || "",
      level: sponsor.level || "",
      amount: sponsor.amount?.toString() || "",
      status: sponsor.status || "",
      benefits: sponsor.benefits || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this sponsor?")) return

    try {
      const response = await fetch(`/api/projects/${resolvedParams.id}/sponsors/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Sponsor deleted successfully",
        })
        fetchSponsors()
      } else {
        throw new Error("Failed to delete sponsor")
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
      level: "",
      amount: "",
      status: "",
      benefits: "",
    })
  }

  const handleAddNew = () => {
    setEditingSponsor(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const filteredSponsors = sponsors.filter(
    (sponsor) =>
      sponsor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.level?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="container py-6">Loading...</div>
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Sponsors</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or level"
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
                  Add Sponsor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingSponsor ? "Edit Sponsor" : "Add New Sponsor"}</DialogTitle>
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
                      <Label htmlFor="level">Sponsorship Level</Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) => setFormData({ ...formData, level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Platinum">Platinum</SelectItem>
                          <SelectItem value="Gold">Gold</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="Bronze">Bronze</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                    <Label htmlFor="benefits">Benefits</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      rows={3}
                      placeholder="List the benefits included in this sponsorship package..."
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingSponsor ? "Update" : "Create"} Sponsor</Button>
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
                <TableHead>Level</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Benefits</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={sponsor.image || "/placeholder.jpg?height=40&width=40"}
                        alt={sponsor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{sponsor.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        sponsor.level === "Platinum"
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          : sponsor.level === "Gold"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : sponsor.level === "Silver"
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {sponsor.level || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>${sponsor.amount?.toLocaleString() || "0"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        sponsor.status === "Confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : sponsor.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {sponsor.status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={sponsor.benefits}>
                    {sponsor.benefits || "N/A"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(sponsor)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(sponsor.id)} className="text-red-600">
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
