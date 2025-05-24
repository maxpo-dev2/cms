import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(projects)
  } catch (err) {
    console.error("Error fetching projects:", err || "Unknown error")
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Create project
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        venue: body.venue,
        website: body.website,
        image: body.image,
        year: body.year,
        currency: body.currency,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        stats: {
          create: {
            speakers: 0,
            partners: 0,
            mediaPartners: 0,
            sponsors: 0,
            exhibitors: 0,
            delegates: 0,
          },
        },
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    console.error("Error creating project:", err || "Unknown error")
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
