import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProjects } from "@/lib/db"

export default async function ProjectsPage() {
  let projects = []

  try {
    projects = await getProjects()
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    projects = []
  }

  // Ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : []

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
          No favorites yet. Click on <Bookmark className="inline-block h-4 w-4" /> icon on below cards to add to your
          favorites
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Projects</h2>
        {safeProjects.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground mt-2">Get started by creating a new project.</p>
            <Button className="mt-4" asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                image={project.image || "/placeholder.svg?height=200&width=400"}
                year={project.year}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ id, name, image, year }: { id: string; name: string; image: string; year: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold">{name}</h3>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/projects/${id}`}>{year}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
