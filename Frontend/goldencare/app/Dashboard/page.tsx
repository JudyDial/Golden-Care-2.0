'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Heart, Activity, Calendar, Bell, Pill, BookOpen, MessageSquare, PhoneCall, Target, Brain, Home, Settings, LogOut, Menu } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

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
      <div className="flex h-screen bg-gray-100">
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

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
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
            {activeSection === 'vitals' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vitals Overview</CardTitle>
                    <CardDescription>Your health metrics at a glance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={vitalsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
                        <Line yAxisId="left" type="monotone" dataKey="bloodPressure" stroke="#82ca9d" name="Blood Pressure" />
                        <Line yAxisId="right" type="monotone" dataKey="oxygenLevel" stroke="#ffc658" name="Oxygen Level" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <VitalCard title="Heart Rate" value="72 bpm" icon={<Heart className="text-red-500" />} />
                  <VitalCard title="Blood Pressure" value="120/80 mmHg" icon={<Activity className="text-blue-500" />} />
                  <VitalCard title="Oxygen Level" value="98%" icon={<Heart className="text-green-500" />} />
                </div>
              </div>
            )}

            {activeSection === 'medications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Medication Schedule</CardTitle>
                  <CardDescription>Keep track of your daily medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <MedicationItem name="Lisinopril" dosage="10mg" frequency="Once daily" time="8:00 AM" />
                    <MedicationItem name="Metformin" dosage="500mg" frequency="Twice daily" time="8:00 AM, 8:00 PM" />
                    <MedicationItem name="Simvastatin" dosage="20mg" frequency="Once daily" time="9:00 PM" />
                  </ul>
                </CardContent>
              </Card>
            )}

            {activeSection === 'appointments' && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Manage your healthcare visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <AppointmentItem doctor="Dr. Smith" specialty="Cardiologist" date="May 15, 2024" time="10:00 AM" />
                    <AppointmentItem doctor="Dr. Johnson" specialty="Endocrinologist" date="May 22, 2024" time="2:00 PM" />
                  </ul>
                  <Button className="mt-6">Schedule New Appointment</Button>
                </CardContent>
              </Card>
            )}

            {activeSection === 'activity' && (
              <Card>
                <CardHeader>
                  <CardTitle>Activity Tracking</CardTitle>
                  <CardDescription>Monitor your daily movement and exercise</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ActivityCard title="Steps" value="7,532" goal="10,000" />
                    <ActivityCard title="Active Minutes" value="45" goal="60" />
                    <ActivityCard title="Calories Burned" value="320" goal="500" />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'resources' && (
              <Card>
                <CardHeader>
                  <CardTitle>Educational Resources</CardTitle>
                  <CardDescription>Learn more about managing your health</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <ResourceItem title="Understanding Hypertension" type="Article" />
                    <ResourceItem title="Diabetes Management Tips" type="Video" />
                    <ResourceItem title="Importance of Regular Exercise" type="Guide" />
                  </ul>
                </CardContent>
              </Card>
            )}

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
interface VitalCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

interface MedicationItemProps {
  name: string;
  dosage: string;
  frequency: string;
  time: string;
}

interface AppointmentItemProps {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
}

interface ActivityCardProps {
  title: string;
  value: string;
  goal: string;
}

interface ResourceItemProps {
  title: string;
  type: string;
}

interface EmergencyContactProps {
  name: string;
  phone: string;
}
function VitalCard({ title, value, icon }:VitalCardProps ) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function MedicationItem({ name, dosage, frequency, time }:MedicationItemProps ) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{dosage} - {frequency}</p>
      </div>
      <div className="text-sm font-medium text-green-600">{time}</div>
    </li>
  )
}

function AppointmentItem({ doctor, specialty, date, time }:AppointmentItemProps ) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold">{doctor}</h4>
        <p className="text-sm text-gray-600">{specialty}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{date}</p>
        <p className="text-sm text-gray-600">{time}</p>
      </div>
    </li>
  )
}

function ActivityCard({ title, value, goal }:ActivityCardProps ) {
  const percentage = (parseInt(value) / parseInt(goal)) * 100
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <div className="mt-2 bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">Goal: {goal}</p>
      </CardContent>
    </Card>
  )
}

function ResourceItem({ title, type }:ResourceItemProps ) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <h4 className="font-semibold">{title}</h4>
      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">{type}</span>
    </li>
  )
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