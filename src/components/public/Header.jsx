import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../../hooks'

const navLinks = [
  { path: '/', label: 'Ana Sayfa' },
  { path: '/hizmetler', label: 'Hizmetler' },
  { path: '/projeler', label: 'Projeler' },
  { path: '/hakkimizda', label: 'Hakkımızda' },
  { path: '/iletisim', label: 'İletişim' },
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const scrolled = useScrollPosition()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl shadow-soft border-b border-primary-100/50 ${
        scrolled ? 'py-0' : 'py-1'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-turquoise-gradient rounded-xl flex items-center justify-center shadow-turquoise group-hover:shadow-glow transition-all duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-lg leading-tight text-primary-700">
                İnci Temizlik
              </span>
              <span className="text-xs font-medium text-primary-400">
                Şirketi — Batman
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-200 hover:text-primary-600 relative group ${
                  isActive(link.path) ? 'text-primary-600' : 'text-neutral-600'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-400 rounded-full transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </nav>

          {/* Phone CTA */}
          <a
            href="tel:05050363865"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-primary-600 text-white hover:bg-primary-700 shadow-turquoise hover:-translate-y-0.5"
          >
            <Phone size={16} />
            0505 036 38 65
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-neutral-600 hover:text-primary-600"
            aria-label="Menüyü aç/kapat"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-primary-100"
          >
            <nav className="container-custom py-4 flex flex-col gap-1 shadow-soft">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 border border-primary-100'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:05050363865"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold text-sm shadow-turquoise"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={16} />
                0505 036 38 65
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
