"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"

export function CampaignPerformance({ projectId, campaignId }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRange, setTimeRange] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/projects/${projectId}/marketing/campaigns/${campaignId}/performance?timeRange=${timeRange}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch performance data")
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error("Error fetching performance data:", err)
        setError(err.message)
        // Use mock data for now
        setData(mockPerformanceData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [projectId, campaignId, timeRange])

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading performance data...</div>
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">Error loading performance data: {error}</div>
        </CardContent>
      </Card>
    )
  }

  // Use mock data if API fails
  const displayData = data || mockPerformanceData

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Campaign Performance</h2>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayData.summary.leads}</div>
            <p className="text-xs text-muted-foreground">
              {displayData.summary.leadsTrend > 0 ? "+" : ""}
              {displayData.summary.leadsTrend}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayData.summary.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {displayData.summary.conversionRateTrend > 0 ? "+" : ""}
              {displayData.summary.conversionRateTrend}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost per Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{displayData.summary.costPerLead.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {displayData.summary.costPerLeadTrend < 0 ? "+" : ""}
              {displayData.summary.costPerLeadTrend}% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Generation Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <LineChart
            data={displayData.leadTrend}
            index="date"
            categories={["leads", "conversions"]}
            colors={["#8884d8", "#82ca9d"]}
            valueFormatter={(value) => `${value}`}
            showLegend={true}
            showXAxis={true}
            showYAxis={true}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart
              data={displayData.channelPerformance}
              index="name"
              categories={["leads", "conversions"]}
              colors={["#8884d8", "#82ca9d"]}
              valueFormatter={(value) => `${value}`}
              showLegend={true}
              showXAxis={true}
              showYAxis={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart
              data={displayData.conversionFunnel}
              index="name"
              categories={["value"]}
              colors={["#8884d8"]}
              valueFormatter={(value) => `${value}`}
              showLegend={false}
              showXAxis={true}
              showYAxis={true}
              layout="horizontal"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Mock data for development and fallback
const mockPerformanceData = {
  summary: {
    leads: 120,
    leadsTrend: 15.4,
    conversionRate: 3.8,
    conversionRateTrend: 0.6,
    costPerLead: 41.67,
    costPerLeadTrend: -8.2,
  },
  leadTrend: [
    { date: "Jun 1", leads: 8, conversions: 1 },
    { date: "Jun 8", leads: 12, conversions: 2 },
    { date: "Jun 15", leads: 15, conversions: 3 },
    { date: "Jun 22", leads: 18, conversions: 3 },
    { date: "Jun 29", leads: 22, conversions: 4 },
    { date: "Jul 6", leads: 25, conversions: 5 },
    { date: "Jul 13", leads: 20, conversions: 4 },
  ],
  channelPerformance: [
    { name: "Email", leads: 45, conversions: 8 },
    { name: "Social", leads: 35, conversions: 6 },
    { name: "Organic", leads: 25, conversions: 5 },
    { name: "Referral", leads: 15, conversions: 3 },
  ],
  conversionFunnel: [
    { name: "Impressions", value: 5000 },
    { name: "Clicks", value: 850 },
    { name: "Form Views", value: 320 },
    { name: "Form Starts", value: 180 },
    { name: "Submissions", value: 120 },
    { name: "Qualified Leads", value: 85 },
    { name: "Conversions", value: 22 },
  ],
}
