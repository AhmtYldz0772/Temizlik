import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Save } from 'lucide-react'
import { getSiteSettings, updateSiteSettings } from '../../firebase/settingsService'
import { uploadFile } from '../../firebase/storageService'

const AdminAbout = () => {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    aboutUs: '',
    aboutUsImage: '',
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSiteSettings()
      if (settings) {
        setFormData({
          aboutUs: settings.aboutUs || '',
          aboutUsImage: settings.aboutUsImage || '',
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadProgress(1)
    try {
      const url = await uploadFile(file, 'settings', setUploadProgress)
      setFormData({ ...formData, aboutUsImage: url })
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploadProgress(0)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-neutral-800">Hakkımızda</h1>
        <p className="text-neutral-500 mt-1">Hakkımızda sayfasının içeriğini düzenleyin.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6">
        {success && (
          <div className="bg-success-500/10 border border-success-500 rounded-lg p-4 mb-6">
            <p className="text-success-600 font-medium">Değişiklikler başarıyla kaydedildi!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="label">Hakkımızda Metni</label>
            <textarea
              value={formData.aboutUs}
              onChange={(e) => setFormData({ ...formData, aboutUs: e.target.value })}
              rows={12}
              className="input resize-none"
              placeholder="Şirketiniz hakkında bilgi verin..."
            />
          </div>

          <div>
            <label className="label">Hakkımızda Görseli</label>
            <div className="mt-2">
              {formData.aboutUsImage ? (
                <div className="relative inline-block">
                  <img
                    src={formData.aboutUsImage}
                    alt="About Us"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, aboutUsImage: '' })}
                    className="absolute top-2 right-2 w-8 h-8 bg-error-500 rounded-full flex items-center justify-center text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-200 border-dashed rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  {uploadProgress > 0 ? (
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <span className="text-sm text-neutral-600">{Math.round(uploadProgress)}%</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                      <span className="text-sm text-neutral-500">Görsel yüklemek için tıklayın</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
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

export default AdminAbout
