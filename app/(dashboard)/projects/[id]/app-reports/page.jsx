import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Download } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function AppReportsPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">App Reports</h1>
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
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Downloads" value="1,245" change="+12%" />
          <StatCard title="Active Users" value="876" change="+8%" />
          <StatCard title="Session Duration" value="4m 32s" change="+5%" />
          <StatCard title="Screen Views" value="15,678" change="+15%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full flex items-center justify-center text-muted-foreground">
                User activity chart will be displayed here
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Most Viewed Screens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full flex items-center justify-center text-muted-foreground">
                Screen views chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full flex items-center justify-center text-muted-foreground">
              Demographics chart will be displayed here
            </div>
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
