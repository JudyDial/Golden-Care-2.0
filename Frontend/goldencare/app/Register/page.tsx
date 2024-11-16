'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from 'lucide-react'
// import { useAuth } from '@/context/authContext' // Import useAuth from your context

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [userType, setUserType] = useState('subscriber') // Add userType to handle the type of user (if needed)
  const router = useRouter()

//   const { signUp, loading } = useAuth() // Destructure signUp and loading from the context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== password2) {
      alert('Passwords do not match')
      return
    }

    // try {
    //   await signUp(email, password, password2, userType) // Call signUp from context
    //   router.push('/login') // Redirect after successful signup
    // } catch (error) {
    //   console.error('Sign up failed:', error)
    // }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Heart className="mx-auto h-12 w-auto text-green-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/Login" className="font-medium text-green-600 hover:text-green-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password2">Confirm Password</Label>
              <Input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            {/* Optionally, if you need userType */}
            {/* <div>
              <Label htmlFor="user-type">User Type</Label>
              <RadioGroup selectedValue={userType} onChange={setUserType}>
                <RadioGroupItem value="admin" label="Admin" />
                <RadioGroupItem value="user" label="User" />
              </RadioGroup>
            </div> */}

            <div>
              {/* <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign up'}
              </Button> */}
              <Button type="submit" className="m-auto flex items-center" >
                 Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
