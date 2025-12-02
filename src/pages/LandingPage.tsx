import { Link } from 'react-router-dom'
import Navigation from '../components/layout/Navigation'
import { PortalSection } from '../types'

const LandingPage = () => {
  // Placeholder sections - these will be replaced with actual content based on research
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
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Esther
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your central hub for academic resources, services, and information
          </p>
        </section>

        {/* Quick Links Section */}
        <section className="bg-gray-50 rounded-lg p-8 mb-16 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-blue-300">
              <h3 className="font-semibold text-blue-600 hover:text-blue-800 mb-2">Degree Works</h3>
              <p className="text-sm text-gray-600">View your degree progress and requirements</p>
            </div>
            <Link 
              to="/academics/grades" 
              className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-blue-300 block"
            >
              <h3 className="font-semibold text-blue-600 hover:text-blue-800 mb-2">Grades</h3>
              <p className="text-sm text-gray-600">View your grades and academic performance</p>
            </Link>
            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-blue-300">
              <h3 className="font-semibold text-blue-600 hover:text-blue-800 mb-2">Payment Suite</h3>
              <p className="text-sm text-gray-600">View your financial information and pay your bills</p>
            </div>
          </div>
        </section>

        {/* Portal Sections Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {portalSections.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600">
                {section.description}
              </p>
            </Link>
          ))}
        </section>

        
      </div>
    </div>
  )
}

export default LandingPage

