
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Activity, Calendar, Pill, BookOpen, MessageSquare, PhoneCall, Target, Brain} from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar'
import Vitals from '../../pages/vitals'
import Medications from '../../pages/medications'
import Appointments from '../../pages/appointments'
import ActivityPage from '../../pages/activity'
import ResourcesPage from '../../pages/resources'
import Communication from '@/app/pages/provider/Communication'

// Emergency Contact Modal Component
function EmergencyModal({ isOpen, onClose, message }: { isOpen: boolean, onClose: () => void, message: string }) {
  if (!isOpen) return null

  setTimeout(onClose, 5000) // Close modal after 5 seconds

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-lg font-semibold">{message}</h3>
        <p>This will connect you shortly.</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('vitals')
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const handleEmergencyCall = (message: string) => {
    setModalMessage(message)
    setModalOpen(true)
  }

  return (
    <SidebarProvider>
      <div className="w-full flex h-screen bg-gray-100">
        <Sidebar className="hidden md:block">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Heart className="h-6 w-6 text-blue-700" />
              <span className="text-xl font-bold text-blue-700">SilverWatch</span>
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
          </SidebarContent>
        </Sidebar>

        <div className="w-full flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
            {activeSection === 'vitals' && <Vitals />}
            {activeSection === 'medications' && <Medications />}
            {activeSection === 'appointments' && <Appointments />}
            {activeSection === 'activity' && <ActivityPage />}
            {activeSection === 'resources' && <ResourcesPage />}
            {activeSection === 'communication' && <Communication />}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <EmergencyContact name="John Doe (Son)" phone="(555) 123-4567" onCall={() => handleEmergencyCall('Calling John Doe (Son)...')} />
                    <EmergencyContact name="Jane Smith (Daughter)" phone="(555) 987-6543" onCall={() => handleEmergencyCall('Calling Jane Smith (Daughter)...')} />
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => setActiveSection('communication')} className="flex items-center justify-center">
                      <MessageSquare className="mr-2" size={16} />
                      Message Doctor
                    </Button>
                    <Button onClick={() => handleEmergencyCall('Calling Emergency Services...')} className="flex items-center justify-center">
                      <PhoneCall className="mr-2" size={16} />
                      Emergency Call
                    </Button>
                    <Button onClick={() => setActiveSection('activity')} className="flex items-center justify-center">
                      <Target className="mr-2" size={16} />
                      Set Health Goal
                    </Button>
                    <Button onClick={() => setActiveSection('appointments')} className="flex items-center justify-center">
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

      {/* Emergency Modal */}
      <EmergencyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
    </SidebarProvider>
  )
}

interface EmergencyContactProps {
  name: string
  phone: string
  onCall: () => void
}

function EmergencyContact({ name, phone, onCall }: EmergencyContactProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{phone}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onCall}>
        Call
      </Button>
    </li>
  )
}
