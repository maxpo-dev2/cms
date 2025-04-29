import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const delegates = await prisma.delegate.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(delegates)
  } catch (error) {
    console.error("Error fetching delegates:", error)
    return NextResponse.json({ error: "Failed to fetch delegates" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const delegate = await prisma.delegate.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        jobTitle: body.jobTitle,
        address: body.address,
        booth: body.booth,
        status: body.status,
        description: body.description,
        priority: body.priority || 0,
        featured: body.featured || false,
        type: body.type,
        image: body.image,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(delegate, { status: 201 })
  } catch (error) {
    console.error("Error creating delegate:", error)
    return NextResponse.json({ error: "Failed to create delegate" }, { status: 500 })
  }
}
