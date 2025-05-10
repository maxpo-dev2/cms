import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a single enquiry
export async function GET(request: NextRequest, { params }: { params: { id: string; enquiryId: string } }) {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: {
        id: params.enquiryId,
      },
    })

    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 })
    }

    return NextResponse.json(enquiry)
  } catch (error) {
    console.error("Error fetching enquiry:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch enquiry" }, { status: 500 })
  }
}

// PUT update an enquiry
export async function PUT(request: NextRequest, { params }: { params: { id: string; enquiryId: string } }) {
  try {
    const data = await request.json()

    const enquiry = await prisma.enquiry.update({
      where: {
        id: params.enquiryId,
      },
      data,
    })

    return NextResponse.json(enquiry)
  } catch (error) {
    console.error("Error updating enquiry:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 })
  }
}

// DELETE an enquiry
export async function DELETE(request: NextRequest, { params }: { params: { id: string; enquiryId: string } }) {
  try {
    await prisma.enquiry.delete({
      where: {
        id: params.enquiryId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting enquiry:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 })
  }
}
