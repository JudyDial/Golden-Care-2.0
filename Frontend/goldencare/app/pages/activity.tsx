import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ActivityPage() {
    return (
    <div className="space-y-6">
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
    </div>
    );
}
interface ActivityCardProps {
  title: string;
  value: string;
  goal: string;
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
