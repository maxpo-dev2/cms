import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const exhibitors = await prisma.exhibitor.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(exhibitors)
  } catch (error) {
    console.error("Error fetching exhibitors:", error)
    return NextResponse.json({ error: "Failed to fetch exhibitors" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const exhibitor = await prisma.exhibitor.create({
      data: {
        name: body.name,
        image: body.image,
        boothNumber: body.boothNumber,
        category: body.category,
        status: body.status,
        size: body.size,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(exhibitor, { status: 201 })
  } catch (error) {
    console.error("Error creating exhibitor:", error)
    return NextResponse.json({ error: "Failed to create exhibitor" }, { status: 500 })
  }
}
