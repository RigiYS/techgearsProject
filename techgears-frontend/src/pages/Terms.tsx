import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms Of Use</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms Of Use</h1>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using this website, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-gray-700">
                Permission is granted to temporarily download one copy of the materials 
                (information or software) on Exclusive's website for personal, non-commercial 
                transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
              <p className="text-gray-700">
                The materials on Exclusive's website are provided on an 'as is' basis. 
                Exclusive makes no warranties, expressed or implied, and hereby disclaims and 
                negates all other warranties including, without limitation, implied warranties or 
                conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
              <p className="text-gray-700">
                In no event shall Exclusive or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on Exclusive's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Revisions</h2>
              <p className="text-gray-700">
                The materials appearing on Exclusive's website could include technical, 
                typographical, or photographic errors. Exclusive does not warrant that any of 
                the materials on its website are accurate, complete or current.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

