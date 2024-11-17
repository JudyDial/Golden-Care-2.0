'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Activity, Calendar, Bell, Pill, BookOpen, MessageSquare, PhoneCall, Target, Brain, Home, Settings, LogOut, Menu } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Vitals from '../../pages/vitals'
import Medications from '../../pages/medications'
import Appointments from '../../pages/appointments'
import ActivityPage from '../../pages/activity'
import ResourcesPage from '../../pages/resources'

// Mock data for demonstration purposes
const vitalsData = [
  { name: 'Mon', heartRate: 72, bloodPressure: 120, oxygenLevel: 98 },
  { name: 'Tue', heartRate: 75, bloodPressure: 118, oxygenLevel: 97 },
  { name: 'Wed', heartRate: 71, bloodPressure: 122, oxygenLevel: 98 },
  { name: 'Thu', heartRate: 73, bloodPressure: 119, oxygenLevel: 99 },
  { name: 'Fri', heartRate: 74, bloodPressure: 121, oxygenLevel: 98 },
  { name: 'Sat', heartRate: 76, bloodPressure: 117, oxygenLevel: 97 },
  { name: 'Sun', heartRate: 72, bloodPressure: 120, oxygenLevel: 98 },
]

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('vitals')

  return (
    <SidebarProvider>
      <div className="w-full flex h-screen bg-gray-100">
        <Sidebar className="hidden md:block">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Heart className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-600">SilverWatch</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('vitals')} isActive={activeSection === 'vitals'}>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Vitals</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('medications')} isActive={activeSection === 'medications'}>
                      <Pill className="mr-2 h-4 w-4" />
                      <span>Medications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('appointments')} isActive={activeSection === 'appointments'}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Appointments</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('activity')} isActive={activeSection === 'activity'}>
                      <Activity className="mr-2 h-4 w-4" />
                      <span>Activity</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('resources')} isActive={activeSection === 'resources'}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Resources</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button className="w-full text-left">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="w-full flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <SidebarTrigger className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </SidebarTrigger>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                </div>
                <nav className="hidden md:flex space-x-10">
                  {/* Add any additional header items here */}
                </nav>
                <div className="flex items-center justify-end md:flex-1 lg:w-0">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
            {activeSection === 'vitals' && <Vitals />}

            {activeSection === 'medications' && <Medications />}

            {activeSection === 'appointments' && <Appointments /> }

            {activeSection === 'activity' && <ActivityPage />}

            {activeSection === 'resources' && <ResourcesPage />}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <EmergencyContact name="John Doe (Son)" phone="(555) 123-4567" />
                    <EmergencyContact name="Jane Smith (Daughter)" phone="(555) 987-6543" />
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="flex items-center justify-center">
                      <MessageSquare className="mr-2" size={16} />
                      Message Doctor
                    </Button>
                    <Button className="flex items-center justify-center">
                      <PhoneCall className="mr-2" size={16} />
                      Emergency Call
                    </Button>
                    <Button className="flex items-center justify-center">
                      <Target className="mr-2" size={16} />
                      Set Health Goal
                    </Button>
                    <Button className="flex items-center justify-center">
                      <Brain className="mr-2" size={16} />
                      Mental Health Check
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

interface EmergencyContactProps {
  name: string;
  phone: string;
}

function EmergencyContact({ name, phone }:EmergencyContactProps ) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{phone}</p>
      </div>
      <Button variant="outline" size="sm">Call</Button>
    </li>
  )
}