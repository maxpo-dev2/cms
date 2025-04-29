import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error("Error fetching partners:", error)
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const partner = await prisma.partner.create({
      data: {
        name: body.name,
        image: body.image,
        type: body.type,
        website: body.website,
        status: body.status,
        contribution: body.contribution,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    console.error("Error creating partner:", error)
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 })
  }
}
