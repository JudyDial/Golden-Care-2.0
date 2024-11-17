'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AppointmentSchedule() {
  const appointments = [
    { id: 1, patient: 'John Doe', date: '2024-11-17', time: '10:00 AM' },
    { id: 2, patient: 'Jane Smith', date: '2024-11-18', time: '2:00 PM' },
    { id: 3, patient: 'Robert Johnson', date: '2024-11-19', time: '11:00 AM' },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
      <div className="space-y-4">
        {appointments.map(appointment => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle>Appointment with {appointment.patient}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
