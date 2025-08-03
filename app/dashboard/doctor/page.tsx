"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, FileText, Stethoscope, User, Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function DoctorDashboard() {
  const [todayAppointments, setTodayAppointments] = useState([
    { id: 1, patient: "Alice Brown", time: "09:00 AM", type: "Consultation", status: "Confirmed" },
    { id: 2, patient: "Bob Davis", time: "10:30 AM", type: "Follow-up", status: "In Progress" },
    { id: 3, patient: "Carol White", time: "02:00 PM", type: "Check-up", status: "Pending" },
    { id: 4, patient: "David Wilson", time: "03:30 PM", type: "Consultation", status: "Confirmed" },
  ])

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [prescription, setPrescription] = useState("")
  const [diagnosis, setDiagnosis] = useState("")

  const patientHistory = [
    {
      date: "2024-01-15",
      diagnosis: "Hypertension",
      prescription: "Lisinopril 10mg daily",
      doctor: "Dr. Sarah Johnson",
    },
    { date: "2024-01-01", diagnosis: "Annual Check-up", prescription: "Multivitamin", doctor: "Dr. Sarah Johnson" },
  ]

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Manage your patients and appointments</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">09:00 AM</div>
              <p className="text-xs text-muted-foreground">Alice Brown</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Active patients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patient Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Stethoscope className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.patient}</h3>
                          <p className="text-sm text-gray-600">
                            {appointment.time} - {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            appointment.status === "Confirmed"
                              ? "default"
                              : appointment.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Medical History</CardTitle>
                <CardDescription>View and update patient records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Alice Brown - Patient ID: #12345</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Age: 45 | Blood Type: O+</p>
                        <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Emergency Contact: John Brown</p>
                        <p className="text-sm text-gray-600">Phone: (555) 987-6543</p>
                      </div>
                    </div>

                    <h4 className="font-medium mb-2">Medical History</h4>
                    <div className="space-y-2">
                      {patientHistory.map((record, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{record.diagnosis}</p>
                              <p className="text-sm text-gray-600">{record.prescription}</p>
                            </div>
                            <p className="text-sm text-gray-500">{record.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Write Prescription</CardTitle>
                <CardDescription>Create new prescriptions and lab requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patient-select">Patient</Label>
                    <Input id="patient-select" placeholder="Search patient..." />
                  </div>
                  <div>
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input
                      id="diagnosis"
                      placeholder="Enter diagnosis"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="prescription">Prescription</Label>
                  <Textarea
                    id="prescription"
                    placeholder="Enter medication details, dosage, and instructions..."
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Save Prescription
                  </Button>
                  <Button variant="outline">Request Lab Test</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
