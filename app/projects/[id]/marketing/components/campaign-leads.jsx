"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { Search, Download, Eye, Mail } from "lucide-react"

export function CampaignLeads({ projectId, campaignId }) {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/projects/${projectId}/marketing/campaigns/${campaignId}/leads`)

        if (!response.ok) {
          throw new Error("Failed to fetch leads")
        }

        const data = await response.json()
        setLeads(data)
      } catch (err) {
        console.error("Error fetching leads:", err)
        // Use mock data for development
        setLeads(mockLeads)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [projectId, campaignId])

  const handleExport = () => {
    // In a real app, implement CSV export functionality
    console.log("Exporting leads to CSV")
  }

  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (lead) => <div className="font-medium">{lead.name}</div>,
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      cell: (lead) => lead.email,
      sortable: true,
    },
    {
      key: "company",
      header: "Company",
      cell: (lead) => lead.company || "—",
      sortable: true,
    },
    {
      key: "date",
      header: "Date",
      cell: (lead) => formatDate(lead.date),
      sortable: true,
    },
    {
      key: "source",
      header: "Source",
      cell: (lead) => <Badge variant="outline">{lead.source}</Badge>,
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (lead) => <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>,
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (lead) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="View Lead">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Send Email">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={leads.filter(
              (lead) =>
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())),
            )}
            columns={columns}
            searchable={false}
            pagination={true}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions
function formatDate(dateString) {
  if (!dateString) return "—"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getStatusVariant(status) {
  switch (status.toLowerCase()) {
    case "qualified":
      return "success"
    case "new":
      return "default"
    case "contacted":
      return "warning"
    case "disqualified":
      return "destructive"
    default:
      return "secondary"
  }
}

// Mock data for development
const mockLeads = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Acme Corp",
    date: "2023-06-15",
    source: "Email",
    status: "Qualified",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    company: "Tech Solutions",
    date: "2023-06-18",
    source: "Email",
    status: "Contacted",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    company: "Global Industries",
    date: "2023-06-20",
    source: "Email",
    status: "New",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    company: "Innovate Inc",
    date: "2023-06-22",
    source: "Email",
    status: "Qualified",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    company: "Wilson & Co",
    date: "2023-06-25",
    source: "Email",
    status: "Disqualified",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    company: "Lee Enterprises",
    date: "2023-06-28",
    source: "Email",
    status: "New",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.m@example.com",
    company: "Miller Group",
    date: "2023-07-01",
    source: "Email",
    status: "Contacted",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa.t@example.com",
    company: "Taylor Industries",
    date: "2023-07-03",
    source: "Email",
    status: "New",
  },
  {
    id: "9",
    name: "James Anderson",
    email: "j.anderson@example.com",
    company: "Anderson & Sons",
    date: "2023-07-05",
    source: "Email",
    status: "Qualified",
  },
  {
    id: "10",
    name: "Patricia Moore",
    email: "p.moore@example.com",
    company: "Moore Consulting",
    date: "2023-07-08",
    source: "Email",
    status: "New",
  },
]
