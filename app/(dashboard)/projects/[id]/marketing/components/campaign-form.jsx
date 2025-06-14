"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function CampaignForm({ projectId, campaignId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [campaign, setCampaign] = useState({
    name: "",
    type: "email",
    startDate: null,
    endDate: null,
    total: 0,
    revenue: 0,
  })

  useEffect(() => {
    if (campaignId) {
      setLoading(true)
      fetch(`/api/projects/${projectId}/marketing/campaigns/${campaignId}`)
        .then((res) => res.json())
        .then((data) => {
          setCampaign({
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : null,
            endDate: data.endDate ? new Date(data.endDate) : null,
          })
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching campaign:", err)
          toast({
            title: "Error",
            description: "Failed to load campaign details",
            variant: "destructive",
          })
          setLoading(false)
        })
    }
  }, [projectId, campaignId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCampaign((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setCampaign((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (name, date) => {
    setCampaign((prev) => ({
      ...prev,
      [name]: date,
    }))
  }

  const handleNumberChange = (name, value) => {
    setCampaign((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = campaignId
        ? `/api/projects/${projectId}/marketing/campaigns/${campaignId}`
        : `/api/projects/${projectId}/marketing/campaigns`

      const method = campaignId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      })

      if (!response.ok) {
        throw new Error("Failed to save campaign")
      }

      toast({
        title: "Success",
        description: `Campaign ${campaignId ? "updated" : "created"} successfully`,
      })

      router.push(`/projects/${projectId}/marketing`)
    } catch (error) {
      console.error("Error saving campaign:", error)
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
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
      <CardHeader>
        <CardTitle>{campaignId ? "Edit Campaign" : "Create New Campaign"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input id="name" name="name" value={campaign.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Campaign Type *</Label>
              <Select value={campaign.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="ppc">Pay-Per-Click</SelectItem>
                  <SelectItem value="content">Content Marketing</SelectItem>
                  <SelectItem value="event">Event Marketing</SelectItem>
                  <SelectItem value="pr">Public Relations</SelectItem>
                  <SelectItem value="partner">Partner Marketing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <DatePicker value={campaign.startDate} onChange={(date) => handleDateChange("startDate", date)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <DatePicker value={campaign.endDate} onChange={(date) => handleDateChange("endDate", date)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total">Total Leads</Label>
              <Input
                id="total"
                name="total"
                type="number"
                value={campaign.total}
                onChange={(e) => handleNumberChange("total", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue</Label>
              <Input
                id="revenue"
                name="revenue"
                type="number"
                value={campaign.revenue}
                onChange={(e) => handleNumberChange("revenue", e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push(`/projects/${projectId}/marketing`)}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Campaign"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
