"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill, Package, AlertTriangle, CheckCircle, Search, Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function PharmacistDashboard() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patient: "Alice Brown",
      doctor: "Dr. Sarah Johnson",
      medication: "Lisinopril 10mg",
      quantity: 30,
      status: "Pending",
    },
    {
      id: 2,
      patient: "Bob Davis",
      doctor: "Dr. Mike Chen",
      medication: "Metformin 500mg",
      quantity: 60,
      status: "Ready",
    },
    {
      id: 3,
      patient: "Carol White",
      doctor: "Dr. Sarah Johnson",
      medication: "Amoxicillin 250mg",
      quantity: 21,
      status: "Dispensed",
    },
  ])

  const [inventory, setInventory] = useState([
    { id: 1, name: "Lisinopril 10mg", stock: 150, minStock: 50, supplier: "PharmaCorp", status: "In Stock" },
    { id: 2, name: "Metformin 500mg", stock: 25, minStock: 100, supplier: "MediSupply", status: "Low Stock" },
    { id: 3, name: "Amoxicillin 250mg", stock: 0, minStock: 30, supplier: "PharmaCorp", status: "Out of Stock" },
    { id: 4, name: "Aspirin 81mg", stock: 200, minStock: 75, supplier: "MediSupply", status: "In Stock" },
  ])

  const [dispensedMeds, setDispensedMeds] = useState([
    {
      id: 1,
      patient: "John Smith",
      medication: "Atorvastatin 20mg",
      quantity: 30,
      date: "2024-01-15",
      pharmacist: "Current User",
    },
    {
      id: 2,
      patient: "Mary Johnson",
      medication: "Hydrochlorothiazide 25mg",
      quantity: 90,
      date: "2024-01-14",
      pharmacist: "Current User",
    },
  ])

  const handleDispenseMedication = (prescriptionId: number) => {
    setPrescriptions(prescriptions.map((p) => (p.id === prescriptionId ? { ...p, status: "Dispensed" } : p)))
    alert("Medication dispensed successfully!")
  }

  return (
    <DashboardLayout role="pharmacist">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard</h1>
          <p className="text-gray-600">Manage prescriptions and inventory</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Prescriptions</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prescriptions.filter((p) => p.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting preparation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready for Pickup</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prescriptions.filter((p) => p.status === "Ready").length}</div>
              <p className="text-xs text-muted-foreground">Prepared medications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inventory.filter((i) => i.status === "Low Stock" || i.status === "Out of Stock").length}
              </div>
              <p className="text-xs text-muted-foreground">Need reordering</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
              <p className="text-xs text-muted-foreground">Medication types</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="prescriptions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="dispensed">Dispensed Medications</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Queue</CardTitle>
                <CardDescription>View and process patient prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Search prescriptions..." className="flex-1" />
                    <Button variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{prescription.patient}</h3>
                        <p className="text-sm text-gray-600">
                          {prescription.medication} - Qty: {prescription.quantity}
                        </p>
                        <p className="text-xs text-gray-500">Prescribed by {prescription.doctor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            prescription.status === "Pending"
                              ? "secondary"
                              : prescription.status === "Ready"
                                ? "default"
                                : "outline"
                          }
                        >
                          {prescription.status}
                        </Badge>
                        {prescription.status === "Pending" && (
                          <Button size="sm" onClick={() => handleDispenseMedication(prescription.id)}>
                            Prepare
                          </Button>
                        )}
                        {prescription.status === "Ready" && (
                          <Button size="sm" onClick={() => handleDispenseMedication(prescription.id)}>
                            Dispense
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Medication Inventory</CardTitle>
                    <CardDescription>Track stock levels and manage inventory</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medication
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Stock: {item.stock} | Min: {item.minStock} | Supplier: {item.supplier}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.status === "In Stock"
                              ? "default"
                              : item.status === "Low Stock"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                        {item.status !== "In Stock" && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dispensed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dispensed Medications</CardTitle>
                <CardDescription>Track medications that have been dispensed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dispensedMeds.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{med.patient}</h3>
                        <p className="text-sm text-gray-600">
                          {med.medication} - Qty: {med.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          Dispensed on {med.date} by {med.pharmacist}
                        </p>
                      </div>
                      <Badge variant="outline">Dispensed</Badge>
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
