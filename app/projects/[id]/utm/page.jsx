import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function UTMPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for UTM sources
  const utmSources = [
    { source: "google", medium: "cpc", campaign: "spring_launch", visitors: 1245, conversions: 89, revenue: "£12,450" },
    {
      source: "facebook",
      medium: "social",
      campaign: "spring_launch",
      visitors: 876,
      conversions: 52,
      revenue: "£7,800",
    },
    {
      source: "linkedin",
      medium: "social",
      campaign: "industry_professionals",
      visitors: 567,
      conversions: 41,
      revenue: "£8,200",
    },
    {
      source: "twitter",
      medium: "social",
      campaign: "spring_launch",
      visitors: 432,
      conversions: 18,
      revenue: "£2,700",
    },
    {
      source: "email",
      medium: "email",
      campaign: "newsletter_april",
      visitors: 1023,
      conversions: 95,
      revenue: "£14,250",
    },
    { source: "direct", medium: "none", campaign: "none", visitors: 1876, conversions: 103, revenue: "£15,450" },
    {
      source: "referral",
      medium: "partner",
      campaign: "biotech_association",
      visitors: 543,
      conversions: 47,
      revenue: "£9,400",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">UTM Tracking</h1>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          <div className="space-y-2 w-full md:w-auto">
            <p className="text-sm font-medium">Date Range</p>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full md:w-auto justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Start Date
              </Button>
              <Button variant="outline" className="w-full md:w-auto justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                End Date
              </Button>
            </div>
          </div>

          <div className="flex items-end">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sources">Sources</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="mediums">Mediums</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Visitors" value="6,562" change="+18%" />
          <StatCard title="Conversions" value="445" change="+12%" />
          <StatCard title="Conversion Rate" value="6.78%" change="+2.5%" />
          <StatCard title="Total Revenue" value="£70,250" change="+22%" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Traffic by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full flex items-center justify-center text-muted-foreground">
              Traffic sources chart will be displayed here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UTM Source Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Medium</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="text-right">Visitors</TableHead>
                  <TableHead className="text-right">Conversions</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utmSources.map((utm, index) => (
                  <TableRow key={index}>
                    <TableCell>{utm.source}</TableCell>
                    <TableCell>{utm.medium}</TableCell>
                    <TableCell>{utm.campaign}</TableCell>
                    <TableCell className="text-right">{utm.visitors.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{utm.conversions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{utm.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, change }) {
  const isPositive = change.startsWith("+")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold">{value}</p>
            <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
