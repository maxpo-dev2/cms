import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { action, utmIds } = body

    if (!action || !utmIds || !Array.isArray(utmIds) || utmIds.length === 0) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
    }

    // Handle different bulk actions
    if (action === "delete") {
      // Delete multiple UTM entries
      await prisma.utmData.deleteMany({
        where: {
          id: {
            in: utmIds,
          },
          projectId: params.id,
        },
      })

      return NextResponse.json({ message: `${utmIds.length} UTM entries deleted successfully` })
    } else if (action === "reset") {
      // Reset stats for multiple UTM entries
      await prisma.utmData.updateMany({
        where: {
          id: {
            in: utmIds,
          },
          projectId: params.id,
        },
        data: {
          visits: 0,
          conversions: 0,
        },
      })

      return NextResponse.json({ message: `Stats reset for ${utmIds.length} UTM entries` })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error performing bulk UTM action:", error)
    return NextResponse.json({ error: "Failed to perform bulk action" }, { status: 500 })
  }
}
