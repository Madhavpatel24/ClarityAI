// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { loginUser } from "@/lib/api";

// export default function LoginForm() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setIsLoading(true)

//     try {
//       const data = await loginUser(email, password)
//       localStorage.setItem("clarity_token", data.access_token)
//       router.push("/")
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Sign In</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && <p className="text-red-500">{error}</p>}

//             <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//             <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

//             <Button className="w-full">
//               {isLoading ? "Signing in..." : "Login"}
//             </Button>
//           </form>

//           <p className="text-sm mt-4 text-center">
//             No account? <Link href="/signup">Create one</Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

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
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-indigo-500/10 to-violet-500/20 blur-3xl opacity-60">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/20 border-white/30 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-bold">
            Welcome Back
          </CardTitle>
          <p className="text-white/80 text-sm">Sign in to your Clarity AI account</p>
        </CardHeader>

        <CardContent className="space-y-6 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm">
                <p className="text-red-100 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-lg bg-white/70 backdrop-blur-sm border-white/50 focus:border-white focus:ring-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>

              <div>
                <Input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 text-lg bg-white/70 backdrop-blur-sm border-white/50 focus:border-white focus:ring-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-white/90 hover:bg-white backdrop-blur-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-0.5 transition-all duration-300 border-2 border-white/50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-white/70 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white font-semibold hover:text-white/90 underline underline-offset-2 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
