import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Account() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <span>My Account</span>
          </div>
          <div>
            Welcome! <span className="text-secondary">{user?.name || 'Md Rimel'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Manage My Account</h3>
              <ul className="space-y-2 pl-6">
                <li>
                  <Link to="/account" className="text-secondary">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/account/address" className="text-gray-600 hover:text-black">
                    Address Book
                  </Link>
                </li>
                <li>
                  <Link to="/account/payment" className="text-gray-600 hover:text-black">
                    My Payment Options
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">My Orders</h3>
              <ul className="space-y-2 pl-6">
                <li>
                  <Link to="/account/returns" className="text-gray-600 hover:text-black">
                    My Returns
                  </Link>
                </li>
                <li>
                  <Link to="/account/cancellations" className="text-gray-600 hover:text-black">
                    My Cancellations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">My Wishlist</h3>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-secondary text-xl font-medium mb-6">Edit Your Profile</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Md"
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Rimel"
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="rimel1111@gmail.com"
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Address</label>
                    <input
                      type="text"
                      defaultValue="Kingston, 5236, United State"
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Password Changes</h3>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-12 py-3 hover:bg-gray-100 rounded transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-secondary text-white px-12 py-3 rounded hover:bg-secondary/90 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

