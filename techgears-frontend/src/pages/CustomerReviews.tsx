import { Link } from 'react-router-dom'
import { Star, ThumbsUp, MessageSquare } from 'lucide-react'

const reviews = [
  {
    id: 1,
    customer: 'Customer **1',
    rating: 4,
    title: 'Great for the price.',
    review: "I've tried playing PES and Genshin, and everything works well. The buttons are nice to press, and the vibration is solid. The only thing is that the cable is a bit short, and sometimes it takes a little while to be recognized by the PC. Overall, it's worth it!",
    likes: 203,
    dislikes: 8,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 2,
    customer: 'Customer **2',
    rating: 4,
    title: 'Highly recommended!',
    review: "The gamepad works perfectly! I've tried it on my PC and laptop, and it's plug and play without any hassle. The buttons are soft, the response is fast, and the vibration feels like an expensive console stick. The design is cool and comfortable in the hand. Fast delivery and the item arrived in good condition. Definitely a great product.",
    likes: 199,
    dislikes: 2,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 3,
    customer: 'Customer **3',
    rating: 3,
    title: '',
    review: "This Havic HV-G92 gamepad is quite good for casual gaming. The buttons are responsive, but the materials feel cheap and the cable is a bit stiff. It's suitable for beginners, but don't expect the same performance as the original stick.",
    likes: 108,
    dislikes: 21,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 4,
    customer: 'Customer **4',
    rating: 4,
    title: 'Great for the price.',
    review: "I've tried playing PES and Genshin, and everything works well. The buttons are nice to press, and the vibration is solid. The only thing is that the cable is a bit short, and sometimes it takes a little while to be recognized by the PC. Overall, it's worth it!",
    likes: 25,
    dislikes: 3,
    image: 'https://via.placeholder.com/100'
  },
]

export default function CustomerReviews() {
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
          <span>Customer Reviews</span>
        </div>

        <h1 className="text-3xl font-semibold mb-8">Customer Reviews</h1>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border rounded-lg p-6 flex gap-6">
              <div className="flex-shrink-0">
                <img src={review.image} alt={review.customer} className="w-20 h-20 rounded" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{review.customer}</h3>
                    <div className="flex text-yellow-400 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {review.title && (
                  <p className="font-medium mb-2">👍 "{review.title}"</p>
                )}

                <p className="text-gray-700 mb-4">{review.review}</p>

                <div className="flex items-center gap-6 text-sm">
                  <button className="flex items-center gap-2 hover:text-primary">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-primary">
                    <MessageSquare className="w-4 h-4" />
                    <span>{review.dislikes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

