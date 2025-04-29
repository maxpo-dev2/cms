import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST() {
  try {
    // Create sample projects
    const projects = await Promise.all([
      prisma.project.create({
        data: {
          name: "Bio Technology Show",
          description: "The premier event for biotechnology innovations and research.",
          venue: "London ExCeL",
          website: "https://biotechshow.com",
          image: "/placeholder.svg?height=200&width=400",
          year: "2025",
          currency: "GBP",
          startDate: new Date("2025-06-18"),
          endDate: new Date("2025-06-19"),
          stats: {
            create: {
              speakers: 45,
              partners: 12,
              mediaPartners: 8,
              sponsors: 15,
              exhibitors: 120,
              delegates: 2500,
            },
          },
        },
      }),
      prisma.project.create({
        data: {
          name: "Arab BioTech Summit",
          description: "Leading biotechnology conference in the Middle East.",
          venue: "Dubai World Trade Centre",
          website: "https://arabiotechsummit.com",
          image: "/placeholder.svg?height=200&width=400",
          year: "2025",
          currency: "USD",
          startDate: new Date("2025-09-10"),
          endDate: new Date("2025-09-12"),
          stats: {
            create: {
              speakers: 30,
              partners: 8,
              mediaPartners: 5,
              sponsors: 10,
              exhibitors: 80,
              delegates: 1800,
            },
          },
        },
      }),
      prisma.project.create({
        data: {
          name: "London EV Show",
          description: "The UK's largest electric vehicle exhibition.",
          venue: "London Olympia",
          website: "https://londonevshow.com",
          image: "/placeholder.svg?height=200&width=400",
          year: "2025",
          currency: "GBP",
          startDate: new Date("2025-11-25"),
          endDate: new Date("2025-11-27"),
          stats: {
            create: {
              speakers: 50,
              partners: 15,
              mediaPartners: 12,
              sponsors: 20,
              exhibitors: 150,
              delegates: 3000,
            },
          },
        },
      }),
    ])

    // Create sample attendees for the first project
    const attendees = await Promise.all([
      prisma.attendee.create({
        data: {
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "+44 7700 900123",
          company: "BioTech Innovations",
          jobTitle: "Research Director",
          checkedIn: true,
          checkinTime: new Date("2025-06-18T09:30:00"),
          projectId: projects[0].id,
        },
      }),
      prisma.attendee.create({
        data: {
          name: "Sarah Johnson",
          email: "sarah.johnson@example.com",
          phone: "+44 7700 900456",
          company: "Genomics Ltd",
          jobTitle: "CEO",
          checkedIn: true,
          checkinTime: new Date("2025-06-18T10:15:00"),
          projectId: projects[0].id,
        },
      }),
      prisma.attendee.create({
        data: {
          name: "Michael Chen",
          email: "michael.chen@example.com",
          phone: "+44 7700 900789",
          company: "Cambridge University",
          jobTitle: "Professor",
          checkedIn: false,
          projectId: projects[0].id,
        },
      }),
    ])

    // Create sample delegates for the first project
    const delegates = await Promise.all([
      prisma.delegate.create({
        data: {
          name: "Emma Wilson",
          email: "emma.wilson@example.com",
          phone: "+44 7700 900234",
          company: "BioPharm Research",
          jobTitle: "Head of R&D",
          address: "123 Science Park, Cambridge",
          booth: "A12",
          status: "Confirmed",
          description: "Leading researcher in genomics",
          priority: 1,
          featured: true,
          type: "VIP",
          image: "/placeholder.svg?height=40&width=40",
          projectId: projects[0].id,
        },
      }),
      prisma.delegate.create({
        data: {
          name: "David Lee",
          email: "david.lee@example.com",
          phone: "+44 7700 900567",
          company: "MediTech Solutions",
          jobTitle: "CTO",
          address: "456 Innovation Centre, London",
          booth: "B05",
          status: "Confirmed",
          description: "Expert in medical devices",
          priority: 2,
          featured: false,
          type: "Speaker",
          image: "/placeholder.svg?height=40&width=40",
          projectId: projects[0].id,
        },
      }),
    ])

    // Create sample marketing campaigns for the first project
    const campaigns = await Promise.all([
      prisma.marketingCampaign.create({
        data: {
          name: "Early Bird Registration",
          type: "Email",
          total: 500,
          revenue: 25000,
          startDate: new Date("2024-12-01"),
          endDate: new Date("2025-01-31"),
          projectId: projects[0].id,
        },
      }),
      prisma.marketingCampaign.create({
        data: {
          name: "LinkedIn Promotion",
          type: "Social Media",
          total: 300,
          revenue: 15000,
          startDate: new Date("2025-02-01"),
          endDate: new Date("2025-03-31"),
          projectId: projects[0].id,
        },
      }),
    ])

    // Create sample leads for the first project
    const leads = await Promise.all([
      prisma.lead.create({
        data: {
          name: "Robert Brown",
          email: "robert.brown@example.com",
          contact: "+44 7700 900890",
          company: "Pharma Innovations",
          type: "Website",
          date: new Date("2025-01-15"),
          qualifyStatus: "HOT",
          salesStatus: "PENDING",
          notes: "Interested in sponsorship opportunities",
          projectId: projects[0].id,
        },
      }),
      prisma.lead.create({
        data: {
          name: "Jennifer White",
          email: "jennifer.white@example.com",
          contact: "+44 7700 900123",
          company: "BioTech Ventures",
          type: "Referral",
          date: new Date("2025-01-20"),
          qualifyStatus: "WARM",
          salesStatus: "CONTACTED",
          notes: "Looking for exhibition space",
          projectId: projects[0].id,
        },
      }),
    ])

    // Create sample sessions for the first project
    const sessions = await Promise.all([
      prisma.session.create({
        data: {
          title: "Opening Keynote: The Future of Biotechnology",
          description: "An overview of emerging trends and innovations in biotechnology.",
          startTime: "09:00",
          endTime: "10:00",
          date: new Date("2025-06-18"),
          venue: "Auditorium 1",
          day: 1,
          projectId: projects[0].id,
        },
      }),
      prisma.session.create({
        data: {
          title: "Panel Discussion: Genomics Revolution",
          description: "Leading experts discuss the impact of genomics on healthcare.",
          startTime: "11:00",
          endTime: "12:30",
          date: new Date("2025-06-18"),
          venue: "Auditorium 1",
          day: 1,
          projectId: projects[0].id,
        },
      }),
      prisma.session.create({
        data: {
          title: "Workshop: CRISPR Applications",
          description: "Hands-on workshop exploring practical applications of CRISPR technology.",
          startTime: "14:00",
          endTime: "16:00",
          date: new Date("2025-06-18"),
          venue: "Workshop Room A",
          day: 1,
          projectId: projects[0].id,
        },
      }),
    ])

    return NextResponse.json(
      {
        message: "Database seeded successfully",
        data: {
          projects: projects.length,
          attendees: attendees.length,
          delegates: delegates.length,
          campaigns: campaigns.length,
          leads: leads.length,
          sessions: sessions.length,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
