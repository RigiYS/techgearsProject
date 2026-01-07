import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'

const notifications = [
  {
    id: 1,
    message: 'Hello, loyal customers! Your order with number #T123T is currently being processed. Thank you for shopping at our store 💗',
    time: '2 hours ago'
  },
  {
    id: 2,
    message: '📦 Good news! Your order is being delivered to the destination address. Please prepare Rp 200,000 💵 You can track the delivery status via the Track Order menu.',
    time: '5 hours ago'
  },
  {
    id: 3,
    message: '🎉 Come check out our exciting promotions! Get up to 50% off on selected products this week ⭐ Click here to see all promotions',
    time: '1 day ago'
  },
  {
    id: 4,
    message: 'Hello, loyal customers! Your order with number #T123T is currently being processed. Thank you for shopping at our store 💗',
    time: '2 days ago'
  },
]

export default function Notification() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/account" className="hover:text-black">Account</Link>
          <span className="mx-2">/</span>
          <span>Notification</span>
        </div>

        <h1 className="text-3xl font-semibold mb-8">Notifications</h1>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-blue-100 rounded p-6 flex gap-4">
              <MessageSquare className="w-6 h-6 flex-shrink-0" />
              <div className="flex-1">
                <p className="mb-2">{notification.message}</p>
                <span className="text-sm text-gray-600">{notification.time}</span>
              </div>
              <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

