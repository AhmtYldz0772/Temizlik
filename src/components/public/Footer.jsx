import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react'
import { getSiteSettings } from '../../firebase/settingsService'
import { getServices } from '../../firebase/servicesService'

const Footer = () => {
  const [settings, setSettings] = useState({})
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const settingsData = await getSiteSettings()
      const servicesData = await getServices(true)
      setSettings(settingsData || {})
      setServices(servicesData)
    }
    fetchData()
  }, [])

  const quickLinks = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/hizmetler', label: 'Hizmetler' },
    { path: '/projeler', label: 'Projeler' },
    { path: '/blog', label: 'Blog' },
    { path: '/hakkimizda', label: 'Hakkımızda' },
    { path: '/iletisim', label: 'İletişim' },
  ]

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                {settings.siteName || 'Temizlik Şirketi'}
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Profesyonel temizlik hizmetleri ile mekanlarınızı tertemiz tutuyoruz.
              Güvenilir, kaliteli ve zamanında hizmet anlayışıyla yanınızdayız.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Hızlı Linkler</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Hizmetlerimiz</h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/hizmetler/${service.slug}`}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">İletişim</h4>
            <ul className="space-y-4">
              {settings.phone && (
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  <a href={`tel:${settings.phone}`} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${settings.email}`} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-400">{settings.address}</span>
                </li>
              )}
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Instagram size={18} />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Facebook size={18} />
                </a>
              )}
              {settings.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Twitter size={18} />
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} {settings.siteName || 'Temizlik Şirketi'}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
