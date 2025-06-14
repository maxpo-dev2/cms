"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { BarChart } from "@/components/ui/chart"

export default function MarketingChannels({ projectId }) {
  const [loading, setLoading] = useState(true)
  const [channelData, setChannelData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/marketing/channels`)
        if (!response.ok) throw new Error("Failed to fetch channel data")
        const data = await response.json()

        // Check if data.channels exists and is an array
        if (data && data.channels && Array.isArray(data.channels)) {
          setChannelData(data.channels)
        } else {
          // Fallback to mock data if the structure is not as expected
          throw new Error("Invalid data structure")
        }
      } catch (error) {
        console.error("Error fetching channel data:", error)
        toast({
          title: "Error",
          description: "Failed to load marketing channel data. Using sample data instead.",
          variant: "destructive",
        })

        // Set mock data as fallback
        setChannelData([
          { name: "Email", leads: 245, spend: 3500, conversions: 42, roi: 3.6, cpl: 14.3 },
          { name: "Social Media", leads: 187, spend: 4200, conversions: 31, roi: 2.8, cpl: 22.5 },
          { name: "Paid Search", leads: 156, spend: 5800, conversions: 28, roi: 2.2, cpl: 37.2 },
          { name: "Organic Search", leads: 132, spend: 1200, conversions: 24, roi: 6.5, cpl: 9.1 },
          { name: "Referral", leads: 98, spend: 800, conversions: 19, roi: 7.2, cpl: 8.2 },
          { name: "Direct", leads: 76, spend: 0, conversions: 15, roi: 0, cpl: 0 },
          { name: "Other", leads: 42, spend: 1500, conversions: 8, roi: 1.8, cpl: 35.7 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Calculate total leads for percentage
  const totalLeads = channelData.reduce((sum, channel) => sum + channel.leads, 0)

  // Prepare data for chart - only include top 5 channels for better visualization
  const chartData = channelData.slice(0, 5).map((channel) => ({
    name: channel.name,
    leads: channel.leads,
    conversions: channel.conversions,
  }))

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
          <CardDescription>Top 5 channels by lead generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <BarChart
              data={chartData}
              index="name"
              categories={["leads", "conversions"]}
              colors={["#2563eb", "#10b981"]}
              valueFormatter={(value) => `${value}`}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Channel Metrics</CardTitle>
          <CardDescription>Performance metrics across all marketing channels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Distribution</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Cost per Lead</TableHead>
                <TableHead>ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channelData.map((channel) => (
                <TableRow key={channel.name}>
                  <TableCell className="font-medium">{channel.name}</TableCell>
                  <TableCell>{channel.leads}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(channel.leads / totalLeads) * 100} className="h-2 w-[100px]" />
                      <span className="text-xs text-muted-foreground">
                        {((channel.leads / totalLeads) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{channel.conversions}</TableCell>
                  <TableCell>${channel.cpl.toFixed(2)}</TableCell>
                  <TableCell>{channel.roi}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
