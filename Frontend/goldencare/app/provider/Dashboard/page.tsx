'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Users, ClipboardList, BarChart, Calendar, MessageSquare, LogOut, Shield, Menu } from 'lucide-react'

import PatientList from '@/app/pages/provider/PatientList'
import VitalMonitor from '@/app/pages/provider/VitalMonitor'
import AppointmentSchedule from '@/app/pages/provider/AppointmentSchedule'
import Communication from '@/app/pages/provider/Communication'

export default function ProviderDashboard() {
  const [activeSection, setActiveSection] = useState('patient-list')

  return (
    <SidebarProvider>
      <div className="w-full flex h-screen bg-gray-100">
        <Sidebar className="hidden md:block">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Provider Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Patient Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('patient-list')} isActive={activeSection === 'patient-list'}>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Patients</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('vital-monitor')} isActive={activeSection === 'vital-monitor'}>
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Vital Monitor</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('appointment-schedule')} isActive={activeSection === 'appointment-schedule'}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Appointments</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('communication')} isActive={activeSection === 'communication'}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Communications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="w-full flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <SidebarTrigger className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </SidebarTrigger>
                  <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
            {activeSection === 'patient-list' && <PatientList />}
            {activeSection === 'vital-monitor' && <VitalMonitor />}
            {activeSection === 'appointment-schedule' && <AppointmentSchedule />}
            {activeSection === 'communication' && <Communication />}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-gray-700">
                    <li>You have <strong>12 patients</strong> assigned to you.</li>
                    <li><strong>3 appointments</strong> scheduled for today.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-gray-700">
                    <li>New vital alert for patient <strong>John Doe</strong>.</li>
                    <li>Upcoming appointment with <strong>Jane Smith</strong> at 2 PM.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
