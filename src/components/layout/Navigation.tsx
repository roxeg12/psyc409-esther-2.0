import { Link } from 'react-router-dom'
import { NavigationItem } from '../../types'

interface NavigationProps {
  items: NavigationItem[]
}

const Navigation = ({ items }: NavigationProps) => {
  return (
    <nav className="bg-gray-100 border-b">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap gap-4 py-3">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-blue-600 hover:underline transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

