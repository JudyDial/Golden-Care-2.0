import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Appointments() {
    return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Medication Schedule</CardTitle>
                <CardDescription>Keep track of your daily medications</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                <MedicationItem name="Lisinopril" dosage="10mg" frequency="Once daily" time="8:00 AM" />
                <MedicationItem name="Metformin" dosage="500mg" frequency="Twice daily" time="8:00 AM, 8:00 PM" />
                <MedicationItem name="Simvastatin" dosage="20mg" frequency="Once daily" time="9:00 PM" />
                </ul>
            </CardContent>
        </Card>
    </div>
    );
}
interface MedicationItemProps {
    name: string;
    dosage: string;
    frequency: string;
    time: string;
  }

function MedicationItem({ name, dosage, frequency, time }:MedicationItemProps ) {
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
  
