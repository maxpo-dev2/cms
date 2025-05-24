import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sponsors = await prisma.sponsor.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        level: "desc",
      },
    })

    return NextResponse.json(sponsors)
  } catch (err) {
    console.error("Error fetching sponsors:", err || "Unknown error")
    return NextResponse.json({ error: "Failed to fetch sponsors" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const sponsor = await prisma.sponsor.create({
      data: {
        name: body.name,
        image: body.image,
        level: body.level,
        amount: body.amount,
        status: body.status,
        benefits: body.benefits,
        project: {
          connect: {
            id: id,
          },
        },
      },
    })

    return NextResponse.json(sponsor, { status: 201 })
  } catch (err) {
    console.error("Error creating sponsor:", err || "Unknown error")
    return NextResponse.json({ error: "Failed to create sponsor" }, { status: 500 })
  }
}
