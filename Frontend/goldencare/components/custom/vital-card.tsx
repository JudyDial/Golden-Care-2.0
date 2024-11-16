import { Card, CardContent } from "@/components/ui/card"

interface VitalCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

export function VitalCard({ title, value, icon }: VitalCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}