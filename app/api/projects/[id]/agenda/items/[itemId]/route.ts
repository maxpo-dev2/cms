import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a specific agenda item
export async function GET(request: NextRequest, { params }: { params: { id: string; itemId: string } }) {
  try {
    const { itemId } = params

    const item = await prisma.agendaItem.findUnique({
      where: {
        id: itemId,
      },
      include: {
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
    })

    if (!item) {
      return NextResponse.json({ error: "Agenda item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching agenda item:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch agenda item" }, { status: 500 })
  }
}

// PUT update a specific agenda item
export async function PUT(request: NextRequest, { params }: { params: { id: string; itemId: string } }) {
  try {
    const { itemId } = params
    const data = await request.json()
    const { sessionId, speakers, ...itemData } = data

    // Update the item first
    const item = await prisma.agendaItem.update({
      where: {
        id: itemId,
      },
      data: {
        ...itemData,
        session: sessionId
          ? {
              connect: {
                id: sessionId,
              },
            }
          : undefined,
      },
    })

    // If speakers are provided, update the speaker connections
    if (speakers) {
      // Delete existing speaker connections
      await prisma.agendaItemSpeaker.deleteMany({
        where: {
          agendaItemId: itemId,
        },
      })

      // Create new speaker connections
      if (speakers.length > 0) {
        await Promise.all(
          speakers.map((speakerId: string) =>
            prisma.agendaItemSpeaker.create({
              data: {
                agendaItem: {
                  connect: {
                    id: itemId,
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
    }

    // Fetch the complete item with speakers
    const completeItem = await prisma.agendaItem.findUnique({
      where: {
        id: itemId,
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
    console.error("Error updating agenda item:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update agenda item" }, { status: 500 })
  }
}

// DELETE a specific agenda item
export async function DELETE(request: NextRequest, { params }: { params: { id: string; itemId: string } }) {
  try {
    const { itemId } = params

    // First delete all speaker connections
    await prisma.agendaItemSpeaker.deleteMany({
      where: {
        agendaItemId: itemId,
      },
    })

    // Then delete the item
    await prisma.agendaItem.delete({
      where: {
        id: itemId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting agenda item:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete agenda item" }, { status: 500 })
  }
}
