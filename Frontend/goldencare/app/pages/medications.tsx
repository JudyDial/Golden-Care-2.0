import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export default function Medications() {
    return (
    <div className="space-y-6">
         <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Manage your healthcare visits</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <AppointmentItem doctor="Dr. Smith" specialty="Cardiologist" date="May 15, 2024" time="10:00 AM" />
                <AppointmentItem doctor="Dr. Johnson" specialty="Endocrinologist" date="May 22, 2024" time="2:00 PM" />
              </ul>
              <Button className="mt-6">Schedule New Appointment</Button>
            </CardContent>
          </Card>
    </div>
    );
}
interface AppointmentItemProps {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
}

  function AppointmentItem({ doctor, specialty, date, time }:AppointmentItemProps ) {
    return (
      <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <h4 className="font-semibold">{doctor}</h4>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">{date}</p>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
      </li>
    )
  }
  