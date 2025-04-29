import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const sponsors = await prisma.sponsor.findMany({
      where: {
        projectId: params.id,
      },
      orderBy: {
        level: "desc",
      },
    })

    return NextResponse.json(sponsors)
  } catch (error) {
    console.error("Error fetching sponsors:", error)
    return NextResponse.json({ error: "Failed to fetch sponsors" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
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
            id: params.id,
          },
        },
      },
    })

    return NextResponse.json(sponsor, { status: 201 })
  } catch (error) {
    console.error("Error creating sponsor:", error)
    return NextResponse.json({ error: "Failed to create sponsor" }, { status: 500 })
  }
}
