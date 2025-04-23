import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProjects } from "@/lib/db"

type Project = {
  id: string
  name: string
  image: string
  year: string
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Bookmarked Projects</h1>
        <div className="text-muted-foreground">
          No favorites yet. Click on <Bookmark className="inline-block h-4 w-4" /> icon on below cards to add to your
          favorites
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Other Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              image={project.image}
              year={project.year}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ id, name, image, year }:Project) {
  return (
    <Link href={`/projects/${id}`}>
    <Card className="overflow-hidden">
      
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg?height=200&width=400"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold">{name}</h3>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" asChild>
          {year}
        </Button>
       
      </CardFooter>
      
    </Card>
    </Link>
  )
}
