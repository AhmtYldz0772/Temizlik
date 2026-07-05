import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'
import { getSiteSettings } from '../../firebase/settingsService'
import { addContactMessage } from '../../firebase/contactService'

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
    document.title = 'İletişim | Temizlik Şirketi'
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
      setError('Mesajınız gönderilemedi. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              İletişim
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Bizimle iletişime geçin, size en kısa sürede dönüş yapalım.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-6">
                Mesaj Gönderin
              </h2>

              {success && (
                <div className="bg-success-500/10 border border-success-500 rounded-lg p-4 mb-6">
                  <p className="text-success-600 font-medium">Mesajınız başarıyla gönderildi!</p>
                </div>
              )}

              {error && (
                <div className="bg-error-500/10 border border-error-500 rounded-lg p-4 mb-6">
                  <p className="text-error-600 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Ad Soyad *</label>
                  <input
                    type="text"
                    name="fullName"
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
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Telefon numaranız"
                  />
                </div>

                <div>
                  <label className="label">Adres</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input"
                    placeholder="Adresiniz"
                  />
                </div>

                <div>
                  <label className="label">Mesajınız *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input resize-none"
                    placeholder="Mesajınızı yazın..."
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
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
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <div className="bg-neutral-100 rounded-xl h-64 flex items-center justify-center">
                <p className="text-neutral-500">Harita yakında eklenecek</p>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">İletişim Bilgileri</h3>
                <ul className="space-y-4">
                  {settings.phone && (
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={18} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Telefon</p>
                        <a href={`tel:${settings.phone}`} className="text-neutral-800 hover:text-primary-600 transition-colors">
                          {settings.phone}
                        </a>
                      </div>
                    </li>
                  )}
                  {settings.email && (
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail size={18} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">E-posta</p>
                        <a href={`mailto:${settings.email}`} className="text-neutral-800 hover:text-primary-600 transition-colors">
                          {settings.email}
                        </a>
                      </div>
                    </li>
                  )}
                  {settings.address && (
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Adres</p>
                        <p className="text-neutral-800">{settings.address}</p>
                      </div>
                    </li>
                  )}
                </ul>

                {/* Social Media */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-3">Sosyal Medya</p>
                  <div className="flex gap-3">
                    {settings.instagramUrl && (
                      <a
                        href={settings.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    {settings.facebookUrl && (
                      <a
                        href={settings.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        <Facebook size={18} />
                      </a>
                    )}
                    {settings.twitterUrl && (
                      <a
                        href={settings.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {settings.linkedinUrl && (
                      <a
                        href={settings.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
