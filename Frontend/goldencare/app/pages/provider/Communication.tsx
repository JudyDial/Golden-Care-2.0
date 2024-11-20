'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Communication() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const dummyData = [
    {
      id: '1',
      patient: 'John Doe',
      messages: [
        { type: 'sent', content: 'Please check your vitals.', date: '2024-11-15' },
        { type: 'received', content: 'I have checked them, all good.', date: '2024-11-15' },
      ],
    },
    {
      id: '2',
      patient: 'Jane Smith',
      messages: [
        { type: 'sent', content: 'Reminder for your appointment tomorrow.', date: '2024-11-14' },
        { type: 'received', content: 'Thank you for the reminder.', date: '2024-11-14' },
      ],
    },
  ]

  const handleSendMessage = () => {
    alert('Message sent!')
  }

  const handleSelectChat = (id: string) => {
    setSelectedChat(id)
  }

  const selectedChatData = dummyData.find((chat) => chat.id === selectedChat)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Previous Communications</h2>
        <ul className="space-y-2">
          {dummyData.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 rounded cursor-pointer ${
                selectedChat === chat.id ? 'bg-blue-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <strong>{chat.patient}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-50 p-6">
        {selectedChatData ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Chat with {selectedChatData.patient}</h2>
            <div className="space-y-4 bg-white p-4 rounded shadow-md h-96 overflow-y-auto">
              {selectedChatData.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === 'sent' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      message.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="block text-xs text-gray-500 mt-1">{message.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Input placeholder="Type your message" className="mb-2" />
              <Button onClick={handleSendMessage}>Send Message</Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Select a conversation to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
