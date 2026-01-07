import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order by going to My Account > Orders and clicking on the track button for your specific order.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all items. Items must be in original condition with tags attached.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.'
  },
  {
    question: 'How can I contact customer service?',
    answer: 'You can reach us via email at support@exclusive.com or call us at +88015-88888-9999. We are available 24/7.'
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>FAQ</span>
        </div>

        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 border-t bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

