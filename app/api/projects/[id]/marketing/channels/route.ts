import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // In a real app, fetch channel data from database
    // For now, return mock data
    const mockData = {
      channels: [
        {
          name: "Email",
          leads: 245,
          spend: 3500,
          conversions: 42,
          roi: 3.6,
          cpl: 14.3,
        },
        {
          name: "Social Media",
          leads: 187,
          spend: 4200,
          conversions: 31,
          roi: 2.8,
          cpl: 22.5,
        },
        {
          name: "Paid Search",
          leads: 156,
          spend: 5800,
          conversions: 28,
          roi: 2.2,
          cpl: 37.2,
        },
        {
          name: "Organic Search",
          leads: 132,
          spend: 1200,
          conversions: 24,
          roi: 6.5,
          cpl: 9.1,
        },
        {
          name: "Referral",
          leads: 98,
          spend: 800,
          conversions: 19,
          roi: 7.2,
          cpl: 8.2,
        },
        {
          name: "Direct",
          leads: 76,
          spend: 0,
          conversions: 15,
          roi: 0,
          cpl: 0,
        },
        {
          name: "Other",
          leads: 42,
          spend: 1500,
          conversions: 8,
          roi: 1.8,
          cpl: 35.7,
        },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching marketing channels:", error)
    return NextResponse.json({ error: "Failed to fetch marketing channels" }, { status: 500 })
  }
}
