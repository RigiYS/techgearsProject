import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { AuthAPI } from '@/services/api.service'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Direct login without CSRF (using token-based auth)
      const response = await AuthAPI.login({ email, password })

      // Backend returns: { success: true, data: { user, token } }
      const { user, token } = response.data.data
      login(user, token)
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop"
              alt="Shopping"
              className="w-full rounded-lg object-cover"
            />
          </div>

          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl font-medium mb-3">Log in to TechGears</h1>
            <p className="text-gray-600 mb-8">Enter your details below</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pb-2 pr-10 border-b border-gray-300 focus:outline-none focus:border-black transition [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                  style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' } as any}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white px-12 py-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 font-medium shadow-md hover:shadow-lg"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <Link to="/register" className="text-gray-600 hover:text-blue-500 transition">
                    Don't have an account? <span className="font-medium text-blue-500">Create Account</span>
                  </Link>
                  <Link to="/forgot-password" className="text-blue-500 hover:underline">
                    Forget Password?
                  </Link>
                </div>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-gray-700 font-medium mb-2">Test Account:</p>
              <p className="text-xs text-gray-600">Email: <strong>admin@techgears.com</strong></p>
              <p className="text-xs text-gray-600">Password: <strong>password</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
