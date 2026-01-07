import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-12">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>404 Error</span>
        </div>

        <div className="max-w-2xl mx-auto text-center py-16">
          <h1 className="text-9xl font-semibold mb-8">404 Not Found</h1>
          <p className="text-lg mb-12">
            Your visited page not found. You may go home page.
          </p>
          <Link
            to="/"
            className="inline-block bg-secondary text-white px-12 py-4 rounded hover:bg-secondary/90 transition"
          >
            Back to home page
          </Link>
        </div>
      </div>
    </div>
  )
}

