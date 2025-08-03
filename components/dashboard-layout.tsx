"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Hospital, Menu, X, LogOut, Settings, User, Bell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: string
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      doctor: "bg-blue-100 text-blue-800",
      receptionist: "bg-green-100 text-green-800",
      pharmacist: "bg-purple-100 text-purple-800",
      lab: "bg-yellow-100 text-yellow-800",
      patient: "bg-gray-100 text-gray-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  const getNavItems = (role: string) => {
    const navItems = {
      admin: [
        { name: "Dashboard", href: "/dashboard/admin" },
        { name: "Staff Management", href: "/dashboard/admin/staff" },
        { name: "Appointments", href: "/dashboard/admin/appointments" },
        { name: "Billing", href: "/dashboard/admin/billing" },
        { name: "Reports", href: "/dashboard/admin/reports" },
      ],
      doctor: [
        { name: "Dashboard", href: "/dashboard/doctor" },
        { name: "Appointments", href: "/dashboard/doctor/appointments" },
        { name: "Patients", href: "/dashboard/doctor/patients" },
        { name: "Prescriptions", href: "/dashboard/doctor/prescriptions" },
      ],
      receptionist: [
        { name: "Dashboard", href: "/dashboard/receptionist" },
        { name: "Patient Registration", href: "/dashboard/receptionist/patients" },
        { name: "Appointments", href: "/dashboard/receptionist/appointments" },
        { name: "Billing", href: "/dashboard/receptionist/billing" },
      ],
      pharmacist: [
        { name: "Dashboard", href: "/dashboard/pharmacist" },
        { name: "Prescriptions", href: "/dashboard/pharmacist/prescriptions" },
        { name: "Inventory", href: "/dashboard/pharmacist/inventory" },
      ],
      lab: [
        { name: "Dashboard", href: "/dashboard/lab" },
        { name: "Test Requests", href: "/dashboard/lab/requests" },
        { name: "Results", href: "/dashboard/lab/results" },
      ],
      patient: [
        { name: "Dashboard", href: "/dashboard/patient" },
        { name: "Appointments", href: "/dashboard/patient/appointments" },
        { name: "Prescriptions", href: "/dashboard/patient/prescriptions" },
        { name: "Lab Reports", href: "/dashboard/patient/reports" },
        { name: "Billing", href: "/dashboard/patient/billing" },
      ],
    }
    return navItems[role] || []
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <Hospital className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">MedSync</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-4">
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </div>
        </div>

        <nav className="mt-4">
          {getNavItems(role).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
