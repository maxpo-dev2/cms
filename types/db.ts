export interface Project {
    id: string
    name: string
    image: string
    year: string
    venue?: string
    startDate?: string
    endDate?: string
    currency?: string
    website?: string
    description?: string
    stats?: {
      speakers: number
      partners: number
      mediaPartners: number
      sponsors: number
      exhibitors: number
      delegates: number
    }
  }
  
  export interface Attendee {
    id: string
    name: string
    email: string
    company?: string
    status?: string
    checkedIn: boolean
  }
  
  export interface Delegate {
    id: string
    name: string
    image?: string
    address?: string
    booth?: string
    status?: string
    description?: string
    priority: number
    featured: boolean
    type: string
  }
  
  export interface Speaker {
    id: string
    name: string
    image?: string
    company?: string
    position?: string
    bio?: string
    featured: boolean
  }
  
  export interface MarketingCampaign {
    id: string
    name: string
    type: string
    total: number
    revenue: number
  }
  
  export interface Lead {
    id: string
    name: string
    email: string
    contact?: string
    company?: string
    type?: string
    date?: string
    qualifyStatus?: string
    salesStatus?: string
  }
  
  export interface Order {
    id: string
    orderNumber: string
    status: string
    amount: number
    currency: string
    customerName?: string
    customerEmail?: string
    paymentMethod?: string
  }
  
  export interface Session {
    id: string
    day: string
    date: string
    venue: string
    startTime: string
    endTime: string
    title: string
    description?: string
  }
  