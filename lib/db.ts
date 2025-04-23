import type { Project, Attendee, Delegate, MarketingCampaign, Lead, Order, Session } from "@/types/db"

// Mock data for projects
export const projects: Project[] = [
  {
    id: "bio-technology-show",
    name: "Bio Technology Show",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "ExCeL London, Royal Victoria Dock, 1 Western Gateway, London, United Kingdom, E16 1XL",
    startDate: "2025-06-18T13:30:00.000Z",
    endDate: "2025-06-19T21:30:00.000Z",
    currency: "GBP",
    website: "https://londonbiotechshow.com",
    description:
      "The London Biotechnology Show aims to be a global expo and conference dedicated to the advancements in the biotechnology industry. The event will provide an unparalleled platform for key biotechnology stakeholders to connect with the entire value chain and engage in high-level discussions under one roof.",
    stats: {
      speakers: 52,
      partners: 11,
      mediaPartners: 42,
      sponsors: 16,
      exhibitors: 64,
      delegates: 45,
    },
  },
  {
    id: "arab-biotech-summit",
    name: "Arab BioTech Summit",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "Dubai World Trade Centre, UAE",
    startDate: "2025-09-10T08:00:00.000Z",
    endDate: "2025-09-12T18:00:00.000Z",
    currency: "USD",
    website: "https://arabbiotechsummit.com",
    description: "Accelerating The Biotechnology Transition Across MENA region with industry leaders and innovators.",
    stats: {
      speakers: 45,
      partners: 8,
      mediaPartners: 30,
      sponsors: 12,
      exhibitors: 50,
      delegates: 38,
    },
  },
  {
    id: "dubai-ev-show",
    name: "Dubai EV Show",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "Dubai Exhibition Centre, UAE",
    startDate: "2025-11-15T09:00:00.000Z",
    endDate: "2025-11-17T17:00:00.000Z",
    currency: "AED",
    website: "https://dubaievshow.com",
    description: "Accelerating The EV Transition Across Middle East with focus on sustainable transportation.",
    stats: {
      speakers: 38,
      partners: 15,
      mediaPartners: 25,
      sponsors: 20,
      exhibitors: 70,
      delegates: 60,
    },
  },
  {
    id: "gemtech-forum",
    name: "Gemtech Forum",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "Riyadh Exhibition Center, Saudi Arabia",
    startDate: "2025-10-05T08:30:00.000Z",
    endDate: "2025-10-07T16:30:00.000Z",
    currency: "SAR",
    website: "https://gemtechforum.com",
    description: "Exploring the Future of Mobility & Logistics in Saudi Arabia with industry experts.",
    stats: {
      speakers: 30,
      partners: 10,
      mediaPartners: 18,
      sponsors: 22,
      exhibitors: 45,
      delegates: 40,
    },
  },
  {
    id: "climate-technology-show",
    name: "Climate Technology Show",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "Barcelona Convention Centre, Spain",
    startDate: "2025-05-20T09:00:00.000Z",
    endDate: "2025-05-22T17:00:00.000Z",
    currency: "EUR",
    website: "https://climatetechshow.com",
    description: "Bringing Together Global Climate Action Stakeholders for a Sustainable Tomorrow.",
    stats: {
      speakers: 60,
      partners: 25,
      mediaPartners: 35,
      sponsors: 30,
      exhibitors: 80,
      delegates: 75,
    },
  },
  {
    id: "london-ev-show",
    name: "London EV Show",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "ExCeL London, UK",
    startDate: "2025-11-12T09:00:00.000Z",
    endDate: "2025-11-13T17:00:00.000Z",
    currency: "GBP",
    website: "https://londonevshow.com",
    description: "London EV Show: Driving The Future with focus on electric vehicle innovations and infrastructure.",
    stats: {
      speakers: 40,
      partners: 18,
      mediaPartners: 22,
      sponsors: 25,
      exhibitors: 60,
      delegates: 55,
    },
  },
  {
    id: "rakis",
    name: "RAKIS",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "Ras Al Khaimah Exhibition Centre, UAE",
    startDate: "2025-04-15T08:00:00.000Z",
    endDate: "2025-04-17T16:00:00.000Z",
    currency: "AED",
    website: "https://rakis.ae",
    description: "Propelling RAS AL KHAIMAH as an investment powerhouse in the region.",
    stats: {
      speakers: 35,
      partners: 20,
      mediaPartners: 15,
      sponsors: 28,
      exhibitors: 50,
      delegates: 45,
    },
  },
  {
    id: "world-hydrogen-forum",
    name: "World Hydrogen Forum",
    image: "/placeholder.svg?height=200&width=400",
    year: "2025",
    venue: "Dammam Exhibition Centre, Saudi Arabia",
    startDate: "2025-08-25T09:00:00.000Z",
    endDate: "2025-08-27T17:00:00.000Z",
    currency: "SAR",
    website: "https://worldhydrogenforum.com",
    description: "Accelerating The Hydrogen Transition In Saudi Arabia with focus on clean energy solutions.",
    stats: {
      speakers: 45,
      partners: 22,
      mediaPartners: 20,
      sponsors: 30,
      exhibitors: 65,
      delegates: 60,
    },
  },
]

// Mock data for attendees
export const attendees: Record<string, Attendee[]> = {
  "bio-technology-show": [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      company: "GenomeKey",
      status: "Registered",
      checkedIn: false,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      company: "BioTech Labs",
      status: "Registered",
      checkedIn: false,
    },
    // More attendees...
  ],
  // Other projects...
}

// Mock data for marketing campaigns
export const marketingCampaigns: Record<string, MarketingCampaign[]> = {
  "bio-technology-show": [
    { id: "1", name: "general", type: "Enquiries", total: 188, revenue: 0 },
    { id: "2", name: "general", type: "Orders", total: 154, revenue: 9974.4 },
    { id: "3", name: "search", type: "Orders", total: 148, revenue: 6067.16 },
    { id: "4", name: "search", type: "Enquiries", total: 102, revenue: 0 },
    { id: "5", name: "SDALEN6", type: "Orders", total: 89, revenue: 0 },
    { id: "6", name: "ExCelLondon", type: "Orders", total: 63, revenue: 1626.24 },
    { id: "7", name: "LeadSearch-Phrasematch", type: "Enquiries", total: 49, revenue: 0 },
    { id: "8", name: "SDALEN7", type: "Orders", total: 46, revenue: 0 },
  ],
  // Other projects...
}

// Mock data for leads
export const leads: Record<string, Lead[]> = {
  "bio-technology-show": [
    {
      id: "1",
      name: "Ali Ihsan Nergiz",
      email: "aliihsannergiz@gmail.com",
      contact: "+44 7878742035",
      company: "GenomeKey",
      type: "in-person-freepass",
      date: "2025-04-18T14:53:26.000Z",
      qualifyStatus: "HOT",
      salesStatus: "PENDING",
    },
    {
      id: "2",
      name: "Vikas Harlalapananahalli balaramegowda",
      email: "hbv83372@gmail.com",
      contact: "+44 7741017275",
      company: "Thermo fisher Newport",
      type: "in-person-freepass",
      date: "2025-04-18T14:36:06.000Z",
      qualifyStatus: "HOT",
      salesStatus: "PENDING",
    },
    // More leads...
  ],
  // Other projects...
}

// Mock data for delegates
export const delegates: Record<string, Delegate[]> = {
  "bio-technology-show": [
    {
      id: "1",
      name: "University of Warwick",
      image: "/placeholder.svg?height=40&width=40",
      address: "N/A",
      booth: "",
      status: "",
      description: "",
      priority: 45,
      featured: false,
      type: "standard",
    },
    {
      id: "2",
      name: "Performance Panels Ltd",
      image: "/placeholder.svg?height=40&width=40",
      address: "N/A",
      booth: "",
      status: "",
      description: "",
      priority: 44,
      featured: false,
      type: "standard",
    },
    {
      id: "3",
      name: "PA Consulting",
      image: "/placeholder.svg?height=40&width=40",
      address: "N/A",
      booth: "",
      status: "",
      description: "",
      priority: 43,
      featured: false,
      type: "standard",
    },
    {
      id: "4",
      name: "Bright Instruments",
      image: "/placeholder.svg?height=40&width=40",
      address: "N/A",
      booth: "",
      status: "",
      description: "",
      priority: 42,
      featured: false,
      type: "standard",
    },
    {
      id: "5",
      name: "Ubichem",
      image: "/placeholder.svg?height=40&width=40",
      address: "N/A",
      booth: "",
      status: "",
      description: "",
      priority: 41,
      featured: false,
      type: "standard",
    },
    {
      id: "6",
      name: "Aenova",
      image: "/placeholder.svg?height=40&width=40",
      address: "N/A",
      booth: "",
      status: "",
      description: "",
      priority: 40,
      featured: false,
      type: "standard",
    },
  ],
  // Other projects...
}

// Mock data for orders
export const orders: Record<string, { stats: any; data: Order[] }> = {
  "bio-technology-show": {
    stats: {
      total: 914,
      paid: 67,
      incomplete: 471,
      complete: 443,
      free: 376,
      revenue: 66599.2,
    },
    data: [
      // Order data...
    ],
  },
  // Other projects...
}

// Mock data for sessions
export const sessions: Record<string, Session[]> = {
  "bio-technology-show": [
    {
      id: "1",
      day: "Day 01",
      date: "2025-06-18",
      venue: "Auditorium 1",
      startTime: "09:00",
      endTime: "17:00",
      title: "Registration | Networking | Safety Briefing",
      description: "",
    },
    {
      id: "2",
      day: "Day 01",
      date: "2025-06-18",
      venue: "Auditorium 1",
      startTime: "10:00",
      endTime: "10:30",
      title: "Session 1 | Official Opening and Biotech Regulatory",
      description:
        "This session opens with a macro view of London's growth strategy for biotech, followed by a keynote on innovation, cybersecurity, and regulation followed by a brief Q&A.",
    },
    // More sessions...
  ],
  // Other projects...
}

// Helper functions to get data
export async function getProjects() {
  return projects
}

export async function getProject(id: string) {
  return projects.find((project) => project.id === id)
}

export async function getAttendees(projectId: string) {
  return attendees[projectId] || []
}

export async function getMarketingCampaigns(projectId: string) {
  return marketingCampaigns[projectId] || []
}

export async function getLeads(projectId: string) {
  return leads[projectId] || []
}

export async function getDelegates(projectId: string) {
  return delegates[projectId] || []
}

export async function getOrders(projectId: string) {
  return (
    orders[projectId] || { stats: { total: 0, paid: 0, incomplete: 0, complete: 0, free: 0, revenue: 0 }, data: [] }
  )
}

export async function getSessions(projectId: string) {
  return sessions[projectId] || []
}
