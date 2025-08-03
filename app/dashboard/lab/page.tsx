"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { FileText, Upload, TestTube, Clock, CheckCircle, AlertCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function LabDashboard() {
  const [testRequests, setTestRequests] = useState([
    {
      id: 1,
      patient: "Alice Brown",
      doctor: "Dr. Sarah Johnson",
      test: "Complete Blood Count",
      priority: "Normal",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Bob Davis",
      doctor: "Dr. Mike Chen",
      test: "Lipid Panel",
      priority: "Urgent",
      status: "In Progress",
    },
    {
      id: 3,
      patient: "Carol White",
      doctor: "Dr. Sarah Johnson",
      test: "Thyroid Function",
      priority: "Normal",
      status: "Completed",
    },
  ])

  const [selectedTest, setSelectedTest] = useState(null)
  const [testResults, setTestResults] = useState("")
  const [testNotes, setTestNotes] = useState("")

  const completedTests = [
    {
      id: 1,
      patient: "John Smith",
      test: "Blood Glucose",
      result: "Normal",
      date: "2024-01-15",
      technician: "Current User",
    },
    {
      id: 2,
      patient: "Mary Johnson",
      test: "Urinalysis",
      result: "Abnormal",
      date: "2024-01-14",
      technician: "Current User",
    },
  ]

  const handleSubmitResults = (testId: number) => {
    setTestRequests(testRequests.map((t) => (t.id === testId ? { ...t, status: "Completed" } : t)))
    alert("Test results submitted successfully!")
    setTestResults("")
    setTestNotes("")
  }

  return (
    <DashboardLayout role="lab">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Dashboard</h1>
          <p className="text-gray-600">Manage test requests and submit results</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testRequests.filter((t) => t.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testRequests.filter((t) => t.status === "In Progress").length}</div>
              <p className="text-xs text-muted-foreground">Currently testing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testRequests.filter((t) => t.status === "Completed").length}</div>
              <p className="text-xs text-muted-foreground">Tests finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Tests</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testRequests.filter((t) => t.priority === "Urgent").length}</div>
              <p className="text-xs text-muted-foreground">High priority</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="requests">Test Requests</TabsTrigger>
            <TabsTrigger value="results">Submit Results</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Requests Queue</CardTitle>
                <CardDescription>View and manage incoming test requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{request.patient}</h3>
                        <p className="text-sm text-gray-600">{request.test}</p>
                        <p className="text-xs text-gray-500">Requested by {request.doctor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={request.priority === "Urgent" ? "destructive" : "secondary"}>
                          {request.priority}
                        </Badge>
                        <Badge
                          variant={
                            request.status === "Pending"
                              ? "secondary"
                              : request.status === "In Progress"
                                ? "default"
                                : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                        {request.status === "Pending" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setTestRequests(
                                testRequests.map((t) => (t.id === request.id ? { ...t, status: "In Progress" } : t)),
                              )
                            }}
                          >
                            Start Test
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Submit Test Results</CardTitle>
                <CardDescription>Enter results for completed tests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="test-select">Select Test</Label>
                  <select
                    id="test-select"
                    className="w-full p-2 border rounded-md"
                    onChange={(e) => {
                      const testId = Number.parseInt(e.target.value)
                      const test = testRequests.find((t) => t.id === testId)
                      setSelectedTest(test)
                    }}
                  >
                    <option value="">Choose a test...</option>
                    {testRequests
                      .filter((t) => t.status === "In Progress")
                      .map((test) => (
                        <option key={test.id} value={test.id}>
                          {test.patient} - {test.test}
                        </option>
                      ))}
                  </select>
                </div>

                {selectedTest && (
                  <>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium">{selectedTest.patient}</h3>
                      <p className="text-sm text-gray-600">{selectedTest.test}</p>
                      <p className="text-xs text-gray-500">Requested by {selectedTest.doctor}</p>
                    </div>

                    <div>
                      <Label htmlFor="results">Test Results</Label>
                      <Textarea
                        id="results"
                        placeholder="Enter detailed test results..."
                        value={testResults}
                        onChange={(e) => setTestResults(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional observations or notes..."
                        value={testNotes}
                        onChange={(e) => setTestNotes(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="file-upload">Attach Files (Optional)</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <Input id="file-upload" type="file" multiple />
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    <Button onClick={() => handleSubmitResults(selectedTest.id)} disabled={!testResults.trim()}>
                      <FileText className="h-4 w-4 mr-2" />
                      Submit Results
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tests</CardTitle>
                <CardDescription>View previously completed test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{test.patient}</h3>
                        <p className="text-sm text-gray-600">{test.test}</p>
                        <p className="text-xs text-gray-500">
                          Completed on {test.date} by {test.technician}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={test.result === "Normal" ? "default" : "destructive"}>{test.result}</Badge>
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
