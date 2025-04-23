import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Pencil, Plus, Search, Trash } from "lucide-react"
import { getDelegates, getProject } from "@/lib/db"
import { notFound } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default async function DelegatesPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const delegates = await getDelegates(params.id)

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Delegates</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2 justify-between sm:justify-end w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Participant</span>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Participant
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Per page:</span>
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Total records: {delegates.length}</p>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Booth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {delegates.map((delegate) => (
                <DelegateRow
                  key={delegate.id}
                  image={delegate.image || "/placeholder.svg?height=40&width=40"}
                  name={delegate.name}
                  address={delegate.address || "N/A"}
                  booth={delegate.booth || ""}
                  status={delegate.status || ""}
                  description={delegate.description || ""}
                  priority={delegate.priority.toString()}
                  featured={delegate.featured.toString()}
                  type={delegate.type}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function DelegateRow({ image, name, address, booth, status, description, priority, featured, type }) {
  return (
    <TableRow>
      <TableCell>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{booth}</TableCell>
      <TableCell>{status || "..."}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{priority}</TableCell>
      <TableCell>{featured}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
