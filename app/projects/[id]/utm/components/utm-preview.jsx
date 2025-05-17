"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export function UtmPreview() {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Function to update the preview URL based on form values
    const updatePreviewUrl = () => {
      const form = document.querySelector("form")
      if (!form) return

      const websiteUrl = form.querySelector("#website-url")?.value || ""
      const source = form.querySelector("#utm-source")?.value || ""
      const medium = form.querySelector("#utm-medium")?.value || ""
      const campaign = form.querySelector("#utm-campaign")?.value || ""
      const term = form.querySelector("#utm-term")?.value || ""
      const content = form.querySelector("#utm-content")?.value || ""

      if (!websiteUrl) {
        setUrl("")
        return
      }

      try {
        const urlObj = new URL(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`)

        if (source) urlObj.searchParams.append("utm_source", source)
        if (medium) urlObj.searchParams.append("utm_medium", medium)
        if (campaign) urlObj.searchParams.append("utm_campaign", campaign)
        if (term) urlObj.searchParams.append("utm_term", term)
        if (content) urlObj.searchParams.append("utm_content", content)

        setUrl(urlObj.toString())
      } catch (error) {
        setUrl("")
      }
    }

    // Set up event listeners for all form inputs
    const form = document.querySelector("form")
    if (!form) return

    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
      input.addEventListener("input", updatePreviewUrl)
    })

    // Initial update
    updatePreviewUrl()

    // Set up copy button
    const copyButton = document.getElementById("copy-button")
    if (copyButton) {
      copyButton.addEventListener("click", () => {
        if (!url) return
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }

    // Cleanup
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", updatePreviewUrl)
      })
      if (copyButton) {
        copyButton.removeEventListener("click", () => {})
      }
    }
  }, [])

  if (!url) return null

  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium mb-1">Generated UTM URL:</p>
            <div className="bg-muted p-2 rounded-md overflow-x-auto">
              <code className="text-xs">{url}</code>
            </div>
          </div>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(url)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
