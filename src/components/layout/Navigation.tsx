import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavigationItem } from '../../types'
import { navigationConfig } from '../../utils/navigationConfig'

interface NavigationProps {
  items: NavigationItem[]
}

const Navigation = ({ items }: NavigationProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Create a map of paths to navigation config for quick lookup
  const configMap = new Map(navigationConfig.map(config => [config.path, config]))

  return (
    <nav className="bg-gray-100 border-b">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap gap-4 py-3">
          {items.map((item) => {
            const config = configMap.get(item.path)
            const hasSubItems = config && config.subItems.length > 0

            return (
              <li 
                key={item.path}
                className="relative"
                onMouseEnter={() => hasSubItems && setOpenDropdown(item.path)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                >
                  {item.label}
                </Link>
                
                {hasSubItems && openDropdown === item.path && (
                  <div className="absolute top-full left-0 pt-1 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="py-1">
                        {config.subItems.map((subItem, index) => (
                          subItem.path ? (
                            <Link
                              key={`${item.path}-${index}`}
                              to={subItem.path}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              {subItem.label}
                            </Link>
                          ) : (
                            <button
                              key={`${item.path}-${index}`}
                              onClick={subItem.onClick}
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              {subItem.label}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

