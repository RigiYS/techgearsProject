import { Link } from 'react-router-dom'
import { Send, Headphones } from 'lucide-react'
import { useState } from 'react'

export default function LiveChat() {
  const [message, setMessage] = useState('')

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/account" className="hover:text-black">Account</Link>
          <span className="mx-2">/</span>
          <Link to="/products/gaming" className="hover:text-black">Gaming</Link>
          <span className="mx-2">/</span>
          <Link to="/products/havic-hv-g-92-gamepad" className="hover:text-black">Havic HV G-92 Gamepad</Link>
          <span className="mx-2">/</span>
          <span>Live Chat</span>
        </div>

        <h1 className="text-3xl font-semibold mb-8">Live Chat</h1>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-[500px] p-6 space-y-6 overflow-y-auto">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-md">
                <div className="bg-blue-100 rounded-lg p-4">
                  <p>Hello, welcome to our store! 💗</p>
                  <p>Looking for a specific product? Let me help you choose the most suitable one~</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <div className="max-w-md">
                <div className="bg-gray-200 rounded-lg p-4">
                  <p>Is size M still available for this shirt?</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-md">
                <div className="bg-blue-100 rounded-lg p-4">
                  <p>Yes, size M for this shirt is still available! 😊</p>
                  <p>Please proceed with your order before it runs out 😊</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

