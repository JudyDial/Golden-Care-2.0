import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function Security() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-600 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-600">Security</CardTitle>
          <CardDescription className="text-blue-500">Configure and monitor security settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <SecuritySetting name="Two-factor Authentication" status="Enabled" />
            <SecuritySetting name="Firewall Protection" status="Enabled" />
            <SecuritySetting name="Data Encryption" status="Enabled" />
            <SecuritySetting name="Password Strength" status="Strong" />
            <SecuritySetting name="Access Control" status="Enabled" />
            <SecuritySetting name="Backup Settings" status="Enabled" />
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
      <span className="text-gray-900">{name}</span>
      <span className={`text-sm font-medium ${status === 'Enabled' || status === 'Strong' ? 'text-green-600' : 'text-red-600'}`}>
        {status}
      </span>
    </li>
  )
}
