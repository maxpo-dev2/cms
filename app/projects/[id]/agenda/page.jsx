import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Pencil, Plus, Trash } from "lucide-react"
import { getProject, getSessions } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function AgendaPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const sessions = await getSessions(params.id)

  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Conference Agenda</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Session
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="secondary" className="rounded-md">
          Day 01 (18-06-2025)
        </Button>
        <Button variant="outline" className="rounded-md">
          Day 02 (19-06-2025)
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="secondary" className="rounded-md">
          Auditorium 1
        </Button>
        <Button variant="outline" className="rounded-md">
          Auditorium 2
        </Button>
        <Button variant="outline" className="rounded-md">
          Auditorium 3
        </Button>
        <Button variant="outline" className="rounded-md">
          Side Events
        </Button>
      </div>

      <div className="space-y-6">
        {sessions.map((session) => (
          <AgendaItem
            key={session.id}
            time={`${session.startTime} - ${session.endTime}`}
            title={session.title}
            description={session.description}
          />
        ))}
      </div>
    </div>
  )
}

function AgendaItem({ time, title, description }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-muted-foreground">{time}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="text-muted-foreground">{description}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4" />
              Session Details
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-red-500 hover:text-red-600">
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
