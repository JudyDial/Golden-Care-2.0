'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function VitalMonitor() {
  const vitals = [
    { id: 1, name: 'John Doe', heartRate: 75, bp: '120/80', lastUpdated: '2024-11-16 09:00 AM' },
    { id: 2, name: 'Jane Smith', heartRate: 90, bp: '130/85', lastUpdated: '2024-11-16 08:50 AM' },
    { id: 3, name: 'Robert Johnson', heartRate: 72, bp: '125/82', lastUpdated: '2024-11-16 08:45 AM' },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Real-Time Vital Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vitals.map(vital => (
          <Card key={vital.id}>
            <CardHeader>
              <CardTitle>{vital.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Heart Rate:</strong> {vital.heartRate} bpm</p>
              <p><strong>Blood Pressure:</strong> {vital.bp}</p>
              <p><strong>Last Updated:</strong> {vital.lastUpdated}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
