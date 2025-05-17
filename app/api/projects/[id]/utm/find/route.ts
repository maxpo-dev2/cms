import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const utmData = await prisma.utmData.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Convert UTM data to CSV format
    const headers = [
      "Name",
      "Website URL",
      "Source",
      "Medium",
      "Campaign",
      "Term",
      "Content",
      "Visits",
      "Conversions",
      "Conversion Rate",
      "Created At",
    ]

    const rows = utmData.map((item) => {
      const conversionRate = item.visits > 0 ? (item.conversions / item.visits) * 100 : 0
      return [
        item.name || "",
        item.websiteUrl || "",
        item.source || "",
        item.medium || "",
        item.campaign || "",
        item.term || "",
        item.content || "",
        item.visits.toString(),
        item.conversions.toString(),
        `${conversionRate.toFixed(2)}%`,
        new Date(item.createdAt).toISOString(),
      ]
    })

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    // Set the appropriate headers for a CSV file download
    const headers2 = new Headers()
    headers2.append("Content-Type", "text/csv")
    headers2.append("Content-Disposition", `attachment; filename="utm_data_${params.id}.csv"`)

    return new NextResponse(csvContent, {
      status: 200,
      headers: headers2,
    })
  } catch (error) {
    console.error("Error exporting UTM data:", error)
    return NextResponse.json({ error: "Failed to export UTM data" }, { status: 500 })
  }
}
