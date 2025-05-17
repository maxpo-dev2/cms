"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UtmBuilderForm } from "./utm-builder-form"
import { toast } from "@/hooks/use-toast"

export function UtmTemplates({ projectId }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const templates = [
    {
      id: "google-ads",
      name: "Google Ads",
      description: "Template for Google Ads campaigns",
      source: "google",
      medium: "cpc",
      campaign: "",
      term: "",
      content: "",
    },
    {
      id: "facebook-ads",
      name: "Facebook Ads",
      description: "Template for Facebook advertising",
      source: "facebook",
      medium: "paid-social",
      campaign: "",
      term: "",
      content: "",
    },
    {
      id: "email",
      name: "Email Campaign",
      description: "Template for email marketing campaigns",
      source: "newsletter",
      medium: "email",
      campaign: "",
      term: "",
      content: "",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Template for LinkedIn marketing",
      source: "linkedin",
      medium: "social",
      campaign: "",
      term: "",
      content: "",
    },
    {
      id: "twitter",
      name: "Twitter",
      description: "Template for Twitter marketing",
      source: "twitter",
      medium: "social",
      campaign: "",
      term: "",
      content: "",
    },
    {
      id: "instagram",
      name: "Instagram",
      description: "Template for Instagram marketing",
      source: "instagram",
      medium: "social",
      campaign: "",
      term: "",
      content: "",
    },
  ]

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
    toast({
      title: "Template selected",
      description: `${template.name} template loaded. Customize and save your UTM.`,
    })
  }

  return (
    <div className="space-y-6">
      {selectedTemplate ? (
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
            Back to Templates
          </Button>
          <UtmBuilderForm projectId={projectId} template={selectedTemplate} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-1">
                  <div className="flex">
                    <span className="font-medium w-20">Source:</span>
                    <span>{template.source}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-20">Medium:</span>
                    <span>{template.medium}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full" onClick={() => handleSelectTemplate(template)}>
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
