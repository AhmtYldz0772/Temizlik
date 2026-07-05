import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react'
import { getProjects, deleteProject } from '../../firebase/projectsService'

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchProjects = async () => {
    const data = await getProjects()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteProject(deleteId)
      setProjects(projects.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setDeleting(false)
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
          <h1 className="text-2xl font-heading font-bold text-neutral-800">Projeler</h1>
          <p className="text-neutral-500 mt-1">Tüm projeleri buradan yönetebilirsiniz.</p>
        </div>
        <Link to="/admin/projeler/yeni" className="btn-primary">
          <Plus size={18} />
          Yeni Proje Ekle
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Sıra</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">İlk Görsel</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Başlık</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Görsel Sayısı</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Durum</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4 text-neutral-500">{index + 1}</td>
                  <td className="px-6 py-4">
                    {project.images?.[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-neutral-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-800">{project.title}</p>
                    <p className="text-sm text-neutral-500">{project.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{project.images?.length || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      project.isActive ? 'bg-success-500/10 text-success-600' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {project.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/projeler/${project.id}`}
                        className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary-600 transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(project.id)}
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

        {projects.length === 0 && (
          <div className="p-8 text-center text-neutral-500">
            Henüz proje eklenmemiş.
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-soft"
          >
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">Projeyi Sil</h3>
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

export default AdminProjects
