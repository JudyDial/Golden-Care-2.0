import { Card, CardContent } from "@/components/ui/card"

interface ActivityCardProps {
  title: string
  value: string
  goal: string
}

export function ActivityCard({ title, value, goal }: ActivityCardProps) {
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