import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users } from "lucide-react"
import Link from "next/link"

export default function SpeakersPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Speakers</h1>
        </div>
        <Button asChild>
          <Link href="/speakers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Speaker
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Speakers Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No speakers found</h3>
            <p className="text-muted-foreground mt-2">Manage speakers across all your events from here.</p>
            <Button className="mt-4" asChild>
              <Link href="/speakers/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Speaker
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
