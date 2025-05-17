import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import MarketingOverview from "./components/marketing-overview"
import MarketingCampaigns from "./components/marketing-campaigns"
import MarketingChannels from "./components/marketing-channels"
import MarketingCalendar from "./components/marketing-calendar"

export default function MarketingPage({ params }) {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects/${params.id}`}>Project</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Marketing</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <MarketingOverview projectId={params.id} />
        </TabsContent>
        <TabsContent value="campaigns" className="mt-6">
          <MarketingCampaigns projectId={params.id} />
        </TabsContent>
        <TabsContent value="channels" className="mt-6">
          <MarketingChannels projectId={params.id} />
        </TabsContent>
        <TabsContent value="calendar" className="mt-6">
          <MarketingCalendar projectId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
