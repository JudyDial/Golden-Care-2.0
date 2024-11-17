import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function UserManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage users and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <UserItem name="John Doe" email="john.doe@example.com" role="Admin" />
            <UserItem name="Jane Smith" email="jane.smith@example.com" role="Moderator" />
            <UserItem name="Mark Taylor" email="mark.taylor@example.com" role="User" />
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

interface UserItemProps {
  name: string
  email: string
  role: string
}

function UserItem({ name, email, role }: UserItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <div className="text-sm font-medium text-gray-500">{role}</div>
    </li>
  )
}
