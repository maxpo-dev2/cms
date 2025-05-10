import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single sponsor
export async function GET(request: NextRequest, { params }: { params: { id: string; sponsorId: string } }) {
  try {
    const sponsor = await prisma.sponsor.findUnique({
      where: {
        id: params.sponsorId,
      },
    })

    if (!sponsor) {
      return NextResponse.json({ error: "Sponsor not found" }, { status: 404 })
    }

    return NextResponse.json(sponsor)
  } catch (error) {
    console.error("Error fetching sponsor:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch sponsor" }, { status: 500 })
  }
}

// PUT update a sponsor
export async function PUT(request: NextRequest, { params }: { params: { id: string; sponsorId: string } }) {
  try {
    const data = await request.json()

    const sponsor = await prisma.sponsor.update({
      where: {
        id: params.sponsorId,
      },
      data,
    })

    return NextResponse.json(sponsor)
  } catch (error) {
    console.error("Error updating sponsor:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update sponsor" }, { status: 500 })
  }
}

// DELETE a sponsor
export async function DELETE(request: NextRequest, { params }: { params: { id: string; sponsorId: string } }) {
  try {
    await prisma.sponsor.delete({
      where: {
        id: params.sponsorId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting sponsor:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete sponsor" }, { status: 500 })
  }
}
