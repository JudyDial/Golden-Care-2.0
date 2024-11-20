'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function VitalMonitor() {
  const vitals = [
    { id: 1, name: 'John Doe', heartRate: 75, bp: '120/80', lastUpdated: '2024-11-16 09:00 AM' },
    { id: 2, name: 'Jane Smith', heartRate: 90, bp: '130/85', lastUpdated: '2024-11-16 08:50 AM' },
    { id: 3, name: 'Robert Johnson', heartRate: 72, bp: '125/82', lastUpdated: '2024-11-16 08:45 AM' },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Real-Time Vital Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitals.map(vital => (
          <Card key={vital.id} className="bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-blue-600 text-white p-4 rounded-t-lg">
              <CardTitle className="text-lg font-semibold">{vital.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-2">
                <strong className="text-blue-600">Heart Rate:</strong> {vital.heartRate} bpm
              </p>
              <p className="text-gray-700 mb-2">
                <strong className="text-blue-600">Blood Pressure:</strong> {vital.bp}
              </p>
              <p className="text-gray-700">
                <strong className="text-blue-600">Last Updated:</strong> {vital.lastUpdated}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
