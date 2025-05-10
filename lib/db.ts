import prisma from "./prisma"

// Projects
export async function getProjects() {
  console.log("getProjects function called")
  try {
    // Log database connection status
    console.log("Database URL configured:", !!process.env.DATABASE_URL)
    
    // Attempt to fetch projects
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    
    console.log(`Successfully fetched ${projects.length} projects`)
    return projects
  } catch (error) {
    // Log detailed error information
    console.error("Database Error:", error)
    
    // In production, return empty array instead of throwing
    // This prevents the page from crashing
    if (process.env.NODE_ENV === "production") {
      console.log("Returning empty array due to error in production")
      return []
    }
    
    throw new Error("Failed to fetch projects")
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        stats: true,
      },
    })
    return project
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch project")
  }
}

// Attendees
export async function getAttendees(projectId: string) {
  try {
    const attendees = await prisma.attendee.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return attendees
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch attendees")
  }
}

// Delegates
export async function getDelegates(projectId: string) {
  try {
    const delegates = await prisma.delegate.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return delegates
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch delegates")
  }
}

// Marketing Campaigns
export async function getMarketingCampaigns(projectId: string) {
  try {
    const campaigns = await prisma.marketingCampaign.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return campaigns
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch marketing campaigns")
  }
}

// Leads
export async function getLeads(projectId: string) {
  try {
    const leads = await prisma.lead.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return leads
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch leads")
  }
}

// Sessions
export async function getSessions(projectId: string) {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        projectId,
      },
      orderBy: {
        startTime: "asc",
      },
    })
    return sessions
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch sessions")
  }
}

// Speakers
export async function getSpeakers(projectId: string) {
  try {
    const speakers = await prisma.speaker.findMany({
      where: {
        projectId,
      },
      orderBy: {
        name: "asc",
      },
    })
    return speakers
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch speakers")
  }
}

// Exhibitors
export async function getExhibitors(projectId: string) {
  try {
    const exhibitors = await prisma.exhibitor.findMany({
      where: {
        projectId,
      },
      orderBy: {
        name: "asc",
      },
    })
    return exhibitors
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch exhibitors")
  }
}

// Sponsors
export async function getSponsors(projectId: string) {
  try {
    const sponsors = await prisma.sponsor.findMany({
      where: {
        projectId,
      },
      orderBy: {
        level: "desc",
      },
    })
    return sponsors
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch sponsors")
  }
}

// Partners
export async function getPartners(projectId: string) {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        projectId,
      },
      orderBy: {
        name: "asc",
      },
    })
    return partners
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch partners")
  }
}

// Media Partners
export async function getMediaPartners(projectId: string) {
  try {
    const mediaPartners = await prisma.mediaPartner.findMany({
      where: {
        projectId,
      },
      orderBy: {
        name: "asc",
      },
    })
    return mediaPartners
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch media partners")
  }
}

// Orders
export async function getOrders(projectId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return orders
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch orders")
  }
}

// Enquiries
export async function getEnquiries(projectId: string) {
  try {
    const enquiries = await prisma.enquiry.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return enquiries
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch enquiries")
  }
}

// UTM Data
export async function getUtmData(projectId: string) {
  try {
    const utmData = await prisma.utmData.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return utmData
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch UTM data")
  }
}

// Agenda Days
export async function getAgendaDays(projectId: string) {
  try {
    const days = await prisma.agendaDay.findMany({
      where: {
        projectId,
      },
      orderBy: {
        dayNumber: "asc",
      },
      include: {
        sessions: {
          include: {
            items: {
              include: {
                speakers: {
                  include: {
                    speaker: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return days
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch agenda days")
  }
}

// Agenda Sessions
export async function getAgendaSessions(projectId: string) {
  try {
    // Get all days for this project
    const days = await prisma.agendaDay.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
      },
    })

    const dayIds = days.map((day) => day.id)

    // Get all sessions for these days
    const sessions = await prisma.agendaSession.findMany({
      where: {
        dayId: {
          in: dayIds,
        },
      },
      include: {
        day: true,
        items: {
          include: {
            speakers: {
              include: {
                speaker: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          startTime: "asc",
        },
      ],
    })

    return sessions
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch agenda sessions")
  }
}

// Agenda Items
export async function getAgendaItems(projectId: string) {
  try {
    // Get all days for this project
    const days = await prisma.agendaDay.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
      },
    })

    const dayIds = days.map((day) => day.id)

    // Get all sessions for these days
    const sessions = await prisma.agendaSession.findMany({
      where: {
        dayId: {
          in: dayIds,
        },
      },
      select: {
        id: true,
      },
    })

    const sessionIds = sessions.map((session) => session.id)

    // Get all items for these sessions
    const items = await prisma.agendaItem.findMany({
      where: {
        sessionId: {
          in: sessionIds,
        },
      },
      include: {
        session: {
          include: {
            day: true,
          },
        },
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
      orderBy: [
        {
          startTime: "asc",
        },
      ],
    })

    return items
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch agenda items")
  }
}
