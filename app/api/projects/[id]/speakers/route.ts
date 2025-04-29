import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const speakers = await prisma.speaker.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(speakers)
  } catch (error) {
    console.error("Error fetching speakers:", error)
    return NextResponse.json({ error: "Failed to fetch speakers" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const speaker = await prisma.speaker.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        position: body.position,
        bio: body.bio,
        featured: body.featured || false,
        image: body.image,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(speaker, { status: 201 })
  } catch (error) {
    console.error("Error creating speaker:", error)
    return NextResponse.json({ error: "Failed to create speaker" }, { status: 500 })
  }
}