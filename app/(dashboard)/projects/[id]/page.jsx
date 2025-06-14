import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ExternalLink } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function ProjectDashboard({ params }) {
  const resolvedParams = await params
  const project = await getProject(resolvedParams.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-2/3 space-y-8">
          <div className="flex justify-center">
            <Image
              src={project.image || "/placeholder.jpg?height=100&width=400"}
              alt={`${project.name} Logo`}
              width={400}
              height={100}
              className="h-24 w-auto object-contain"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {project.venue && <p className="text-muted-foreground">{project.venue}</p>}
            {(project.startDate || project.endDate) && (
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                {project.startDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                )}
                {project.endDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-1 text-sm">
              <span className="font-medium">{project.year}</span>
              {project.currency && (
                <>
                  <span className="px-2">•</span>
                  <span>{project.currency}</span>
                </>
              )}
            </div>
            {project.website && (
              <div className="pt-2">
                <Button variant="link" className="p-0 h-auto text-blue-500" asChild>
                  <Link href={project.website} target="_blank" className="flex items-center gap-1">
                    <span>{project.website}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {project.description && (
            <div className="prose max-w-none">
              <p>{project.description}</p>
            </div>
          )}

          {project.stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard title="Speakers" value={project.stats.speakers?.toString() || "0"} />
              <StatCard title="Partners" value={project.stats.partners?.toString() || "0"} />
              <StatCard title="Media Partners" value={project.stats.mediaPartners?.toString() || "0"} />
              <StatCard title="Sponsors" value={project.stats.sponsors?.toString() || "0"} />
              <StatCard title="Exhibitors" value={project.stats.exhibitors?.toString() || "0"} />
              <StatCard title="Delegates" value={project.stats.delegates?.toString() || "0"} />
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <QuickLink
                href={`/projects/${resolvedParams.id}/attendees`}
                title="Attendees"
                description="Manage event attendees"
              />
              <QuickLink
                href={`/projects/${resolvedParams.id}/marketing`}
                title="Marketing"
                description="View marketing campaigns"
              />
              <QuickLink
                href={`/projects/${resolvedParams.id}/agenda`}
                title="Agenda"
                description="Manage conference schedule"
              />
              <QuickLink
                href={`/projects/${resolvedParams.id}/ticketing`}
                title="Ticketing"
                description="Manage ticket sales"
              />
              <QuickLink
                href={`/projects/${resolvedParams.id}/delegates`}
                title="Delegates"
                description="Manage delegates"
              />
              <QuickLink href={`/projects/${resolvedParams.id}/leads`} title="Leads" description="Manage sales leads" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}

function QuickLink({ href, title, description }) {
  return (
    <Link href={href} className="block">
      <div className="p-4 rounded-lg border hover:bg-muted transition-colors">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
