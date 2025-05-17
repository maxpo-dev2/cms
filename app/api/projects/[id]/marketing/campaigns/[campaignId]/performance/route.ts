import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string; campaignId: string } }) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const timeRange = url.searchParams.get("timeRange") || "all"

    // In a real app, fetch performance data from database
    // For now, return mock data
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

    return NextResponse.json(mockPerformanceData)
  } catch (error) {
    console.error("Error fetching campaign performance:", error)
    return NextResponse.json({ error: "Failed to fetch campaign performance" }, { status: 500 })
  }
}
