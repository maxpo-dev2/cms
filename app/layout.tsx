"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  const handleLogout = () => {
    // Add your logout logic here
    // For now, just redirect to home
    router.push("/")
  }

  return (
    <div className="container py-6 max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <LogOut className="mx-auto h-12 w-12 text-muted-foreground" />
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">Are you sure you want to logout?</p>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button onClick={handleLogout} className="flex-1">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
