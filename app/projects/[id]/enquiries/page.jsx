import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Search } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function EnquiriesPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for enquiries
  const enquiries = [
    {
      id: "ENQ-12345",
      date: "2025-04-15T10:30:00Z",
      name: "John Smith",
      email: "john.smith@example.com",
      subject: "Sponsorship Opportunities",
      status: "Open",
      source: "Website",
    },
    {
      id: "ENQ-12346",
      date: "2025-04-15T11:45:00Z",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      subject: "Group Booking Discount",
      status: "In Progress",
      source: "Email",
    },
    {
      id: "ENQ-12347",
      date: "2025-04-15T13:20:00Z",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      subject: "Speaker Application",
      status: "Closed",
      source: "LinkedIn",
    },
    {
      id: "ENQ-12348",
      date: "2025-04-15T14:10:00Z",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      subject: "Media Partnership",
      status: "Open",
      source: "Website",
    },
    {
      id: "ENQ-12349",
      date: "2025-04-15T15:30:00Z",
      name: "David Wilson",
      email: "david.wilson@example.com",
      subject: "Exhibitor Information",
      status: "In Progress",
      source: "Phone",
    },
    {
      id: "ENQ-12350",
      date: "2025-04-15T16:45:00Z",
      name: "Aisha Patel",
      email: "aisha.patel@example.com",
      subject: "Accessibility Requirements",
      status: "Open",
      source: "Website",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Enquiries</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by ID, name, or subject" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Enquiries
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>{enquiry.id}</TableCell>
                  <TableCell>{new Date(enquiry.date).toLocaleString()}</TableCell>
                  <TableCell>{enquiry.name}</TableCell>
                  <TableCell>{enquiry.email}</TableCell>
                  <TableCell>{enquiry.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        enquiry.status === "Open"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : enquiry.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {enquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{enquiry.source}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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
