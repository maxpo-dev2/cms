import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const campaigns = await prisma.marketingCampaign.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("Error fetching marketing campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch marketing campaigns" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const { name, type, startDate, endDate } = body

    if (!name || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const campaign = await prisma.marketingCampaign.create({
      data: {
        name,
        type,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        total: 0,
        revenue: 0,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Error creating marketing campaign:", error)
    return NextResponse.json({ error: "Failed to create marketing campaign" }, { status: 500 })
  }
}
