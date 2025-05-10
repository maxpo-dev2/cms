import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single media partner
export async function GET(request: NextRequest, { params }: { params: { id: string; mediaPartnerId: string } }) {
  try {
    const mediaPartner = await prisma.mediaPartner.findUnique({
      where: {
        id: params.mediaPartnerId,
      },
    })

    if (!mediaPartner) {
      return NextResponse.json({ error: "Media partner not found" }, { status: 404 })
    }

    return NextResponse.json(mediaPartner)
  } catch (error) {
    console.error("Error fetching media partner:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch media partner" }, { status: 500 })
  }
}

// PUT update a media partner
export async function PUT(request: NextRequest, { params }: { params: { id: string; mediaPartnerId: string } }) {
  try {
    const data = await request.json()

    const mediaPartner = await prisma.mediaPartner.update({
      where: {
        id: params.mediaPartnerId,
      },
      data,
    })

    return NextResponse.json(mediaPartner)
  } catch (error) {
    console.error("Error updating media partner:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update media partner" }, { status: 500 })
  }
}

// DELETE a media partner
export async function DELETE(request: NextRequest, { params }: { params: { id: string; mediaPartnerId: string } }) {
  try {
    await prisma.mediaPartner.delete({
      where: {
        id: params.mediaPartnerId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting media partner:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete media partner" }, { status: 500 })
  }
}
