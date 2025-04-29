import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        startTime: "asc",
      },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const session = await prisma.session.create({
      data: {
        title: body.title,
        description: body.description,
        startTime: body.startTime,
        endTime: body.endTime,
        date: body.date ? new Date(body.date) : null,
        venue: body.venue,
        day: body.day,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}
