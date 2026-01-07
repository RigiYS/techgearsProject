import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>Privacy Policy</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-gray-700">
                We collect information you provide directly to us, such as when you create an 
                account, make a purchase, or contact customer service. This information may 
                include your name, email address, postal address, phone number, and payment information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700">
                We use the information we collect to process transactions, send you order 
                confirmations, respond to your requests, personalize your experience, and 
                improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-gray-700">
                We do not sell, trade, or otherwise transfer your personal information to 
                outside parties except to provide products or services you've requested, when 
                we have your permission, or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-gray-700">
                We implement a variety of security measures to maintain the safety of your 
                personal information. Your personal information is contained behind secured 
                networks and is only accessible by a limited number of persons who have special 
                access rights to such systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p className="text-gray-700">
                We use cookies to enhance your experience, gather general visitor information, 
                and track visits to our website. You can choose to have your computer warn you 
                each time a cookie is being sent, or you can choose to turn off all cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Changes to Privacy Policy</h2>
              <p className="text-gray-700">
                We reserve the right to update this privacy policy at any time. We will notify 
                you about significant changes by sending a notice to the email address specified 
                in your account or by placing a prominent notice on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

