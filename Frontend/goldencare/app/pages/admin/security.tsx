import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function Security() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Configure and monitor security settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <SecuritySetting name="Two-factor Authentication" status="Enabled" />
            <SecuritySetting name="Firewall Protection" status="Enabled" />
            <SecuritySetting name="Data Encryption" status="Enabled" />
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

interface SecuritySettingProps {
  name: string
  status: string
}

function SecuritySetting({ name, status }: SecuritySettingProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <span>{name}</span>
      <span className={`text-sm font-medium ${status === 'Enabled' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
    </li>
  )
}
