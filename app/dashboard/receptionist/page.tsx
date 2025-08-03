"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, UserPlus, DollarSign, FileText, Plus, Search, PrinterIcon as Print } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ReceptionistDashboard() {
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Alice Brown", doctor: "Dr. Sarah Johnson", time: "09:00 AM", status: "Confirmed" },
    { id: 2, patient: "Bob Davis", doctor: "Dr. Mike Chen", time: "10:30 AM", status: "Pending" },
    { id: 3, patient: "Carol White", doctor: "Dr. Sarah Johnson", time: "02:00 PM", status: "Completed" },
  ])

  const [invoices, setInvoices] = useState([
    { id: "INV-001", patient: "Alice Brown", amount: 150, status: "Paid", date: "2024-01-15" },
    { id: "INV-002", patient: "Bob Davis", amount: 200, status: "Pending", date: "2024-01-14" },
    { id: "INV-003", patient: "Carol White", amount: 75, status: "Overdue", date: "2024-01-10" },
  ])

  const handlePatientRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle patient registration logic
    console.log("Registering patient:", newPatient)
    alert("Patient registered successfully!")
    setNewPatient({
      name: "",
      email: "",
      phone: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
    })
  }

  return (
    <DashboardLayout role="receptionist">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Receptionist Dashboard</h1>
          <p className="text-gray-600">Manage patients, appointments, and billing</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">3 confirmed, 1 pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Patients</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250</div>
              <p className="text-xs text-muted-foreground">5 invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="patients">Patient Registration</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Register New Patient</CardTitle>
                <CardDescription>Add a new patient to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientRegistration} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={newPatient.address}
                        onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency-contact">Emergency Contact</Label>
                      <Input
                        id="emergency-contact"
                        value={newPatient.emergencyContact}
                        onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency-phone">Emergency Phone</Label>
                      <Input
                        id="emergency-phone"
                        value={newPatient.emergencyPhone}
                        onChange={(e) => setNewPatient({ ...newPatient, emergencyPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register Patient
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Appointment Management</CardTitle>
                    <CardDescription>Book and manage patient appointments</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Search appointments..." className="flex-1" />
                    <Button variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{appointment.patient}</h3>
                        <p className="text-sm text-gray-600">
                          {appointment.doctor} - {appointment.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Invoices</CardTitle>
                <CardDescription>Manage patient billing and print invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">
                          {invoice.id} - {invoice.patient}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${invoice.amount} - {invoice.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {invoice.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Print className="h-4 w-4 mr-1" />
                          Print
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
