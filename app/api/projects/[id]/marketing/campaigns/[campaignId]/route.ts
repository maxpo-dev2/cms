import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string; campaignId: string } }) {
  try {
    const campaign = await prisma.marketingCampaign.findUnique({
      where: {
        id: params.campaignId,
      },
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string; campaignId: string } }) {
  try {
    const body = await request.json()

    const { name, type, startDate, endDate, total, revenue } = body

    if (!name || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const campaign = await prisma.marketingCampaign.update({
      where: {
        id: params.campaignId,
      },
      data: {
        name,
        type,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        total: total !== undefined ? total : undefined,
        revenue: revenue !== undefined ? revenue : undefined,
      },
    })

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error updating campaign:", error)
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; campaignId: string } }) {
  try {
    await prisma.marketingCampaign.delete({
      where: {
        id: params.campaignId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 })
  }
}
