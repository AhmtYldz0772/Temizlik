import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Star, Plus, X } from 'lucide-react'
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '../../firebase/testimonialsService'
import { truncateText } from '../../utils/helpers'

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    comment: '',
    rating: 5,
    isActive: true,
    order: 0,
  })

  const fetchTestimonials = async () => {
    const data = await getTestimonials()
    setTestimonials(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setEditId(testimonial.id)
      setFormData({
        name: testimonial.name || '',
        role: testimonial.role || '',
        comment: testimonial.comment || '',
        rating: testimonial.rating || 5,
        isActive: testimonial.isActive ?? true,
        order: testimonial.order || 0,
      })
    } else {
      setEditId(null)
      setFormData({ name: '', role: '', comment: '', rating: 5, isActive: true, order: 0 })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      if (editId) {
        await updateTestimonial(editId, formData)
      } else {
        await addTestimonial(formData)
      }
      setShowModal(false)
      fetchTestimonials()
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteTestimonial(deleteId)
      setTestimonials(testimonials.filter((t) => t.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    } finally {
      setDeleting(false)
    }
  }

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`cursor-${interactive ? 'pointer' : 'default'} ${
          i < rating ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'
        }`}
        onClick={interactive ? () => setFormData({ ...formData, rating: i + 1 }) : undefined}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-800">Müşteri Yorumları</h1>
          <p className="text-neutral-500 mt-1">Yorumları buradan yönetebilirsiniz.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus size={18} />
          Yeni Yorum Ekle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">İsim</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Rol</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Yorum</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Puan</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Durum</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {testimonials.map((t, index) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-neutral-800">{t.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{t.role}</td>
                  <td className="px-6 py-4 text-neutral-600 max-w-xs">{truncateText(t.comment, 50)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">{renderStars(t.rating)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      t.isActive ? 'bg-success-500/10 text-success-600' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {t.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(t)}
                        className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary-600 transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(t.id)}
                        className="p-2 rounded-lg hover:bg-error-50 text-neutral-500 hover:text-error-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {testimonials.length === 0 && (
          <div className="p-8 text-center text-neutral-500">Henüz yorum eklenmemiş.</div>
        )}
      </div>

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-soft"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-800">
                {editId ? 'Yorum Düzenle' : 'Yeni Yorum Ekle'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-neutral-100 rounded">
                <X size={20} className="text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">İsim *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="input"
                  placeholder="Müşteri adı"
                />
              </div>

              <div>
                <label className="label">Rol</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input"
                  placeholder="Apartman Yöneticisi"
                />
              </div>

              <div>
                <label className="label">Yorum *</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  required
                  rows={4}
                  className="input resize-none"
                  placeholder="Müşteri yorumu"
                />
              </div>

              <div>
                <label className="label">Puan</label>
                <div className="flex gap-1">{renderStars(formData.rating, true)}</div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="tIsActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="tIsActive" className="text-sm text-neutral-700">Aktif</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1">İptal</button>
                <button type="submit" disabled={formLoading} className="btn-primary flex-1">
                  {formLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-soft"
          >
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">Yorumu Sil</h3>
            <p className="text-neutral-600 mb-6">Bu işlem geri alınamaz.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} disabled={deleting} className="btn-outline flex-1">İptal</button>
              <button onClick={handleDelete} disabled={deleting} className="bg-error-500 hover:bg-error-600 text-white font-medium px-6 py-3 rounded-lg flex-1 disabled:opacity-50">
                {deleting ? 'Siliniyor...' : 'Sil'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminTestimonials
