import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single exhibitor
export async function GET(request: NextRequest, { params }: { params: { id: string; exhibitorId: string } }) {
  try {
    const exhibitor = await prisma.exhibitor.findUnique({
      where: {
        id: params.exhibitorId,
      },
    })

    if (!exhibitor) {
      return NextResponse.json({ error: "Exhibitor not found" }, { status: 404 })
    }

    return NextResponse.json(exhibitor)
  } catch (error) {
    console.error("Error fetching exhibitor:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch exhibitor" }, { status: 500 })
  }
}

// PUT update an exhibitor
export async function PUT(request: NextRequest, { params }: { params: { id: string; exhibitorId: string } }) {
  try {
    const data = await request.json()

    const exhibitor = await prisma.exhibitor.update({
      where: {
        id: params.exhibitorId,
      },
      data,
    })

    return NextResponse.json(exhibitor)
  } catch (error) {
    console.error("Error updating exhibitor:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update exhibitor" }, { status: 500 })
  }
}

// DELETE an exhibitor
export async function DELETE(request: NextRequest, { params }: { params: { id: string; exhibitorId: string } }) {
  try {
    await prisma.exhibitor.delete({
      where: {
        id: params.exhibitorId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting exhibitor:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete exhibitor" }, { status: 500 })
  }
}
