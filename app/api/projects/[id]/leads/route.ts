import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const leads = await prisma.lead.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        contact: body.contact,
        company: body.company,
        type: body.type,
        date: body.date ? new Date(body.date) : null,
        qualifyStatus: body.qualifyStatus,
        salesStatus: body.salesStatus,
        notes: body.notes,
        project: {
          connect: {
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
