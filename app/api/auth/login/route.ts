import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Demo users - in production, this would be in a database
const users = [
  { id: 1, email: "admin@medsync.com", password: "admin123", role: "admin", name: "Admin User" },
  { id: 2, email: "doctor@medsync.com", password: "doctor123", role: "doctor", name: "Dr. Sarah Johnson" },
  { id: 3, email: "receptionist@medsync.com", password: "recep123", role: "receptionist", name: "Reception Staff" },
  { id: 4, email: "pharmacist@medsync.com", password: "pharma123", role: "pharmacist", name: "Pharmacy Staff" },
  { id: 5, email: "lab@medsync.com", password: "lab123", role: "lab", name: "Lab Technician" },
  { id: 6, email: "patient@medsync.com", password: "patient123", role: "patient", name: "John Patient" },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email && u.password === password && u.role === role)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
