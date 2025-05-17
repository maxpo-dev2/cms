import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { format } from "date-fns"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get UTM data for the project
    const utmData = await prisma.utmData.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Get project details
    const project = await prisma.project.findUnique({
      where: {
        id: params.id,
      },
      select: {
        name: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Format data for CSV
    const csvRows = []

    // Add headers
    csvRows.push(
      [
        "Source",
        "Medium",
        "Campaign",
        "Term",
        "Content",
        "Visits",
        "Conversions",
        "Conversion Rate",
        "Created At",
      ].join(","),
    )

    // Add data rows
    for (const item of utmData) {
      const conversionRate = item.visits > 0 ? (item.conversions / item.visits) * 100 : 0

      csvRows.push(
        [
          item.source || "",
          item.medium || "",
          item.campaign || "",
          item.term || "",
          item.content || "",
          item.visits || 0,
          item.conversions || 0,
          `${conversionRate.toFixed(2)}%`,
          format(new Date(item.createdAt), "yyyy-MM-dd HH:mm:ss"),
        ]
          .map((value) => `"${value}"`)
          .join(","),
      )
    }

    // Join rows with newlines
    const csvContent = csvRows.join("\n")

    // Set filename
    const filename = `utm_data_${project.name.replace(/\s+/g, "_")}_${format(new Date(), "yyyy-MM-dd")}.csv`

    // Create response with CSV content
    const response = new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })

    return response
  } catch (error) {
    console.error("Error exporting UTM data:", error)
    return NextResponse.json({ error: "Failed to export UTM data" }, { status: 500 })
  }
}
