import { useState, useEffect, useRef } from 'react'
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

  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalSlides = 5

  const slides = [
    {
      title: 'Welcome to Esther',
      content: 'Your central hub for academic resources, services, and information'
    },
    {
      title: 'Emergency Alert: Campus-wide Boil Water Notice',
      content: 'Please be advised that a campus-wide boil water notice is in effect. All drinking water must be boiled before consumption until further notice.'
    },
    {
      title: 'Important Dates',
      content: (
        <div className="w-full border border-gray-300 rounded-md overflow-hidden">
          <p className="border-b border-gray-300 last:border-b-0 px-4 py-3 bg-white text-left">Last day of classes: Dec. 5, 2025</p>
          <p className="border-b border-gray-300 last:border-b-0 px-4 py-3 bg-white text-left">Study Days: Dec. 6-9, 2025</p>
          <p className="border-b border-gray-300 last:border-b-0 px-4 py-3 bg-white text-left">Winter Graduation Commencement: Dec. 9, 2025</p>
          <p className="border-b border-gray-300 last:border-b-0 px-4 py-3 bg-white text-left">Finals Week: Dec. 9-16, 2025</p>
          <p className="border-b border-gray-300 last:border-b-0 px-4 py-3 bg-white text-left">Last day of Fall semester: Dec. 16, 2025</p>
        </div>
      )
    },
    {
      title: 'Registration',
      content: (
        <div className="space-y-2">
          <p className='text-lg font-bold'>Add/drop period is now open.</p>
          <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'>Register for Classes</button>
        </div>
      )
    },
    {
      title: 'Winter Graduation Commencement',
      content: 'Congratulations to all graduating students! Winter commencement ceremony details will be announced soon.'
    }
  ]

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    resetTimer()
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    resetTimer()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    resetTimer()
  }

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 10000)
  }

  useEffect(() => {
    resetTimer()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation items={navigationItems} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <section className="mb-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                type="button"
                className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="relative mb-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          {/* Carousel Content */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => {
                const isScrollable = typeof slide.content !== 'string'
                return (
                  <div
                    key={index}
                    className={`min-w-full flex ${isScrollable ? 'items-start' : 'items-center'} justify-center`}
                  >
                    <div className={`text-center px-8 w-full flex flex-col ${isScrollable ? 'py-6' : 'py-12'} h-full`}>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex-shrink-0">
                        {slide.title}
                      </h1>
                      {typeof slide.content === 'string' ? (
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                          {slide.content}
                        </p>
                      ) : (
                        <div className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto overflow-y-auto max-h-40 md:max-h-52 flex-1 pr-2">
                          {slide.content}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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

