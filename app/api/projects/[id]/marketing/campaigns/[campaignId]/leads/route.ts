import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string; campaignId: string } }) {
  try {
    // In a real app, fetch leads from database
    // For now, return mock data
    const mockLeads = [
      {
        id: "1",
        name: "John Smith",
        email: "john.smith@example.com",
        company: "Acme Corp",
        date: "2023-06-15",
        source: "Email",
        status: "Qualified",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        company: "Tech Solutions",
        date: "2023-06-18",
        source: "Email",
        status: "Contacted",
      },
      {
        id: "3",
        name: "Michael Brown",
        email: "m.brown@example.com",
        company: "Global Industries",
        date: "2023-06-20",
        source: "Email",
        status: "New",
      },
      {
        id: "4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        company: "Innovate Inc",
        date: "2023-06-22",
        source: "Email",
        status: "Qualified",
      },
      {
        id: "5",
        name: "Robert Wilson",
        email: "r.wilson@example.com",
        company: "Wilson & Co",
        date: "2023-06-25",
        source: "Email",
        status: "Disqualified",
      },
      {
        id: "6",
        name: "Jennifer Lee",
        email: "j.lee@example.com",
        company: "Lee Enterprises",
        date: "2023-06-28",
        source: "Email",
        status: "New",
      },
      {
        id: "7",
        name: "David Miller",
        email: "david.m@example.com",
        company: "Miller Group",
        date: "2023-07-01",
        source: "Email",
        status: "Contacted",
      },
      {
        id: "8",
        name: "Lisa Taylor",
        email: "lisa.t@example.com",
        company: "Taylor Industries",
        date: "2023-07-03",
        source: "Email",
        status: "New",
      },
      {
        id: "9",
        name: "James Anderson",
        email: "j.anderson@example.com",
        company: "Anderson & Sons",
        date: "2023-07-05",
        source: "Email",
        status: "Qualified",
      },
      {
        id: "10",
        name: "Patricia Moore",
        email: "p.moore@example.com",
        company: "Moore Consulting",
        date: "2023-07-08",
        source: "Email",
        status: "New",
      },
    ]

    return NextResponse.json(mockLeads)
  } catch (error) {
    console.error("Error fetching campaign leads:", error)
    return NextResponse.json({ error: "Failed to fetch campaign leads" }, { status: 500 })
  }
}
