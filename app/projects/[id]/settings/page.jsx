"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { updateProjectSettings, updateBrandingSettings, updateIntegrationSettings } from "./actions"

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

          <TabsContent value="general">
            <ProjectSettingsForm project={project} />
          </TabsContent>

          <TabsContent value="branding">
            <BrandingSettingsForm project={project} />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsSettingsForm project={project} />
          </TabsContent>

          <TabsContent value="team">
            <TeamSettingsForm project={project} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ProjectSettingsForm({ project }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target)
      const result = await updateProjectSettings(project.id, formData)

      if (result.success) {
        toast({
          title: "Settings updated",
          description: "Project settings have been updated successfully.",
        })
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        throw new Error(result.error || "Failed to update settings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
        <CardDescription>Update your project details and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" name="project-name" defaultValue={project.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-year">Year</Label>
              <Input id="project-year" name="project-year" defaultValue={project.year} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-venue">Venue</Label>
              <Input id="project-venue" name="project-venue" defaultValue={project.venue || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-website">Website</Label>
              <Input id="project-website" name="project-website" defaultValue={project.website || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-currency">Currency</Label>
              <Input id="project-currency" name="project-currency" defaultValue={project.currency || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-slug">Slug</Label>
              <Input id="project-slug" defaultValue={project.id} disabled />
              <p className="text-xs text-muted-foreground">Project ID cannot be changed</p>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              name="project-description"
              rows={5}
              defaultValue={project.description || ""}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="project-start-date">Start Date</Label>
              <Input
                id="project-start-date"
                name="project-start-date"
                type="datetime-local"
                defaultValue={project.startDate ? new Date(project.startDate).toISOString().slice(0, 16) : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-end-date">End Date</Label>
              <Input
                id="project-end-date"
                name="project-end-date"
                type="datetime-local"
                defaultValue={project.endDate ? new Date(project.endDate).toISOString().slice(0, 16) : ""}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function BrandingSettingsForm({ project }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target)
      const result = await updateBrandingSettings(project.id, formData)

      if (result.success) {
        toast({
          title: "Branding updated",
          description: "Project branding has been updated successfully.",
        })
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        throw new Error(result.error || "Failed to update branding")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>Customize your project's branding and appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project-logo">Logo URL</Label>
              <Input id="project-logo" name="project-logo" defaultValue={project.image || ""} />
              <p className="text-xs text-muted-foreground">Enter the URL of your project logo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input id="primary-color" name="primary-color" defaultValue={project.primaryColor || "#000000"} />
                  <Input
                    type="color"
                    className="w-12 p-1 h-10"
                    defaultValue={project.primaryColor || "#000000"}
                    onChange={(e) => {
                      document.getElementById("primary-color").value = e.target.value
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary-color"
                    name="secondary-color"
                    defaultValue={project.secondaryColor || "#ffffff"}
                  />
                  <Input
                    type="color"
                    className="w-12 p-1 h-10"
                    defaultValue={project.secondaryColor || "#ffffff"}
                    onChange={(e) => {
                      document.getElementById("secondary-color").value = e.target.value
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Branding"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function IntegrationsSettingsForm({ project }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target)
      const result = await updateIntegrationSettings(project.id, formData)

      if (result.success) {
        toast({
          title: "Integrations updated",
          description: "Project integrations have been updated successfully.",
        })
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        throw new Error(result.error || "Failed to update integrations")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect your project with external services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="google-analytics">Google Analytics ID</Label>
              <Input id="google-analytics" name="google-analytics" defaultValue={project.googleAnalyticsId || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mailchimp-api">Mailchimp API Key</Label>
              <Input
                id="mailchimp-api"
                name="mailchimp-api"
                type="password"
                defaultValue={project.mailchimpApiKey || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripe-api">Stripe API Key</Label>
              <Input id="stripe-api" name="stripe-api" type="password" defaultValue={project.stripeApiKey || ""} />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Integrations"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function TeamSettingsForm({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
        <CardDescription>Manage team members and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Team management functionality will be implemented in a future update.
          </p>

          <div className="p-4 border rounded-md bg-muted">
            <h3 className="font-medium">Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Team management features including inviting team members, setting permissions, and role-based access
              control.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
