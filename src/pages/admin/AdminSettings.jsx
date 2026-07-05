import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Save, Instagram, Facebook, Twitter, Linkedin, Globe } from 'lucide-react'
import { getSiteSettings, updateSiteSettings } from '../../firebase/settingsService'
import { uploadFile } from '../../firebase/storageService'

const AdminSettings = () => {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadType, setUploadType] = useState(null)
  const [formData, setFormData] = useState({
    siteName: '',
    logoUrl: '',
    faviconUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    metaTitle: '',
    metaDescription: '',
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSiteSettings()
      if (settings) {
        setFormData({
          siteName: settings.siteName || '',
          logoUrl: settings.logoUrl || '',
          faviconUrl: settings.faviconUrl || '',
          instagramUrl: settings.instagramUrl || '',
          facebookUrl: settings.facebookUrl || '',
          twitterUrl: settings.twitterUrl || '',
          linkedinUrl: settings.linkedinUrl || '',
          metaTitle: settings.metaTitle || '',
          metaDescription: settings.metaDescription || '',
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

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadType(field)
    setUploadProgress(1)
    try {
      const url = await uploadFile(file, 'settings', setUploadProgress)
      setFormData({ ...formData, [field]: url })
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploadProgress(0)
      setUploadType(null)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-neutral-800">Site Ayarları</h1>
        <p className="text-neutral-500 mt-1">Genel site ayarlarını buradan yönetebilirsiniz.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {success && (
          <div className="bg-success-500/10 border border-success-500 rounded-lg p-4">
            <p className="text-success-600 font-medium">Değişiklikler başarıyla kaydedildi!</p>
          </div>
        )}

        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Genel Ayarlar</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Site Adı</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="input"
                placeholder="Temizlik Şirketi"
              />
            </div>

            <div>
              <label className="label">Logo</label>
              {formData.logoUrl ? (
                <div className="relative inline-block">
                  <img src={formData.logoUrl} alt="Logo" className="h-16 rounded" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logoUrl: '' })}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-error-500 rounded-full flex items-center justify-center text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-32 h-16 border-2 border-neutral-200 border-dashed rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  {uploadProgress > 0 && uploadType === 'logoUrl' ? (
                    <span className="text-sm">{Math.round(uploadProgress)}%</span>
                  ) : (
                    <Upload size={20} className="text-neutral-400" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logoUrl')} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Sosyal Medya</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label flex items-center gap-2">
                <Instagram size={16} className="text-neutral-400" />
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="input"
                placeholder="https://instagram.com/kullaniciadi"
              />
            </div>

            <div>
              <label className="label flex items-center gap-2">
                <Facebook size={16} className="text-neutral-400" />
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="input"
                placeholder="https://facebook.com/sayfaadi"
              />
            </div>

            <div>
              <label className="label flex items-center gap-2">
                <Twitter size={16} className="text-neutral-400" />
                Twitter URL
              </label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="input"
                placeholder="https://twitter.com/kullaniciadi"
              />
            </div>

            <div>
              <label className="label flex items-center gap-2">
                <Linkedin size={16} className="text-neutral-400" />
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="input"
                placeholder="https://linkedin.com/company/sirketadi"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-neutral-400" />
            SEO Ayarları
          </h3>

          <div className="space-y-5">
            <div>
              <label className="label">Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="input"
                placeholder="Site başlığı (60 karakter önerilir)"
              />
            </div>

            <div>
              <label className="label">Meta Description</label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                rows={3}
                className="input resize-none"
                placeholder="Site açıklaması (160 karakter önerilir)"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save size={18} />
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminSettings
