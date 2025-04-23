import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Plus, Search, Trash } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function ExhibitorsPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for exhibitors
  const exhibitors = [
    {
      id: "1",
      name: "BioGen Labs",
      image: "/placeholder.svg?height=40&width=40",
      boothNumber: "A12",
      category: "Biotechnology",
      status: "Confirmed",
      size: "10x10",
    },
    {
      id: "2",
      name: "MediTech Solutions",
      image: "/placeholder.svg?height=40&width=40",
      boothNumber: "B05",
      category: "Medical Devices",
      status: "Confirmed",
      size: "20x10",
    },
    {
      id: "3",
      name: "GenomeWorks",
      image: "/placeholder.svg?height=40&width=40",
      boothNumber: "C22",
      category: "Genomics",
      status: "Pending",
      size: "10x10",
    },
    {
      id: "4",
      name: "NanoHealth",
      image: "/placeholder.svg?height=40&width=40",
      boothNumber: "D08",
      category: "Nanotechnology",
      status: "Confirmed",
      size: "15x15",
    },
    {
      id: "5",
      name: "BioInformatics Plus",
      image: "/placeholder.svg?height=40&width=40",
      boothNumber: "A24",
      category: "Bioinformatics",
      status: "Pending",
      size: "10x10",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Exhibitors</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name or booth" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Exhibitor
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
                <TableHead>Booth Number</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booth Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exhibitors.map((exhibitor) => (
                <TableRow key={exhibitor.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={exhibitor.image || "/placeholder.svg"}
                        alt={exhibitor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{exhibitor.name}</TableCell>
                  <TableCell>{exhibitor.boothNumber}</TableCell>
                  <TableCell>{exhibitor.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        exhibitor.status === "Confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {exhibitor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{exhibitor.size}</TableCell>
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
