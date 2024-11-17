'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

export default function PatientList() {
  const patients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', lastCheckup: '2024-11-12' },
    { id: 2, name: 'Jane Smith', age: 38, condition: 'Diabetes', lastCheckup: '2024-11-10' },
    { id: 3, name: 'Robert Johnson', age: 50, condition: 'Asthma', lastCheckup: '2024-11-08' },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Assigned Patients</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Last Checkup</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map(patient => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell>{patient.lastCheckup}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
