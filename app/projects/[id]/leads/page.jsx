import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Plus, Search } from "lucide-react"
import { getLeads, getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function LeadsPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const leads = await getLeads(params.id)

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Leads</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search by email, name, company" className="pl-8" />
              </div>
              <Button variant="outline">Advanced search</Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end gap-2">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <p className="text-sm text-muted-foreground sm:hidden">{leads.length} records</p>
              <div className="flex gap-2">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add new lead
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Results
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground hidden sm:block mb-4">{leads.length} records</p>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="h-4 w-4" />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Qualify Status</TableHead>
                  <TableHead>Sales Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    name={lead.name}
                    email={lead.email}
                    contact={lead.contact || ""}
                    company={lead.company || ""}
                    type={lead.type || ""}
                    date={lead.date ? new Date(lead.date).toLocaleString() : ""}
                    qualifyStatus={lead.qualifyStatus || ""}
                    salesStatus={lead.salesStatus || ""}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadRow({ name, email, contact, company, type, date, qualifyStatus, salesStatus }) {
  return (
    <TableRow>
      <TableCell>
        <input type="checkbox" className="h-4 w-4" />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{contact}</TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        {qualifyStatus === "HOT" && (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            HOT
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {salesStatus === "PENDING" && (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            PENDING
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <span className="text-xs text-muted-foreground">No Actions Available</span>
      </TableCell>
    </TableRow>
  )
}
