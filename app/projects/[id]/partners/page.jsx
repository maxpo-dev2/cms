import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Plus, Search, Trash } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function PartnersPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for partners
  const partners = [
    {
      id: "1",
      name: "London BioTech Association",
      image: "/placeholder.svg?height=40&width=40",
      type: "Industry Association",
      website: "https://lba.org",
      status: "Active",
      contribution: "Speaker referrals, industry promotion",
    },
    {
      id: "2",
      name: "UK Research Council",
      image: "/placeholder.svg?height=40&width=40",
      type: "Government",
      website: "https://ukrc.gov.uk",
      status: "Active",
      contribution: "Research showcase, funding opportunities",
    },
    {
      id: "3",
      name: "European BioTech Network",
      image: "/placeholder.svg?height=40&width=40",
      type: "Network",
      website: "https://ebn.eu",
      status: "Pending",
      contribution: "International delegate connections",
    },
    {
      id: "4",
      name: "BioStartup Accelerator",
      image: "/placeholder.svg?height=40&width=40",
      type: "Accelerator",
      website: "https://biostartup.co",
      status: "Active",
      contribution: "Startup showcase, mentorship sessions",
    },
    {
      id: "5",
      name: "Global Health Initiative",
      image: "/placeholder.svg?height=40&width=40",
      type: "NGO",
      website: "https://globalhealth.org",
      status: "Active",
      contribution: "Policy discussions, global health panel",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Partners</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name or type" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
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
                <TableHead>Type</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contribution</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
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
                  <TableCell>{partner.type}</TableCell>
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
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        partner.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {partner.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={partner.contribution}>
                    {partner.contribution}
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
