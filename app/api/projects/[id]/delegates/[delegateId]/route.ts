import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single delegate
export async function GET(request: NextRequest, { params }: { params: { id: string; delegateId: string } }) {
  try {
    const delegate = await prisma.delegate.findUnique({
      where: {
        id: params.delegateId,
      },
    })

    if (!delegate) {
      return NextResponse.json({ error: "Delegate not found" }, { status: 404 })
    }

    return NextResponse.json(delegate)
  } catch (error) {
    console.error("Error fetching delegate:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch delegate" }, { status: 500 })
  }
}

// PUT update a delegate
export async function PUT(request: NextRequest, { params }: { params: { id: string; delegateId: string } }) {
  try {
    const data = await request.json()

    const delegate = await prisma.delegate.update({
      where: {
        id: params.delegateId,
      },
      data,
    })

    return NextResponse.json(delegate)
  } catch (error) {
    console.error("Error updating delegate:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update delegate" }, { status: 500 })
  }
}

// DELETE a delegate
export async function DELETE(request: NextRequest, { params }: { params: { id: string; delegateId: string } }) {
  try {
    await prisma.delegate.delete({
      where: {
        id: params.delegateId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting delegate:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete delegate" }, { status: 500 })
  }
}
