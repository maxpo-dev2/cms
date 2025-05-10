import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single order
export async function GET(request: NextRequest, { params }: { params: { id: string; orderId: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.orderId,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

// PUT update an order
export async function PUT(request: NextRequest, { params }: { params: { id: string; orderId: string } }) {
  try {
    const data = await request.json()

    const order = await prisma.order.update({
      where: {
        id: params.orderId,
      },
      data,
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

// DELETE an order
export async function DELETE(request: NextRequest, { params }: { params: { id: string; orderId: string } }) {
  try {
    await prisma.order.delete({
      where: {
        id: params.orderId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting order:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}
