import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single speaker
export async function GET(request: NextRequest, { params }: { params: { id: string; speakerId: string } }) {
  try {
    const speaker = await prisma.speaker.findUnique({
      where: {
        id: params.speakerId,
      },
    })

    if (!speaker) {
      return NextResponse.json({ error: "Speaker not found" }, { status: 404 })
    }

    return NextResponse.json(speaker)
  } catch (error) {
    console.error("Error fetching speaker:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch speaker" }, { status: 500 })
  }
}

// PUT update a speaker
export async function PUT(request: NextRequest, { params }: { params: { id: string; speakerId: string } }) {
  try {
    const data = await request.json()

    const speaker = await prisma.speaker.update({
      where: {
        id: params.speakerId,
      },
      data,
    })

    return NextResponse.json(speaker)
  } catch (error) {
    console.error("Error updating speaker:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update speaker" }, { status: 500 })
  }
}

// DELETE a speaker
export async function DELETE(request: NextRequest, { params }: { params: { id: string; speakerId: string } }) {
  try {
    // First delete all agenda item speaker associations
    await prisma.agendaItemSpeaker.deleteMany({
      where: {
        speakerId: params.speakerId,
      },
    })

    // Then delete the speaker
    await prisma.speaker.delete({
      where: {
        id: params.speakerId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting speaker:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete speaker" }, { status: 500 })
  }
}
