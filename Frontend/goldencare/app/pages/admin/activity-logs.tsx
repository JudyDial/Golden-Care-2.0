import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ActivityLogs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>Monitor user activities and system events.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <LogItem activity="User John Doe updated profile settings." time="2024-11-16 10:30 AM" />
            <LogItem activity="Jane Smith added a new user." time="2024-11-15 3:00 PM" />
            <LogItem activity="System maintenance completed." time="2024-11-14 11:00 PM" />
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

interface LogItemProps {
  activity: string
  time: string
}

function LogItem({ activity, time }: LogItemProps) {
  return (
    <li className="flex justify-between p-4 bg-white rounded-lg shadow">
      <span>{activity}</span>
      <span className="text-sm text-gray-500">{time}</span>
    </li>
  )
}
