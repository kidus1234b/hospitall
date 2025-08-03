"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, DollarSign, Activity, Plus, Edit, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 1247,
    todayAppointments: 23,
    totalRevenue: 45670,
    activeStaff: 45,
  })

  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Sarah Johnson", role: "Doctor", department: "Cardiology", status: "Active" },
    { id: 2, name: "Mike Wilson", role: "Nurse", department: "Emergency", status: "Active" },
    { id: 3, name: "Lisa Chen", role: "Pharmacist", department: "Pharmacy", status: "Active" },
    { id: 4, name: "John Smith", role: "Lab Technician", department: "Laboratory", status: "Inactive" },
  ])

  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Alice Brown", doctor: "Dr. Sarah Johnson", time: "09:00 AM", status: "Confirmed" },
    { id: 2, patient: "Bob Davis", doctor: "Dr. Mike Chen", time: "10:30 AM", status: "Pending" },
    { id: 3, patient: "Carol White", doctor: "Dr. Sarah Johnson", time: "02:00 PM", status: "Completed" },
  ])

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your hospital operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">3 pending confirmations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeStaff}</div>
              <p className="text-xs text-muted-foreground">2 on leave today</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="staff" className="space-y-4">
          <TabsList>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Staff Management</CardTitle>
                    <CardDescription>Manage hospital staff members</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-600">
                          {member.role} - {member.department}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>View and manage patient appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{appointment.patient}</h3>
                        <p className="text-sm text-gray-600">
                          {appointment.doctor} - {appointment.time}
                        </p>
                      </div>
                      <Badge
                        variant={
                          appointment.status === "Confirmed"
                            ? "default"
                            : appointment.status === "Pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Accounting</CardTitle>
                <CardDescription>Financial overview and billing management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-green-600">Paid Invoices</h3>
                    <p className="text-2xl font-bold">$32,450</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-yellow-600">Pending</h3>
                    <p className="text-2xl font-bold">$8,920</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-red-600">Overdue</h3>
                    <p className="text-2xl font-bold">$4,300</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
