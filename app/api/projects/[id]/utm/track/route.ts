import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { utmId, type } = body

    if (!utmId) {
      return NextResponse.json({ error: "UTM ID is required" }, { status: 400 })
    }

    if (!type || (type !== "visit" && type !== "conversion")) {
      return NextResponse.json({ error: "Valid tracking type (visit or conversion) is required" }, { status: 400 })
    }

    // Find the UTM data
    const utmData = await prisma.utmData.findUnique({
      where: {
        id: utmId,
      },
    })

    if (!utmData) {
      return NextResponse.json({ error: "UTM data not found" }, { status: 404 })
    }

    // Update the UTM data based on the tracking type
    if (type === "visit") {
      await prisma.utmData.update({
        where: {
          id: utmId,
        },
        data: {
          visits: (utmData.visits || 0) + 1,
        },
      })
    } else if (type === "conversion") {
      await prisma.utmData.update({
        where: {
          id: utmId,
        },
        data: {
          conversions: (utmData.conversions || 0) + 1,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking UTM data:", error)
    return NextResponse.json({ error: "Failed to track UTM data" }, { status: 500 })
  }
}
