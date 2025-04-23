import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getMarketingCampaigns, getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function MarketingPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const campaigns = await getMarketingCampaigns(params.id)

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Marketing</h1>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Tabs defaultValue="both">
                <TabsList>
                  <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="both">Both</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Total</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Revenue (£)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.total}</TableCell>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.type}</TableCell>
                    <TableCell>£{campaign.revenue.toFixed(2)}</TableCell>
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
