import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single lead
export async function GET(request: NextRequest, { params }: { params: { id: string; leadId: string } }) {
  try {
    const lead = await prisma.lead.findUnique({
      where: {
        id: params.leadId,
      },
    })

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error("Error fetching lead:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 })
  }
}

// PUT update a lead
export async function PUT(request: NextRequest, { params }: { params: { id: string; leadId: string } }) {
  try {
    const data = await request.json()

    // Format dates if needed
    const formattedData = { ...data }
    if (formattedData.date && typeof formattedData.date === "string") {
      formattedData.date = new Date(formattedData.date)
    }

    const lead = await prisma.lead.update({
      where: {
        id: params.leadId,
      },
      data: formattedData,
    })

    return NextResponse.json(lead)
  } catch (error) {
    console.error("Error updating lead:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}

// DELETE a lead
export async function DELETE(request: NextRequest, { params }: { params: { id: string; leadId: string } }) {
  try {
    await prisma.lead.delete({
      where: {
        id: params.leadId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting lead:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 })
  }
}
