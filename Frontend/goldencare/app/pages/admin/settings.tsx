import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function SettingsPage() {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    // Check the saved theme preference in localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.add(savedTheme) // Set theme class on HTML element
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.remove(theme) // Remove the current theme class
    document.documentElement.classList.add(newTheme) // Add the new theme class
    localStorage.setItem('theme', newTheme) // Save the selected theme to localStorage
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-600 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-600">Settings</CardTitle>
          <CardDescription className="text-blue-500">Update system preferences and configurations.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <SettingItem name="Notification Preferences" value="Enabled" />
            <SettingItem name="Language" value="English" />
            <SettingItem name="Timezone" value="UTC-5" />
            <SettingItem name="Privacy Settings" value="Enabled" />
            <SettingItem name="Account Preferences" value="Standard" />
            <SettingItem
              name="Theme"
              value={theme === 'light' ? 'Light' : 'Dark'}
            />
            <li>
              <button
                onClick={toggleTheme}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Toggle Theme
              </button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

interface SettingItemProps {
  name: string
  value: string
}

function SettingItem({ name, value }: SettingItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <span className="text-gray-900">{name}</span>
      <span className="text-sm text-gray-600">{value}</span>
    </li>
  )
}
