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

        <section className="mb-12">
          <ul className="space-y-6">
            <li>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Academic Resources</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Registrar Website
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Navigate360
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Graduate Student Time Boundaries
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Life</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Wellbeing and Counseling Center Website
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Ethics Point Website
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Student Health Insurance Website
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Housing and Dining</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Housing and Dining Website
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    2025-2026 Housing Agreement
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Emergency Services</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Rice Alert
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    RUPD Website
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">CLIC</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Language Placement Test
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    CLIC Website
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        
      </div>
    </div>
  )
}

export default ResourcesPage

