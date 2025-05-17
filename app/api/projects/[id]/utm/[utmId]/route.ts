import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a specific UTM data entry
export async function GET(request: NextRequest, { params }: { params: { id: string; utmId: string } }) {
  try {
    const { utmId } = params

    const utmData = await prisma.utmData.findUnique({
      where: {
        id: utmId,
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

// PUT update a specific UTM data entry
export async function PUT(request: NextRequest, { params }: { params: { id: string; utmId: string } }) {
  try {
    const { utmId } = params
    const data = await request.json()

    // Validate the data
    if (data.visits !== undefined && typeof data.visits !== "number") {
      return NextResponse.json({ error: "Visits must be a number" }, { status: 400 })
    }

    if (data.conversions !== undefined && typeof data.conversions !== "number") {
      return NextResponse.json({ error: "Conversions must be a number" }, { status: 400 })
    }

    const utmData = await prisma.utmData.update({
      where: {
        id: utmId,
      },
      data,
    })

    return NextResponse.json(utmData)
  } catch (error) {
    console.error("Error updating UTM data:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update UTM data" }, { status: 500 })
  }
}

// DELETE a specific UTM data entry
export async function DELETE(request: NextRequest, { params }: { params: { id: string; utmId: string } }) {
  try {
    const { utmId } = params

    await prisma.utmData.delete({
      where: {
        id: utmId,
      },
    })

    return NextResponse.json({ message: "UTM data deleted successfully" })
  } catch (error) {
    console.error("Error deleting UTM data:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete UTM data" }, { status: 500 })
  }
}
