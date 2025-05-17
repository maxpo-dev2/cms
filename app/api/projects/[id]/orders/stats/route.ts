import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Get all orders for the project
    const orders = await prisma.order.findMany({
      where: {
        projectId: params.id,
      },
      select: {
        id: true,
        status: true,
        amount: true,
        orderNumber: true,
        customerName: true,
        customerEmail: true,
        paymentMethod: true,
      },
    })

    // Calculate statistics
    const stats = {
      revenue: orders.reduce((sum, order) => sum + (order.amount || 0), 0),
      total: orders.length,
      paid: orders.filter((order) => order.status === "PAID").length,
      incomplete: orders.filter((order) => order.status === "INCOMPLETE").length,
      complete: orders.filter((order) => order.status === "COMPLETE").length,
      free: orders.filter((order) => order.amount === 0).length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching order statistics:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch order statistics",
        stats: {
          revenue: 0,
          total: 0,
          paid: 0,
          incomplete: 0,
          complete: 0,
          free: 0,
        },
      },
      { status: 500 },
    )
  }
}
