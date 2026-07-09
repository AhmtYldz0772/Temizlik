import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, MessageCircle, Sparkles, ArrowRight } from 'lucide-react'
import { getSiteSettings } from '../../firebase/settingsService'
import { getServices } from '../../firebase/servicesService'

const WHATSAPP_MESSAGE = encodeURIComponent('Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.')

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
    { path: '/hakkimizda', label: 'Hakkımızda' },
    { path: '/iletisim', label: 'İletişim' },
  ]

  const whatsappLink = settings.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber}?text=${WHATSAPP_MESSAGE}`
    : `https://wa.me/905050363865?text=${WHATSAPP_MESSAGE}`

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Top CTA Strip */}
      <div className="bg-turquoise-gradient py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-white text-center md:text-left">
              <h3 className="text-xl font-heading font-bold mb-1">Ücretsiz Temizlik Teklifi Alın</h3>
              <p className="text-primary-100 text-sm">Batman'da profesyonel temizlik için hemen ulaşın</p>
            </div>
            <div className="flex gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a href="tel:05050363865" className="btn-white">
                <Phone size={18} />
                Ara
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-turquoise-gradient rounded-xl flex items-center justify-center shadow-turquoise">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">İnci Temizlik</div>
                <div className="text-primary-400 text-xs font-medium">Şirketi — Batman</div>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5">
              Batman'da profesyonel temizlik hizmetleri sunan güvenilir firmanız.
              Ev, ofis ve ticari mekânlar için hijyenik çözümler.
            </p>
            {/* Social Media */}
            <div className="flex gap-2">
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Instagram size={16} />
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Facebook size={16} />
                </a>
              )}
              {settings.twitterUrl && (
                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Twitter size={16} />
                </a>
              )}
              {settings.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">Hızlı Linkler</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">Hizmetlerimiz</h4>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/hizmetler/${service.slug}`}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-400" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">Telefon</p>
                  <a href="tel:05050363865" className="text-sm text-neutral-300 hover:text-primary-400 transition-colors font-medium">
                    0505 036 38 65
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle size={14} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">WhatsApp</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-300 hover:text-green-400 transition-colors font-medium"
                  >
                    Mesaj Gönder
                  </a>
                </div>
              </li>
              {settings.email && (
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">E-posta</p>
                    <a href={`mailto:${settings.email}`} className="text-sm text-neutral-300 hover:text-primary-400 transition-colors font-medium">
                      {settings.email}
                    </a>
                  </div>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Adres</p>
                    <span className="text-sm text-neutral-300">{settings.address}</span>
                  </div>
                </li>
              )}
              {!settings.address && (
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">Konum</p>
                    <span className="text-sm text-neutral-300">Batman, Türkiye</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} İnci Temizlik Şirketi. Tüm hakları saklıdır. | Batman
          </p>
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <Sparkles size={12} className="text-primary-600" />
            <span>Batman'ın en profesyonel temizlik firması</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
