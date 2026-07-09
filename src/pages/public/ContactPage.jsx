import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Twitter, Linkedin, MessageCircle, Sparkles, Clock, CheckCircle } from 'lucide-react'
import { getSiteSettings } from '../../firebase/settingsService'
import { addContactMessage } from '../../firebase/contactService'

const WHATSAPP_MESSAGE = encodeURIComponent('Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.')
const WHATSAPP_LINK = `https://wa.me/905050363865?text=${WHATSAPP_MESSAGE}`

const ContactPage = () => {
  const [settings, setSettings] = useState({})
  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings()
      setSettings(data || {})
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    document.title = 'İletişim | İnci Temizlik Şirketi Batman'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await addContactMessage(formData)
      setSuccess(true)
      setFormData({ fullName: '', phone: '', address: '', message: '' })
    } catch (err) {
      setError('Mesajınız gönderilemedi. Lütfen tekrar deneyin veya WhatsApp\'tan ulaşın.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfoItems = [
    {
      icon: Phone,
      label: 'Telefon',
      value: settings.phone || '0505 036 38 65',
      href: `tel:${settings.phone || '05050363865'}`,
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '0505 036 38 65',
      href: WHATSAPP_LINK,
      color: 'bg-green-100 text-green-600',
      external: true
    },
    ...(settings.email ? [{
      icon: Mail,
      label: 'E-posta',
      value: settings.email,
      href: `mailto:${settings.email}`,
      color: 'bg-blue-100 text-blue-600'
    }] : []),
    ...(settings.address ? [{
      icon: MapPin,
      label: 'Adres',
      value: settings.address,
      color: 'bg-amber-100 text-amber-600'
    }] : []),
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 pt-40 bg-turquoise-gradient overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-300/20 translate-y-1/2 -translate-x-1/4 blur-2xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-5 py-2 mb-6">
              <Sparkles size={14} className="text-primary-200" />
              <span className="text-white/90 text-sm font-semibold">Bize Ulaşın</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-5">
              İletişim
            </h1>
            <p className="text-white/80 max-w-xl mx-auto text-lg leading-relaxed">
              Temizlik hizmeti için hemen bizimle iletişime geçin.
              Size en kısa sürede dönüş yapıyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="py-8 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:05050363865"
              className="flex items-center gap-3 bg-primary-50 hover:bg-primary-100 border border-primary-200 text-primary-700 rounded-2xl px-6 py-4 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-primary-400 font-medium">Hemen Ara</div>
                <div className="text-lg font-bold">0505 036 38 65</div>
              </div>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-2xl px-6 py-4 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-green-400 font-medium">Mesaj Gönder</div>
                <div className="text-lg font-bold">WhatsApp</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-card p-8"
            >
              <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-2">
                Mesaj Gönderin
              </h2>
              <p className="text-neutral-500 mb-6 text-sm">
                Formu doldurun, size en kısa sürede dönüş yapalım.
              </p>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <p className="text-green-700 font-medium">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">Ad Soyad *</label>
                  <input
                    type="text"
                    name="fullName"
                    id="contact-fullname"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label className="label">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    id="contact-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="05XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="label">Adres</label>
                  <input
                    type="text"
                    name="address"
                    id="contact-address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input"
                    placeholder="Temizlik yapılacak adres (Batman)"
                  />
                </div>

                <div>
                  <label className="label">Mesajınız *</label>
                  <textarea
                    name="message"
                    id="contact-message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input resize-none"
                    placeholder="Ne tür bir temizlik hizmetine ihtiyacınız var?"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 text-base"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Mesaj Gönder
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl h-52 flex items-center justify-center border border-primary-100 overflow-hidden relative">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                  <p className="text-primary-600 font-semibold">Batman, Türkiye</p>
                  <p className="text-primary-400 text-sm mt-1">İnci Temizlik Şirketi</p>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="bg-white rounded-3xl shadow-card p-6 space-y-4">
                <h3 className="text-lg font-bold text-neutral-800 mb-4">İletişim Bilgileri</h3>

                {contactInfoItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                    <div className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-neutral-400 font-medium">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="text-neutral-800 font-semibold hover:text-primary-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-neutral-800 font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Working Hours */}
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={18} className="text-primary-500" />
                    <h4 className="font-semibold text-neutral-700">Çalışma Saatleri</h4>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Pazartesi — Cumartesi</span>
                      <span className="font-semibold text-neutral-800">08:00 — 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Pazar</span>
                      <span className="font-semibold text-neutral-800">09:00 — 18:00</span>
                    </div>
                  </div>
                </div>

                {/* Social */}
                {(settings.instagramUrl || settings.facebookUrl) && (
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <p className="text-sm text-neutral-400 mb-3 font-medium">Sosyal Medya</p>
                    <div className="flex gap-2">
                      {settings.instagramUrl && (
                        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                          <Instagram size={18} />
                        </a>
                      )}
                      {settings.facebookUrl && (
                        <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                          <Facebook size={18} />
                        </a>
                      )}
                      {settings.twitterUrl && (
                        <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                          <Twitter size={18} />
                        </a>
                      )}
                      {settings.linkedinUrl && (
                        <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
