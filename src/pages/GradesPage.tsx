import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import { PortalSection } from '../types'

const GradesPage = () => {
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
            Grades
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            View your current and past course grades
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View Grades</h2>
            <p className="text-gray-600 mb-4">View your grades for the current term</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Grades →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unofficial Transcript</h2>
            <p className="text-gray-600 mb-4">View an unofficial transcript of your grades</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Unofficial Transcript →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Official Transcript</h2>
            <p className="text-gray-600 mb-4">Request an official transcript of your grades and/or view request status</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Request or View Status →
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default GradesPage

