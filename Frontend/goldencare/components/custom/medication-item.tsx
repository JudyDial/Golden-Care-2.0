interface MedicationItemProps {
    name: string
    dosage: string
    frequency: string
    time: string
  }
  
  export function MedicationItem({ name, dosage, frequency, time }: MedicationItemProps) {
    return (
      <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{dosage} - {frequency}</p>
        </div>
        <div className="text-sm font-medium text-green-600">{time}</div>
      </li>
    )
  }