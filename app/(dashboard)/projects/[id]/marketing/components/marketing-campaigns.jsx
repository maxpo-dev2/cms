"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Plus, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default function MarketingCampaigns({ projectId }) {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchCampaigns()
  }, [projectId])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/marketing/campaigns`)
      if (!response.ok) throw new Error("Failed to fetch campaigns")
      const data = await response.json()
      setCampaigns(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching campaigns:", error)
      toast({
        title: "Error",
        description: "Failed to load marketing campaigns",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/projects/${projectId}/marketing/campaigns/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete campaign")

      toast({
        title: "Success",
        description: "Campaign deleted successfully",
      })

      fetchCampaigns()
    } catch (error) {
      console.error("Error deleting campaign:", error)
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  const getCampaignTypeLabel = (type) => {
    const types = {
      email: "Email",
      social: "Social Media",
      ppc: "Pay-Per-Click",
      content: "Content",
      event: "Event",
      pr: "PR",
      partner: "Partner",
      other: "Other",
    }
    return types[type] || type
  }

  const getTypeColor = (type) => {
    const colors = {
      email: "bg-blue-100 text-blue-800",
      social: "bg-purple-100 text-purple-800",
      ppc: "bg-green-100 text-green-800",
      content: "bg-yellow-100 text-yellow-800",
      event: "bg-pink-100 text-pink-800",
      pr: "bg-indigo-100 text-indigo-800",
      partner: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Marketing Campaigns</CardTitle>
        <Button onClick={() => router.push(`/projects/${projectId}/marketing/campaigns/new`)}>
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No marketing campaigns found</p>
            <Button onClick={() => router.push(`/projects/${projectId}/marketing/campaigns/new`)}>
              Create your first campaign
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(campaign.type)}>{getCampaignTypeLabel(campaign.type)}</Badge>
                  </TableCell>
                  <TableCell>
                    {campaign.startDate && (
                      <span>
                        {format(new Date(campaign.startDate), "MMM d, yyyy")}
                        {campaign.endDate && ` - ${format(new Date(campaign.endDate), "MMM d, yyyy")}`}
                      </span>
                    )}
                    {!campaign.startDate && <span className="text-muted-foreground">Not scheduled</span>}
                  </TableCell>
                  <TableCell>{campaign.total}</TableCell>
                  <TableCell>${campaign.revenue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/projects/${projectId}/marketing/campaigns/${campaign.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this campaign? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(campaign.id)}>
                              {deletingId === campaign.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
