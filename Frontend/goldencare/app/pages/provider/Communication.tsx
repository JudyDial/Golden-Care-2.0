'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Communication() {
  const handleSendMessage = () => {
    alert('Message sent!')
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Communications</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Send a Message to a Patient</h3>
          <Input placeholder="Enter patient name or ID" className="mb-2" />
          <Input placeholder="Type your message" className="mb-2" />
          <Button onClick={handleSendMessage}>Send Message</Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Recent Messages</h3>
          <ul className="space-y-2">
            <li><strong>To John Doe:</strong> Please check your vitals. (2024-11-15)</li>
            <li><strong>To Jane Smith:</strong> Reminder for your appointment tomorrow. (2024-11-14)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
