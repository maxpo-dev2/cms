import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function SettingsPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Update your project details and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" defaultValue={project.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-year">Year</Label>
                  <Input id="project-year" defaultValue={project.year} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-venue">Venue</Label>
                  <Input id="project-venue" defaultValue={project.venue || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-website">Website</Label>
                  <Input id="project-website" defaultValue={project.website || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-currency">Currency</Label>
                  <Input id="project-currency" defaultValue={project.currency || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-slug">Slug</Label>
                  <Input id="project-slug" defaultValue={project.id} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" rows={5} defaultValue={project.description || ""} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-start-date">Start Date</Label>
                  <Input
                    id="project-start-date"
                    type="datetime-local"
                    defaultValue={project.startDate ? new Date(project.startDate).toISOString().slice(0, 16) : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-end-date">End Date</Label>
                  <Input
                    id="project-end-date"
                    type="datetime-local"
                    defaultValue={project.endDate ? new Date(project.endDate).toISOString().slice(0, 16) : ""}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h3 className="font-medium">Delete this project</h3>
                  <p className="text-sm text-muted-foreground">
                    Once deleted, this project and all its data will be permanently removed.
                  </p>
                </div>
                <Button variant="destructive">Delete Project</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
