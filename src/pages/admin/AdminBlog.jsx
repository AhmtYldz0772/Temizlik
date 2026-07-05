import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { getBlogPosts, deleteBlogPost, updateBlogPost } from '../../firebase/blogService'
import { formatDate, truncateText } from '../../utils/helpers'

const AdminBlog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const fetchPosts = async () => {
    const data = await getBlogPosts()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteBlogPost(deleteId)
      setPosts(posts.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setDeleting(false)
    }
  }

  const togglePublish = async (post) => {
    setTogglingId(post.id)
    try {
      const newStatus = !post.isPublished
      await updateBlogPost(post.id, { isPublished: newStatus })
      setPosts(posts.map((p) => p.id === post.id ? { ...p, isPublished: newStatus } : p))
    } catch (error) {
      console.error('Error toggling publish:', error)
    } finally {
      setTogglingId(null)
    }
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
          <h1 className="text-2xl font-heading font-bold text-neutral-800">Blog Yazıları</h1>
          <p className="text-neutral-500 mt-1">Blog yazılarını buradan yönetebilirsiniz.</p>
        </div>
        <Link to="/admin/blog/yeni" className="btn-primary">
          <Plus size={18} />
          Yeni Yazı Ekle
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Kapak</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Başlık</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Kategori</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Durum</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Tarih</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {posts.map((post, index) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} className="w-16 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-16 h-12 bg-neutral-100 rounded" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-800">{truncateText(post.title, 30)}</p>
                    <p className="text-sm text-neutral-500">{post.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{post.category || '-'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(post)}
                      disabled={togglingId === post.id}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        post.isPublished
                          ? 'bg-success-500/10 text-success-600'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {togglingId === post.id ? (
                        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      ) : post.isPublished ? (
                        <Eye size={12} />
                      ) : (
                        <EyeOff size={12} />
                      )}
                      {post.isPublished ? 'Yayında' : 'Taslak'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{formatDate(post.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/blog/${post.id}`}
                        className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary-600 transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(post.id)}
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

        {posts.length === 0 && (
          <div className="p-8 text-center text-neutral-500">Henüz blog yazısı eklenmemiş.</div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-soft"
          >
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">Yazıyı Sil</h3>
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

export default AdminBlog
