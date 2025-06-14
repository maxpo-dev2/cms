"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Calendar,
  CircleUser,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PieChart,
  Settings,
  ShoppingCart,
  Tag,
  Ticket,
  Users,
} from "lucide-react"

// Using .jsx extension to avoid TypeScript errors completely
export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "HOME",
      items: [
        {
          title: "Overview",
          href: "/",
          icon: <Home className="w-5 h-5" />,
        },
         {
          title: "Logout",
          href: "/logout",
          icon: <LogOut className="w-5 h-5" />,
        },
      ],
    },
    // {
    //   title: "",
      // items: [
        // {
        //   title: "Organizations",
        //   href: "/organizations",
        //   icon: <LayoutDashboard className="w-5 h-5" />,
        // },
        // {
        //   title: "Speakers",
        //   href: "/speakers",
        //   icon: <CircleUser className="w-5 h-5" />,
        // },
       
      // ],
    // },
  ]

  // Only show these routes if we're in a project context
  const projectId = pathname.includes("/projects/") ? pathname.split("/projects/")[1]?.split("/")[0] : null

  const projectRoutes = projectId
    ? [
        {
          title: "PARTICIPANTS",
          items: [
            {
              title: "Delegates",
              href: `/projects/${projectId}/delegates`,
              icon: <Users className="w-5 h-5" />,
            },
            {
              title: "Media Partners",
              href: `/projects/${projectId}/media-partners`,
              icon: <FileText className="w-5 h-5" />,
            },
            {
              title: "Exhibitors",
              href: `/projects/${projectId}/exhibitors`,
              icon: <Tag className="w-5 h-5" />,
            },
            {
              title: "Sponsors",
              href: `/projects/${projectId}/sponsors`,
              icon: <Tag className="w-5 h-5" />,
            },
            {
              title: "Partners",
              href: `/projects/${projectId}/partners`,
              icon: <Users className="w-5 h-5" />,
            },
            {
              title: "Attendees",
              href: `/projects/${projectId}/attendees`,
              icon: <Users className="w-5 h-5" />,
            },
          ],
        },
        {
          title: "CONFERENCE",
          items: [
            {
              title: "Speakers",
              href: `/projects/${projectId}/speakers`,
              icon: <CircleUser className="w-5 h-5" />,
            },
            {
              title: "Agenda",
              href: `/projects/${projectId}/agenda`,
              icon: <Calendar className="w-5 h-5" />,
            },
          ],
        },
        {
          title: "MARKETING",
          items: [
            {
              title: "Marketing",
              href: `/projects/${projectId}/marketing`,
              icon: <BarChart3 className="w-5 h-5" />,
            },
            {
              title: "Leads",
              href: `/projects/${projectId}/leads`,
              icon: <Users className="w-5 h-5" />,
            },
          ],
        },
        {
          title: "REPORTS",
          items: [
            {
              title: "App Reports",
              href: `/projects/${projectId}/app-reports`,
              icon: <PieChart className="w-5 h-5" />,
              badge: "New",
            },
            {
              title: "Attendees",
              href: `/projects/${projectId}/attendees-reports`,
              icon: <Users className="w-5 h-5" />,
              badge: "New",
            },
            {
              title: "Orders",
              href: `/projects/${projectId}/orders`,
              icon: <ShoppingCart className="w-5 h-5" />,
              badge: "New",
            },
            {
              title: "Enquiries",
              href: `/projects/${projectId}/enquiries`,
              icon: <MessageSquare className="w-5 h-5" />,
              badge: "New",
            },
            {
              title: "UTM",
              href: `/projects/${projectId}/utm`,
              icon: <LayoutDashboard className="w-5 h-5" />,
              badge: "New",
            },
          ],
        },
        {
          title: "TICKETING",
          items: [
            {
              title: "Ticketing",
              href: `/projects/${projectId}/ticketing`,
              icon: <Ticket className="w-5 h-5" />,
            },
          ],
        },
        {
          title: "ADMIN",
          items: [
            {
              title: "Settings",
              href: `/projects/${projectId}/settings`,
              icon: <Settings className="w-5 h-5" />,
            },
          ],
        },
      ]
    : []

  const allRoutes = [...routes, ...projectRoutes]

  return (
    <div className="hidden md:flex md:w-64 md:flex-col h-screen bg-white border-r mr-7">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            M
          </div>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-8">
            {allRoutes.map((route, i) => (
              <div key={i}>
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{route.title}</p>
                <div className="mt-2 space-y-1">
                  {route.items.map((item, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                      )}
                    >
                      {item.icon}
                      <span className="ml-3 flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
