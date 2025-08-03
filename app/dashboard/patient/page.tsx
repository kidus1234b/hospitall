"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, FileText, Pill, User, Clock, Download, Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Follow-up",
      status: "Confirmed",
    },
    { id: 2, doctor: "Dr. Mike Chen", date: "2024-01-25", time: "02:30 PM", type: "Consultation", status: "Pending" },
  ])

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      medication: "Lisinopril 10mg",
      dosage: "Once daily",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      dosage: "Twice daily",
      doctor: "Dr. Mike Chen",
      date: "2024-01-10",
      status: "Active",
    },
  ])

  const [labReports, setLabReports] = useState([
    { id: 1, test: "Complete Blood Count", date: "2024-01-12", result: "Normal", doctor: "Dr. Sarah Johnson" },
    { id: 2, test: "Lipid Panel", date: "2024-01-08", result: "Abnormal", doctor: "Dr. Mike Chen" },
  ])

  const [invoices, setInvoices] = useState([
    { id: "INV-001", date: "2024-01-15", amount: 150, description: "Consultation Fee", status: "Paid" },
    { id: "INV-002", date: "2024-01-10", amount: 75, description: "Lab Tests", status: "Pending" },
  ])

  const [profile, setProfile] = useState({
    name: "John Patient",
    email: "patient@medsync.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Patient",
    emergencyPhone: "(555) 987-6543",
    bloodType: "O+",
    allergies: "Penicillin, Shellfish",
  })

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
          <p className="text-gray-600">Manage your health information and appointments</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">Next: Jan 20, 10:00 AM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prescriptions.length}</div>
              <p className="text-xs text-muted-foreground">Current medications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lab Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{labReports.length}</div>
              <p className="text-xs text-muted-foreground">Available reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoices.filter((i) => i.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Outstanding invoices</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Appointments</CardTitle>
                    <CardDescription>View and book appointments</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time} - {appointment.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
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

          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Prescriptions</CardTitle>
                <CardDescription>Current and past medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{prescription.medication}</h3>
                        <p className="text-sm text-gray-600">
                          {prescription.dosage} - Prescribed by {prescription.doctor}
                        </p>
                        <p className="text-xs text-gray-500">Date: {prescription.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{prescription.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lab Reports</CardTitle>
                <CardDescription>View your test results and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{report.test}</h3>
                        <p className="text-sm text-gray-600">Ordered by {report.doctor}</p>
                        <p className="text-xs text-gray-500">Date: {report.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.result === "Normal" ? "default" : "destructive"}>{report.result}</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
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
                <CardDescription>View and pay your medical bills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                        <p className="text-xs text-gray-500">Date: {invoice.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${invoice.amount}</span>
                        <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                        {invoice.status === "Pending" && <Button size="sm">Pay Now</Button>}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profile.name} readOnly />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profile.email} readOnly />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={profile.phone} />
                  </div>
                  <div>
                    <Label htmlFor="blood-type">Blood Type</Label>
                    <Input id="blood-type" value={profile.bloodType} readOnly />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={profile.address} />
                  </div>
                  <div>
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input id="emergency-contact" value={profile.emergencyContact} />
                  </div>
                  <div>
                    <Label htmlFor="emergency-phone">Emergency Phone</Label>
                    <Input id="emergency-phone" value={profile.emergencyPhone} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input id="allergies" value={profile.allergies} />
                  </div>
                </div>
                <Button>
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
