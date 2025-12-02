import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import { PortalSection } from '../types'

const DegreePage = () => {
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
          <Link to="/academics" className="text-blue-600 hover:text-blue-800 hover:underline">
            ← Back to Academics
          </Link>
        </div>

        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Degree
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Track your degree progress and requirements
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Degree Works</h2>
            <p className="text-gray-600 mb-4">Track your progress toward your degree</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Degree Works →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Degrees, Majors, Minors, and Certificates</h2>
            <p className="text-gray-600 mb-4">View requirements for your degrees, majors, minors, and certificates</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Degrees, Majors, Minors, and Certificates →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Enrollment/Degree Verification</h2>
            <p className="text-gray-600 mb-4">View or request your enrollment and degree verification</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Enrollment/Degree Verification →
            </button>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Request Enrollment/Degree Verification →
            </button>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">More Resources:</h4>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              National Student Clearinghouse →
            </button>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              CeCredentials →
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DegreePage

