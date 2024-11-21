'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Medications() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [appointments, setAppointments] = useState<Appointment[]>([
        { doctor: "Dr. Smith", specialty: "Cardiologist", date: "May 15, 2024", time: "10:00 AM", reason: "Routine Checkup", status: "scheduled" },
        { doctor: "Dr. Johnson", specialty: "Endocrinologist", date: "May 22, 2024", time: "2:00 PM", reason: "Thyroid Check", status: "scheduled" }
    ])

    const handleAddAppointment = (newAppointment: Appointment) => {
        setAppointments([...appointments, newAppointment])
        setModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Manage your healthcare visits</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {appointments.map((appointment, index) => (
                            <AppointmentItem key={index} {...appointment} />
                        ))}
                    </ul>
                    <Button className="mt-6" onClick={() => setModalOpen(true)}>
                        Schedule New Appointment
                    </Button>
                </CardContent>
            </Card>

            {isModalOpen && (
                <AppointmentModal
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleAddAppointment}
                />
            )}
        </div>
    )
}

interface Appointment {
    doctor: string
    specialty: string
    date: string
    time: string
    reason: string
    status: "scheduled" | "completed" | "cancelled" | "no show"
}

function AppointmentItem({ doctor, specialty, date, time, reason, status }: Appointment) {
    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div>
                <h4 className="font-semibold">{doctor}</h4>
                <p className="text-sm text-gray-600">{specialty}</p>
                <p className="text-sm text-gray-600">{reason}</p>
            </div>
            <div className="text-right">
                <p className="font-medium">{date}</p>
                <p className="text-sm text-gray-600">{time}</p>
                <span className={`px-2 py-1 text-xs rounded-lg ${status === 'scheduled' ? 'bg-blue-100 text-blue-700' : status === 'completed' ? 'bg-green-100 text-green-700' : status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {status}
                </span>
            </div>
        </li>
    )
}

function AppointmentModal({ onClose, onSubmit }: { onClose: () => void, onSubmit: (appointment: Appointment) => void }) {
    const [doctor, setDoctor] = useState('')
    const [specialty, setSpecialty] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [reason, setReason] = useState('')

    const handleSubmit = () => {
        const newAppointment: Appointment = {
            doctor,
            specialty,
            date,
            time,
            reason,
            status: 'scheduled'
        }
        onSubmit(newAppointment)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Schedule New Appointment</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Provider (Doctor)</label>
                        <input
                            type="text"
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter doctor name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Specialty</label>
                        <input
                            type="text"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter specialty"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Reason</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter reason for appointment"
                        />
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
