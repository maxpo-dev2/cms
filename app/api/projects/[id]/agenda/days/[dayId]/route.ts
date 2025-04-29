import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a specific agenda day
export async function GET(request: NextRequest, { params }: { params: { id: string; dayId: string } }) {
  try {
    const { dayId } = params

    const day = await prisma.agendaDay.findUnique({
      where: {
        id: dayId,
      },
      include: {
        sessions: {
          include: {
            items: {
              include: {
                speakers: {
                  include: {
                    speaker: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!day) {
      return NextResponse.json({ error: "Agenda day not found" }, { status: 404 })
    }

    return NextResponse.json(day)
  } catch (error) {
    console.error("Error fetching agenda day:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch agenda day" }, { status: 500 })
  }
}

// PUT update a specific agenda day
export async function PUT(request: NextRequest, { params }: { params: { id: string; dayId: string } }) {
  try {
    const { dayId } = params
    const data = await request.json()

    const day = await prisma.agendaDay.update({
      where: {
        id: dayId,
      },
      data,
    })

    return NextResponse.json(day)
  } catch (error) {
    console.error("Error updating agenda day:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update agenda day" }, { status: 500 })
  }
}

// DELETE a specific agenda day
export async function DELETE(request: NextRequest, { params }: { params: { id: string; dayId: string } }) {
  try {
    const { dayId } = params

    await prisma.agendaDay.delete({
      where: {
        id: dayId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting agenda day:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete agenda day" }, { status: 500 })
  }
}
