import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, X, RefreshCw } from 'lucide-react'
import { getBlogPostById, addBlogPost, updateBlogPost } from '../../firebase/blogService'
import { uploadFile } from '../../firebase/storageService'
import { generateSlug } from '../../utils/helpers'

const AdminBlogForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: '',
    tags: '',
    author: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    isPublished: false,
  })

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const post = await getBlogPostById(id)
        if (post) {
          setFormData({
            title: post.title || '',
            slug: post.slug || '',
            content: post.content || '',
            excerpt: post.excerpt || '',
            coverImage: post.coverImage || '',
            category: post.category || '',
            tags: (post.tags || []).join(', '),
            author: post.author || '',
            metaTitle: post.metaTitle || '',
            metaDescription: post.metaDescription || '',
            metaKeywords: post.metaKeywords || '',
            isPublished: post.isPublished ?? false,
          })
        }
      }
      fetchPost()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const dataToSave = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      publishedAt: formData.isPublished && !id ? new Date() : undefined,
    }

    try {
      if (id) {
        await updateBlogPost(id, dataToSave)
      } else {
        await addBlogPost(dataToSave)
      }
      navigate('/admin/blog')
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadProgress(1)
    try {
      const url = await uploadFile(file, 'blog', setUploadProgress)
      setFormData({ ...formData, coverImage: url })
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
          {id ? 'Yazı Düzenle' : 'Yeni Yazı Ekle'}
        </h1>
        <p className="text-neutral-500 mt-1">Blog yazısı bilgilerini doldurun.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Temel Bilgiler</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="label">Başlık *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input"
                placeholder="Yazı başlığı"
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

            <div>
              <label className="label">Kategori</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input"
                placeholder="Temizlik İpuçları"
              />
            </div>

            <div>
              <label className="label">Yazar</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="input"
                placeholder="Yazar adı"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="label">Etiketler (virgülle ayırın)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="input"
              placeholder="temizlik, ipuçları, ev temizliği"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">İçerik</h3>

          <div className="mb-5">
            <label className="label">Özet</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="input resize-none"
              placeholder="Listeleme sayfasında gösterilecek kısa özet"
            />
          </div>

          <div>
            <label className="label">İçerik *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={12}
              className="input resize-none"
              placeholder="Yazının ana içeriği"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Kapak Görseli</h3>
          <div className="mt-2">
            {formData.coverImage ? (
              <div className="relative inline-block">
                <img src={formData.coverImage} alt="Cover" className="w-64 h-40 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, coverImage: '' })}
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
                    <span className="text-sm text-neutral-500">Kapak görseli yükleyin</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">SEO Ayarları</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="lg:col-span-2">
              <label className="label">Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="input"
                placeholder="Sayfa başlığı (60 karakter önerilir)"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="label">Meta Description</label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                rows={2}
                className="input resize-none"
                placeholder="Sayfa açıklaması (160 karakter önerilir)"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="label">Meta Keywords</label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                className="input"
                placeholder="anahtar, kelimeler, virgülle, ayrılmış"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="isPublished" className="text-sm text-neutral-700 font-medium">
              Yayınla
            </label>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => navigate('/admin/blog')} className="btn-outline">İptal</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminBlogForm
