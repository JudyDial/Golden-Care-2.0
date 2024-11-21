import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function UserManagement() {
  const usersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data for users
  const allUsers = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Moderator' },
    { name: 'Mark Taylor', email: 'mark.taylor@example.com', role: 'User' },
    { name: 'Sarah Miller', email: 'sarah.miller@example.com', role: 'Patient' },
    { name: 'David Lee', email: 'david.lee@example.com', role: 'Provider' },
    { name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Admin' },
    { name: 'Chris Green', email: 'chris.green@example.com', role: 'Provider' },
    { name: 'Emma White', email: 'emma.white@example.com', role: 'Patient' },
    { name: 'James Black', email: 'james.black@example.com', role: 'User' },
    { name: 'Liam Wilson', email: 'liam.wilson@example.com', role: 'Moderator' },
    // Add more users as needed
  ];

  // Calculate the users for the current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = allUsers.slice(startIndex, startIndex + usersPerPage);

  // Pagination logic
  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  return (
    <div className="space-y-6">
      <Card className="border-blue-600 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-600">User Management</CardTitle>
          <CardDescription>Manage users and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {currentUsers.map((user, index) => (
              <UserItem key={index} name={user.name} email={user.email} role={user.role} />
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Previous
            </Button>
            <div className="text-sm text-blue-600">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface UserItemProps {
  name: string;
  email: string;
  role: string;
}

function UserItem({ name, email, role }: UserItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold text-blue-600">{name}</h4>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <div className="text-sm font-medium text-gray-500">{role}</div>
      {/* Link to user profile */}
      <Link href={`/admin/users/${name}`} passHref>
        <Button variant="link" size="sm" className="text-blue-600">
          View Profile
        </Button>
      </Link>
    </li>
  );
}
