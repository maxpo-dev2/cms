"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function UtmTrackingCode({ projectId }) {
  const [copied, setCopied] = useState({
    js: false,
    html: false,
  })

  const handleCopy = (type, code) => {
    navigator.clipboard.writeText(code)
    setCopied({ ...copied, [type]: true })
    toast({
      title: "Copied!",
      description: `${type.toUpperCase()} code copied to clipboard`,
    })
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000)
  }

  const jsCode = `
// UTM Tracking Script
document.addEventListener('DOMContentLoaded', function() {
  // Get UTM parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  // If UTM parameters exist, track the visit
  if (utmSource && utmMedium && utmCampaign) {
    // Find the UTM ID from your database based on parameters
    fetch('/api/projects/${projectId}/utm/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        term: urlParams.get('utm_term'),
        content: urlParams.get('utm_content')
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        // Track the visit
        fetch('/api/projects/${projectId}/utm/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            utmId: data.id,
            type: 'visit'
          }),
        });
        
        // Store UTM data in localStorage for conversion tracking
        localStorage.setItem('utm_data', JSON.stringify({
          id: data.id,
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign
        }));
      }
    })
    .catch(error => console.error('Error tracking UTM:', error));
  }
});

// Add this function to track conversions
function trackUtmConversion() {
  const utmData = localStorage.getItem('utm_data');
  if (utmData) {
    const { id } = JSON.parse(utmData);
    fetch('/api/projects/${projectId}/utm/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        utmId: id,
        type: 'conversion'
      }),
    })
    .catch(error => console.error('Error tracking conversion:', error));
  }
}
`.trim()

  const htmlCode = `
<!-- UTM Tracking Script -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    // If UTM parameters exist, track the visit
    if (utmSource && utmMedium && utmCampaign) {
      // Find the UTM ID from your database based on parameters
      fetch('/api/projects/${projectId}/utm/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          term: urlParams.get('utm_term'),
          content: urlParams.get('utm_content')
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          // Track the visit
          fetch('/api/projects/${projectId}/utm/track', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              utmId: data.id,
              type: 'visit'
            }),
          });
          
          // Store UTM data in localStorage for conversion tracking
          localStorage.setItem('utm_data', JSON.stringify({
            id: data.id,
            source: utmSource,
            medium: utmMedium,
            campaign: utmCampaign
          }));
        }
      })
      .catch(error => console.error('Error tracking UTM:', error));
    }
  });

  // Add this function to track conversions
  function trackUtmConversion() {
    const utmData = localStorage.getItem('utm_data');
    if (utmData) {
      const { id } = JSON.parse(utmData);
      fetch('/api/projects/${projectId}/utm/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          utmId: id,
          type: 'conversion'
        }),
      })
      .catch(error => console.error('Error tracking conversion:', error));
    }
  }
</script>

<!-- Example conversion tracking on a button -->
<button onclick="trackUtmConversion()">Complete Purchase</button>
`.trim()

  return (
    <Card>
      <CardHeader>
        <CardTitle>UTM Tracking Implementation</CardTitle>
        <CardDescription>Add this code to your website to track UTM parameters and conversions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="js" className="space-y-4">
          <TabsList>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>

          <TabsContent value="js" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                <code>{jsCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => handleCopy("js", jsCode)}
              >
                {copied.js ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div className="text-sm space-y-2">
              <h3 className="font-medium">Implementation Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Add this script to your website's header or before the closing body tag.</li>
                <li>
                  Call <code className="bg-muted px-1 rounded">trackUtmConversion()</code> when a conversion happens
                  (e.g., form submission, purchase).
                </li>
                <li>The script automatically tracks visits and stores UTM data for conversion tracking.</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                <code>{htmlCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => handleCopy("html", htmlCode)}
              >
                {copied.html ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div className="text-sm space-y-2">
              <h3 className="font-medium">Implementation Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Add this HTML script to your website's header or before the closing body tag.</li>
                <li>
                  Add the <code className="bg-muted px-1 rounded">onclick="trackUtmConversion()"</code> attribute to
                  buttons or links that represent conversions.
                </li>
                <li>The script automatically tracks visits and stores UTM data for conversion tracking.</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
