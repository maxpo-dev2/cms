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

    return NextResponse.json(utmData)
  } catch (error) {
    console.error("Error fetching UTM data:", error)
    return NextResponse.json({ error: "Failed to fetch UTM data" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.source || !body.medium || !body.campaign || !body.websiteUrl || !body.name) {
      return NextResponse.json(
        { error: "Missing required fields: source, medium, campaign, websiteUrl, and name are required" },
        { status: 400 },
      )
    }

    const utmData = await prisma.utmData.create({
      data: {
        name: body.name,
        websiteUrl: body.websiteUrl,
        source: body.source,
        medium: body.medium,
        campaign: body.campaign,
        term: body.term || null,
        content: body.content || null,
        visits: 0,
        conversions: 0,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(utmData, { status: 201 })
  } catch (error) {
    console.error("Error creating UTM data:", error)
    return NextResponse.json({ error: "Failed to create UTM data" }, { status: 500 })
  }
}
