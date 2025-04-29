import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark } from "lucide-react"
import Image from "next/image"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Arab BioTech Summit",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
    {
      id: 2,
      name: "Bio Technology Show",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
    {
      id: 3,
      name: "Dubai EV Show",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
    {
      id: 4,
      name: "Gemtech Forum",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
    {
      id: 5,
      name: "Climate Technology Show",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
    {
      id: 6,
      name: "London EV Show",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
    {
      id: 7,
      name: "RAKIS",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
    {
      id: 8,
      name: "World Hydrogen Forum",
      image: "/placeholder.svg?height=200&width=400",
      year: "2025",
    },
  ]

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
            <ProjectCard key={project.id} name={project.name} image={project.image} year={project.year} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ name, image, year }: { name: string; image: string; year: string }) {
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
        <Button variant="outline" size="sm">
          {year}
        </Button>
      </CardFooter>
    </Card>
  )
}
