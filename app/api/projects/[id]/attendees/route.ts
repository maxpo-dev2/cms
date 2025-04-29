import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const attendees = await prisma.attendee.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(attendees)
  } catch (error) {
    console.error("Error fetching attendees:", error)
    return NextResponse.json({ error: "Failed to fetch attendees" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const attendee = await prisma.attendee.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        jobTitle: body.jobTitle,
        checkedIn: body.checkedIn || false,
        checkinTime: body.checkinTime ? new Date(body.checkinTime) : null,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(attendee, { status: 201 })
  } catch (error) {
    console.error("Error creating attendee:", error)
    return NextResponse.json({ error: "Failed to create attendee" }, { status: 500 })
  }
}
