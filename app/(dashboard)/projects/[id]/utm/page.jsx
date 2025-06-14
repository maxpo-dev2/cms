import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Plus, LineChart, Settings } from "lucide-react"
import { getUtmData, getProject } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function UtmPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const utmData = await getUtmData(params.id)

  // Calculate totals
  const totalVisits = utmData.reduce((sum, item) => sum + (item.visits || 0), 0)
  const totalConversions = utmData.reduce((sum, item) => sum + (item.conversions || 0), 0)
  const conversionRate = totalVisits > 0 ? ((totalConversions / totalVisits) * 100).toFixed(2) : 0

  // Group data by source for the chart
  const sourceData = utmData.reduce((acc, item) => {
    const source = item.source || "Unknown"
    if (!acc[source]) {
      acc[source] = { visits: 0, conversions: 0 }
    }
    acc[source].visits += item.visits || 0
    acc[source].conversions += item.conversions || 0
    return acc
  }, {})

  const chartData = Object.entries(sourceData).map(([source, data]) => ({
    source,
    visits: data.visits,
    conversions: data.conversions,
    rate: data.visits > 0 ? (data.conversions / data.visits) * 100 : 0,
  }))

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">UTM Tracking</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/projects/${params.id}/utm/tracking`}>
              <Settings className="h-4 w-4 mr-2" />
              Tracking Setup
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/api/projects/${params.id}/utm/export`}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/projects/${params.id}/utm/builder`}>
              <Plus className="h-4 w-4 mr-2" />
              Create UTM
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVisits.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalConversions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{conversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>UTM Performance by Source</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            {chartData.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <LineChart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No data available yet</p>
                <p className="text-sm">Create UTM links and track visits to see performance data</p>
              </div>
            ) : (
              <div className="w-full h-full">
                {/* Chart would go here - using a placeholder for now */}
                <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>Chart visualization</p>
                    <p className="text-sm">Showing data for {chartData.length} sources</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {utmData.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No campaign data yet</p>
            ) : (
              <div className="space-y-4">
                {utmData
                  .sort((a, b) => (b.conversions || 0) - (a.conversions || 0))
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name || item.campaign || "Unnamed Campaign"}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.source || "Unknown"} / {item.medium || "Unknown"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.conversions || 0}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.visits ? ((item.conversions / item.visits) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UTM Source Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead className="text-right">Visits</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utmData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    <p className="text-muted-foreground">No UTM data available</p>
                    <Button asChild variant="link" className="mt-2">
                      <Link href={`/projects/${params.id}/utm/builder`}>Create your first UTM link</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                utmData.map((item) => {
                  const rate = item.visits > 0 ? ((item.conversions / item.visits) * 100).toFixed(2) : 0
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name || "Unnamed UTM"}</TableCell>
                      <TableCell>{item.source || "Direct"}</TableCell>
                      <TableCell>{item.medium || "None"}</TableCell>
                      <TableCell>{item.campaign || "None"}</TableCell>
                      <TableCell className="text-right">{(item.visits || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right">{(item.conversions || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right">{rate}%</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
