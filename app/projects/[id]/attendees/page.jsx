import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { getAttendees, getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function AttendeesPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const attendees = await getAttendees(params.id)
  const totalAttendees = attendees.length
  const totalCheckins = attendees.filter((a) => a.checkedIn).length

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Attendees</h1>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="space-y-2 w-full sm:w-auto">
              <p className="text-sm font-medium">Choose Date</p>
              <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Choose Date
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AttendeeStatCard title="Total Attendees" value={totalAttendees.toString()} />
            <AttendeeStatCard title="Total Checkins" value={totalCheckins.toString()} />
            <AttendeeStatCard title="App's Active Users" value="0" />
            <AttendeeStatCard title="App Logins" value="2" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">
              Checked In Attendees By Date{" "}
              <span className="text-sm font-normal text-muted-foreground">(Timezone: Europe/London)</span>
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="h-64 w-full flex items-center justify-center text-muted-foreground">
                  No check-in data available
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function AttendeeStatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
