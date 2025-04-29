import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const mediaPartners = await prisma.mediaPartner.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(mediaPartners)
  } catch (error) {
    console.error("Error fetching media partners:", error)
    return NextResponse.json({ error: "Failed to fetch media partners" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const mediaPartner = await prisma.mediaPartner.create({
      data: {
        name: body.name,
        image: body.image,
        website: body.website,
        type: body.type,
        priority: body.priority || 0,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(mediaPartner, { status: 201 })
  } catch (error) {
    console.error("Error creating media partner:", error)
    return NextResponse.json({ error: "Failed to create media partner" }, { status: 500 })
  }
}
