import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET all tickets for a project
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error("Error fetching tickets:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

// POST create a new ticket
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const ticket = await prisma.ticket.create({
      data: {
        ...formattedData,
        projectId: params.id,
      },
    })

    return NextResponse.json(ticket)
  } catch (error) {
    console.error("Error creating ticket:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}
