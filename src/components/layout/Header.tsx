import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            RUSP
          </Link>
          <nav className="flex items-center gap-2">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-blue-800 rounded transition-colors"
            >
              Home
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                className="px-4 py-2 hover:bg-blue-800 rounded transition-colors"
              >
                <img src="/img/white_profile_icon_2.png" alt="Profile" className="w-10 h-10" />
                
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                      Student Profile
                    </button>
                    <Link
                      to="/personal"
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Personal Information
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                      Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

