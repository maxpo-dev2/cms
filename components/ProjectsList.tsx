// app/projects/page.tsx or components/ProjectsList.tsx

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark, Plus, Loader2 } from "lucide-react"
// import Image from "next/image"
import Link from "next/link"

function ProjectsLoading() {
  return (
    <div className="text-center py-12">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <h3 className="text-lg font-medium">Loading projects...</h3>
    </div>
  )
}

function ProjectCard({ id, name, year }: { id: string; name: string; year: string }) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/projects/${id}`}>
        {/* <div className="relative h-48">
          {/* <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" /> 
        </div> */}
        <CardContent className="p-4">
          <h3 className="font-semibold">{name}</h3>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <p>{year}</p>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

export function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" })
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <ProjectsLoading />

  if (projects.length === 0) {
    return (
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
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
        //   image={project.image || "/placeholder.svg?height=200&width=400"}
          year={project.year}
        />
      ))}
    </div>
  )
}
