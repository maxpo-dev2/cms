import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET all agenda sessions
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    const sessions = await prisma.agendaSession.findMany({
      where: {
        day: {
          projectId,
        },
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

    return NextResponse.json(sessions)
  } catch (error) {
    console.error("Error fetching agenda sessions:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch agenda sessions" }, { status: 500 })
  }
}

// POST create a new agenda session
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const { dayId, ...sessionData } = data

    const session = await prisma.agendaSession.create({
      data: {
        ...sessionData,
        day: {
          connect: {
            id: dayId,
          },
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error creating agenda session:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to create agenda session" }, { status: 500 })
  }
}
