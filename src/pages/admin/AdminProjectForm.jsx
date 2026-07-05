import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, X, RefreshCw, GripVertical } from 'lucide-react'
import { getProjectById, addProject, updateProject } from '../../firebase/projectsService'
import { uploadMultipleFiles, deleteFile } from '../../firebase/storageService'
import { generateSlug } from '../../utils/helpers'

const AdminProjectForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    images: [],
    order: 0,
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const project = await getProjectById(id)
        if (project) {
          setFormData({
            title: project.title || '',
            slug: project.slug || '',
            description: project.description || '',
            images: project.images || [],
            order: project.order || 0,
            isActive: project.isActive ?? true,
          })
        }
      }
      fetchProject()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (id) {
        await updateProject(id, formData)
      } else {
        await addProject(formData)
      }
      navigate('/admin/projeler')
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploadProgress(1)
    try {
      const urls = await uploadMultipleFiles(files, 'projects', setUploadProgress)
      setFormData({ ...formData, images: [...formData.images, ...urls] })
    } catch (error) {
      console.error('Error uploading images:', error)
    } finally {
      setUploadProgress(0)
    }
  }

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  const handleGenerateSlug = () => {
    setFormData({ ...formData, slug: generateSlug(formData.title) })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-neutral-800">
          {id ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
        </h1>
        <p className="text-neutral-500 mt-1">Proje bilgilerini doldurun.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label">Başlık *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input"
                placeholder="Proje başlığı"
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
                <button type="button" onClick={handleGenerateSlug} className="btn-outline px-3">
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="label">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="input resize-none"
              placeholder="Proje açıklaması"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="text-sm text-neutral-700">Aktif</label>
            </div>
          </div>

          <div>
            <label className="label">Görseller</label>
            <div className="mt-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-200 border-dashed rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                {uploadProgress > 0 ? (
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span className="text-sm text-neutral-600">{Math.round(uploadProgress)}%</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                    <span className="text-sm text-neutral-500">Birden fazla görsel yükleyebilirsiniz</span>
                  </>
                )}
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.images.map((url, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <img src={url} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-error-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button type="button" onClick={() => navigate('/admin/projeler')} className="btn-outline">İptal</button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminProjectForm
