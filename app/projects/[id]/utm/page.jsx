import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"
import { getUtmData, getProject } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function UtmPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const utmData = await getUtmData(params.id)

  // Calculate totals
  const totalVisits = utmData.reduce((sum, item) => sum + item.visits, 0)
  const totalConversions = utmData.reduce((sum, item) => sum + item.conversions, 0)
  const conversionRate = totalVisits > 0 ? ((totalConversions / totalVisits) * 100).toFixed(2) : 0

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">UTM Tracking</h1>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVisits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalConversions}</div>
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

      <Card>
        <CardHeader>
          <CardTitle>UTM Source Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utmData.map((item) => {
                const rate = item.visits > 0 ? ((item.conversions / item.visits) * 100).toFixed(2) : 0
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.source || "Direct"}</TableCell>
                    <TableCell>{item.medium || "None"}</TableCell>
                    <TableCell>{item.campaign || "None"}</TableCell>
                    <TableCell>{item.visits}</TableCell>
                    <TableCell>{item.conversions}</TableCell>
                    <TableCell>{rate}%</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
