'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { signupUser } from '@/lib/api'

export default function SignupForm() {
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
      await signupUser(email, password)

      // Redirect after successful signup
      router.push('/login')

    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-indigo-500/10 to-violet-500/20 blur-3xl opacity-60" />

      <div className="relative z-10 w-full max-w-md px-4">

        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            CLARITY
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            RBI Compliance Intelligence Platform
          </p>
        </div>

        {/* Card */}
        <Card className="backdrop-blur-xl bg-card/70 border border-border/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">

              {error && (
                <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                  {error}
                </div>
              )}

              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/25"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>

            </form>

            <p className="text-sm mt-6 text-center text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Secure access powered by JWT Authentication
        </p>

      </div>
    </div>
  )
}