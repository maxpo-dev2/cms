import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // In a real app, fetch analytics data from database
    // For now, return mock data
    const mockData = {
      summary: {
        totalLeads: 894,
        leadGrowth: 12.5,
        totalConversions: 167,
        conversionRate: 18.7,
        totalRevenue: 42500,
        revenueGrowth: 8.3,
        campaignCount: 12,
        activeCount: 5,
      },
      leadsByMonth: [
        { month: "Jan", leads: 42 },
        { month: "Feb", leads: 56 },
        { month: "Mar", leads: 78 },
        { month: "Apr", leads: 84 },
        { month: "May", leads: 92 },
        { month: "Jun", leads: 105 },
        { month: "Jul", leads: 124 },
        { month: "Aug", leads: 142 },
        { month: "Sep", leads: 171 },
      ],
      conversionsByMonth: [
        { month: "Jan", conversions: 8 },
        { month: "Feb", conversions: 12 },
        { month: "Mar", conversions: 15 },
        { month: "Apr", conversions: 16 },
        { month: "May", conversions: 18 },
        { month: "Jun", conversions: 21 },
        { month: "Jul", conversions: 24 },
        { month: "Aug", conversions: 26 },
        { month: "Sep", conversions: 27 },
      ],
      leadsBySource: [
        { source: "Email", value: 32 },
        { source: "Social", value: 24 },
        { source: "Search", value: 18 },
        { source: "Referral", value: 14 },
        { source: "Direct", value: 12 },
      ],
      conversionsByStage: [
        { stage: "Awareness", value: 100 },
        { stage: "Interest", value: 75 },
        { stage: "Consideration", value: 50 },
        { stage: "Intent", value: 35 },
        { stage: "Evaluation", value: 25 },
        { stage: "Purchase", value: 15 },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching marketing analytics:", error)
    return NextResponse.json({ error: "Failed to fetch marketing analytics" }, { status: 500 })
  }
}
