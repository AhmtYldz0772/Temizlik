import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, X, RefreshCw } from 'lucide-react'
import { getServiceById, addService, updateService } from '../../firebase/servicesService'
import { uploadFile } from '../../firebase/storageService'
import { generateSlug } from '../../utils/helpers'

const iconOptions = [
  'Building2', 'Home', 'Sparkles', 'Shirt', 'SprayCan', 'Droplets',
  'Wind', 'Brush', 'Shield', 'Star', 'Award', 'Clock',
  'CheckCircle', 'Heart', 'Leaf', 'Sun', 'Zap', 'Target'
]

const AdminServiceForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    icon: 'Sparkles',
    imageUrl: '',
    order: 0,
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        const service = await getServiceById(id)
        if (service) {
          setFormData({
            title: service.title || '',
            slug: service.slug || '',
            shortDescription: service.shortDescription || '',
            description: service.description || '',
            icon: service.icon || 'Sparkles',
            imageUrl: service.imageUrl || '',
            order: service.order || 0,
            isActive: service.isActive ?? true,
          })
        }
      }
      fetchService()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (id) {
        await updateService(id, formData)
      } else {
        await addService(formData)
      }
      navigate('/admin/hizmetler')
    } catch (error) {
      console.error('Error saving service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadProgress(1)
    try {
      const url = await uploadFile(file, 'services', setUploadProgress)
      setFormData({ ...formData, imageUrl: url })
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploadProgress(0)
    }
  }

  const handleGenerateSlug = () => {
    setFormData({ ...formData, slug: generateSlug(formData.title) })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-neutral-800">
          {id ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}
        </h1>
        <p className="text-neutral-500 mt-1">Hizmet bilgilerini doldurun.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="label">Başlık *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input"
                placeholder="Hizmet başlığı"
              />
            </div>

            <div>
              <label className="label">Slug</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input flex-1"
                  placeholder="url-dostu-baslik"
                />
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="btn-outline px-3"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="label">Kısa Açıklama</label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={3}
                className="input resize-none"
                placeholder="Listeleme için kısa açıklama"
              />
            </div>

            <div>
              <label className="label">Detaylı Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="input resize-none"
                placeholder="Hizmetin detaylı açıklaması"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <label className="label">İkon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="input"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Sıra No</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="input"
                min="0"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="text-sm text-neutral-700">Aktif</label>
            </div>

            <div>
              <label className="label">Görsel</label>
              <div className="mt-2">
                {formData.imageUrl ? (
                  <div className="relative inline-block">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error-500 rounded-full flex items-center justify-center text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-200 border-dashed rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
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
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/hizmetler')}
            className="btn-outline"
          >
            İptal
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminServiceForm
