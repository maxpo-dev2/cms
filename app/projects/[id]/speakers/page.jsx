import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Plus, Search, Trash } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function SpeakersPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for speakers
  const speakers = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
      company: "BioGen Research",
      position: "Chief Scientific Officer",
      bio: "Leading researcher in genomics with over 20 years of experience in biotechnology.",
      featured: true,
      sessions: ["Opening Keynote", "Genomics Panel"],
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      company: "Cambridge University",
      position: "Professor of Biotechnology",
      bio: "Award-winning academic specializing in synthetic biology and bioethics.",
      featured: true,
      sessions: ["Future of Synthetic Biology"],
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
      company: "Pharma Innovations",
      position: "Head of R&D",
      bio: "Pioneer in pharmaceutical research with focus on RNA therapeutics.",
      featured: false,
      sessions: ["Drug Development Workshop", "RNA Therapeutics Panel"],
    },
    {
      id: "4",
      name: "James Wilson",
      image: "/placeholder.svg?height=40&width=40",
      company: "BioTech Ventures",
      position: "Managing Partner",
      bio: "Venture capitalist with expertise in funding early-stage biotech startups.",
      featured: false,
      sessions: ["Investment Strategies in Biotech"],
    },
    {
      id: "5",
      name: "Dr. Aisha Patel",
      image: "/placeholder.svg?height=40&width=40",
      company: "Global Health Initiative",
      position: "Director of Research",
      bio: "Specializes in infectious disease research and global health policy.",
      featured: true,
      sessions: ["Global Health Challenges", "Pandemic Preparedness"],
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Speakers</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name or company" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Speaker
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {speakers.map((speaker) => (
                <TableRow key={speaker.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{speaker.name}</TableCell>
                  <TableCell>{speaker.company}</TableCell>
                  <TableCell>{speaker.position}</TableCell>
                  <TableCell>
                    {speaker.featured ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Featured
                      </Badge>
                    ) : (
                      "No"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {speaker.sessions.map((session, index) => (
                        <Badge key={index} variant="outline">
                          {session}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
