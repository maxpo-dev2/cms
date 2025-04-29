import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET all agenda days for a project
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    const days = await prisma.agendaDay.findMany({
      where: {
        projectId,
      },
      orderBy: {
        dayNumber: "asc",
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

    return NextResponse.json(days)
  } catch (error) {
    console.error("Error fetching agenda days:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch agenda days" }, { status: 500 })
  }
}

// POST create a new agenda day
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id
    const data = await request.json()

    // Convert date string to ISO DateTime format
    const formattedData = { ...data }
    if (formattedData.date && typeof formattedData.date === "string") {
      // Ensure the date is in ISO format by appending time if needed
      if (!formattedData.date.includes("T")) {
        formattedData.date = new Date(`${formattedData.date}T00:00:00.000Z`).toISOString()
      }
    }

    const day = await prisma.agendaDay.create({
      data: {
        ...formattedData,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    })

    return NextResponse.json(day)
  } catch (error) {
    console.error("Error creating agenda day:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to create agenda day" }, { status: 500 })
  }
}
