"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Loader2, TrendingUp, TrendingDown } from "lucide-react"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

export default function MarketingOverview({ projectId }) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalLeads: 0,
    totalRevenue: 0,
    conversionRate: 0,
    campaignsByType: [],
    leadsByMonth: [],
    revenueByMonth: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/marketing/analytics`)
        if (!response.ok) throw new Error("Failed to fetch marketing analytics")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching marketing analytics:", error)
        toast({
          title: "Error",
          description: "Failed to load marketing analytics",
          variant: "destructive",
        })
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

  // Mock data for demonstration
  const mockLeadsByMonth = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 59 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 81 },
    { name: "May", value: 56 },
    { name: "Jun", value: 55 },
    { name: "Jul", value: 40 },
  ]

  const mockRevenueByMonth = [
    { name: "Jan", value: 2400 },
    { name: "Feb", value: 1398 },
    { name: "Mar", value: 9800 },
    { name: "Apr", value: 3908 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 3800 },
    { name: "Jul", value: 4300 },
  ]

  const mockCampaignsByType = [
    { name: "Email", value: 40 },
    { name: "Social", value: 30 },
    { name: "PPC", value: 20 },
    { name: "Content", value: 10 },
  ]

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Campaigns</CardDescription>
            <CardTitle className="text-3xl">{stats.totalCampaigns || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Leads</CardDescription>
            <CardTitle className="text-3xl">{stats.totalLeads || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+18%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">${(stats.totalRevenue || 0).toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+24%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">{(stats.conversionRate || 0).toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500 font-medium">-2.3%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="leads">
              <TabsList className="mb-4">
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
              </TabsList>
              <TabsContent value="leads">
                <div className="h-[300px]">
                  <BarChart
                    data={stats.leadsByMonth?.length ? stats.leadsByMonth : mockLeadsByMonth}
                    index="name"
                    categories={["value"]}
                    colors={["#2563eb"]}
                    valueFormatter={(value) => `${value} leads`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                </div>
              </TabsContent>
              <TabsContent value="revenue">
                <div className="h-[300px]">
                  <LineChart
                    data={stats.revenueByMonth?.length ? stats.revenueByMonth : mockRevenueByMonth}
                    index="name"
                    categories={["value"]}
                    colors={["#10b981"]}
                    valueFormatter={(value) => `$${value}`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart
                data={stats.campaignsByType?.length ? stats.campaignsByType : mockCampaignsByType}
                index="name"
                categories={["value"]}
                colors={["#2563eb", "#10b981", "#f59e0b", "#ef4444"]}
                valueFormatter={(value) => `${value}%`}
                showLegend={true}
                showLabels={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
