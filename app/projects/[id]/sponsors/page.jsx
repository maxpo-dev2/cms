import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Plus, Search, Trash } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function SponsorsPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for sponsors
  const sponsors = [
    {
      id: "1",
      name: "BioTech Global",
      image: "/placeholder.svg?height=40&width=40",
      level: "Platinum",
      amount: "£50,000",
      status: "Confirmed",
      benefits: "Main stage branding, 5 VIP passes, keynote slot",
    },
    {
      id: "2",
      name: "MediCorp International",
      image: "/placeholder.svg?height=40&width=40",
      level: "Gold",
      amount: "£25,000",
      status: "Confirmed",
      benefits: "Logo on all materials, 3 VIP passes, workshop slot",
    },
    {
      id: "3",
      name: "GeneTech Labs",
      image: "/placeholder.svg?height=40&width=40",
      level: "Silver",
      amount: "£15,000",
      status: "Pending",
      benefits: "Logo on website, 2 VIP passes",
    },
    {
      id: "4",
      name: "Pharma Solutions",
      image: "/placeholder.svg?height=40&width=40",
      level: "Bronze",
      amount: "£7,500",
      status: "Confirmed",
      benefits: "Logo on website, 1 VIP pass",
    },
    {
      id: "5",
      name: "BioInnovate",
      image: "/placeholder.svg?height=40&width=40",
      level: "Gold",
      amount: "£25,000",
      status: "Pending",
      benefits: "Logo on all materials, 3 VIP passes, workshop slot",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Sponsors</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name or level" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Sponsor
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
                <TableHead>Level</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Benefits</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={sponsor.image || "/placeholder.svg"}
                        alt={sponsor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{sponsor.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        sponsor.level === "Platinum"
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          : sponsor.level === "Gold"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : sponsor.level === "Silver"
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {sponsor.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{sponsor.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        sponsor.status === "Confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {sponsor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={sponsor.benefits}>
                    {sponsor.benefits}
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
