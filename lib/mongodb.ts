// MongoDB connection utility
// In a real application, you would use this to connect to MongoDB

export interface User {
  _id?: string
  email: string
  password: string
  role: "admin" | "doctor" | "receptionist" | "pharmacist" | "lab" | "patient"
  name: string
  createdAt: Date
}

export interface Patient {
  _id?: string
  name: string
  email: string
  phone: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  bloodType?: string
  allergies?: string
  medicalHistory?: MedicalRecord[]
  createdAt: Date
}

export interface MedicalRecord {
  _id?: string
  patientId: string
  doctorId: string
  date: Date
  diagnosis: string
  prescription: string
  notes?: string
}

export interface Appointment {
  _id?: string
  patientId: string
  doctorId: string
  date: Date
  time: string
  type: string
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  notes?: string
  createdAt: Date
}

export interface Prescription {
  _id?: string
  patientId: string
  doctorId: string
  medication: string
  dosage: string
  instructions: string
  status: "Active" | "Completed" | "Cancelled"
  createdAt: Date
}

export interface LabTest {
  _id?: string
  patientId: string
  doctorId: string
  testType: string
  results?: string
  status: "Pending" | "In Progress" | "Completed"
  priority: "Normal" | "Urgent"
  createdAt: Date
}

export interface Invoice {
  _id?: string
  patientId: string
  amount: number
  description: string
  status: "Pending" | "Paid" | "Overdue"
  dueDate: Date
  createdAt: Date
}

// MongoDB connection would be implemented here
// Example:
/*
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)
export const db = client.db('medsync')
*/
