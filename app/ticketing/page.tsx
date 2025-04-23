import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

export default function TicketingPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-center">£66,599.20</h1>
        <p className="text-center text-muted-foreground">
          * Revenue from event website orders and direct payment links from orzel
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <div className="space-y-2">
            <p className="text-sm font-medium">Start Date</p>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Choose Date
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">End Date</p>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Choose Date
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <OrderStatCard title="Total" value="914" />
            <OrderStatCard title="Paid" value="67" />
            <OrderStatCard title="Incomplete" value="471" />
            <OrderStatCard title="Complete" value="443" />
            <OrderStatCard title="Free" value="376" className="md:col-span-4 lg:col-span-1" />
          </div>
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Orders by Type</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Chart
              </Button>
              <Button variant="outline" size="sm">
                Table
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="h-64 w-full flex items-center justify-center text-muted-foreground">
                Chart data will be displayed here
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function OrderStatCard({ title, value, className }: { title: string; value: string; className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
