import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtmBuilderForm } from "../components/utm-builder-form"
import { UtmTemplates } from "../components/utm-templates"
import { UtmHistoryTable } from "../components/utm-history-table"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function UtmBuilderPage({ params }) {
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
          <h1 className="text-2xl font-bold">UTM Builder</h1>
        </div>
      </div>

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList>
          <TabsTrigger value="builder">UTM Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <UtmBuilderForm projectId={params.id} />

          <Card>
            <CardHeader>
              <CardTitle>UTM Parameters Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">utm_source</h3>
                <p className="text-sm text-muted-foreground">
                  Identifies which site sent the traffic (e.g., google, newsletter, facebook)
                </p>
              </div>
              <div>
                <h3 className="font-medium">utm_medium</h3>
                <p className="text-sm text-muted-foreground">
                  Identifies what type of link was used (e.g., cpc, email, social)
                </p>
              </div>
              <div>
                <h3 className="font-medium">utm_campaign</h3>
                <p className="text-sm text-muted-foreground">
                  Identifies a specific product promotion or strategic campaign
                </p>
              </div>
              <div>
                <h3 className="font-medium">utm_term</h3>
                <p className="text-sm text-muted-foreground">
                  Identifies search terms (primarily used for paid search)
                </p>
              </div>
              <div>
                <h3 className="font-medium">utm_content</h3>
                <p className="text-sm text-muted-foreground">
                  Identifies what specifically was clicked to bring the user to the site (e.g., banner, text link)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <UtmTemplates projectId={params.id} />
        </TabsContent>

        <TabsContent value="history">
          <UtmHistoryTable projectId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
