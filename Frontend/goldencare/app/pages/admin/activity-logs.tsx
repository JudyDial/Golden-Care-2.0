import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ActivityLogs() {
  const logsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy activity log data
  const allLogs = [
    { activity: 'User John Doe updated profile settings.', time: '2024-11-16 10:30 AM' },
    { activity: 'Jane Smith added a new user.', time: '2024-11-15 3:00 PM' },
    { activity: 'System maintenance completed.', time: '2024-11-14 11:00 PM' },
    { activity: 'User Mark Taylor logged in.', time: '2024-11-13 9:45 AM' },
    { activity: 'David Lee changed security settings.', time: '2024-11-12 8:00 PM' },
    { activity: 'Sarah Miller updated account details.', time: '2024-11-11 7:30 PM' },
    { activity: 'Admin Alice Brown added a new report.', time: '2024-11-10 6:00 PM' },
    { activity: 'Chris Green modified user permissions.', time: '2024-11-09 5:15 PM' },
    { activity: 'Emma White accessed sensitive data.', time: '2024-11-08 4:45 PM' },
    { activity: 'James Black logged out.', time: '2024-11-07 3:00 PM' },
    // More log data as needed
  ];

  // Calculate logs for the current page
  const startIndex = (currentPage - 1) * logsPerPage;
  const currentLogs = allLogs.slice(startIndex, startIndex + logsPerPage);

  // Pagination logic
  const totalPages = Math.ceil(allLogs.length / logsPerPage);

  return (
    <div className="space-y-6">
      <Card className="border-blue-600 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-600">Activity Logs</CardTitle>
          <CardDescription>Monitor user activities and system events.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {currentLogs.map((log, index) => (
              <LogItem key={index} activity={log.activity} time={log.time} />
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

interface LogItemProps {
  activity: string;
  time: string;
}

function LogItem({ activity, time }: LogItemProps) {
  return (
    <li className="flex justify-between p-4 bg-white rounded-lg shadow">
      <span>{activity}</span>
      <span className="text-sm text-gray-500">{time}</span>
      {/* Link to a detailed log view */}
      <Link href={`/admin/activity-logs/${activity}`} passHref>
        <Button variant="link" size="sm" className="text-blue-600">
          View Details
        </Button>
      </Link>
    </li>
  );
}
