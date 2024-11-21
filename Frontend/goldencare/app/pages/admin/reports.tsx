import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function Reports() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-600 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-600">Reports</CardTitle>
          <CardDescription className="text-blue-500">Review system and user activity reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <ReportItem title="Monthly Activity Report" date="2024-11-01" />
            <ReportItem title="System Health Report" date="2024-11-10" />
            <ReportItem title="User Engagement Report" date="2024-11-15" />
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

interface ReportItemProps {
  title: string
  date: string
}

function ReportItem({ title, date }: ReportItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <button className="text-sm text-blue-600 hover:underline">
        View
      </button>
    </li>
  )
}
