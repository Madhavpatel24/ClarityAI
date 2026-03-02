'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { loginUser } from "@/lib/api";

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const data = await loginUser(email, password)
      localStorage.setItem("clarity_token", data.access_token)
      router.push("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

            <Button className="w-full">
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="text-sm mt-4 text-center">
            No account? <Link href="/signup">Create one</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}