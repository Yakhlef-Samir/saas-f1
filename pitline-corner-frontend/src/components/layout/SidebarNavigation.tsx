import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import {
  Menu,
  X,
  Home,
  Library,
  Zap,
  BookOpen,
  Settings,
  LogOut,
  ChevronDown,
  TrendingUp,
} from 'lucide-react'
import '@/styles/navigation.css'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  subItems?: NavItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: 'Race Library',
    path: '/library',
    icon: <Library className="w-5 h-5" />,
  },
  {
    label: 'Strategy',
    path: '/strategy',
    icon: <Zap className="w-5 h-5" />,
    subItems: [
      {
        label: 'New Simulation',
        path: '/strategy/new',
        icon: <Zap className="w-4 h-4" />,
      },
      {
        label: 'My Simulations',
        path: '/strategy',
        icon: <Zap className="w-4 h-4" />,
      },
    ],
  },
  {
    label: 'Academy',
    path: '/academy',
    icon: <BookOpen className="w-5 h-5" />,
  },
]

export function SidebarNavigation() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const isActive = (path: string) => location.pathname === path

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-f1-red text-white p-2 rounded hover:bg-f1-red-dark transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-f1-dark text-white shadow-xl
          transform transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-f1-dark-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-f1-red rounded flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-f1-red">Pit Wall</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${
                        expandedItems.includes(item.label)
                          ? 'bg-f1-red text-white'
                          : 'text-gray-300 hover:bg-f1-dark-hover'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.includes(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Submenu */}
                  {expandedItems.includes(item.label) && (
                    <div className="ml-4 space-y-1 mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setIsOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-2 rounded-lg
                            transition-colors duration-200
                            ${
                              isActive(subItem.path)
                                ? 'bg-f1-red text-white'
                                : 'text-gray-300 hover:bg-f1-dark-hover'
                            }
                          `}
                        >
                          {subItem.icon}
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${
                      isActive(item.path)
                        ? 'bg-f1-red text-white'
                        : 'text-gray-300 hover:bg-f1-dark-hover'
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User Section */}
        {user && (
          <div className="p-4 border-t border-f1-dark-border space-y-2">
            <div className="px-4 py-2">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-semibold text-white truncate">{user.email}</p>
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-f1-dark-hover transition-colors w-full"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>

            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-f1-red hover:text-white transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
