import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // In a real app, fetch calendar events from database
    // For now, return mock data
    const mockEvents = [
      {
        id: "1",
        title: "Email Newsletter",
        description: "Monthly newsletter to subscribers",
        date: "2023-07-05",
        type: "Email Campaign",
        channel: "Email",
      },
      {
        id: "2",
        title: "LinkedIn Campaign Launch",
        description: "Sponsored content campaign",
        date: "2023-07-10",
        type: "Social Media",
        channel: "LinkedIn",
      },
      {
        id: "3",
        title: "Google Ads Refresh",
        description: "Update ad creatives and keywords",
        date: "2023-07-12",
        type: "PPC",
        channel: "Google",
      },
      {
        id: "4",
        title: "Blog Post Publication",
        description: "Industry trends article",
        date: "2023-07-15",
        type: "Content",
        channel: "Website",
      },
      {
        id: "5",
        title: "Press Release",
        description: "New speaker announcement",
        date: "2023-07-18",
        type: "PR",
        channel: "Media",
      },
      {
        id: "6",
        title: "Early Bird Deadline",
        description: "Last day for early bird tickets",
        date: "2023-07-20",
        type: "Event",
        channel: "All",
      },
      {
        id: "7",
        title: "Facebook Ad Campaign",
        description: "Targeted audience campaign",
        date: "2023-07-22",
        type: "Social Media",
        channel: "Facebook",
      },
      {
        id: "8",
        title: "Industry Webinar",
        description: "Pre-event educational webinar",
        date: "2023-07-25",
        type: "Webinar",
        channel: "Zoom",
      },
      {
        id: "9",
        title: "Email Reminder",
        description: "Registration deadline reminder",
        date: "2023-07-28",
        type: "Email Campaign",
        channel: "Email",
      },
      {
        id: "10",
        title: "Twitter Chat",
        description: "Q&A with keynote speaker",
        date: "2023-07-30",
        type: "Social Media",
        channel: "Twitter",
      },
    ]

    return NextResponse.json(mockEvents)
  } catch (error) {
    console.error("Error fetching marketing calendar:", error)
    return NextResponse.json({ error: "Failed to fetch marketing calendar" }, { status: 500 })
  }
}
