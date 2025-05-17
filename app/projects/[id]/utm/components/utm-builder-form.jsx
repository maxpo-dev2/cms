"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function UtmBuilderForm({ projectId, template = null }) {
  const [formData, setFormData] = useState({
    websiteUrl: template?.websiteUrl || "",
    source: template?.source || "",
    medium: template?.medium || "",
    campaign: template?.campaign || "",
    term: template?.term || "",
    content: template?.content || "",
    name: template?.name || "",
  })
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create the request body
    const requestBody = {
      ...formData,
      projectId,
    }

    // Send the data to the API
    fetch(`/api/projects/${projectId}/utm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save UTM data")
        }
        return response.json()
      })
      .then(() => {
        toast({
          title: "UTM saved",
          description: "Your UTM parameters have been saved successfully.",
        })
        // Optionally reset the form or redirect
      })
      .catch((error) => {
        console.error("Error saving UTM:", error)
        toast({
          title: "Error",
          description: "Failed to save UTM parameters. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const generateUtmUrl = () => {
    if (!formData.websiteUrl) return ""

    try {
      const url = new URL(
        formData.websiteUrl.startsWith("http") ? formData.websiteUrl : `https://${formData.websiteUrl}`,
      )

      if (formData.source) url.searchParams.append("utm_source", formData.source)
      if (formData.medium) url.searchParams.append("utm_medium", formData.medium)
      if (formData.campaign) url.searchParams.append("utm_campaign", formData.campaign)
      if (formData.term) url.searchParams.append("utm_term", formData.term)
      if (formData.content) url.searchParams.append("utm_content", formData.content)

      return url.toString()
    } catch (error) {
      return ""
    }
  }

  const copyToClipboard = () => {
    const utmUrl = generateUtmUrl()
    if (!utmUrl) return

    navigator.clipboard.writeText(utmUrl)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "UTM URL copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const utmUrl = generateUtmUrl()
  const isUrlValid = formData.websiteUrl && formData.source && formData.medium && formData.campaign

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create UTM Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">UTM Name (for your reference)</Label>
              <Input
                id="name"
                name="name"
                placeholder="Summer Campaign 2023"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                placeholder="https://example.com"
                value={formData.websiteUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source (required)</Label>
                <Input
                  id="source"
                  name="source"
                  placeholder="google, facebook, newsletter"
                  value={formData.source}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medium">Medium (required)</Label>
                <Input
                  id="medium"
                  name="medium"
                  placeholder="cpc, email, social"
                  value={formData.medium}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign Name (required)</Label>
              <Input
                id="campaign"
                name="campaign"
                placeholder="summer-sale, product-launch"
                value={formData.campaign}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="term">Term (optional)</Label>
                <Input
                  id="term"
                  name="term"
                  placeholder="running-shoes, marketing"
                  value={formData.term}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (optional)</Label>
                <Input
                  id="content"
                  name="content"
                  placeholder="banner, text-link"
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {utmUrl && (
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium mb-1">Generated UTM URL:</p>
                  <div className="bg-muted p-2 rounded-md overflow-x-auto">
                    <code className="text-xs">{utmUrl}</code>
                  </div>
                </div>
                <Button type="button" size="icon" variant="outline" onClick={copyToClipboard} disabled={!isUrlValid}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={copyToClipboard} disabled={!isUrlValid}>
              <Copy className="mr-2 h-4 w-4" />
              Copy URL
            </Button>
            <Button type="submit" disabled={!isUrlValid || isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save UTM"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
