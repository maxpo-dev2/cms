import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a specific ticket
export async function GET(request: NextRequest, { params }: { params: { id: string; ticketId: string } }) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: params.ticketId,
        projectId: params.id,
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json(ticket)
  } catch (error) {
    console.error("Error fetching ticket:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 })
  }
}

// PUT update a ticket
export async function PUT(request: NextRequest, { params }: { params: { id: string; ticketId: string } }) {
  try {
    const data = await request.json()

    // Format dates if needed
    const formattedData = { ...data }
    if (formattedData.validFrom && typeof formattedData.validFrom === "string") {
      formattedData.validFrom = new Date(formattedData.validFrom)
    }
    if (formattedData.validUntil && typeof formattedData.validUntil === "string") {
      formattedData.validUntil = new Date(formattedData.validUntil)
    }

    // Ensure numeric fields are properly typed
    if (formattedData.price) {
      formattedData.price = Number.parseFloat(formattedData.price)
    }
    if (formattedData.available) {
      formattedData.available = Number.parseInt(formattedData.available)
    }
    if (formattedData.sold) {
      formattedData.sold = Number.parseInt(formattedData.sold)
    }

    const ticket = await prisma.ticket.update({
      where: {
        id: params.ticketId,
        projectId: params.id,
      },
      data: formattedData,
    })

    return NextResponse.json(ticket)
  } catch (error) {
    console.error("Error updating ticket:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}

// DELETE a ticket
export async function DELETE(request: NextRequest, { params }: { params: { id: string; ticketId: string } }) {
  try {
    await prisma.ticket.delete({
      where: {
        id: params.ticketId,
        projectId: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting ticket:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 })
  }
}
