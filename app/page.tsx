import { ProjectsList } from "@/components/ProjectsList"
import { Button } from "@/components/ui/button"
import { Plus, Bookmark } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Bookmarked Projects</h2>
        <div className="text-muted-foreground">
          No favorites yet. Click on <Bookmark className="inline-block h-4 w-4" /> icon on below cards to add to your favorites
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Projects</h2>
        <ProjectsList />
      </div>
    </div>
  )
}
