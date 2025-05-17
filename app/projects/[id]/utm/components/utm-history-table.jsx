"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Edit, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

export function UtmHistoryTable({ projectId }) {
  const [utmData, setUtmData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    const fetchUtmData = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/utm`)
        if (!response.ok) throw new Error("Failed to fetch UTM data")
        const data = await response.json()
        setUtmData(data)
      } catch (error) {
        console.error("Error fetching UTM data:", error)
        toast({
          title: "Error",
          description: "Failed to load UTM data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUtmData()
  }, [projectId])

  const filteredData = utmData.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      (item.name && item.name.toLowerCase().includes(searchLower)) ||
      (item.source && item.source.toLowerCase().includes(searchLower)) ||
      (item.medium && item.medium.toLowerCase().includes(searchLower)) ||
      (item.campaign && item.campaign.toLowerCase().includes(searchLower)) ||
      (item.term && item.term.toLowerCase().includes(searchLower)) ||
      (item.content && item.content.toLowerCase().includes(searchLower))
    )
  })

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      const response = await fetch(`/api/projects/${projectId}/utm/${itemToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete UTM data")

      setUtmData(utmData.filter((item) => item.id !== itemToDelete))
      toast({
        title: "UTM data deleted",
        description: "The UTM data has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting UTM data:", error)
      toast({
        title: "Error",
        description: "Failed to delete UTM data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  const generateUtmUrl = (item) => {
    if (!item.websiteUrl) return ""

    try {
      const url = new URL(item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`)

      if (item.source) url.searchParams.append("utm_source", item.source)
      if (item.medium) url.searchParams.append("utm_medium", item.medium)
      if (item.campaign) url.searchParams.append("utm_campaign", item.campaign)
      if (item.term) url.searchParams.append("utm_term", item.term)
      if (item.content) url.searchParams.append("utm_content", item.content)

      return url.toString()
    } catch (error) {
      return ""
    }
  }

  const copyToClipboard = (item) => {
    const url = generateUtmUrl(item)
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copied",
      description: "The UTM URL has been copied to your clipboard.",
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-[300px] h-10 bg-muted rounded-md animate-pulse" />
          <div className="w-[100px] h-10 bg-muted rounded-md animate-pulse" />
        </div>
        <div className="border rounded-md">
          <div className="h-12 border-b bg-muted/50" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b last:border-0 bg-muted/20 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search UTM parameters..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => {}}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {filteredData.length === 0 ? (
        <div className="border rounded-md p-8 text-center">
          <p className="text-muted-foreground">No UTM data found. Create your first UTM link to start tracking.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name || "Unnamed UTM"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.source || "—"}</Badge>
                  </TableCell>
                  <TableCell>{item.medium || "—"}</TableCell>
                  <TableCell>{item.campaign || "—"}</TableCell>
                  <TableCell>
                    {item.createdAt ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.visits || 0} visits</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm">{item.conversions || 0} conv.</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm">
                        {item.visits ? ((item.conversions / item.visits) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => copyToClipboard(item)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setItemToDelete(item.id)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this UTM data and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
