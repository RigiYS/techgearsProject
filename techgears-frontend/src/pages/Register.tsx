import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { AuthAPI } from '@/services/api.service'
import { Eye, EyeOff, ArrowRight, Mail, User, Lock } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await AuthAPI.register(formData)
      const { user, token } = response.data.data
      login(user, token)
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Pendaftaran gagal. Silakan periksa kembali data Anda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sisi Kiri: Visual/Banner (Hidden on Mobile) */}
          <div className="relative hidden lg:block h-[700px]">
            <div className="absolute inset-0 bg-blue-600/10 rounded-3xl z-10" />
            <img
              src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=1200&fit=crop"
              alt="Join TechGears"
              className="w-full h-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute bottom-12 left-12 z-20 text-white drop-shadow-lg">
              <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
              <p className="text-xl opacity-90 max-w-md">Get exclusive access to the best tech devices and exciting offers.</p>
            </div>
          </div>

          {/* Sisi Kanan: Form Register */}
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Create a New Account</h1>
              <p className="text-gray-500">Fill in the details below to join TechGears</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r shadow-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Nama */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Input Email */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                  <Mail size={14} /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Input Password */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                  <Lock size={14} /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Input Confirm Password */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                  <Lock size={14} /> Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirmation ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="Repeat your password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswordConfirmation ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 font-semibold shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  <>
                    Register Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-blue-600 hover:underline">
                    Log In Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}