import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a specific agenda session
export async function GET(request: NextRequest, { params }: { params: { id: string; sessionId: string } }) {
  try {
    const { sessionId } = params

    const session = await prisma.agendaSession.findUnique({
      where: {
        id: sessionId,
      },
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
    })

    if (!session) {
      return NextResponse.json({ error: "Agenda session not found" }, { status: 404 })
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error fetching agenda session:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch agenda session" }, { status: 500 })
  }
}

// PUT update a specific agenda session
export async function PUT(request: NextRequest, { params }: { params: { id: string; sessionId: string } }) {
  try {
    const { sessionId } = params
    const data = await request.json()
    const { dayId, ...sessionData } = data

    const session = await prisma.agendaSession.update({
      where: {
        id: sessionId,
      },
      data: {
        ...sessionData,
        day: dayId
          ? {
              connect: {
                id: dayId,
              },
            }
          : undefined,
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error updating agenda session:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update agenda session" }, { status: 500 })
  }
}

// DELETE a specific agenda session
export async function DELETE(request: NextRequest, { params }: { params: { id: string; sessionId: string } }) {
  try {
    const { sessionId } = params

    // First delete all items in this session
    await prisma.agendaItem.deleteMany({
      where: {
        sessionId,
      },
    })

    // Then delete the session
    await prisma.agendaSession.delete({
      where: {
        id: sessionId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting agenda session:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete agenda session" }, { status: 500 })
  }
}
