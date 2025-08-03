import { type NextRequest, NextResponse } from "next/server"

// Demo data - in production, this would be in MongoDB
const appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: "Alice Brown",
    doctorId: 1,
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-20",
    time: "10:00 AM",
    type: "Consultation",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(appointments)
}

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    const newAppointment = {
      id: appointments.length + 1,
      ...appointmentData,
      createdAt: new Date().toISOString(),
    }

    appointments.push(newAppointment)

    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
