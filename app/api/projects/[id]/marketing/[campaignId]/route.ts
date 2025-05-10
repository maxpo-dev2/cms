import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single marketing campaign
export async function GET(request: NextRequest, { params }: { params: { id: string; campaignId: string } }) {
  try {
    const campaign = await prisma.marketingCampaign.findUnique({
      where: {
        id: params.campaignId,
      },
    })

    if (!campaign) {
      return NextResponse.json({ error: "Marketing campaign not found" }, { status: 404 })
    }

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error fetching marketing campaign:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch marketing campaign" }, { status: 500 })
  }
}

// PUT update a marketing campaign
export async function PUT(request: NextRequest, { params }: { params: { id: string; campaignId: string } }) {
  try {
    const data = await request.json()

    // Format dates if needed
    const formattedData = { ...data }
    if (formattedData.startDate && typeof formattedData.startDate === "string") {
      formattedData.startDate = new Date(formattedData.startDate)
    }
    if (formattedData.endDate && typeof formattedData.endDate === "string") {
      formattedData.endDate = new Date(formattedData.endDate)
    }

    const campaign = await prisma.marketingCampaign.update({
      where: {
        id: params.campaignId,
      },
      data: formattedData,
    })

    return NextResponse.json(campaign)
  } catch (error) {
    console.error("Error updating marketing campaign:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update marketing campaign" }, { status: 500 })
  }
}

// DELETE a marketing campaign
export async function DELETE(request: NextRequest, { params }: { params: { id: string; campaignId: string } }) {
  try {
    await prisma.marketingCampaign.delete({
      where: {
        id: params.campaignId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting marketing campaign:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete marketing campaign" }, { status: 500 })
  }
}
