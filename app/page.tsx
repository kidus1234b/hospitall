"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hospital, Lock, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "",
  })
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Demo login - in real app, this would call your API
    const demoCredentials = {
      admin: { email: "admin@medsync.com", password: "admin123" },
      doctor: { email: "doctor@medsync.com", password: "doctor123" },
      receptionist: { email: "receptionist@medsync.com", password: "recep123" },
      pharmacist: { email: "pharmacist@medsync.com", password: "pharma123" },
      lab: { email: "lab@medsync.com", password: "lab123" },
      patient: { email: "patient@medsync.com", password: "patient123" },
    }

    const roleKey = credentials.role as keyof typeof demoCredentials
    if (
      demoCredentials[roleKey] &&
      credentials.email === demoCredentials[roleKey].email &&
      credentials.password === demoCredentials[roleKey].password
    ) {
      // Store user data in localStorage (in real app, use proper JWT handling)
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: credentials.role,
          email: credentials.email,
          name: credentials.role.charAt(0).toUpperCase() + credentials.role.slice(1),
        }),
      )

      router.push(`/dashboard/${credentials.role}`)
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Hospital className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">MedSync HMS</CardTitle>
          <CardDescription>Hospital Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select
                value={credentials.role}
                onValueChange={(value) => setCredentials({ ...credentials, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="lab">Lab Technician</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                <strong>Admin:</strong> admin@medsync.com / admin123
              </div>
              <div>
                <strong>Doctor:</strong> doctor@medsync.com / doctor123
              </div>
              <div>
                <strong>Receptionist:</strong> receptionist@medsync.com / recep123
              </div>
              <div>
                <strong>Pharmacist:</strong> pharmacist@medsync.com / pharma123
              </div>
              <div>
                <strong>Lab Tech:</strong> lab@medsync.com / lab123
              </div>
              <div>
                <strong>Patient:</strong> patient@medsync.com / patient123
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
