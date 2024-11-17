import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Update system preferences and configurations.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <SettingItem name="Notification Preferences" value="Enabled" />
            <SettingItem name="Language" value="English" />
            <SettingItem name="Timezone" value="UTC-5" />
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
      <span>{name}</span>
      <span className="text-sm text-gray-600">{value}</span>
    </li>
  )
}
