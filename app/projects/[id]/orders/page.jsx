import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Search } from "lucide-react"
import { getProject } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function OrdersPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  // Mock data for orders
  const orders = [
    {
      id: "ORD-12345",
      date: "2025-04-15T10:30:00Z",
      customer: "John Smith",
      email: "john.smith@example.com",
      amount: "£1,250.00",
      status: "Paid",
      items: "VIP Pass (2), Workshop Access (1)",
    },
    {
      id: "ORD-12346",
      date: "2025-04-15T11:45:00Z",
      customer: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      amount: "£750.00",
      status: "Paid",
      items: "Standard Pass (3)",
    },
    {
      id: "ORD-12347",
      date: "2025-04-15T13:20:00Z",
      customer: "Michael Chen",
      email: "michael.chen@example.com",
      amount: "£500.00",
      status: "Pending",
      items: "Standard Pass (2)",
    },
    {
      id: "ORD-12348",
      date: "2025-04-15T14:10:00Z",
      customer: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      amount: "£1,000.00",
      status: "Paid",
      items: "VIP Pass (1), Workshop Access (2)",
    },
    {
      id: "ORD-12349",
      date: "2025-04-15T15:30:00Z",
      customer: "David Wilson",
      email: "david.wilson@example.com",
      amount: "£250.00",
      status: "Failed",
      items: "Standard Pass (1)",
    },
    {
      id: "ORD-12350",
      date: "2025-04-15T16:45:00Z",
      customer: "Aisha Patel",
      email: "aisha.patel@example.com",
      amount: "£0.00",
      status: "Completed",
      items: "Free Pass (1)",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Orders</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <p className="text-sm font-medium">Search:</p>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by order ID or customer" className="pl-8" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Orders
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.status === "Paid"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : order.status === "Failed"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
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
