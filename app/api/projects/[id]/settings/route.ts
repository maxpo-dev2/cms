import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET project settings
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        stats: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project settings:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch project settings" }, { status: 500 })
  }
}

// PUT update project settings
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id
    const data = await request.json()

    // Format dates if needed
    const formattedData = { ...data }
    if (formattedData.startDate && typeof formattedData.startDate === "string") {
      formattedData.startDate = new Date(formattedData.startDate)
    }
    if (formattedData.endDate && typeof formattedData.endDate === "string") {
      formattedData.endDate = new Date(formattedData.endDate)
    }

    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: formattedData,
      include: {
        stats: true,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project settings:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update project settings" }, { status: 500 })
  }
}
