import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import { PortalSection } from '../types'

const PersonalPage = () => {
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
            Personal Information
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            View your personal information and settings
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Profile</h2>
            <p className="text-gray-600 mb-4">View and update your personal information</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View Profile →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Parent/Guardian and Emergency Contact Information</h2>
            <p className="text-gray-600 mb-4">Update your parent/guardian and emergency contact information</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Update Parent/Guardian and Emergency Contacts →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Name Pronunciation</h2>
            <p className="text-gray-600 mb-4">Update your name pronunciation preferences</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Update Name Pronunciation →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Manage Directory Information</h2>
            <p className="text-gray-600 mb-4">Manage your directory and privacy preferences</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              Manage Directory Information →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">E-Questionnaires</h2>
            <p className="text-gray-600 mb-4">View and complete your e-questionnaires</p>
            <button className="text-blue-600 hover:text-blue-800 hover:underline">
              View E-Questionnaires →
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PersonalPage

