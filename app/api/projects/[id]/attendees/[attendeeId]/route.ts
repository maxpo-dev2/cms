import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single attendee
export async function GET(request: NextRequest, { params }: { params: { id: string; attendeeId: string } }) {
  try {
    const attendee = await prisma.attendee.findUnique({
      where: {
        id: params.attendeeId,
      },
    })

    if (!attendee) {
      return NextResponse.json({ error: "Attendee not found" }, { status: 404 })
    }

    return NextResponse.json(attendee)
  } catch (error) {
    console.error("Error fetching attendee:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch attendee" }, { status: 500 })
  }
}

// PUT update an attendee
export async function PUT(request: NextRequest, { params }: { params: { id: string; attendeeId: string } }) {
  try {
    const data = await request.json()

    // Format dates if needed
    const formattedData = { ...data }
    if (formattedData.checkinTime && typeof formattedData.checkinTime === "string") {
      formattedData.checkinTime = new Date(formattedData.checkinTime)
    }

    const attendee = await prisma.attendee.update({
      where: {
        id: params.attendeeId,
      },
      data: formattedData,
    })

    return NextResponse.json(attendee)
  } catch (error) {
    console.error("Error updating attendee:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update attendee" }, { status: 500 })
  }
}

// DELETE an attendee
export async function DELETE(request: NextRequest, { params }: { params: { id: string; attendeeId: string } }) {
  try {
    await prisma.attendee.delete({
      where: {
        id: params.attendeeId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting attendee:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete attendee" }, { status: 500 })
  }
}
