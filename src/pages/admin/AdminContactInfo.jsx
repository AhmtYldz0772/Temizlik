import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Save } from 'lucide-react'
import { getSiteSettings, updateSiteSettings } from '../../firebase/settingsService'

const AdminContactInfo = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSiteSettings()
      if (settings) {
        setFormData({
          phone: settings.phone || '',
          email: settings.email || '',
          address: settings.address || '',
          whatsappNumber: settings.whatsappNumber || '',
        })
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      await updateSiteSettings(formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-neutral-800">İletişim Bilgileri</h1>
        <p className="text-neutral-500 mt-1">Şirket iletişim bilgilerini düzenleyin.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6">
        {success && (
          <div className="bg-success-500/10 border border-success-500 rounded-lg p-4 mb-6">
            <p className="text-success-600 font-medium">Değişiklikler başarıyla kaydedildi!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label flex items-center gap-2">
              <Phone size={16} className="text-neutral-400" />
              Telefon
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input"
              placeholder="0212 555 12 34"
            />
          </div>

          <div>
            <label className="label flex items-center gap-2">
              <Mail size={16} className="text-neutral-400" />
              E-posta
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              placeholder="info@temizliksirketi.com"
            />
          </div>

          <div>
            <label className="label flex items-center gap-2">
              <MessageCircle size={16} className="text-neutral-400" />
              WhatsApp Numarası
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="input"
              placeholder="905551234567"
            />
            <p className="text-xs text-neutral-500 mt-1">Ülke kodu ile birlikte, boşluksuz (örn: 905551234567)</p>
          </div>

          <div>
            <label className="label flex items-center gap-2">
              <MapPin size={16} className="text-neutral-400" />
              Adres
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="input"
              placeholder="Mahalle, Sokak, No, İlçe, İl"
            />
          </div>
        </div>

        <div className="mt-8">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save size={18} />
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminContactInfo
