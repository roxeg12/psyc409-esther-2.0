import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import { PortalSection } from '../types'

const ResourcesPage = () => {
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
            Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Access academic resources, support services, and more
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Library Resources</h2>
            <p className="text-gray-600 mb-4">Access library databases, books, and research tools</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Library Services →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Academic Support</h2>
            <p className="text-gray-600 mb-4">Tutoring, study groups, and academic assistance</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Get Support →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Career Services</h2>
            <p className="text-gray-600 mb-4">Career counseling, job search, and internship resources</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Career Center →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Health & Wellness</h2>
            <p className="text-gray-600 mb-4">Student health services and counseling resources</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Health Services →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Housing & Dining</h2>
            <p className="text-gray-600 mb-4">Housing information and dining services</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Housing Info →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Organizations</h2>
            <p className="text-gray-600 mb-4">Browse and join student clubs and organizations</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Organizations →
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResourcesPage

