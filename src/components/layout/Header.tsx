import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            University Student Portal
          </Link>
          <nav>
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-blue-800 rounded transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

