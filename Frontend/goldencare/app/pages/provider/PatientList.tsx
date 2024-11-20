'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

export default function PatientList() {
  const patients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', lastCheckup: '2024-11-12' },
    { id: 2, name: 'Jane Smith', age: 38, condition: 'Diabetes', lastCheckup: '2024-11-10' },
    { id: 3, name: 'Robert Johnson', age: 50, condition: 'Asthma', lastCheckup: '2024-11-08' },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Assigned Patients</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table className="min-w-full border-collapse">
          <TableHeader className="bg-blue-600 text-white">
            <TableRow>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wide">
                ID
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wide">
                Name
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wide">
                Age
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wide">
                Condition
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wide">
                Last Checkup
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={patient.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-blue-100 transition duration-200`}
              >
                <TableCell className="py-3 px-4 text-gray-700">{patient.id}</TableCell>
                <TableCell className="py-3 px-4 text-gray-700">{patient.name}</TableCell>
                <TableCell className="py-3 px-4 text-gray-700">{patient.age}</TableCell>
                <TableCell className="py-3 px-4 text-gray-700">{patient.condition}</TableCell>
                <TableCell className="py-3 px-4 text-gray-700">{patient.lastCheckup}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
