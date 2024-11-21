'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAuth } from '@/context/authContext'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [userType, setUserType] = useState('user') // Default to 'user'
  const router = useRouter()

  const { signUp, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== password2) {
      alert('Passwords do not match')
      return
    }

    try {
      await signUp(email, password, password2, userType)
      router.push('/login')
    } catch (error) {
      console.error('Sign up failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Heart className="mx-auto h-12 w-auto text-blue-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-blue-600">
          Or{' '}
          <Link href="/Login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-blue-700">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-blue-700">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="password2" className="text-blue-700">Confirm Password</Label>
              <Input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="user-type" className="text-blue-700">User Type</Label>
              <RadioGroup selectedValue={userType} onChange={setUserType}>
                <RadioGroupItem value="provider" label="Provider" id="provider"  checked={userType === "provider"} onChange={() => setUserType("provider")} />
                <RadioGroupItem value="user" label="User" id="user"  checked={userType === "user"} onChange={() => setUserType("user")} />
              </RadioGroup>
            </div>

            <div>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white m-auto flex items-center"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign up'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
