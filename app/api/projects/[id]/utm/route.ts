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

    const utmData = await prisma.utmData.create({
      data: {
        source: body.source,
        medium: body.medium,
        campaign: body.campaign,
        term: body.term,
        content: body.content,
        visits: body.visits || 0,
        conversions: body.conversions || 0,
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
