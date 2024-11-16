import { Button } from "@/components/ui/button"

interface EmergencyContactProps {
  name: string
  phone: string
}

export function EmergencyContact({ name, phone }: EmergencyContactProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{phone}</p>
      </div>
      <Button variant="outline" size="sm">Call</Button>
    </li>
  )
}