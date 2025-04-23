import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Pencil, Plus, Search, Trash } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function MediaPartnersPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for media partners
  const mediaPartners = [
    {
      id: "1",
      name: "Tech Today",
      image: "/placeholder.svg?height=40&width=40",
      website: "https://techtoday.com",
      type: "Online",
      priority: 10,
    },
    {
      id: "2",
      name: "BioTech News",
      image: "/placeholder.svg?height=40&width=40",
      website: "https://biotechnews.com",
      type: "Print",
      priority: 8,
    },
    {
      id: "3",
      name: "Science Daily",
      image: "/placeholder.svg?height=40&width=40",
      website: "https://sciencedaily.com",
      type: "Online",
      priority: 9,
    },
    {
      id: "4",
      name: "Innovation Magazine",
      image: "/placeholder.svg?height=40&width=40",
      website: "https://innovationmag.com",
      type: "Print",
      priority: 7,
    },
    {
      id: "5",
      name: "Research Weekly",
      image: "/placeholder.svg?height=40&width=40",
      website: "https://researchweekly.com",
      type: "Online",
      priority: 6,
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Media Partners</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Media Partner
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
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mediaPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={partner.image || "/placeholder.svg"}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {partner.website}
                    </a>
                  </TableCell>
                  <TableCell>{partner.type}</TableCell>
                  <TableCell>{partner.priority}</TableCell>
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
