import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import { PortalSection } from '../types'

const FinancesPage = () => {
  const portalSections: PortalSection[] = [
    {
      id: 'academics',
      title: 'Academics',
      description: 'Access grades, transcripts, and degree/graduation progress',
      path: '/academics'
    },
    {
      id: 'registration',
      title: 'Registration',
      description: 'Register for classes, view your schedule, and plan your courses',
      path: '/registration'
    },
    {
      id: 'finances',
      title: 'Finances',
      description: 'View your financial information and pay your bills',
      path: '/finances'
    },
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'View your personal information and settings',
      path: '/personal'
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Access academic resources, support services, and more',
      path: '/resources'
    }
  ]

  const navigationItems = portalSections.map(section => ({
    label: section.title,
    path: section.path
  }))

  return (
    <div className="min-h-screen">
      <Navigation items={navigationItems} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Finances
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            View your financial information and pay your bills
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View Bill</h2>
            <p className="text-gray-600 mb-4">View your current tuition and fee statement</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Bill →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Make Payment</h2>
            <p className="text-gray-600 mb-4">Pay your tuition and fees online</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Pay Now →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Financial Aid</h2>
            <p className="text-gray-600 mb-4">View your financial aid status and awards</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Aid →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment History</h2>
            <p className="text-gray-600 mb-4">View your past payment transactions</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View History →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Scholarships</h2>
            <p className="text-gray-600 mb-4">View available scholarships and your applications</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Scholarships →
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FinancesPage

