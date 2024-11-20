'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AppointmentSchedule() {
  const appointments = [
    { id: 1, patient: 'John Doe', date: '2024-11-17', time: '10:00 AM' },
    { id: 2, patient: 'Jane Smith', date: '2024-11-18', time: '2:00 PM' },
    { id: 3, patient: 'Robert Johnson', date: '2024-11-19', time: '11:00 AM' },
  ]

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Upcoming Appointments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map(appointment => (
          <Card key={appointment.id} className="bg-blue-100 shadow-lg border border-blue-300">
            <CardHeader className="bg-blue-700 text-white p-4 rounded-t">
              <CardTitle className="text-lg font-semibold">
                Appointment with {appointment.patient}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-blue-800"><strong>Date:</strong> {appointment.date}</p>
              <p className="text-blue-800"><strong>Time:</strong> {appointment.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
