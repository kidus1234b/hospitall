import { type NextRequest, NextResponse } from "next/server"

// Demo data - in production, this would be in MongoDB
const patients = [
  {
    id: 1,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City, State",
    emergencyContact: "Bob Brown",
    emergencyPhone: "(555) 987-6543",
    bloodType: "O+",
    allergies: "None",
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(patients)
}

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json()

    const newPatient = {
      id: patients.length + 1,
      ...patientData,
      createdAt: new Date().toISOString(),
    }

    patients.push(newPatient)

    return NextResponse.json(newPatient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 })
  }
}
