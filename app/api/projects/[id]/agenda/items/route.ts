import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET all agenda items
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    const items = await prisma.agendaItem.findMany({
      where: {
        session: {
          day: {
            projectId,
          },
        },
      },
      include: {
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching agenda items:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch agenda items" }, { status: 500 })
  }
}

// POST create a new agenda item
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const { sessionId, speakers, ...itemData } = data

    // Create the item first
    const item = await prisma.agendaItem.create({
      data: {
        ...itemData,
        session: {
          connect: {
            id: sessionId,
          },
        },
      },
    })

    // If speakers are provided, create the speaker connections
    if (speakers && speakers.length > 0) {
      await Promise.all(
        speakers.map((speakerId: string) =>
          prisma.agendaItemSpeaker.create({
            data: {
              agendaItem: {
                connect: {
                  id: item.id,
                },
              },
              speaker: {
                connect: {
                  id: speakerId,
                },
              },
            },
          }),
        ),
      )
    }

    // Fetch the complete item with speakers
    const completeItem = await prisma.agendaItem.findUnique({
      where: {
        id: item.id,
      },
      include: {
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
    })

    return NextResponse.json(completeItem)
  } catch (error) {
    console.error("Error creating agenda item:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to create agenda item" }, { status: 500 })
  }
}
