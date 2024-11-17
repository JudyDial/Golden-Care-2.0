'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Activity, Settings, ClipboardList, BarChart, Lock, Shield, Menu, LogOut } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import UserManagement from '@/app/pages/admin/user-management'
import ActivityLogs from '@/app/pages/admin/activity-logs'
import Reports from '@/app/pages/admin/reports'
import Security from '@/app/pages/admin/security'
import SettingsPage from '@/app/pages/admin/settings'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('user-management')

  return (
    <SidebarProvider>
      <div className="w-full flex h-screen bg-gray-100">
        <Sidebar className="hidden md:block">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('user-management')} isActive={activeSection === 'user-management'}>
                      <Users className="mr-2 h-4 w-4" />
                      <span>User Management</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('activity-logs')} isActive={activeSection === 'activity-logs'}>
                      <Activity className="mr-2 h-4 w-4" />
                      <span>Activity Logs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('reports')} isActive={activeSection === 'reports'}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('security')} isActive={activeSection === 'security'}>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Security</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveSection('settings')} isActive={activeSection === 'settings'}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
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
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
            {activeSection === 'user-management' && <UserManagement />}
            {activeSection === 'activity-logs' && <ActivityLogs />}
            {activeSection === 'reports' && <Reports />}
            {activeSection === 'security' && <Security />}
            {activeSection === 'settings' && <SettingsPage />}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">All systems operational.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="text-gray-700">User <strong>Admin</strong> updated security settings.</li>
                    <li className="text-gray-700">New report generated on 2024-11-15.</li>
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
