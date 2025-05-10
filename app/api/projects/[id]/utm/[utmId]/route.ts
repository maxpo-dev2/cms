import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single UTM data entry
export async function GET(request: NextRequest, { params }: { params: { id: string; utmId: string } }) {
  try {
    const utmData = await prisma.utmData.findUnique({
      where: {
        id: params.utmId,
      },
    })

    if (!utmData) {
      return NextResponse.json({ error: "UTM data not found" }, { status: 404 })
    }

    return NextResponse.json(utmData)
  } catch (error) {
    console.error("Error fetching UTM data:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch UTM data" }, { status: 500 })
  }
}

// PUT update UTM data
export async function PUT(request: NextRequest, { params }: { params: { id: string; utmId: string } }) {
  try {
    const data = await request.json()

    const utmData = await prisma.utmData.update({
      where: {
        id: params.utmId,
      },
      data,
    })

    return NextResponse.json(utmData)
  } catch (error) {
    console.error("Error updating UTM data:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update UTM data" }, { status: 500 })
  }
}

// DELETE UTM data
export async function DELETE(request: NextRequest, { params }: { params: { id: string; utmId: string } }) {
  try {
    await prisma.utmData.delete({
      where: {
        id: params.utmId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting UTM data:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete UTM data" }, { status: 500 })
  }
}
