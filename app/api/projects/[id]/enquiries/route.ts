import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const enquiries = await prisma.enquiry.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(enquiries)
  } catch (error) {
    console.error("Error fetching enquiries:", error)
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const enquiry = await prisma.enquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
        status: body.status || "New",
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(enquiry, { status: 201 })
  } catch (error) {
    console.error("Error creating enquiry:", error)
    return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 })
  }
}
