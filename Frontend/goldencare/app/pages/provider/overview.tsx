'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, ClipboardList, MessageSquare } from 'lucide-react'

export default function Overview() {
  const patients = []

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Dashboard Overview</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200">
          <CardHeader className="flex items-center justify-between p-4 bg-blue-600 rounded-t-lg">
            <CardTitle className="text-white text-base font-semibold">Total Patients</CardTitle>
            <Users className="h-8 w-8 text-white" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-gray-800 text-center">{patients.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200">
          <CardHeader className="flex items-center justify-between p-4 bg-blue-600 rounded-t-lg">
            <CardTitle className="text-white text-base font-semibold">Appointments Today</CardTitle>
            <Calendar className="h-8 w-8 text-white" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-gray-800 text-center">3</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200">
          <CardHeader className="flex items-center justify-between p-4 bg-blue-600 rounded-t-lg">
            <CardTitle className="text-white text-base font-semibold">Pending Reports</CardTitle>
            <ClipboardList className="h-8 w-8 text-white" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-gray-800 text-center">7</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200">
          <CardHeader className="flex items-center justify-between p-4 bg-blue-600 rounded-t-lg">
            <CardTitle className="text-white text-base font-semibold">Messages</CardTitle>
            <MessageSquare className="h-8 w-8 text-white" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-gray-800 text-center">12</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
