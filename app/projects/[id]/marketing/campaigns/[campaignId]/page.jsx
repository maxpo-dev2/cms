import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, ArrowLeft, Calendar, DollarSign, Users, BarChart3 } from "lucide-react"
import { CampaignPerformance } from "../../components/campaign-performance"
import { CampaignLeads } from "../../components/campaign-leads"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CampaignForm from "../../components/campaign-form"

async function getCampaign(projectId, campaignId) {
  try {
    // In a real app, fetch from API
    // const res = await fetch(`/api/projects/${projectId}/marketing/campaigns/${campaignId}`);
    // if (!res.ok) throw new Error('Failed to fetch campaign');
    // return res.json();

    // Mock data for development
    return mockCampaigns.find((c) => c.id === campaignId)
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return null
  }
}

export default async function CampaignDetailsPage({ params }) {
  const campaign = await getCampaign(params.id, params.campaignId)

  if (!campaign) {
    notFound()
  }

  return (
    <div className="container py-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${params.id}`}>Project</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${params.id}/marketing`}>Marketing</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Edit Campaign</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Link href={`/projects/${params.id}/marketing`}>
            <Button variant="ghost" className="gap-2 p-0 mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketing
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={getStatusVariant(campaign.status)}>{campaign.status}</Badge>
            <span className="text-sm text-muted-foreground">
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </span>
          </div>
        </div>
        <Link href={`/projects/${params.id}/marketing/campaigns/${params.campaignId}/edit`}>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Campaign
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campaign Type</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-xl font-bold">{campaign.type}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="text-xl font-bold">{calculateDuration(campaign.startDate, campaign.endDate)} days</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div className="text-xl font-bold">£{campaign.budget.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="text-xl font-bold">{campaign.leads}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Description</h3>
            <p className="text-muted-foreground">{campaign.description || "No description provided."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Target Audience</h3>
              <p className="text-muted-foreground">{campaign.targetAudience || "No target audience specified."}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Channels</h3>
              <div className="flex flex-wrap gap-1">
                {campaign.channels?.map((channel, index) => (
                  <Badge key={index} variant="secondary">
                    {channel}
                  </Badge>
                )) || "No channels specified."}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Goals</h3>
              <p className="text-muted-foreground">{campaign.goals || "No goals specified."}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">KPIs</h3>
              <p className="text-muted-foreground">{campaign.kpis || "No KPIs specified."}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Suspense fallback={<div>Loading performance data...</div>}>
            <CampaignPerformance projectId={params.id} campaignId={params.campaignId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Suspense fallback={<div>Loading leads data...</div>}>
            <CampaignLeads projectId={params.id} campaignId={params.campaignId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>How the campaign budget is being spent</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Budget tracking data will be available soon.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Assets</CardTitle>
              <CardDescription>Creative materials and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No assets have been uploaded for this campaign yet.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6">
        <CampaignForm projectId={params.id} campaignId={params.campaignId} />
      </div>
    </div>
  )
}

// Helper functions
function getStatusVariant(status) {
  switch (status.toLowerCase()) {
    case "active":
      return "success"
    case "scheduled":
      return "warning"
    case "completed":
      return "default"
    case "draft":
      return "outline"
    default:
      return "secondary"
  }
}

function formatDate(dateString) {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Mock data for development
const mockCampaigns = [
  {
    id: "1",
    name: "Summer Conference Promotion",
    type: "Email",
    status: "Active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    budget: 5000,
    leads: 120,
    description: "Promotional campaign for our summer conference targeting past attendees and new prospects.",
    targetAudience: "Industry professionals, past attendees, and qualified leads",
    channels: ["Email", "Social Media", "Website"],
    goals: "Increase registrations by 20% compared to last year",
    kpis: "Email open rate, click-through rate, registration conversions",
  },
  {
    id: "2",
    name: "Google Ads - Event Keywords",
    type: "PPC",
    status: "Active",
    startDate: "2023-05-15",
    endDate: "2023-09-15",
    budget: 7500,
    leads: 85,
    description: "Google Ads campaign targeting industry-specific keywords related to our event.",
    targetAudience: "Professionals actively searching for industry events and conferences",
    channels: ["Google Ads", "Landing Page"],
    goals: "Generate qualified leads at a CPA under £100",
    kpis: "Click-through rate, conversion rate, cost per acquisition",
  },
  // Additional mock campaigns would be here
]
