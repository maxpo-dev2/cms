import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtmTrackingCode } from "../components/utm-tracking-code"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function UtmTrackingPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/projects/${params.id}/utm`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">UTM Tracking Implementation</h1>
        </div>
      </div>

      <Tabs defaultValue="code" className="space-y-6">
        <TabsList>
          <TabsTrigger value="code">Implementation Code</TabsTrigger>
          <TabsTrigger value="guide">Implementation Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="space-y-6">
          <UtmTrackingCode projectId={params.id} />
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>UTM Tracking Guide</CardTitle>
              <CardDescription>Follow these steps to implement UTM tracking on your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 1: Add the Tracking Script</h3>
                <p className="text-muted-foreground">
                  Add the tracking script to your website. You can find the script in the "Implementation Code" tab.
                  Place it in the <code className="bg-muted px-1 rounded">&lt;head&gt;</code> section of your website or
                  before the closing <code className="bg-muted px-1 rounded">&lt;/body&gt;</code> tag.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 2: Track Conversions</h3>
                <p className="text-muted-foreground">
                  To track conversions, call the <code className="bg-muted px-1 rounded">trackUtmConversion()</code>{" "}
                  function when a conversion happens. For example, when a user submits a form, makes a purchase, or
                  completes any other desired action.
                </p>
                <div className="bg-muted p-4 rounded-md">
                  <code>
                    {`// Example: Track conversion on form submission
document.getElementById('contact-form').addEventListener('submit', function() {
  trackUtmConversion();
});

// Example: Track conversion on button click
document.getElementById('purchase-button').addEventListener('click', function() {
  trackUtmConversion();
});`}
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 3: Test Your Implementation</h3>
                <p className="text-muted-foreground">
                  Test your implementation by visiting your website with UTM parameters and completing a conversion
                  action. Check the UTM dashboard to verify that visits and conversions are being tracked correctly.
                </p>
                <div className="bg-muted p-4 rounded-md">
                  <code>
                    {`// Example test URL with UTM parameters
https://yourwebsite.com?utm_source=test&utm_medium=test&utm_campaign=test`}
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 4: Monitor Your UTM Dashboard</h3>
                <p className="text-muted-foreground">
                  Monitor your UTM dashboard to track the performance of your marketing campaigns. Use the data to
                  optimize your campaigns and improve your marketing ROI.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
