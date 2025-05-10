import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single partner
export async function GET(request: NextRequest, { params }: { params: { id: string; partnerId: string } }) {
  try {
    const partner = await prisma.partner.findUnique({
      where: {
        id: params.partnerId,
      },
    })

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 })
    }

    return NextResponse.json(partner)
  } catch (error) {
    console.error("Error fetching partner:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch partner" }, { status: 500 })
  }
}

// PUT update a partner
export async function PUT(request: NextRequest, { params }: { params: { id: string; partnerId: string } }) {
  try {
    const data = await request.json()

    const partner = await prisma.partner.update({
      where: {
        id: params.partnerId,
      },
      data,
    })

    return NextResponse.json(partner)
  } catch (error) {
    console.error("Error updating partner:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 })
  }
}

// DELETE a partner
export async function DELETE(request: NextRequest, { params }: { params: { id: string; partnerId: string } }) {
  try {
    await prisma.partner.delete({
      where: {
        id: params.partnerId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting partner:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 })
  }
}
