import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  FileText,
  MessageSquareQuote,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Mail,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { logoutAdmin } from '../../firebase/authService'

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/hizmetler', label: 'Hizmetler', icon: Briefcase },
  { path: '/admin/projeler', label: 'Projeler', icon: FolderOpen },
  { path: '/admin/blog', label: 'Blog Yazıları', icon: FileText },
  { path: '/admin/yorumlar', label: 'Müşteri Yorumları', icon: MessageSquareQuote },
  { path: '/admin/hakkimizda', label: 'Hakkımızda', icon: Users },
  { path: '/admin/iletisim-bilgileri', label: 'İletişim Bilgileri', icon: Mail },
  { path: '/admin/ayarlar', label: 'Site Ayarları', icon: Settings },
]

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    await logoutAdmin()
    navigate('/admin/login')
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="font-heading font-bold text-lg text-neutral-800">Admin</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 text-neutral-500 hover:text-neutral-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-neutral-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50 w-full transition-colors"
            >
              <LogOut size={18} />
              Çıkış Yap
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
